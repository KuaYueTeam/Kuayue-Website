import { useEffect, useId, useRef, useState } from 'react'
import { galleryScenes, type SceneGalleryItem } from './data'

function ScenePicture({
  scene,
  sizes,
  lazy,
  className,
}: {
  scene: SceneGalleryItem
  sizes: string
  lazy: boolean
  className?: string
}) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={scene.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={scene.webpSrcSet} sizes={sizes} />
      <img
        src={scene.fallbackSrc}
        alt={scene.alt}
        width={scene.width}
        height={scene.height}
        loading={lazy ? 'lazy' : undefined}
        decoding="async"
      />
    </picture>
  )
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const layerTwoRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLSpanElement>(null)
  const stepOneRef = useRef<HTMLElement>(null)
  const stepTwoRef = useRef<HTMLElement>(null)
  const stepsWrapRef = useRef<HTMLDivElement>(null)
  const dialogTitleId = useId()
  const activeScene = activeIndex !== null ? galleryScenes[activeIndex] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal()
    } else if (activeIndex === null && dialog.open) {
      dialog.close()
    }
  }, [activeIndex])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onClose = () => {
      setActiveIndex(null)
    }
    dialog.addEventListener('close', onClose)

    // Light-dismiss fallback for browsers without native <dialog closedby="any">
    let removeLightDismiss: (() => void) | undefined
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const onBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return
        const rect = dialog.getBoundingClientRect()
        const inside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        if (!inside) {
          dialog.close()
        }
      }
      dialog.addEventListener('click', onBackdropClick)
      removeLightDismiss = () => dialog.removeEventListener('click', onBackdropClick)
    }

    return () => {
      dialog.removeEventListener('close', onClose)
      removeLightDismiss?.()
    }
  }, [])

  // JS scroll fallback only when CSS scroll-driven animation timelines aren't supported
  useEffect(() => {
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsScrollDriven = CSS.supports(
      '(animation-timeline: scroll()) and (animation-range: 0% 100%)',
    )
    if (motionReduced || supportsScrollDriven) return

    const layerTwo = layerTwoRef.current
    const railFill = railFillRef.current
    const stepTwo = stepTwoRef.current
    const stepsWrap = stepsWrapRef.current
    if (!layerTwo || !railFill || !stepTwo || !stepsWrap) return

    let rafId: number | null = null
    const updateFallback = () => {
      rafId = null
      const vh = window.innerHeight || 720
      const r2 = stepTwo.getBoundingClientRect()
      const enterProgress = (vh - r2.top) / vh
      const opacity = Math.min(1, Math.max(0, (enterProgress - 0.28) / (0.58 - 0.28)))
      layerTwo.style.opacity = String(opacity)

      const rw = stepsWrap.getBoundingClientRect()
      const totalTravel = Math.max(1, rw.height - vh)
      const storyProgress = Math.min(1, Math.max(0, -rw.top / totalTravel))
      railFill.style.transform = `scaleX(${storyProgress})`
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateFallback)
      }
    }

    const observer = new IntersectionObserver(onScroll, {
      threshold: Array.from({ length: 21 }, (_, i) => i / 20),
    })
    observer.observe(stepTwo)
    observer.observe(stepsWrap)
    updateFallback()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const stepScene = (delta: number) => {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + delta + galleryScenes.length) % galleryScenes.length)
  }

  return (
    <section id="gallery" className="scene-story" aria-labelledby="gallery-title">
      <div className="scene-story-grid">
        <div className="scene-story-stage" aria-hidden="true">
          <div className="scene-story-layer scene-story-layer-1">
            <ScenePicture
              scene={galleryScenes[0]}
              sizes="100vw"
              lazy
              className="scene-story-pic scene-story-pic-1"
            />
          </div>
          <div className="scene-story-layer scene-story-layer-2" ref={layerTwoRef}>
            <ScenePicture
              scene={galleryScenes[1]}
              sizes="100vw"
              lazy
              className="scene-story-pic scene-story-pic-2"
            />
          </div>

          <div className="scene-story-hud">
            <div className="container scene-story-hud-inner">
              <div className="scene-story-rail">
                <span className="scene-story-rail-fill" ref={railFillRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="scene-story-steps" ref={stepsWrapRef}>
          <header className="scene-story-intro">
            <div className="container">
              <div className="scene-intro-bar">
                <h2 id="gallery-title">实景运转风貌</h2>
                <p>Minecraft 实机光影下的街区道口、电气化明洞与干线机车运转实录</p>
              </div>
            </div>
          </header>

          {galleryScenes.map((scene, idx) => {
            const isSecond = idx === 1
            return (
              <article
                key={scene.id}
                ref={isSecond ? stepTwoRef : stepOneRef}
                className={`scene-step ${isSecond ? 'scene-step-2' : 'scene-step-1'}`}
              >
                <div className="scene-step-reduced-media">
                  <ScenePicture
                    scene={scene}
                    sizes="100vw"
                    lazy
                    className={isSecond ? 'scene-story-pic scene-story-pic-2' : 'scene-story-pic scene-story-pic-1'}
                  />
                </div>
                <div className="container scene-step-container">
                  <div className={`scene-note ${isSecond ? 'scene-note-end' : 'scene-note-start'}`}>
                    <div className="scene-note-head">
                      <span className="card-index mono">{scene.tag}</span>
                      <button
                        type="button"
                        className="scene-expand-link"
                        aria-label={`查看 16:9 完整原图：${scene.title}`}
                        onClick={() => setActiveIndex(idx)}
                      >
                        查看 16:9 原图
                      </button>
                    </div>
                    <h3>{scene.title}</h3>
                    <p>{scene.description}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as Record<string, string>)}
      >
        {activeScene && (
          <div className="gallery-dialog-surface">
            <div className="gallery-dialog-bar">
              <div className="gallery-dialog-title">
                <span className="card-index mono">{activeScene.tag}</span>
                <h2 id={dialogTitleId}>{activeScene.title}</h2>
              </div>
              <form method="dialog">
                <button type="submit" className="chip">
                  关闭
                </button>
              </form>
            </div>

            <div className="gallery-dialog-media">
              <ScenePicture scene={activeScene} sizes="min(92vw, 60rem)" lazy={false} />
            </div>

            <div className="gallery-dialog-footer">
              <p>{activeScene.description}</p>
              <div className="gallery-dialog-nav" role="group" aria-label="切换实景画面">
                <button type="button" className="chip" onClick={() => stepScene(-1)}>
                  上一张
                </button>
                <button type="button" className="chip" onClick={() => stepScene(1)}>
                  下一张
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
