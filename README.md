# KuaYue 跨越玩家介绍页

基于 React、TypeScript、Vite 与 Three.js 构建的面向 KuaYue Minecraft 模组玩家的介绍页面，将真实比例的 **DF11 / DF11G 内燃机车与有砟轨道** 作为全视口 3D 巡航背景，支持随阅读章节切换镜头视角、随机交接换车事件以及 `#example` 六层车体分层拆解互动检视。

## 主要目录

- `public/models/df11.glb` — 东风 11 型整车拼装模型（单图集纹理 + 独立轮轴节点）
- `public/models/df11g_head_example.glb` — 东风 11G 型车头特写模型（单图集纹理 + 独立轮轴节点）
- `public/models/df11g.glb` — 东风 11G 双机重联模型（单图集纹理 + 独立轮轴节点）
- `public/models/corridor.glb` — 沿线标准轨距铁路模块（供 `InstancedMesh` 连续铺设）
- `src/TrainBackdrop.tsx` — 固定全视口 Three.js 哑光铁道舞台、章节镜头切换与交接换车引擎
- `src/ShowcaseSection.tsx` — `#example` 机车拼装检视、随机换车与分层拆解控制面板
- `src/railwayStore.ts` — 机车状态、章节视角与背景/检视联动共享存储

## 本地开发与构建

```bash
npm install
npm run dev
npm run build
npm run lint
```
