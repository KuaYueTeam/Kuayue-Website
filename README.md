# KuaYue 跨越玩家介绍页

基于 React、TypeScript、Vite 与 Three.js 构建的面向 KuaYue Minecraft 模组玩家的介绍页面，将真实比例的 **DF11 / HXD3D / SS3 / DF11G 干线机车与有砟轨道** 作为全视口 3D 巡航背景，支持随阅读章节切换镜头视角、随机交接换车事件，以及 `#example` 中机车车辆与转向架、接触网硬横跨、站车设施等非车体总成的分层交互检视。

## 主要目录

- `public/models/df11.glb` — 东风 11 型内燃机车整车拼装模型（单图集纹理 + 独立轮轴节点）
- `public/models/hxd3d.glb` — 和谐电 3D 型电力机车整车拼装模型（含五连杆单臂受电弓与三轴转向架）
- `public/models/ss3.glb` — 韶山 3 型电力机车整车拼装模型（双驾驶室棱角车体与车顶受电弓）
- `public/models/df11g.glb` — 东风 11G 双机重联模型（单图集纹理 + 独立轮轴节点）
- `public/models/df11g_head_example.glb` — 东风 11G 型车头特写模型（单图集纹理 + 独立轮轴节点）
- `public/models/sw220k_bogey.glb` — SW-220K 高速转向架与标准有砟轨展示总成
- `public/models/overhead_gantry.glb` — 格构钢柱、双层硬横跨桁架、配重坠砣与悬垂绝缘子接触网总成
- `public/models/station_facilities.glb` — 通用内燃驾驶台、双驾驶座、蓝图桌、列车茶炉与站台屏蔽门餐饮场景
- `public/models/corridor.glb` — 沿线标准轨距铁路模块（供 `InstancedMesh` 连续铺设）
- `src/TrainBackdrop.tsx` — 固定全视口 Three.js 哑光铁道舞台、章节镜头切换与交接换车引擎
- `src/ShowcaseSection.tsx` — `#example` 机车与非车体组件拼装检视、随机换车与分层拆解控制面板
- `src/railwayStore.ts` — 模型状态、章节视角与背景/检视联动共享存储

## 本地开发与构建

```bash
npm install
npm run dev
npm run build
npm run lint
```
