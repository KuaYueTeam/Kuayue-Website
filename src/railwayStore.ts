import { useSyncExternalStore } from 'react'
import { type ModelKey, type PageSectionKey, type PartKey, type ViewPresetKey } from './data'

export type SwapState = 'idle' | 'departing' | 'arriving'

export interface RailwayState {
  modelId: ModelKey
  partId: PartKey
  viewId: ViewPresetKey | null
  activeSection: PageSectionKey
  swapState: SwapState
  exploded: boolean
  running: boolean
  autoRotate: boolean
  loadState: 'loading' | 'ready' | 'error'
  partStats: string
  webglUnsupported: boolean
  reducedMotion: boolean
}

export interface RailwayActions {
  flyToView: (viewId: ViewPresetKey) => void
  flyToPart: (partId: PartKey) => void
  flyToSection: (sectionId: PageSectionKey) => void
  swapToModel: (modelId: ModelKey, instant?: boolean) => void
  triggerPassingSwap: () => void
  resetCamera: () => void
  stepZoom: (factor: number) => void
}

function detectReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function detectWebgl(): boolean {
  if (typeof document === 'undefined') return true
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const initialReduced = detectReducedMotion()
const initialWebglUnsupported = !detectWebgl()

let state: RailwayState = {
  modelId: 'df11',
  partId: 'all',
  viewId: 'overview',
  activeSection: 'top',
  swapState: 'idle',
  exploded: false,
  running: !initialReduced,
  autoRotate: false,
  loadState: initialWebglUnsupported ? 'error' : 'loading',
  partStats: '',
  webglUnsupported: initialWebglUnsupported,
  reducedMotion: initialReduced,
}

const listeners = new Set<() => void>()

let portalEl: HTMLElement | null = null
let heroEl: HTMLElement | null = null
const portalListeners = new Set<(el: HTMLElement | null) => void>()

let driver: Partial<RailwayActions> = {}

export function getRailwayState(): RailwayState {
  return state
}

export function subscribeRailwayState(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function patchRailwayState(partial: Partial<RailwayState>): void {
  state = { ...state, ...partial }
  for (const listener of listeners) {
    listener()
  }
}

export function useRailwayState(): RailwayState {
  return useSyncExternalStore(subscribeRailwayState, getRailwayState, getRailwayState)
}

export function registerRailwayDriver(next: Partial<RailwayActions>): () => void {
  driver = next
  return () => {
    if (driver === next) {
      driver = {}
    }
  }
}

export function setPortalElement(el: HTMLElement | null): void {
  portalEl = el
  for (const cb of portalListeners) cb(el)
}

export function getPortalElement(): HTMLElement | null {
  return portalEl
}

export function subscribePortalElement(cb: (el: HTMLElement | null) => void): () => void {
  portalListeners.add(cb)
  cb(portalEl)
  return () => portalListeners.delete(cb)
}

export function setHeroElement(el: HTMLElement | null): void {
  heroEl = el
}

export function getHeroElement(): HTMLElement | null {
  return heroEl
}

export function setActiveSection(sectionId: PageSectionKey): void {
  if (state.activeSection === sectionId) return
  patchRailwayState({ activeSection: sectionId })
  driver.flyToSection?.(sectionId)
}

export function selectModel(modelId: ModelKey): void {
  if (modelId === state.modelId && state.swapState === 'idle') return
  patchRailwayState({
    partId: 'all',
    viewId: 'overview',
    exploded: false,
  })
  if (driver.swapToModel) {
    driver.swapToModel(modelId, state.exploded || state.reducedMotion || !state.running)
  } else {
    patchRailwayState({
      modelId,
      loadState: state.webglUnsupported ? 'error' : 'loading',
    })
  }
}

export function triggerPassingSwap(): void {
  driver.triggerPassingSwap?.()
}

export function selectView(viewId: ViewPresetKey): void {
  patchRailwayState({ viewId, partId: 'all' })
  driver.flyToView?.(viewId)
}

export function selectPart(partId: PartKey): void {
  patchRailwayState({ partId, viewId: partId === 'all' ? 'overview' : null })
  driver.flyToPart?.(partId)
}

export function toggleRunning(): void {
  patchRailwayState({ running: !state.running })
}

export function toggleExploded(): void {
  patchRailwayState({ exploded: !state.exploded })
}

export function toggleAutoRotate(): void {
  patchRailwayState({ autoRotate: !state.autoRotate })
}

export function zoomStage(factor: number): void {
  driver.stepZoom?.(factor)
}

export function resetStageView(): void {
  patchRailwayState({ partId: 'all', viewId: 'overview', exploded: false })
  driver.resetCamera?.()
}
