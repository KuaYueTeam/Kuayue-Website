export const REPO_URL = 'https://github.com/KuaYueTeam/KuaYue'
export const KASUGA_URL = 'https://github.com/KasugaLibGroup/KasugaLibNext'

export const facts = [
  { term: '游戏版本', value: 'Minecraft 1.21.1' },
  { term: '模组加载器', value: 'NeoForge 21.1' },
  { term: '核心前置', value: 'Create 6.0 · KasugaLibNext' },
  { term: '当前版本', value: 'KuaYue 2.0.0' },
]

export type StockCategory = '机车' | '客车' | '货车'

export interface RollingStock {
  code: string
  name: string
  category: StockCategory
  kind: string
}

export const rollingStock: RollingStock[] = [
  { code: 'DF5', name: '东风5型', category: '机车', kind: '内燃机车' },
  { code: 'DF11', name: '东风11型', category: '机车', kind: '内燃机车' },
  { code: 'DF11G', name: '东风11G型', category: '机车', kind: '内燃机车' },
  { code: 'DF21', name: '东风21型', category: '机车', kind: '内燃机车（米轨）' },
  { code: 'SS3', name: '韶山3型', category: '机车', kind: '电力机车' },
  { code: 'SS8', name: '韶山8型', category: '机车', kind: '电力机车' },
  { code: 'HXD3D', name: '和谐电3D型', category: '机车', kind: '电力机车' },
  { code: 'CR200J', name: '复兴号 CR200J', category: '机车', kind: '动力集中动车组' },
  { code: 'JY290', name: '金鹰 JY290', category: '机车', kind: '轨道车' },
  { code: '22', name: '22型客车', category: '客车', kind: '客车车体' },
  { code: '25B', name: '25B型客车', category: '客车', kind: '客车车体' },
  { code: '25G', name: '25G型客车', category: '客车', kind: '客车车体' },
  { code: '25K', name: '25K型客车', category: '客车', kind: '客车车体' },
  { code: '25T', name: '25T型客车', category: '客车', kind: '客车车体' },
  { code: '25Z', name: '25Z型客车', category: '客车', kind: '客车车体' },
  { code: 'M1', name: 'M1型客车', category: '客车', kind: '客车车体' },
  { code: 'JY30', name: 'JY30宿营车', category: '客车', kind: '宿营车' },
  { code: 'C70', name: 'C70型敞车', category: '货车', kind: '敞车' },
  { code: 'NX70', name: 'NX70型平车', category: '货车', kind: '平车' },
]

export const bogeys = [
  'CW2',
  'MKZ',
  'PK209P',
  'SW160',
  'SW220K',
  'TKZ1',
  'TKZ2',
  'ZK6',
  '前进型',
  '东方红21',
  '金鹰290',
]

export const tracks = ['标准轨距铁轨', '标准轨距护轮轨', '米轨', '无砟轨道', '无枕轨道']

export interface GameplayFeature {
  title: string
  summary: string
  detail: string
}

export const gameplayFeatures: GameplayFeature[] = [
  {
    title: '分体方块现场拼装',
    summary: '每一台机车与客车都不是整块召唤，而是由车头、排障器、地板、厢板、门窗与车顶方块亲手搭建。',
    detail: '支持对开塞拉门、可开合车窗、侧百叶、冷却风扇与烟囱，搭配折棚风挡与车钩连接成完整编组。',
  },
  {
    title: '蓝图研发与耐候钢体系',
    summary: '在生存模式中建造蓝图桌、制备耐候钢与高分子材料，逐步解锁机车、客车总体设计与电路组件。',
    detail: '耐候钢方块还拥有从金属本色到斑驳锈蚀的外观变化，适合搭建车站雨棚、跨线桥与站场构筑物。',
  },
  {
    title: '自定义涂装、水牌与贴纸',
    summary: '使用刷子、带颜色的刷子或申必刷子调节车身涂装，保存常用配色方案并在车厢侧板挂牌标记。',
    detail: '右键下厢板即可放置运行区段水牌并实时编辑文字，配合车厢号、速度等级与车种贴纸还原真车铭牌。',
  },
  {
    title: '接触网架设与受电弓联动',
    summary: '沿线路竖立等距圆钢、H 型钢或格构钢支柱，加挂硬横跨、绝缘子、接触网线与路端配重。',
    detail: '电力机车顶部配备可手动切换升降闭合的单臂受电弓，搭配双驾驶座与内燃通用驾驶台操控运行。',
  },
  {
    title: '车站控制器与信号联锁',
    summary: '通过车站控制器查看虚拟轨道图，配置进站、出站与简易信号机，并使用轨道绝缘节划分闭塞区间。',
    detail: '支持车站调度与值班联动记录运行日志；多列车合并或车钩解挂时，时刻表可随编组独立拆分或保留。',
  },
  {
    title: '车厢内饰与铁路餐饮',
    summary: '在客车内部布置多色硬座、软席、行李架、卫生间与照明灯具，并放置茶炉为乘客提供热水。',
    detail: '手持干脆面右键茶炉即可冲泡热腾腾的方便面；此外还有可返还餐盒的火车盒饭、卤蛋、火腿肠与可乐。',
  },
]

export type ModelKey = 'df11' | 'df11g-head' | 'df11g'
export type PartKey = 'all' | 'head' | 'cowcatcher' | 'body' | 'roof' | 'underbody' | 'track'
export type ViewPresetKey = 'overview' | 'trackside' | 'cab' | 'bogey'
export type PageSectionKey = 'top' | 'features' | 'example' | 'stock' | 'getting-started'

export interface SectionCameraMeta {
  id: PageSectionKey
  label: string
}

export const sectionCameraList: SectionCameraMeta[] = [
  { id: 'top', label: '全景巡航' },
  { id: 'features', label: '路基近景' },
  { id: 'example', label: '交互检视' },
  { id: 'stock', label: '侧视谱系' },
  { id: 'getting-started', label: '前瞻调度' },
]

export const modelScaleById: Record<ModelKey, number> = {
  df11: 1.0,
  'df11g-head': 0.72,
  df11g: 1.48,
}

export function getSectionCameraPose(section: PageSectionKey, modelId: ModelKey): CameraPose {
  const s = modelScaleById[modelId]
  switch (section) {
    case 'features':
      return {
        position: [-13.6 * s, 2.1, 6.2 * s],
        target: [-2.0 * s, 2.35, 0],
      }
    case 'stock':
      return {
        position: [2.5 * s, 5.0 * Math.max(0.9, s * 0.85), 19.0 * s],
        target: [0, 1.9, 0],
      }
    case 'getting-started':
      return {
        position: [13.5 * s, 6.2 * Math.max(0.88, s * 0.85), -10.5 * s],
        target: [-5.5 * s, 2.2, 0],
      }
    default: {
      const spec = showcaseModels.find((m) => m.id === modelId) ?? showcaseModels[0]
      return {
        position: [...spec.defaultCamera],
        target: [...spec.defaultTarget],
      }
    }
  }
}

export interface CameraPose {
  position: [number, number, number]
  target: [number, number, number]
}

export interface ShowcaseModelSpec {
  id: ModelKey
  label: string
  url: string
  subtitle: string
  dimensions: string
  defaultCamera: [number, number, number]
  defaultTarget: [number, number, number]
  minDistance: number
  maxDistance: number
  viewPresets: Record<ViewPresetKey, CameraPose>
  partCameras: Record<PartKey, CameraPose>
}

export const viewPresetLabels: Array<{ id: ViewPresetKey; label: string }> = [
  { id: 'overview', label: '全景视角' },
  { id: 'trackside', label: '路基仰视' },
  { id: 'cab', label: '驾驶前瞻' },
  { id: 'bogey', label: '转向架跟拍' },
]

export const showcaseModels: ShowcaseModelSpec[] = [
  {
    id: 'df11',
    label: 'DF11 整车拼装',
    url: '/models/df11.glb',
    subtitle: '东风11型内燃机车完整单节编组（23×6×5 方块），两端对称布置驾驶室与流线车头。',
    dimensions: '23 × 6 × 5 方块 · 双端驾驶室',
    defaultCamera: [-15.5, 6.2, 13.5],
    defaultTarget: [0, 2.2, 0],
    minDistance: 4,
    maxDistance: 42,
    viewPresets: {
      overview: { position: [-15.5, 6.2, 13.5], target: [0, 2.2, 0] },
      trackside: { position: [-17.5, 1.85, 5.4], target: [-1.5, 2.4, 0] },
      cab: { position: [-9.2, 3.8, -0.5], target: [-28.0, 2.8, 0] },
      bogey: { position: [-9.6, 1.35, 4.4], target: [-6.0, 0.9, 0] },
    },
    partCameras: {
      all: { position: [-15.5, 6.2, 13.5], target: [0, 2.2, 0] },
      head: { position: [-14.2, 4.4, 5.4], target: [-9.2, 3.0, 0] },
      cowcatcher: { position: [-13.6, 2.2, 4.6], target: [-9.8, 1.1, 0] },
      body: { position: [0.5, 3.6, 10.6], target: [0, 2.7, 0] },
      roof: { position: [7.5, 8.8, 7.8], target: [0, 4.6, 0] },
      underbody: { position: [-9.2, 1.6, 5.4], target: [-6.0, 1.0, 0] },
      track: { position: [9.5, 2.8, 7.2], target: [0, 0.2, 0] },
    },
  },
  {
    id: 'df11g-head',
    label: 'DF11G 车头特写',
    url: '/models/df11g_head_example.glb',
    subtitle: '聚焦东风 11G 型前鼻流线外形、排障器与 Co-Co 三轴转向架的局部拼装构造。',
    dimensions: '9 × 6 × 5 方块 · 车头局部特写',
    defaultCamera: [-8.6, 4.4, 7.4],
    defaultTarget: [-0.8, 2.2, 0],
    minDistance: 3.2,
    maxDistance: 24,
    viewPresets: {
      overview: { position: [-8.6, 4.4, 7.4], target: [-0.8, 2.2, 0] },
      trackside: { position: [-8.2, 1.6, 3.8], target: [0.5, 2.2, 0] },
      cab: { position: [-3.2, 3.7, -0.4], target: [-20.0, 2.7, 0] },
      bogey: { position: [-2.8, 1.3, 4.1], target: [0.5, 0.9, 0] },
    },
    partCameras: {
      all: { position: [-8.6, 4.4, 7.4], target: [-0.8, 2.2, 0] },
      head: { position: [-7.8, 4.1, 4.6], target: [-2.6, 3.1, 0] },
      cowcatcher: { position: [-7.2, 2.0, 3.8], target: [-3.0, 1.1, 0] },
      body: { position: [1.8, 3.8, 7.0], target: [0.8, 2.7, 0] },
      roof: { position: [2.2, 7.2, 5.8], target: [1.2, 4.5, 0] },
      underbody: { position: [-1.5, 1.7, 4.8], target: [0.5, 1.0, 0] },
      track: { position: [-4.5, 2.5, 5.2], target: [-0.5, 0.2, 0] },
    },
  },
  {
    id: 'df11g',
    label: 'DF11G 双机重联',
    url: '/models/df11g.glb',
    subtitle: '东风11G型 A+B 双节重联机车（45×6×5 方块），中段以折棚风挡贯通连接，还原跨越长编组列车比例。',
    dimensions: '45 × 6 × 5 方块 · A+B 双节重联',
    defaultCamera: [-31.0, 10.6, 26.0],
    defaultTarget: [0, 2.3, 0],
    minDistance: 6,
    maxDistance: 58,
    viewPresets: {
      overview: { position: [-31.0, 10.6, 26.0], target: [0, 2.3, 0] },
      trackside: { position: [-26.5, 1.9, 6.2], target: [-6.0, 2.5, 0] },
      cab: { position: [-20.2, 3.8, -0.5], target: [-40.0, 2.8, 0] },
      bogey: { position: [-19.8, 1.4, 4.6], target: [-17.0, 0.9, 0] },
    },
    partCameras: {
      all: { position: [-31.0, 10.6, 26.0], target: [0, 2.3, 0] },
      head: { position: [-25.5, 4.8, 6.2], target: [-20.0, 3.1, 0] },
      cowcatcher: { position: [-25.0, 2.3, 5.2], target: [-21.0, 1.1, 0] },
      body: { position: [0.0, 4.4, 15.5], target: [0, 2.8, 0] },
      roof: { position: [11.5, 11.2, 11.0], target: [0, 4.6, 0] },
      underbody: { position: [-14.0, 1.7, 5.6], target: [-17.0, 1.0, 0] },
      track: { position: [12.0, 4.2, 12.0], target: [0, 0.2, 0] },
    },
  },
]

export interface ShowcasePartSpec {
  id: PartKey
  label: string
  description: string
  craftNote: string
}

export const showcaseParts: ShowcasePartSpec[] = [
  {
    id: 'all',
    label: '整车全景',
    description: '完整的东风11系列机车由六大结构层拼合而成，各部分按真实列车比例在铁轨上对齐拼接。',
    craftNote: '巡航状态下会随路轨同步转动轮对并随机触发交接换车；切换“分层拆解”可纵向展开六层车体构造。',
  },
  {
    id: 'head',
    label: '流线车头',
    description: '车头整合前窗视野、前照灯与圆弧鼻锥结构；在 DF11G 编组中，中段配有贯通两节车体的折棚端面。',
    craftNote: '车内前部可直接摆放双驾驶座与内燃通用驾驶台，方便第一人称与第三人称切换驾驶。',
  },
  {
    id: 'cowcatcher',
    label: '排障器',
    description: '悬挂于车头下方的 DF11 / DF11G 专属排障器，贴近轨面预留净空并承接车钩高度。',
    craftNote: '拼装时将其置于车头前下方的铁轨正上方一格，即可与地板和转向架齐平过渡。',
  },
  {
    id: 'body',
    label: '车体门窗与路牌',
    description: '由底板、上下厢板、百叶窗、设备间门窗、驾驶室门以及运行区段水牌组成完整动力室与驾驶舱外壳。',
    craftNote: '使用带有颜色的刷子可在下厢板上书写水牌；部分门扇支持开合交互并区分左右铰链方向。',
  },
  {
    id: 'roof',
    label: '车顶风扇与烟囱',
    description: '车顶盖板集成冷却风扇组、滤尘百叶、可点火的机车烟囱与顶盖维修口，勾勒出内燃机车标志性的顶部轮廓。',
    craftNote: '烟囱方块支持点燃状态表现运行工况，电力机车同位置则可架设受电弓连接上方接触网。',
  },
  {
    id: 'underbody',
    label: '转向架与风缸',
    description: '每节车体下方配备双组东风11G 三轴转向架与三对轮对，中部悬挂大容量储风缸与燃油箱模块。',
    craftNote: '在轨道上放置转向架并连接 Create 列车组装站点，即可将静态方块整体转化为可行驶列车实体。',
  },
  {
    id: 'track',
    label: '标准轨距铁轨',
    description: '模组内置标准轨距铁轨、护轮轨、米轨、无砟轨道与无枕轨道五种规制，轨枕与扣件按真车比例建模。',
    craftNote: '轨道可铺设直线、斜向与坡道区段，并与轨道绝缘节、信号机共同纳入车站联锁区段。',
  },
]

export interface PlayerStep {
  step: string
  title: string
  description: string
}

export const playerSteps: PlayerStep[] = [
  {
    step: '01',
    title: '安装对应游戏环境',
    description: '确认游戏为 Minecraft 1.21.1 与 NeoForge 21.1，并同时放入 Create 6.0、KasugaLibNext 与 KuaYue 模组文件。',
  },
  {
    step: '02',
    title: '搭建蓝图桌并加工耐候钢',
    description: '在生存模式中先合成耐候钢材料与蓝图桌，逐步研读并解锁目标机车、客车及电气化组件总体设计图。',
  },
  {
    step: '03',
    title: '铺轨放置转向架并拼装车体',
    description: '先在轨面上铺设铁轨并放好转向架，再依序拼上地板、车头、排障器、门窗厢板与车顶组件，刷上心仪涂装与水牌。',
  },
  {
    step: '04',
    title: '联挂组装、架线并进站调度',
    description: '安装驾驶台与座椅后完成列车组装；电气化区段可竖立接触网并升弓，最后交由信号机与车站控制器发车运转。',
  },
]
