import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  getSectionCameraPose,
  showcaseModels,
  type ModelKey,
  type PageSectionKey,
  type PartKey,
} from './data'
import {
  getHeroElement,
  getPortalElement,
  getRailwayState,
  patchRailwayState,
  registerRailwayDriver,
  subscribePortalElement,
  subscribeRailwayState,
} from './railwayStore'

const EXPLODED_Y: Record<Exclude<PartKey, 'all'>, number> = {
  roof: 2.75,
  head: 1.85,
  body: 1.2,
  cowcatcher: 0.85,
  underbody: 0.35,
  track: 0.0,
}

const CRUISE_SPEED_BPS = 7.5
const WHEEL_RADIUS = 0.57
const RAIL_SEGMENTS = 104

interface ThemePalette {
  bg: number
  ballast: number
  earth: number
}

interface CachedTrainAsset {
  id: ModelKey
  root: THREE.Group
  groups: Partial<Record<Exclude<PartKey, 'all'>, THREE.Object3D>>
  wheels: THREE.Object3D[]
  stats: string
}

interface PassingSwapAnim {
  outgoing: CachedTrainAsset
  incoming: CachedTrainAsset
  elapsed: number
  departDur: number
  arriveStart: number
  totalDur: number
  startXIn: number
  departMaxDist: number
}

function getThemePalette(): ThemePalette {
  const dark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  return dark
    ? { bg: 0x212224, ballast: 0x2e3033, earth: 0x242628 }
    : { bg: 0xedebe6, ballast: 0xcbc7bd, earth: 0xdedbd2 }
}

function disposeObjectTree(root: THREE.Object3D): void {
  const seenGeo = new Set<THREE.BufferGeometry>()
  const seenMat = new Set<THREE.Material>()
  const seenTex = new Set<THREE.Texture>()

  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      if (!seenGeo.has(obj.geometry)) {
        seenGeo.add(obj.geometry)
        obj.geometry.dispose()
      }
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      for (const mat of mats) {
        if (!mat || seenMat.has(mat)) continue
        seenMat.add(mat)
        if ('map' in mat && mat.map instanceof THREE.Texture && !seenTex.has(mat.map)) {
          seenTex.add(mat.map)
          mat.map.dispose()
        }
        mat.dispose()
      }
    }
  })
}

function toMatteMinecraftMaterials(root: THREE.Object3D): void {
  const matCache = new Map<THREE.Material, THREE.MeshLambertMaterial>()
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return
    const src = Array.isArray(obj.material) ? obj.material[0] : obj.material
    if (!src) return

    let matte = matCache.get(src)
    if (!matte) {
      let map: THREE.Texture | null = null
      if ('map' in src && src.map instanceof THREE.Texture) {
        const tex = src.map
        tex.magFilter = THREE.NearestFilter
        tex.minFilter = THREE.NearestFilter
        tex.colorSpace = THREE.SRGBColorSpace
        tex.generateMipmaps = false
        tex.needsUpdate = true
        map = tex
      }
      const isMask = src.name === 'atlas_mask' || ('alphaTest' in src && src.alphaTest > 0)
      matte = new THREE.MeshLambertMaterial({
        map,
        color: 0xffffff,
        transparent: false,
        alphaTest: isMask ? 0.45 : 0,
        side: THREE.DoubleSide,
      })
      matCache.set(src, matte)
    }

    obj.material = matte
    obj.castShadow = false
    obj.receiveShadow = false
  })
  for (const oldMat of matCache.keys()) {
    oldMat.dispose()
  }
}

function buildBallastEmbankment(palette: ThemePalette): {
  group: THREE.Group
  ballastMat: THREE.MeshLambertMaterial
  earthMat: THREE.MeshLambertMaterial
} {
  const group = new THREE.Group()

  const earthGeo = new THREE.PlaneGeometry(240, 140)
  earthGeo.rotateX(-Math.PI / 2)
  const earthMat = new THREE.MeshLambertMaterial({ color: palette.earth })
  const earthMesh = new THREE.Mesh(earthGeo, earthMat)
  earthMesh.position.y = -0.22
  group.add(earthMesh)

  const shape = new THREE.Shape()
  shape.moveTo(-2.35, -0.22)
  shape.lineTo(2.35, -0.22)
  shape.lineTo(1.55, -0.02)
  shape.lineTo(-1.55, -0.02)
  shape.closePath()

  const ballastGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 180,
    bevelEnabled: false,
    steps: 1,
  })
  ballastGeo.rotateY(Math.PI / 2)
  ballastGeo.translate(-90, 0, 0)
  const ballastMat = new THREE.MeshLambertMaterial({ color: palette.ballast })
  const ballastMesh = new THREE.Mesh(ballastGeo, ballastMat)
  group.add(ballastMesh)

  return { group, ballastMat, earthMat }
}

function computeDesiredFraming(
  vw: number,
  vh: number,
  section: PageSectionKey,
): {
  x: number
  y: number
  zoom: number
  inPortal: boolean
} {
  const portal = getPortalElement()
  if (portal) {
    const r = portal.getBoundingClientRect()
    if (r.width > 40 && r.height > 40 && r.bottom > 70 && r.top < vh - 40) {
      const z = THREE.MathUtils.clamp((r.height / vh) * 1.12, 0.72, 0.92)
      return {
        x: vw / 2 - (r.left + r.width / 2),
        y: vh / 2 - (r.top + r.height / 2),
        zoom: z,
        inPortal: true,
      }
    }
  }

  const hero = getHeroElement()
  if (section === 'top' || (hero && hero.getBoundingClientRect().bottom > vh * 0.48)) {
    if (vw >= 960) {
      // Shift train right-of-center & scale slightly so entire front cab & cowcatcher clear Hero card
      return { x: -vw * 0.18, y: vh * 0.04, zoom: 0.84, inPortal: false }
    }
    return { x: 0, y: vh * 0.19, zoom: 0.92, inPortal: false }
  }

  return { x: 0, y: 0, zoom: 0.86, inPortal: false }
}

export function TrainBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const initial = getRailwayState()
    if (!host || initial.webglUnsupported) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      queueMicrotask(() => {
        patchRailwayState({ webglUnsupported: true, loadState: 'error' })
      })
      return
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    renderer.shadowMap.enabled = false

    const canvas = renderer.domElement
    canvas.className = 'backdrop-canvas'
    host.replaceChildren(canvas)

    const pal = getThemePalette()
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(pal.bg)
    const fog = new THREE.Fog(pal.bg, 32, 82)
    scene.fog = fog

    scene.add(new THREE.HemisphereLight(0xf6f5f0, 0x76787e, 1.38))
    const keyDir = new THREE.DirectionalLight(0xffffff, 0.72)
    keyDir.position.set(-14, 22, 16)
    scene.add(keyDir)
    const fillDir = new THREE.DirectionalLight(0xeef1f5, 0.48)
    fillDir.position.set(16, 10, -14)
    scene.add(fillDir)

    const { group: envGroup, ballastMat, earthMat } = buildBallastEmbankment(pal)
    scene.add(envGroup)

    const corridorRoot = new THREE.Group()
    scene.add(corridorRoot)

    const modelRoot = new THREE.Group()
    scene.add(modelRoot)

    const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 160)
    const camTarget = new THREE.Vector3(0, 2.2, 0)
    let desiredCamPos: THREE.Vector3 | null = null
    let desiredTarget: THREE.Vector3 | null = null
    let corridorRailInstanced: THREE.InstancedMesh[] = []

    const assetCache = new Map<ModelKey, CachedTrainAsset>()
    const inFlightLoads = new Map<ModelKey, Promise<CachedTrainAsset | null>>()
    const gltfLoader = new GLTFLoader()

    let activeAsset: CachedTrainAsset | null = null
    let swapAnim: PassingSwapAnim | null = null
    let userInteracting = false

    let controls: OrbitControls | null = null
    let attachedPortal: HTMLElement | null = null
    let portalDownX = 0
    let portalDownY = 0
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    let vw = window.innerWidth || 1280
    let vh = window.innerHeight || 720
    const initFrame = computeDesiredFraming(vw, vh, initial.activeSection)
    let curOffX = initFrame.x
    let curOffY = initFrame.y
    let curZoom = initFrame.zoom
    let targetOffX = initFrame.x
    let targetOffY = initFrame.y
    let targetZoom = initFrame.zoom

    let disposed = false
    let rafId: number | null = null
    let swapTimerId: number | null = null
    let inTick = false
    let isDocumentHidden = document.hidden
    let lastTime = performance.now()
    let railScroll = 0

    const applyProjection = () => {
      const aspect = vw / Math.max(vh, 1)
      if (aspect < 1.35) {
        const minHorizRad = THREE.MathUtils.degToRad(58)
        const vRad = 2 * Math.atan(Math.tan(minHorizRad / 2) / aspect)
        camera.fov = Math.min(64, THREE.MathUtils.radToDeg(vRad))
      } else {
        camera.fov = 40
      }
      camera.aspect = aspect
      camera.zoom = curZoom
      camera.setViewOffset(vw, vh, curOffX, curOffY, vw, vh)
    }

    const applySize = () => {
      vw = window.innerWidth || 1280
      vh = window.innerHeight || 720
      const area = vw * vh
      const maxDpr = area > 1_100_000 ? 1.25 : 1.5
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
      renderer.setSize(vw, vh, false)
      applyProjection()
    }

    const refreshTargetFraming = () => {
      const next = computeDesiredFraming(vw, vh, getRailwayState().activeSection)
      targetOffX = next.x
      targetOffY = next.y
      targetZoom = next.zoom
      if (next.inPortal) {
        curOffY = next.y
      }
    }

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const clearSwapTimer = () => {
      if (swapTimerId !== null) {
        window.clearTimeout(swapTimerId)
        swapTimerId = null
      }
    }

    const loadTrainAsset = (id: ModelKey): Promise<CachedTrainAsset | null> => {
      const hit = assetCache.get(id)
      if (hit) return Promise.resolve(hit)
      const pending = inFlightLoads.get(id)
      if (pending) return pending

      const spec = showcaseModels.find((m) => m.id === id) ?? showcaseModels[0]
      const prom = new Promise<CachedTrainAsset | null>((resolve) => {
        gltfLoader.load(
          spec.url,
          (gltf) => {
            inFlightLoads.delete(id)
            if (disposed) {
              disposeObjectTree(gltf.scene)
              resolve(null)
              return
            }
            toMatteMinecraftMaterials(gltf.scene)
            const groups: Partial<Record<Exclude<PartKey, 'all'>, THREE.Object3D>> = {}
            const partKeys: Array<Exclude<PartKey, 'all'>> = [
              'track',
              'underbody',
              'cowcatcher',
              'body',
              'head',
              'roof',
            ]
            for (const key of partKeys) {
              const found = gltf.scene.getObjectByName(key)
              if (found) groups[key] = found
            }
            if (groups.track) {
              groups.track.visible = corridorRailInstanced.length === 0
            }

            const wheels: THREE.Object3D[] = []
            let meshCount = 0
            gltf.scene.traverse((obj) => {
              if (/^wheel_\d+$/.test(obj.name)) wheels.push(obj)
              if (obj instanceof THREE.Mesh) meshCount += 1
            })

            const asset: CachedTrainAsset = {
              id,
              root: gltf.scene,
              groups,
              wheels,
              stats: `${spec.dimensions} · ${wheels.length} 轴轮对 · ${meshCount} 组网格`,
            }
            assetCache.set(id, asset)
            resolve(asset)
          },
          undefined,
          () => {
            inFlightLoads.delete(id)
            resolve(null)
          },
        )
      })
      inFlightLoads.set(id, prom)
      return prom
    }

    const prefetchRemainingModels = () => {
      for (const spec of showcaseModels) {
        if (!assetCache.has(spec.id) && !inFlightLoads.has(spec.id)) {
          void loadTrainAsset(spec.id)
        }
      }
    }

    const syncAssetPartPose = (asset: CachedTrainAsset, exploded: boolean) => {
      for (const [k, offset] of Object.entries(EXPLODED_Y)) {
        const grp = asset.groups[k as Exclude<PartKey, 'all'>]
        if (grp) grp.position.y = exploded ? offset : 0
      }
      if (asset.groups.track) {
        asset.groups.track.visible = corridorRailInstanced.length === 0
      }
    }

    const finalizeSwapImmediate = (target: CachedTrainAsset) => {
      if (swapAnim) {
        swapAnim.outgoing.root.position.x = 0
        if (swapAnim.outgoing.root !== target.root) {
          modelRoot.remove(swapAnim.outgoing.root)
        }
        swapAnim = null
      }
      if (activeAsset && activeAsset !== target) {
        activeAsset.root.position.x = 0
        modelRoot.remove(activeAsset.root)
      }
      target.root.position.x = 0
      syncAssetPartPose(target, getRailwayState().exploded)
      if (!target.root.parent) modelRoot.add(target.root)
      activeAsset = target

      const spec = showcaseModels.find((m) => m.id === target.id) ?? showcaseModels[0]
      if (controls) {
        controls.minDistance = spec.minDistance
        controls.maxDistance = spec.maxDistance
      }
      patchRailwayState({
        modelId: target.id,
        loadState: 'ready',
        swapState: 'idle',
        partStats: target.stats,
      })
    }

    const flyToPoseForCurrentContext = (section: PageSectionKey, modelId: ModelKey) => {
      const spec = showcaseModels.find((m) => m.id === modelId) ?? showcaseModels[0]
      if (section === 'example') {
        const st = getRailwayState()
        const pose =
          st.partId !== 'all'
            ? spec.partCameras[st.partId]
            : spec.viewPresets[st.viewId ?? 'overview']
        desiredCamPos = new THREE.Vector3(...pose.position)
        desiredTarget = new THREE.Vector3(...pose.target)
      } else {
        const pose = getSectionCameraPose(section, modelId)
        desiredCamPos = new THREE.Vector3(...pose.position)
        desiredTarget = new THREE.Vector3(...pose.target)
      }
    }

    let requestRenderFn: () => void = () => {}

    const startPassingTransition = async (nextId: ModelKey, fast = false) => {
      const nextAsset = await loadTrainAsset(nextId)
      if (disposed || !nextAsset) return
      const st = getRailwayState()

      // Fallback to instant mount if no current train, paused, exploded, reduced-motion, or already mid-swap
      if (!activeAsset || st.exploded || !st.running || st.reducedMotion || swapAnim) {
        finalizeSwapImmediate(nextAsset)
        flyToPoseForCurrentContext(st.activeSection, nextId)
        requestRenderFn()
        return
      }

      if (activeAsset.id === nextId) return

      const outgoing = activeAsset
      outgoing.root.position.x = 0
      syncAssetPartPose(nextAsset, false)
      const startXIn = 56
      nextAsset.root.position.x = startXIn
      if (!nextAsset.root.parent) modelRoot.add(nextAsset.root)

      swapAnim = {
        outgoing,
        incoming: nextAsset,
        elapsed: 0,
        departDur: fast ? 1.55 : 2.1,
        arriveStart: fast ? 0.65 : 1.05,
        totalDur: fast ? 2.4 : 3.7,
        startXIn,
        departMaxDist: 50,
      }
      patchRailwayState({ swapState: 'departing', loadState: 'ready' })
      requestRenderFn()
    }

    const scheduleRandomSwap = () => {
      clearSwapTimer()
      const delay = 11_000 + Math.random() * 6_000
      swapTimerId = window.setTimeout(() => {
        if (disposed) return
        const st = getRailwayState()
        if (
          st.running &&
          !st.exploded &&
          !st.reducedMotion &&
          !isDocumentHidden &&
          !swapAnim &&
          !userInteracting &&
          st.activeSection !== 'example'
        ) {
          const candidates = showcaseModels.filter((m) => m.id !== st.modelId)
          if (candidates.length > 0) {
            const pick = candidates[Math.floor(Math.random() * candidates.length)]
            void startPassingTransition(pick.id, false)
          }
        }
        scheduleRandomSwap()
      }, delay)
    }

    const mountInitialModel = async (id: ModelKey) => {
      const asset = await loadTrainAsset(id)
      if (disposed) return
      if (!asset) {
        patchRailwayState({ loadState: 'error' })
        return
      }
      finalizeSwapImmediate(asset)
      const st = getRailwayState()
      const pose = getSectionCameraPose(st.activeSection, id)
      camera.position.set(...pose.position)
      camTarget.set(...pose.target)
      if (controls) {
        controls.target.copy(camTarget)
        controls.update()
      }
      prefetchRemainingModels()
      requestRenderFn()
    }

    const dummy = new THREE.Object3D()

    const tick = (now: number) => {
      inTick = true
      rafId = null
      try {
        if (disposed || isDocumentHidden) return
        const st = getRailwayState()
        const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.05)
        lastTime = now
        let moving = false

        // Complete any mid-flight swap immediately if user switched to exploded mode
        if (st.exploded && swapAnim) {
          finalizeSwapImmediate(swapAnim.incoming)
        }

        const isCruising = st.running && !st.exploded && !st.reducedMotion
        if (isCruising) {
          const dist = CRUISE_SPEED_BPS * dt
          const baseAngle = dist / WHEEL_RADIUS

          if (swapAnim) {
            const anim = swapAnim
            anim.elapsed += dt

            // Outgoing train accelerates down the track along -X
            const tOut = Math.min(1, anim.elapsed / anim.departDur)
            const prevOutX = anim.outgoing.root.position.x
            const nextOutX = -anim.departMaxDist * tOut * tOut
            anim.outgoing.root.position.x = nextOutX
            const extraOut = Math.max(0, prevOutX - nextOutX)
            for (const w of anim.outgoing.wheels) {
              w.rotation.z += baseAngle + extraOut / WHEEL_RADIUS
            }

            // Incoming train glides in from behind (+X -> 0) and settles at cruise speed
            if (anim.elapsed >= anim.arriveStart) {
              if (getRailwayState().swapState !== 'arriving') {
                patchRailwayState({ swapState: 'arriving' })
              }
              const u = Math.min(
                1,
                (anim.elapsed - anim.arriveStart) / (anim.totalDur - anim.arriveStart),
              )
              const inv = 1 - u
              const prevInX = anim.incoming.root.position.x
              const nextInX = anim.startXIn * inv * inv * inv
              anim.incoming.root.position.x = nextInX
              const extraIn = Math.max(0, prevInX - nextInX)
              for (const w of anim.incoming.wheels) {
                w.rotation.z += baseAngle + extraIn / WHEEL_RADIUS
              }
            } else {
              for (const w of anim.incoming.wheels) {
                w.rotation.z += baseAngle
              }
            }

            if (anim.elapsed >= anim.totalDur) {
              const promoted = anim.incoming
              finalizeSwapImmediate(promoted)
              flyToPoseForCurrentContext(getRailwayState().activeSection, promoted.id)
            }
            moving = true
          } else if (activeAsset) {
            for (const w of activeAsset.wheels) {
              w.rotation.z += baseAngle
            }
          }

          railScroll = (railScroll + dist) % 1.0
          for (const im of corridorRailInstanced) {
            for (let i = 0; i < RAIL_SEGMENTS; i += 1) {
              dummy.position.set(i - RAIL_SEGMENTS / 2 + 0.5 + railScroll, 0, 0)
              dummy.updateMatrix()
              im.setMatrixAt(i, dummy.matrix)
            }
            im.instanceMatrix.needsUpdate = true
          }
          moving = true
        }

        // Smooth view offset & zoom interpolation between Hero, reading sections, and #example portal
        const frameStep = st.reducedMotion ? 1 : 1 - Math.exp(-10 * dt)
        const dxOff = targetOffX - curOffX
        const dyOff = targetOffY - curOffY
        const dZoom = targetZoom - curZoom
        if (Math.abs(dxOff) > 0.25 || Math.abs(dyOff) > 0.25 || Math.abs(dZoom) > 0.001) {
          curOffX += dxOff * frameStep
          curOffY += dyOff * frameStep
          curZoom += dZoom * frameStep
          applyProjection()
          moving = true
        } else if (curOffX !== targetOffX || curOffY !== targetOffY || curZoom !== targetZoom) {
          curOffX = targetOffX
          curOffY = targetOffY
          curZoom = targetZoom
          applyProjection()
        }

        // Smooth vertical exploded assembly
        if (activeAsset && !swapAnim) {
          const explodeFactor = st.exploded ? 1 : 0
          const expStep = st.reducedMotion ? 1 : 1 - Math.exp(-8 * dt)
          for (const [k, offset] of Object.entries(EXPLODED_Y)) {
            const grp = activeAsset.groups[k as Exclude<PartKey, 'all'>]
            if (!grp) continue
            const targetY = offset * explodeFactor
            const diff = targetY - grp.position.y
            if (Math.abs(diff) > 0.001) {
              grp.position.y += diff * expStep
              moving = true
            } else if (grp.position.y !== targetY) {
              grp.position.y = targetY
            }
          }
        }

        // Smooth per-section & preset camera flight
        if (desiredCamPos && desiredTarget) {
          const camStep = st.reducedMotion ? 1 : 1 - Math.exp(-6.5 * dt)
          camera.position.lerp(desiredCamPos, camStep)
          camTarget.lerp(desiredTarget, camStep)
          if (controls) controls.target.copy(camTarget)
          const done =
            camera.position.distanceTo(desiredCamPos) < 0.025 &&
            camTarget.distanceTo(desiredTarget) < 0.025
          if (done) {
            camera.position.copy(desiredCamPos)
            camTarget.copy(desiredTarget)
            desiredCamPos = null
            desiredTarget = null
          } else {
            moving = true
          }
        }

        let dampingMoved = false
        if (controls) {
          controls.autoRotate = st.autoRotate && !st.reducedMotion && desiredCamPos === null
          dampingMoved = controls.update()
          camTarget.copy(controls.target)
        } else {
          camera.lookAt(camTarget)
        }

        renderer.render(scene, camera)

        if (controls?.autoRotate || moving || dampingMoved || isCruising) {
          rafId = requestAnimationFrame(tick)
        }
      } finally {
        inTick = false
      }
    }

    const requestRender = () => {
      if (disposed || isDocumentHidden || inTick || rafId !== null) return
      lastTime = performance.now()
      rafId = requestAnimationFrame(tick)
    }
    requestRenderFn = requestRender

    const handleControlStart = () => {
      userInteracting = true
      desiredCamPos = null
      desiredTarget = null
      patchRailwayState({ viewId: null })
      requestRender()
    }

    const handleControlEnd = () => {
      userInteracting = false
    }

    const handleControlChange = () => {
      requestRender()
    }

    const onPortalPointerDown = (e: PointerEvent) => {
      portalDownX = e.clientX
      portalDownY = e.clientY
    }

    const onPortalPointerUp = (e: PointerEvent) => {
      if (e.button !== 0 || !activeAsset) return
      const dx = e.clientX - portalDownX
      const dy = e.clientY - portalDownY
      if (dx * dx + dy * dy > 25) return

      pointer.x = (e.clientX / vw) * 2 - 1
      pointer.y = -(e.clientY / vh) * 2 + 1
      raycaster.setFromCamera(pointer, camera)

      const hits = raycaster.intersectObjects(activeAsset.root.children, true)
      if (hits.length === 0) return

      let cur: THREE.Object3D | null = hits[0].object
      while (cur && cur.parent !== activeAsset.root) {
        if (
          cur.name === 'head' ||
          cur.name === 'cowcatcher' ||
          cur.name === 'body' ||
          cur.name === 'roof' ||
          cur.name === 'underbody'
        ) {
          patchRailwayState({
            partId: cur.name as Exclude<PartKey, 'all'>,
            viewId: null,
          })
          break
        }
        cur = cur.parent
      }
    }

    const detachPortal = () => {
      userInteracting = false
      if (attachedPortal) {
        attachedPortal.removeEventListener('pointerdown', onPortalPointerDown)
        attachedPortal.removeEventListener('pointerup', onPortalPointerUp)
        attachedPortal = null
      }
      if (controls) {
        controls.removeEventListener('start', handleControlStart)
        controls.removeEventListener('end', handleControlEnd)
        controls.removeEventListener('change', handleControlChange)
        controls.dispose()
        controls = null
      }
    }

    const attachPortal = (el: HTMLElement | null) => {
      if (el === attachedPortal) return
      detachPortal()
      if (!el) return

      attachedPortal = el
      const nextControls = new OrbitControls(camera, el)
      nextControls.enableZoom = false
      nextControls.enableDamping = true
      nextControls.dampingFactor = 0.08
      nextControls.maxPolarAngle = Math.PI * 0.492
      nextControls.minPolarAngle = 0.1
      nextControls.autoRotateSpeed = 0.75
      const activeSpec =
        showcaseModels.find((m) => m.id === getRailwayState().modelId) ?? showcaseModels[0]
      nextControls.minDistance = activeSpec.minDistance
      nextControls.maxDistance = activeSpec.maxDistance
      nextControls.target.copy(camTarget)
      nextControls.addEventListener('start', handleControlStart)
      nextControls.addEventListener('end', handleControlEnd)
      nextControls.addEventListener('change', handleControlChange)
      controls = nextControls

      el.addEventListener('pointerdown', onPortalPointerDown)
      el.addEventListener('pointerup', onPortalPointerUp)
      refreshTargetFraming()
      requestRender()
    }

    const unsubPortal = subscribePortalElement(attachPortal)

    // Load continuous corridor rails once (diesel line without overhead catenary)
    gltfLoader.load('/models/corridor.glb', (gltf) => {
      if (disposed) {
        disposeObjectTree(gltf.scene)
        return
      }
      toMatteMinecraftMaterials(gltf.scene)

      const railGroup = gltf.scene.getObjectByName('rail')
      const railInsts: THREE.InstancedMesh[] = []
      if (railGroup) {
        railGroup.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return
          const im = new THREE.InstancedMesh(child.geometry.clone(), child.material, RAIL_SEGMENTS)
          im.frustumCulled = false
          for (let i = 0; i < RAIL_SEGMENTS; i += 1) {
            dummy.position.set(i - RAIL_SEGMENTS / 2 + 0.5, 0, 0)
            dummy.rotation.set(0, 0, 0)
            dummy.scale.set(1, 1, 1)
            dummy.updateMatrix()
            im.setMatrixAt(i, dummy.matrix)
          }
          im.instanceMatrix.needsUpdate = true
          corridorRoot.add(im)
          railInsts.push(im)
        })
      }

      corridorRailInstanced = railInsts
      for (const cached of assetCache.values()) {
        if (cached.groups.track) {
          cached.groups.track.visible = railInsts.length === 0
        }
      }
      disposeObjectTree(gltf.scene)
      requestRender()
    })

    const unregDriver = registerRailwayDriver({
      flyToView(viewId) {
        const spec =
          showcaseModels.find((m) => m.id === getRailwayState().modelId) ?? showcaseModels[0]
        const pose = spec.viewPresets[viewId]
        if (!pose) return
        desiredCamPos = new THREE.Vector3(...pose.position)
        desiredTarget = new THREE.Vector3(...pose.target)
        requestRender()
      },
      flyToPart(partId) {
        const spec =
          showcaseModels.find((m) => m.id === getRailwayState().modelId) ?? showcaseModels[0]
        const pose = spec.partCameras[partId]
        if (!pose) return
        desiredCamPos = new THREE.Vector3(...pose.position)
        desiredTarget = new THREE.Vector3(...pose.target)
        requestRender()
      },
      flyToSection(sectionId) {
        if (userInteracting && sectionId === 'example') return
        const currentId = swapAnim ? swapAnim.incoming.id : getRailwayState().modelId
        flyToPoseForCurrentContext(sectionId, currentId)
        refreshTargetFraming()
        requestRender()
      },
      swapToModel(nextId, instant) {
        if (instant || !assetCache.has(nextId)) {
          void loadTrainAsset(nextId).then((asset) => {
            if (disposed || !asset) return
            finalizeSwapImmediate(asset)
            flyToPoseForCurrentContext(getRailwayState().activeSection, nextId)
            requestRender()
          })
        } else {
          void startPassingTransition(nextId, true)
        }
      },
      triggerPassingSwap() {
        const st = getRailwayState()
        const currentId = swapAnim ? swapAnim.incoming.id : st.modelId
        const candidates = showcaseModels.filter((m) => m.id !== currentId)
        if (candidates.length === 0) return
        const pick = candidates[Math.floor(Math.random() * candidates.length)]
        if (!st.running) {
          patchRailwayState({ running: true })
        }
        if (st.exploded) {
          patchRailwayState({ exploded: false })
        }
        void startPassingTransition(pick.id, true)
      },
      stepZoom(factor) {
        const spec =
          showcaseModels.find((m) => m.id === getRailwayState().modelId) ?? showcaseModels[0]
        const baseTarget = desiredTarget ?? camTarget
        const offset = camera.position.clone().sub(baseTarget)
        const nextLen = THREE.MathUtils.clamp(
          offset.length() * factor,
          spec.minDistance,
          spec.maxDistance,
        )
        offset.setLength(nextLen)
        desiredCamPos = null
        camera.position.copy(baseTarget).add(offset)
        if (controls) controls.update()
        requestRender()
      },
      resetCamera() {
        const currentId = getRailwayState().modelId
        const spec = showcaseModels.find((m) => m.id === currentId) ?? showcaseModels[0]
        desiredCamPos = new THREE.Vector3(...spec.defaultCamera)
        desiredTarget = new THREE.Vector3(...spec.defaultTarget)
        requestRender()
      },
    })

    const unsubState = subscribeRailwayState(() => {
      requestRender()
    })

    const onScrollOrResize = () => {
      applySize()
      refreshTargetFraming()
      requestRender()
    }

    const onScrollOnly = () => {
      refreshTargetFraming()
      applyProjection()
      requestRender()
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleMotion = () => {
      const reduced = motionQuery.matches
      patchRailwayState({
        reducedMotion: reduced,
        ...(reduced ? { running: false, autoRotate: false } : {}),
      })
    }

    const handleScheme = () => {
      const nextPal = getThemePalette()
      scene.background = new THREE.Color(nextPal.bg)
      fog.color.setHex(nextPal.bg)
      ballastMat.color.setHex(nextPal.ballast)
      earthMat.color.setHex(nextPal.earth)
      requestRender()
    }

    const handleVisibility = () => {
      isDocumentHidden = document.hidden
      if (isDocumentHidden) stopLoop()
      else requestRender()
    }

    applySize()
    void mountInitialModel(initial.modelId)
    scheduleRandomSwap()

    window.addEventListener('resize', onScrollOrResize, { passive: true })
    window.addEventListener('scroll', onScrollOnly, { passive: true })
    motionQuery.addEventListener('change', handleMotion)
    schemeQuery.addEventListener('change', handleScheme)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      disposed = true
      clearSwapTimer()
      stopLoop()
      unsubState()
      unregDriver()
      unsubPortal()
      detachPortal()
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('scroll', onScrollOnly)
      motionQuery.removeEventListener('change', handleMotion)
      schemeQuery.removeEventListener('change', handleScheme)
      document.removeEventListener('visibilitychange', handleVisibility)
      for (const asset of assetCache.values()) {
        disposeObjectTree(asset.root)
      }
      assetCache.clear()
      disposeObjectTree(corridorRoot)
      disposeObjectTree(envGroup)
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return <div className="backdrop-stage" ref={hostRef} aria-hidden="true" />
}

export default TrainBackdrop
