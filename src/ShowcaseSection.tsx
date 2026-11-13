import { useCallback } from 'react'
import { sectionCameraList, showcaseModels, showcaseParts, viewPresetLabels } from './data'
import {
  resetStageView,
  selectModel,
  selectPart,
  selectView,
  setPortalElement,
  toggleAutoRotate,
  toggleExploded,
  toggleRunning,
  triggerPassingSwap,
  useRailwayState,
  zoomStage,
} from './railwayStore'

export function ShowcaseSection() {
  const {
    modelId,
    partId,
    viewId,
    activeSection,
    swapState,
    exploded,
    running,
    autoRotate,
    loadState,
    partStats,
    webglUnsupported,
    reducedMotion,
  } = useRailwayState()

  const activeModel = showcaseModels.find((m) => m.id === modelId) ?? showcaseModels[0]
  const activePart = showcaseParts.find((p) => p.id === partId) ?? showcaseParts[0]
  const activeSectionMeta =
    sectionCameraList.find((s) => s.id === activeSection) ?? sectionCameraList[0]

  const setPortalRef = useCallback((el: HTMLDivElement | null) => {
    setPortalElement(el)
  }, [])

  const modeBadgeText =
    swapState === 'departing'
      ? `${activeSectionMeta.label} · 前车加速驶离中`
      : swapState === 'arriving'
        ? `${activeSectionMeta.label} · 新车进场巡航`
        : exploded
          ? `${activeSectionMeta.label} · 分层拆解视图`
          : running && !reducedMotion
            ? `${activeSectionMeta.label} · 轮对转动与路轨推进`
            : `${activeSectionMeta.label} · 静止检修视图`

  return (
    <section className="section showcase-section" id="example" aria-labelledby="example-title">
      <div className="container showcase-deck">
        <div className="showcase-sheet">
          <div className="showcase-header">
            <h2 id="example-title">DF11 / DF11G 三维拼装检视</h2>
            <p>
              页面背景中驶过的列车即可在此处直接接管交互：切换机型与机位、拖动旋转观察细节，或展开六层车体查看实际拼装位置。
            </p>
          </div>

          <div className="showcase-toolbar">
            <div className="showcase-group" role="group" aria-label="选择展示机型">
              {showcaseModels.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  className="chip"
                  aria-pressed={model.id === modelId}
                  onClick={() => selectModel(model.id)}
                >
                  {model.label}
                </button>
              ))}
            </div>

            <div className="showcase-actions" role="group" aria-label="镜头视角预设">
              {viewPresetLabels.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="chip"
                  aria-pressed={viewId === preset.id}
                  onClick={() => selectView(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="showcase-stage-wrap">
          <div
            className="showcase-portal"
            ref={setPortalRef}
            role="region"
            aria-label="DF11 与 DF11G 三维交互视口"
          >
            {webglUnsupported ? (
              <div className="showcase-fallback" role="status">
                <p>当前浏览器环境未开启 WebGL，无法显示实时三维机车背景与检视窗口。</p>
                <p className="muted">请在启用硬件加速后刷新页面，或参考下方部件图鉴了解各层拼装结构。</p>
              </div>
            ) : null}
          </div>

          <div className="hud-top">
            <div className="hud-badge">
              <strong>{activeModel.label}</strong>
              <span>{modeBadgeText}</span>
            </div>
          </div>

          <div className="hud-bottom">
            <p className="hud-hint">左键拖动旋转 · 右键平移 · 点击车体选择部件</p>
            <div className="hud-controls" role="group" aria-label="运转、景别与拆解控制">
              <button
                type="button"
                className="chip chip-solid"
                onClick={toggleRunning}
                disabled={reducedMotion && !running}
              >
                {running ? '暂停运行' : '继续运行'}
              </button>
              <button
                type="button"
                className="chip chip-solid"
                onClick={triggerPassingSwap}
                disabled={reducedMotion || swapState !== 'idle'}
              >
                {swapState === 'idle' ? '随机换车' : '换车中'}
              </button>
              <button
                type="button"
                className="chip chip-solid"
                aria-pressed={exploded}
                onClick={toggleExploded}
              >
                {exploded ? '收合组装' : '分层拆解'}
              </button>
              <button
                type="button"
                className="chip chip-solid"
                onClick={toggleAutoRotate}
                disabled={reducedMotion && !autoRotate}
              >
                {autoRotate ? '暂停环绕' : '开启环绕'}
              </button>
              <button
                type="button"
                className="chip chip-solid"
                aria-label="拉近镜头"
                onClick={() => zoomStage(0.84)}
              >
                拉近
              </button>
              <button
                type="button"
                className="chip chip-solid"
                aria-label="拉远镜头"
                onClick={() => zoomStage(1.19)}
              >
                拉远
              </button>
              <button type="button" className="chip chip-solid" onClick={resetStageView}>
                重置视角
              </button>
            </div>
          </div>
        </div>

        <div className="showcase-sheet showcase-details">
          {loadState === 'loading' && !webglUnsupported ? (
            <p className="showcase-status" role="status">
              正在载入 {activeModel.label} 三维部件模型...
            </p>
          ) : null}

          {loadState === 'error' && !webglUnsupported ? (
            <p className="showcase-status" role="status">
              模型资源加载失败，请检查网络连接或稍后刷新页面重试。
            </p>
          ) : null}

          <div className="showcase-parts" role="group" aria-label="机车部件层级视角">
            {showcaseParts.map((part) => (
              <button
                key={part.id}
                type="button"
                className="chip"
                aria-pressed={part.id === partId}
                onClick={() => selectPart(part.id)}
              >
                {part.label}
              </button>
            ))}
          </div>

          <div className="showcase-readout" aria-live="polite">
            <div className="readout-head">
              <strong>
                {activeModel.label} · {activePart.label}
              </strong>
              {partStats ? <span className="readout-meta">{partStats}</span> : null}
            </div>
            <p>{activeModel.subtitle}</p>
            <p>
              <strong>部件说明：</strong>
              {activePart.description}
            </p>
            <p className="readout-tip">
              <strong>模组玩法：</strong>
              {activePart.craftNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
