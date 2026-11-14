export const REPO_URL = 'https://github.com/KuaYueTeam/KuaYue'
export const KASUGA_URL = 'https://github.com/KasugaLibGroup/KasugaLibNext'

export const facts = [
  { term: '游戏版本', value: 'Minecraft 1.21.1' },
  { term: '模组加载器', value: 'NeoForge 21.1' },
  { term: '核心前置', value: 'Create 6.0 · KasugaLibNext' },
  { term: '当前版本', value: 'KuaYue 2.0.0' },
]

export type StockCategory =
  | '机车'
  | '客车'
  | '货车'
  | '转向架与轨道'
  | '供电与联锁'
  | '站车设施与餐饮'

export interface RollingStock {
  code: string
  name: string
  category: StockCategory
  kind: string
}

export const rollingStock: RollingStock[] = [
  // 机车
  { code: 'DF5', name: '东风5型', category: '机车', kind: '调车内燃机车 · 外走廊车体与冷却格栅' },
  { code: 'DF11', name: '东风11型', category: '机车', kind: '准高速干线内燃机车 · 双端流线驾驶室' },
  { code: 'DF11G', name: '东风11G型', category: '机车', kind: '双机固定重联内燃机车 · 含贯通折棚风挡' },
  { code: 'DF21', name: '东风21型', category: '机车', kind: '米轨内燃机车（含早期 / 后期两种头型）' },
  { code: 'DFH21', name: '东方红21型', category: '机车', kind: '米轨液力传动内燃机车 · 适配专用窄轨转向架' },
  { code: 'SS3', name: '韶山3型', category: '机车', kind: '经典六轴交直传动干线电力机车 · 车顶高压母线' },
  { code: 'SS8', name: '韶山8型', category: '机车', kind: '准高速四轴电力机车 · 配 240 km/h 纪念碑涂装' },
  { code: 'HXD3D', name: '和谐电3D型', category: '机车', kind: '大功率交流传动客运电力机车 · 配单臂受电弓' },
  { code: 'CR200J', name: '复兴号 CR200J', category: '机车', kind: '统型动力集中电动车组（含动力车头与拖车）' },
  { code: 'JY290', name: '金鹰 JY290', category: '机车', kind: '工程轨道车 · I/II 端双头造型与车顶起重设备' },

  // 客车
  { code: '22', name: '22型客车', category: '客车', kind: '绿皮经典客车 · 手动折页门、双小窗与席别灯' },
  { code: '25', name: '25型通用车', category: '客车', kind: '25 系列通用车体与初期原型客车组件' },
  { code: '25B', name: '25B型客车', category: '客车', kind: '普通空调/非空调客车 · 兼有刷绿统型标识线' },
  { code: '25G', name: '25G型客车', category: '客车', kind: '红白绿统型干线空调客车 · 密封窗与直排便池' },
  { code: '25K', name: '25K型客车', category: '客车', kind: '提速蓝白客车 · 塞拉门、折棚风挡与橡胶端面' },
  { code: '25T / BSP25T', name: '25T型客车', category: '客车', kind: '160 km/h 高速客车 · 集便厕、顶置空调与真空厕所' },
  { code: '25Z', name: '25Z型客车', category: '客车', kind: '准高速空调软座车 · 细/粗腰线涂装与专用地毯' },
  { code: 'M1', name: 'M1型客车', category: '客车', kind: '实验客车车体 · 含风缸电池盒与专用行李架' },
  { code: 'JY30', name: 'JY30 宿营车', category: '客车', kind: '工程宿营车厢 · 大幅面观景窗与专用下厢板' },

  // 货车
  { code: 'C70', name: 'C70型敞车', category: '货车', kind: '通用高边敞车 · 可开启侧门与折页端墙' },
  { code: 'NX70', name: 'NX70型平车', category: '货车', kind: '集装箱与重型货物共用平车 · 含高低地板与登车梯' },

  // 转向架与轨道
  { code: 'SW220K', name: 'SW-220K 转向架', category: '转向架与轨道', kind: '高速客车无摇枕空气弹簧转向架（含正反向构架）' },
  { code: 'PK209P', name: 'PK209P 转向架', category: '转向架与轨道', kind: '25T 高速客车盘形制动转向架（含轴端发电机变体）' },
  { code: 'CW2', name: 'CW-2 转向架', category: '转向架与轨道', kind: '提速客车常见二轴空气弹簧转向架' },
  { code: 'SW160', name: 'SW-160 转向架', category: '转向架与轨道', kind: '25K 系列提速客车常用 160 km/h 转向架' },
  { code: 'MKZ / TKZ1 / TKZ2', name: 'MKZ / TKZ 系列', category: '转向架与轨道', kind: '米轨及准米轨专用客货车转向架（支持轴发与无轴发）' },
  { code: 'ZK6', name: '转K6 (ZK6) 转向架', category: '转向架与轨道', kind: '货车重载三大件铸钢转向架 · 适配 C70 / NX70' },
  { code: 'QJ', name: '前进型动/导轮', category: '转向架与轨道', kind: '蒸汽机车连杆动轮组与前导轮转向架' },
  { code: 'STD / GUARD', name: '标准轨与护轮轨', category: '转向架与轨道', kind: '1435 mm 标准轨距道砟木枕轨、桥面护轮轨' },
  { code: 'METER / TIELESS', name: '米轨 · 无砟 · 无枕轨', category: '转向架与轨道', kind: '米轨窄轨线、高速无砟整体道床与检查坑无枕轨道' },

  // 供电与联锁
  { code: 'PILLAR-C / H', name: '等距圆 · H型钢支柱', category: '供电与联锁', kind: '直线与站场区段基础接触网支柱，支持分体拼接高度' },
  { code: 'PILLAR-STEEL', name: '矩形格构钢柱', category: '供电与联锁', kind: '多股道跨线站场重型格构钢柱与横腹板混凝土支柱' },
  { code: 'TRUSS-PORTAL', name: '角钢 / 钢管硬横跨', category: '供电与联锁', kind: '单层与双层跨线硬横跨桁架、连接件及中央倒立柱' },
  { code: 'INSULATOR-ARM', name: '悬垂绝缘子与定位支架', category: '供电与联锁', kind: 'A/B/C/D 四类内外侧接触网定位腕臂与支持偏移微调' },
  { code: 'END-WEIGHT', name: '接触网挂线与路端配重', category: '供电与联锁', kind: '自动张力补偿配重坠砣与跨距悬链线悬挂导电网' },
  { code: 'PANTOGRAPH', name: 'HXD3D 单臂受电弓', category: '供电与联锁', kind: '电力机车受流核心部件，支持手动或列车动作联动升降' },
  { code: 'INTERLOCKING', name: '车站控制器与联锁信号', category: '供电与联锁', kind: '虚拟轨道图监控、进出站信号机、轨道绝缘节与时刻表拆合' },

  // 站车设施与餐饮
  { code: 'DRIVE-DESK', name: '内燃机通用驾驶台', category: '站车设施与餐饮', kind: '双联车载仪表屏、制动手柄与牵引级位操舵控制器' },
  { code: 'DOUBLE-SEAT', name: '双驾驶座', category: '站车设施与餐饮', kind: '正副司机双位乘坐操控台，支持第一/第三人称视角驾驶' },
  { code: 'BLUEPRINT-DESK', name: '蓝图桌与研发科技树', category: '站车设施与餐饮', kind: '生存模式核心工作台，加工耐候钢并解锁机车与电路蓝图' },
  { code: 'LIVERY-SIGN', name: '申必刷子 · 水牌与贴纸', category: '站车设施与餐饮', kind: 'HSV 车身调色模板分享、运行区段水牌刻字与车厢铭牌贴纸' },
  { code: 'TEA-STOVE', name: '列车茶炉', category: '站车设施与餐饮', kind: '客车走廊开水房设备 · 手持干脆面右键可现场冲泡开水' },
  { code: 'PROVISIONS', name: '铁路餐饮全家桶', category: '站车设施与餐饮', kind: '冲泡方便面（小心别端着跳车）、火车盒饭、六香卤蛋与跨可乐' },
  { code: 'PLATFORM-PSD', name: '站台屏蔽门与雨棚', category: '站车设施与餐饮', kind: '站台安全屏蔽门、耐候钢建筑构件、日光灯与路徽装饰' },
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

export type ModelKey =
  | 'df11'
  | 'df11g-head'
  | 'df11g'
  | 'hxd3d'
  | 'ss3'
  | 'sw220k-bogey'
  | 'overhead-gantry'
  | 'station-facilities'

export type PartKey = 'all' | 'head' | 'cowcatcher' | 'body' | 'roof' | 'underbody' | 'track'
export type ViewPresetKey = 'overview' | 'trackside' | 'cab' | 'bogey'
export type PageSectionKey = 'top' | 'features' | 'example' | 'gallery' | 'stock' | 'getting-started'

export interface SectionCameraMeta {
  id: PageSectionKey
  label: string
}

export const sectionCameraList: SectionCameraMeta[] = [
  { id: 'top', label: '全景巡航' },
  { id: 'features', label: '路基近景' },
  { id: 'example', label: '交互检视' },
  { id: 'gallery', label: '实景光影' },
  { id: 'stock', label: '侧视谱系' },
  { id: 'getting-started', label: '前瞻调度' },
]

export const modelScaleById: Record<ModelKey, number> = {
  df11: 1.0,
  'df11g-head': 0.72,
  df11g: 1.48,
  hxd3d: 1.0,
  ss3: 0.98,
  'sw220k-bogey': 0.42,
  'overhead-gantry': 0.65,
  'station-facilities': 0.48,
}

export function getHeroNoseCameraPose(modelId: ModelKey): CameraPose {
  switch (modelId) {
    case 'df11':
      return { position: [-14.0, 3.65, 6.9], target: [-7.8, 2.55, 0] }
    case 'hxd3d':
      return { position: [-13.8, 3.75, 6.9], target: [-7.6, 2.6, 0] }
    case 'ss3':
      return { position: [-13.4, 3.75, 6.8], target: [-7.2, 2.65, 0] }
    case 'df11g':
      return { position: [-25.0, 3.75, 7.2], target: [-18.6, 2.55, 0] }
    case 'df11g-head':
      return { position: [-7.6, 3.55, 6.6], target: [-1.4, 2.45, 0] }
    default: {
      const spec = showcaseModels.find((m) => m.id === modelId) ?? showcaseModels[0]
      return { position: [...spec.defaultCamera], target: [...spec.defaultTarget] }
    }
  }
}

export function getSectionCameraPose(section: PageSectionKey, modelId: ModelKey): CameraPose {
  const s = modelScaleById[modelId]
  switch (section) {
    case 'top':
      return getHeroNoseCameraPose(modelId)
    case 'features':
      return {
        position: [-18.5 * s, 6.8 * Math.max(0.92, s * 0.8), 16.5 * s],
        target: [0, 2.2, 0],
      }
    case 'gallery':
      return {
        position: [-10.5 * s, 3.3 * Math.max(0.88, s * 0.85), -14.8 * s],
        target: [0, 2.0, 0],
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

export interface PartOverrideSpec {
  label: string
  description: string
  craftNote: string
}

export interface ShowcaseModelSpec {
  id: ModelKey
  label: string
  category: '机车车辆' | '非车体组件'
  url: string
  subtitle: string
  dimensions: string
  cruisable: boolean
  showCorridor: boolean
  scrollTrack: boolean
  defaultCamera: [number, number, number]
  defaultTarget: [number, number, number]
  minDistance: number
  maxDistance: number
  visibleParts: PartKey[]
  partOverrides?: Partial<Record<PartKey, PartOverrideSpec>>
  viewPresets: Record<ViewPresetKey, CameraPose>
  partCameras: Partial<Record<PartKey, CameraPose>>
}

export const viewPresetLabels: Array<{ id: ViewPresetKey; label: string }> = [
  { id: 'overview', label: '全景视角' },
  { id: 'trackside', label: '路基仰视' },
  { id: 'cab', label: '前瞻平视' },
  { id: 'bogey', label: '底盘近景' },
]

export const showcaseModels: ShowcaseModelSpec[] = [
  {
    id: 'df11',
    label: 'DF11 整车拼装',
    category: '机车车辆',
    url: '/models/df11.glb',
    subtitle: '东风11型内燃机车完整单节编组（23×6×5 方块），两端对称布置驾驶室与流线车头。',
    dimensions: '23 × 6 × 5 方块 · 双端驾驶室',
    cruisable: true,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-15.5, 6.2, 13.5],
    defaultTarget: [0, 2.2, 0],
    minDistance: 4,
    maxDistance: 42,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'underbody', 'track'],
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
    id: 'hxd3d',
    label: 'HXD3D 电力机车',
    category: '机车车辆',
    url: '/models/hxd3d.glb',
    subtitle: '和谐电 3D 型大功率交流客运电力机车（23×6×5 方块），红白涂装搭配单臂受电弓与三轴转向架。',
    dimensions: '23 × 6 × 5 方块 · 交流客运电力机车',
    cruisable: true,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-16.2, 6.6, 14.0],
    defaultTarget: [0.4, 2.5, 0],
    minDistance: 4,
    maxDistance: 42,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'underbody', 'track'],
    partOverrides: {
      all: {
        label: '整车全景',
        description: '完整拼装的 HXD3D 电力机车，车顶一端降弓、另一端单臂受电弓升起以衔接电气化区段接触网。',
        craftNote: '在蓝图桌研读和谐3D总体设计与电力电路图后，按车体、三轴转向架与受电弓分块装配成型。',
      },
      roof: {
        label: '单臂受电弓与顶盖',
        description: '模组内置高精度五连杆单臂受电弓模型（底座、下臂、拉杆、上臂与滑板弓头），随升弓指令联动运动。',
        craftNote: 'HXD3D 受电弓支持设定目标接触网导线高度，在 Create 列车运行期间实时贴合线路导高起伏。',
      },
      underbody: {
        label: '三轴转向架与车底设备',
        description: '配备前后端 HXD3D 专属三轴构架与 1260 mm 大直径动轮，中部悬挂主变压器风道与车底设备舱。',
        craftNote: '每个转向架拥有三组独立旋转轴轮对，配合车底设备模块构成大功率干线客运底盘。',
      },
    },
    viewPresets: {
      overview: { position: [-16.2, 6.6, 14.0], target: [0.4, 2.5, 0] },
      trackside: { position: [-17.2, 1.9, 5.6], target: [-1.0, 2.6, 0] },
      cab: { position: [-8.8, 3.8, -0.4], target: [-28.0, 2.9, 0] },
      bogey: { position: [-9.2, 1.45, 4.6], target: [-5.5, 1.0, 0] },
    },
    partCameras: {
      all: { position: [-16.2, 6.6, 14.0], target: [0.4, 2.5, 0] },
      head: { position: [-14.0, 4.3, 5.6], target: [-9.0, 3.0, 0] },
      cowcatcher: { position: [-13.5, 2.1, 4.6], target: [-9.6, 1.1, 0] },
      body: { position: [0.8, 3.6, 10.6], target: [0.5, 2.7, 0] },
      roof: { position: [10.8, 8.6, 6.4], target: [6.0, 5.3, 0] },
      underbody: { position: [-9.0, 1.6, 5.2], target: [-5.5, 1.0, 0] },
      track: { position: [9.5, 2.8, 7.2], target: [0, 0.2, 0] },
    },
  },
  {
    id: 'ss3',
    label: 'SS3 韶山3型',
    category: '机车车辆',
    url: '/models/ss3.glb',
    subtitle: '韶山3型六轴交直传动电力机车（22×6×5 方块），经典双司机室棱角外观与车顶高压布线总成。',
    dimensions: '22 × 6 × 5 方块 · 经典干线电力机车',
    cruisable: true,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-15.8, 6.6, 13.8],
    defaultTarget: [0, 2.5, 0],
    minDistance: 4,
    maxDistance: 42,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'underbody', 'track'],
    partOverrides: {
      all: {
        label: '整车全景',
        description: '由早/晚期车头、侧百叶窗厢板、车底主变压器以及车顶布线天窗构成的韶山3型干线电力机车。',
        craftNote: '机车两端保留经典多片式司机室前窗与对开端门，适合在货运与普速客运线网充当主力牵引机车。',
      },
      roof: {
        label: '车顶布线总成与受电弓',
        description: '集成 SS3 车顶高压绝缘子布线总成、观察天窗与通风百叶帽，搭配两端单臂受电弓底座。',
        craftNote: '电力机车可与架空硬横跨接触网协同运营，升弓即可体现真实的电气化铁路编组风貌。',
      },
    },
    viewPresets: {
      overview: { position: [-15.8, 6.6, 13.8], target: [0, 2.5, 0] },
      trackside: { position: [-16.8, 1.9, 5.5], target: [-1.0, 2.5, 0] },
      cab: { position: [-8.6, 3.8, -0.4], target: [-28.0, 2.9, 0] },
      bogey: { position: [-8.8, 1.45, 4.5], target: [-5.2, 0.95, 0] },
    },
    partCameras: {
      all: { position: [-15.8, 6.6, 13.8], target: [0, 2.5, 0] },
      head: { position: [-13.6, 4.3, 5.5], target: [-8.6, 3.0, 0] },
      cowcatcher: { position: [-13.2, 2.1, 4.5], target: [-9.2, 1.1, 0] },
      body: { position: [0.5, 3.6, 10.4], target: [0, 2.7, 0] },
      roof: { position: [9.8, 8.6, 6.2], target: [4.8, 5.3, 0] },
      underbody: { position: [-8.8, 1.6, 5.2], target: [-5.2, 0.95, 0] },
      track: { position: [9.2, 2.8, 7.0], target: [0, 0.2, 0] },
    },
  },
  {
    id: 'df11g',
    label: 'DF11G 双机重联',
    category: '机车车辆',
    url: '/models/df11g.glb',
    subtitle: '东风11G型 A+B 双节重联机车（45×6×5 方块），中段以折棚风挡贯通连接，还原跨越长编组列车比例。',
    dimensions: '45 × 6 × 5 方块 · A+B 双节重联',
    cruisable: true,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-31.0, 10.6, 26.0],
    defaultTarget: [0, 2.3, 0],
    minDistance: 6,
    maxDistance: 58,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'underbody', 'track'],
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
  {
    id: 'df11g-head',
    label: 'DF11G 车头特写',
    category: '机车车辆',
    url: '/models/df11g_head_example.glb',
    subtitle: '聚焦东风 11G 型前鼻流线外形、排障器与 Co-Co 三轴转向架的局部拼装构造。',
    dimensions: '9 × 6 × 5 方块 · 车头局部特写',
    cruisable: true,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-8.6, 4.4, 7.4],
    defaultTarget: [-0.8, 2.2, 0],
    minDistance: 3.2,
    maxDistance: 24,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'underbody', 'track'],
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
    id: 'sw220k-bogey',
    label: 'SW-220K 高速转向架',
    category: '非车体组件',
    url: '/models/sw220k_bogey.glb',
    subtitle: '非车体机械总成示例：无摇枕高速客车转向架在标准轨上滚行，可分层拆解构架、轮对与二系空气弹簧。',
    dimensions: '7 × 2 × 3 方块 · 二轴高速客车转向架',
    cruisable: false,
    showCorridor: true,
    scrollTrack: true,
    defaultCamera: [-4.2, 2.4, 3.9],
    defaultTarget: [0, 0.95, 0],
    minDistance: 2.0,
    maxDistance: 12,
    visibleParts: ['all', 'underbody', 'body', 'track'],
    partOverrides: {
      all: {
        label: '转向架总成',
        description: '完整的 SW-220K 无摇枕高速客车转向架，配备 H 型焊接构架、一系轴箱定位与二系空气弹簧枕梁。',
        craftNote: '在标准轨距铁轨上用 Create 扳手右键转向架即可在 CW2、SW160、SW220K 等多种样式间实时切换。',
      },
      underbody: {
        label: '铸钢构架与轮对',
        description: '展示 SW-220K 主体构架、轴箱减振器与两对高强度实心钢轮；运行状态下轮对与轨枕严格同步转动。',
        craftNote: '模组内置正反两向构架变体与盘式制动细节，满足 25T 等高速客车底盘搭建需要。',
      },
      body: {
        label: '二系空簧与枕梁',
        description: '承担车体重量、隔离高速行车振动的二系大挠度空气弹簧与中心销承重座，开启“分层拆解”可单独抬升检视。',
        craftNote: '组装列车时，车体地板直接承接在转向架上方一格位置，确保多节车厢车钩中心线完全平齐。',
      },
      track: {
        label: '标准轨距底座',
        description: '1435 mm 标准轨距道砟与木枕路基，精准咬合转向架轮缘内侧踏面。',
        craftNote: '除标准轨距外，模组还提供无砟轨道、无枕轨道与桥面护轮轨供高速正线和检修库使用。',
      },
    },
    viewPresets: {
      overview: { position: [-4.2, 2.4, 3.9], target: [0, 0.95, 0] },
      trackside: { position: [-3.9, 0.9, 2.4], target: [0, 0.85, 0] },
      cab: { position: [-0.2, 3.2, 4.6], target: [0, 1.0, 0] },
      bogey: { position: [-2.6, 1.3, 2.8], target: [0, 0.9, 0] },
    },
    partCameras: {
      all: { position: [-4.2, 2.4, 3.9], target: [0, 0.95, 0] },
      underbody: { position: [-3.1, 1.35, 2.9], target: [0, 0.85, 0] },
      body: { position: [-2.7, 2.8, 2.8], target: [0, 1.4, 0] },
      track: { position: [3.2, 1.7, 3.2], target: [0, 0.2, 0] },
    },
  },
  {
    id: 'overhead-gantry',
    label: '硬横跨接触网门架',
    category: '非车体组件',
    url: '/models/overhead_gantry.glb',
    subtitle: '非车体线路设施示例：格构钢支柱、角钢硬横跨桁架、悬垂绝缘子、定位腕臂与路端坠砣张紧机构组合结构。',
    dimensions: '9 × 6 × 7 方块 · 电气化铁路接触网门架',
    cruisable: false,
    showCorridor: false,
    scrollTrack: false,
    defaultCamera: [-7.8, 4.9, 8.2],
    defaultTarget: [0, 2.9, 0],
    minDistance: 3.5,
    maxDistance: 20,
    visibleParts: ['all', 'roof', 'body', 'underbody', 'track'],
    partOverrides: {
      all: {
        label: '门架全景',
        description: '一套完整的 KuaYue 电气化站场/正线硬横跨结构，跨越标准轨距线路并预留受电弓滑行净空。',
        craftNote: '硬横跨适合多股道咽喉区与站场集中挂线，只需沿轨道立起两侧支柱再拼装横梁与挂架即可通电挂网。',
      },
      roof: {
        label: '绝缘子与定位腕臂',
        description: '包含 B 型悬垂瓷绝缘子串与 A1 型斜腕臂定位网架，将上方承力索与下方接触线稳固悬吊于轨道中轴上方。',
        craftNote: '架设时支持通过专用调整界面微调 X/Y/Z 偏移与转角，精准对齐曲线和道岔上方导线拉出值。',
      },
      body: {
        label: '角钢硬横跨主桁架',
        description: '由双层角钢硬横跨单元、端头钢柱连接件与中央三角形吊柱倒立支架组装而成的顶部横跨承力桁架。',
        craftNote: '模组同时提供等距圆钢管、单层钢管以及双层重型角钢等多种横跨规格应对不同股道跨度。',
      },
      underbody: {
        label: '格构钢支柱与坠砣',
        description: '两侧立起三段式矩形格构钢柱，并于左柱旁安置落地式接触网路端配重坠砣用以恒定导线张力。',
        craftNote: '支柱底座、标准段与柱帽可按需要自由叠高；旁侧坠砣支持连接接触网锚段端头。',
      },
      track: {
        label: '电气化轨道基础',
        description: '门架跨距内的标准轨距钢轨与立柱混凝土基座墩台，形成稳固的电气化线路横断面。',
        craftNote: '搭配站内轨道绝缘节与信号机，可直接组建完整的电气化铁路闭塞与供电测试区段。',
      },
    },
    viewPresets: {
      overview: { position: [-7.8, 4.9, 8.2], target: [0, 2.9, 0] },
      trackside: { position: [-6.8, 1.5, 2.2], target: [0, 3.2, 0] },
      cab: { position: [-9.0, 2.8, 0.0], target: [0, 3.0, 0] },
      bogey: { position: [-4.6, 4.2, 4.8], target: [0, 4.4, 0] },
    },
    partCameras: {
      all: { position: [-7.8, 4.9, 8.2], target: [0, 2.9, 0] },
      roof: { position: [-3.9, 4.6, 3.8], target: [-0.4, 3.9, 0.2] },
      body: { position: [5.0, 6.2, 5.4], target: [0, 5.0, 0] },
      underbody: { position: [-5.2, 2.6, -4.8], target: [-0.2, 1.8, -2.5] },
      track: { position: [4.8, 2.4, 4.8], target: [0, 0.2, 0] },
    },
  },
  {
    id: 'station-facilities',
    label: '驾驶台与站车设施',
    category: '非车体组件',
    url: '/models/station_facilities.glb',
    subtitle: '非车体交互设施示例：汇聚内燃机通用驾驶台、双驾驶座、蓝图桌、列车茶炉、站台屏蔽门与铁路餐饮方块。',
    dimensions: '6 × 3 × 4 方块 · 操纵台、蓝图桌与餐饮组合',
    cruisable: false,
    showCorridor: false,
    scrollTrack: false,
    defaultCamera: [0.3, 3.1, 6.1],
    defaultTarget: [0, 1.05, 0.2],
    minDistance: 2.2,
    maxDistance: 14,
    visibleParts: ['all', 'head', 'cowcatcher', 'body', 'roof', 'track'],
    partOverrides: {
      all: {
        label: '设施全景',
        description: '集中展示车内操纵设备、生存模式蓝图工作台、站台安全屏蔽门与标志性的茶炉泡面饮食道具。',
        craftNote: 'KuaYue 不止造车体本身——从驾驶控制台、科技树蓝图桌到客车走廊茶炉一应俱全。',
      },
      head: {
        label: '内燃机通用驾驶台',
        description: '带有双块车载电子显示屏、大闸制动阀、方向手柄与指示灯拨钮的三连体模块化机车驾驶操纵台。',
        craftNote: '摆放进司机室后与列车控制联动，屏幕可实时显示速度、限速与车门联锁状态。',
      },
      cowcatcher: {
        label: '双驾驶座',
        description: '主副司机双排座椅，贴合驾驶台高度设计，支持乘客/司机乘骑并绑定交互式操控菜单。',
        craftNote: '搭配驾驶台与可开关的司机室门扇，迅速布置出一座功能完备的火车司机室。',
      },
      body: {
        label: '蓝图工程桌',
        description: '生存模式下研读总体设计图、解锁耐候钢配方与电路板蓝图的核心功能工作台。',
        craftNote: '桌面上摊开的车体设计图纸清晰可辨，支持与团队玩家共享研发后的铁路设计图。',
      },
      roof: {
        label: '茶炉与列车餐饮',
        description: '集合绿皮车厢经典红色茶炉（开水房）、泡好的方便面碗（附叉子）、火车盒饭与跨可乐罐。',
        craftNote: '用未冲泡的方便面右键茶炉即可注入开水冲泡！小心：端着滚烫泡面千万别在方块世界里起跳。',
      },
      track: {
        label: '站台屏蔽门底座',
        description: '高站台石材地坪背靠两翼可联动对开的车站安全屏蔽门与侧护墙，构筑站场候车边界。',
        craftNote: '车门开启时可搭配站台屏蔽门共同放行旅客，适合建造现代高铁与城际枢纽站台。',
      },
    },
    viewPresets: {
      overview: { position: [0.3, 3.1, 6.1], target: [0, 1.05, 0.2] },
      trackside: { position: [-4.4, 1.7, 3.6], target: [0, 1.0, 0] },
      cab: { position: [-0.8, 2.0, 2.5], target: [-0.9, 0.85, -0.1] },
      bogey: { position: [3.2, 2.2, 2.9], target: [1.3, 1.15, 0.4] },
    },
    partCameras: {
      all: { position: [0.3, 3.1, 6.1], target: [0, 1.05, 0.2] },
      head: { position: [-0.9, 2.0, 2.4], target: [-1.0, 0.85, -0.1] },
      cowcatcher: { position: [-3.2, 1.9, 3.1], target: [-1.0, 0.85, 1.2] },
      body: { position: [3.1, 2.2, 2.8], target: [1.5, 1.15, 0.5] },
      roof: { position: [2.0, 2.4, 3.1], target: [1.1, 1.1, 0.8] },
      track: { position: [-3.8, 2.4, 4.2], target: [0, 0.8, -1.2] },
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
    description: '完整机车由六大结构层拼合而成，各部分按真实列车比例在铁轨上对齐拼接。',
    craftNote: '巡航状态下会随路轨同步转动轮对并随机触发交接换车；切换“分层拆解”可纵向展开六层构筑。',
  },
  {
    id: 'head',
    label: '流线车头',
    description: '车头整合前窗视野、前照灯与端面造型；在重联或动力集中编组中还可串联折棚贯通端面。',
    craftNote: '车内前部可直接摆放双驾驶座与内燃通用驾驶台，方便第一人称与第三人称切换驾驶。',
  },
  {
    id: 'cowcatcher',
    label: '排障器',
    description: '悬挂于车头下方的专属排障器，贴近轨面预留净空并承接车钩高度。',
    craftNote: '拼装时将其置于车头前下方的铁轨正上方一格，即可与地板和转向架齐平过渡。',
  },
  {
    id: 'body',
    label: '车体门窗与路牌',
    description: '由底板、上下厢板、百叶窗、设备间门窗、驾驶室门以及运行区段水牌组成完整车体外壳。',
    craftNote: '使用带有颜色的刷子可在下厢板上书写水牌；部分门扇支持开合交互并区分左右铰链方向。',
  },
  {
    id: 'roof',
    label: '车顶风扇与设备',
    description: '车顶盖板集成冷却风扇组、滤尘百叶、机车烟囱或电力受电弓与高压母线，勾勒顶部轮廓。',
    craftNote: '内燃机车烟囱支持点火冒烟，电力机车同位置则可安装单臂受电弓衔接接触网供电。',
  },
  {
    id: 'underbody',
    label: '转向架与风缸',
    description: '车体下方配备成对多轴转向架与轮对，中部悬挂大容量储风缸、油箱或主变压器。',
    craftNote: '在轨道上放置转向架并连接 Create 列车组装站点，即可将静态方块整体转化为可行驶列车实体。',
  },
  {
    id: 'track',
    label: '标准轨距铁轨',
    description: '模组内置标准轨距铁轨、护轮轨、米轨、无砟轨道与无枕轨道五种规制，轨枕与扣件按真车比例建模。',
    craftNote: '轨道可铺设直线、斜向与坡道区段，并与轨道绝缘节、信号机共同纳入车站联锁区段。',
  },
]

export interface SceneGalleryItem {
  id: string
  tag: string
  title: string
  description: string
  alt: string
  avifSrc: string
  avifSrcSet: string
  webpSrc: string
  webpSrcSet: string
  fallbackSrc: string
  width: number
  height: number
}

export const galleryScenes: SceneGalleryItem[] = [
  {
    id: 'crossing',
    tag: '01 · 街区道口',
    title: '平交道口与内燃本务',
    description:
      '暖阳斜照的城市街角，黄红道口栏木落下，蓝白涂装内燃机车牵引平车在架空接触网下缓缓穿行过斑马线与瓦顶道口房旁。',
    alt: '夕阳斜照下的 Minecraft 游戏实景：街边小楼与斑马线旁道口栏杆落下，一列蓝白涂装内燃机车正在架空接触网下方驶过平交道口',
    avifSrc: '/images/scene-crossing-1024.avif',
    avifSrcSet: '/images/scene-crossing-640.avif 640w, /images/scene-crossing-1024.avif 1024w',
    webpSrc: '/images/scene-crossing-1024.webp',
    webpSrcSet: '/images/scene-crossing-640.webp 640w, /images/scene-crossing-1024.webp 1024w',
    fallbackSrc: '/images/scene-crossing-1024.jpg',
    width: 1024,
    height: 576,
  },
  {
    id: 'sunset-ss3',
    tag: '02 · 暮色明洞',
    title: '夕阳明洞与韶山干线',
    description:
      '黄金时刻逆光洒满依山傍水的单线电气化区段，升起单臂受电弓的韶山电力机车牵引绿皮客车弯道穿出混凝土明洞，沿接触网腕臂支柱驶向远方城郭。',
    alt: '夕阳逆光下的 Minecraft 游戏实景：浅绿配深红涂装的韶山电力机车升起单臂受电弓，牵引绿皮客车穿过山侧混凝土明洞与电气化接触网支柱',
    avifSrc: '/images/scene-sunset-ss3-1024.avif',
    avifSrcSet: '/images/scene-sunset-ss3-640.avif 640w, /images/scene-sunset-ss3-1024.avif 1024w',
    webpSrc: '/images/scene-sunset-ss3-1024.webp',
    webpSrcSet: '/images/scene-sunset-ss3-640.webp 640w, /images/scene-sunset-ss3-1024.webp 1024w',
    fallbackSrc: '/images/scene-sunset-ss3-1024.jpg',
    width: 1024,
    height: 576,
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
