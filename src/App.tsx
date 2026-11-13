import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  bogeys,
  facts,
  gameplayFeatures,
  KASUGA_URL,
  playerSteps,
  REPO_URL,
  rollingStock,
  tracks,
  type PageSectionKey,
  type StockCategory,
} from './data'
import {
  setActiveSection,
  setHeroElement,
} from './railwayStore'
import { ShowcaseSection } from './ShowcaseSection'

const TrainBackdrop = lazy(() => import('./TrainBackdrop'))

type Filter = '全部' | StockCategory

const filters: Filter[] = [
  '全部',
  '机车',
  '客车',
  '货车',
  '转向架与轨道',
  '供电与联锁',
  '站车设施与餐饮',
]

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand">
          KuaYue 跨越
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a href="#features">核心玩法</a>
          <a href="#example">3D 检视</a>
          <a href="#stock">车辆图鉴</a>
          <a href="#getting-started">游玩准备</a>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const setHeroRef = useCallback((el: HTMLElement | null) => {
    setHeroElement(el)
  }, [])

  return (
    <section className="hero" id="top" ref={setHeroRef} aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-stage-spacer" aria-hidden="true" />

        <div className="hero-card">
          <h1 id="hero-title">
            跨越中国铁路的
            <br />
            每段里程
          </h1>
          <p className="hero-lead">
            KuaYue 跨越是一款基于 Minecraft 1.21.1、NeoForge 与 Create 机械动力的中国铁路模组。
            从流线车头、可开合门窗到转向架、接触网与车站联锁，每一列火车都在铁轨上逐块亲手拼装成型。
          </p>
          <div className="hero-actions">
            <a href="#example" className="btn btn-primary">
              接管 3D 机车检视
            </a>
            <a href="#stock" className="btn btn-secondary">
              浏览车辆图鉴
            </a>
          </div>
          <dl className="hero-facts">
            {facts.map((item) => (
              <div key={item.term} className="fact">
                <dt>{item.term}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="section reveal" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-sheet section-grid">
          <div className="section-head">
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="section-body">{children}</div>
        </div>
      </div>
    </section>
  )
}

function StockTable() {
  const [filter, setFilter] = useState<Filter>('全部')

  const counts = useMemo(
    () => ({
      全部: rollingStock.length,
      机车: rollingStock.filter((r) => r.category === '机车').length,
      客车: rollingStock.filter((r) => r.category === '客车').length,
      货车: rollingStock.filter((r) => r.category === '货车').length,
      转向架与轨道: rollingStock.filter((r) => r.category === '转向架与轨道').length,
      供电与联锁: rollingStock.filter((r) => r.category === '供电与联锁').length,
      站车设施与餐饮: rollingStock.filter((r) => r.category === '站车设施与餐饮').length,
    }),
    [],
  )

  const rows = useMemo(
    () => (filter === '全部' ? rollingStock : rollingStock.filter((r) => r.category === filter)),
    [filter],
  )

  return (
    <div className="table-wrap">
      <div className="filters" role="group" aria-label="按图鉴分类筛选">
        {filters.map((item) => {
          const active = filter === item
          return (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={active}
              onClick={() => setFilter(item)}
            >
              {item} ({counts[item]})
            </button>
          )
        })}
      </div>

      <div className="table-container">
        <table>
          <caption>KuaYue 模组机车车辆、供电接触网与站车设施全系图鉴</caption>
          <thead>
            <tr>
              <th scope="col">型号</th>
              <th scope="col">名称</th>
              <th scope="col">分类</th>
              <th scope="col">说明</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.code}>
                <th scope="row" className="mono">
                  {row.code}
                </th>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.kind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function App() {
  const progressRef = useRef<HTMLDivElement>(null)
  const scrimOuterRef = useRef<HTMLDivElement>(null)
  const scrimInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionIds: PageSectionKey[] = ['top', 'features', 'example', 'stock', 'getting-started']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const visibleRatios = new Map<PageSectionKey, number>()

    const pickActiveSection = () => {
      let bestId: PageSectionKey | null = null
      let bestScore = -1
      for (const id of sectionIds) {
        const score = visibleRatios.get(id) ?? -1
        if (score > bestScore) {
          bestScore = score
          bestId = id
        }
      }
      if (bestId) {
        setActiveSection(bestId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as PageSectionKey
          if (entry.isIntersecting) {
            visibleRatios.set(id, entry.intersectionRect.height)
          } else {
            visibleRatios.delete(id)
          }
        }
        pickActiveSection()
      },
      {
        rootMargin: '-25% 0px -35% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const el of sections) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()')
    const supportsScrollytelling = CSS.supports(
      '(animation-timeline: scroll()) and (animation-range: 0% 100%)',
    )
    const supportsViewTimeline = CSS.supports('(animation-timeline: view()) and (animation-range: entry)')

    let scrollRaf: number | null = null
    const bar = progressRef.current
    const scrimOuter = scrimOuterRef.current
    const scrimInner = scrimInnerRef.current

    const needsProgressFallback = !motionReduced && !supportsScrollTimeline && Boolean(bar)
    const needsScrimJs = motionReduced || !supportsScrollytelling

    if (needsScrimJs && scrimOuter && scrimInner) {
      scrimOuter.dataset.fallback = 'true'
      scrimInner.dataset.fallback = 'true'
    }
    if (needsProgressFallback && bar) {
      bar.dataset.fallback = 'true'
    }

    const updateScrollEffects = () => {
      scrollRaf = null
      if (needsProgressFallback && bar) {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        bar.style.transform = `scaleX(${ratio})`
      }

      if (needsScrimJs && scrimOuter && scrimInner) {
        const vh = window.innerHeight || 720
        const hero = document.getElementById('top')
        const portal = document.querySelector<HTMLElement>('.showcase-portal')

        let outerOpacity = 1
        if (hero) {
          const hr = hero.getBoundingClientRect()
          if (motionReduced) {
            outerOpacity = hr.bottom > vh * 0.45 ? 0 : 1
          } else {
            const t = Math.min(1, Math.max(0, (vh * 0.65 - hr.bottom) / (vh * 0.45)))
            outerOpacity = t
          }
        }

        let innerOpacity = 0.68
        if (portal) {
          const pr = portal.getBoundingClientRect()
          if (motionReduced) {
            const centered = pr.top < vh * 0.72 && pr.bottom > vh * 0.25
            innerOpacity = centered ? 0 : 0.68
          } else {
            const enterDist = vh - pr.top
            const exitDist = pr.bottom
            const visibleSpan = Math.min(enterDist, exitDist)
            const clearRatio = Math.min(1, Math.max(0, visibleSpan / (vh * 0.35)))
            innerOpacity = 0.68 * (1 - clearRatio)
          }
        }

        scrimOuter.style.opacity = String(outerOpacity)
        scrimInner.style.opacity = String(innerOpacity)
      }
    }

    const onScroll = () => {
      if (scrollRaf === null) {
        scrollRaf = requestAnimationFrame(updateScrollEffects)
      }
    }

    if (needsProgressFallback || needsScrimJs) {
      updateScrollEffects()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    let revealObserver: IntersectionObserver | null = null

    if (!motionReduced && !supportsViewTimeline && revealEls.length > 0) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              revealObserver?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.06, rootMargin: '0px 0px -4% 0px' },
      )
      for (const el of revealEls) {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.96) {
          el.classList.add('is-visible')
        } else {
          el.classList.add('reveal-fallback')
          revealObserver.observe(el)
        }
      }
    }

    if (!CSS.supports('animation-delay: calc(sibling-index() * 0.1s)')) {
      for (const list of document.querySelectorAll<HTMLElement>('.stagger-group')) {
        Array.from(list.children).forEach((child, idx) => {
          if (child instanceof HTMLElement) {
            child.style.setProperty('--sibling-index', String(idx + 1))
          }
        })
      }
    }

    return () => {
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      revealObserver?.disconnect()
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <Suspense fallback={null}>
        <TrainBackdrop />
      </Suspense>
      <div className="backdrop-scrim" ref={scrimOuterRef} aria-hidden="true">
        <div className="backdrop-scrim-inner" ref={scrimInnerRef} />
      </div>

      <div className="site-shell">
        <a href="#main-content" className="skip-link">
          跳至主要内容
        </a>
        <Header />

        <main id="main-content">
          <Hero />

          <Section
            id="features"
            title="核心玩法"
            description="围绕真实中国铁路的搭建与运转体验设计，兼顾车辆细化拼装、线路供电与联锁调度。"
          >
            <div className="cards stagger-group">
              {gameplayFeatures.map((feat, idx) => (
                <article key={feat.title} className="card stagger-item">
                  <header className="card-head">
                    <h3>{feat.title}</h3>
                    <span className="card-index mono" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </header>
                  <p>{feat.summary}</p>
                  <p className="card-detail">{feat.detail}</p>
                </article>
              ))}
            </div>
          </Section>

          <ShowcaseSection />

          <Section
            id="stock"
            title="模组全系图鉴与工程谱系"
            description="收录机车、客货车辆、转向架、轨道、高压接触网、信号联锁以及驾驶台、蓝图桌与列车餐饮等全系内容。"
          >
            <StockTable />

            <div className="subspecs">
              <div className="spec-block">
                <h3>转向架型号（{bogeys.length}）</h3>
                <ul className="plain-list">
                  {bogeys.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="spec-block">
                <h3>轨道规制（{tracks.length}）</h3>
                <ul className="plain-list">
                  {tracks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section
            id="getting-started"
            title="游玩准备与流程"
            description="无论在创造模式自由编组试跑，还是在生存模式一步步解锁图纸造车，都可以按这四步展开铁路生涯。"
          >
            <ol className="steps stagger-group">
              {playerSteps.map((item) => (
                <li key={item.step} className="step stagger-item">
                  <span className="step-num mono">{item.step}</span>
                  <div className="step-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="section-sheet footer-inner">
              <p>KuaYue 跨越模组 · 适用 Minecraft 1.21.1 / NeoForge / Create</p>
              <p>
                <a href={REPO_URL} target="_blank" rel="noreferrer">
                  KuaYue GitHub
                </a>
                {' · '}
                <a href={KASUGA_URL} target="_blank" rel="noreferrer">
                  KasugaLibNext
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
export default App
