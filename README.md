# Family Portfolio V1.1 — Robinhood Smart Sync Preview

这是 Family Portfolio 的更新后的交互式前端，使用虚拟数据。不是正式的多用户金融系统。不要输入真实个人财务信息，直到 Supabase 登录、授权、RLS 和服务端安全检查全部配置并验证完毕。

## 1. 本地体验

- 解压 ZIP，在 Chrome/Edge 打开 `index.html`。无需 npm、安装服务器或数据库。
- 右上角 `Admin view` 可切换到不同 Member（模拟身份，非真实登录）。
- 默认包含 My Household、Parents、Sister's Household 三个分组、四位虚拟成员、六个 IRA 账户。
- 用 Overview 顶部的 All Family 下拉菜单切换 Group；或直接点击家庭卡片。
- 在 Accounts 中点击 View、Edit、Sync。可以手动编辑持仓、现金及 Buying Power，记录实际买入卖出、记录年度 IRA 存款及 Robinhood Match。
- 在 Buy plans 中创建计划、按百分比/金额/股数计算、勾选具体 IRA，发布后切换到相应 Member 查看提醒并记录成交。
- Settings 可以切换主题、隐私模式、价格设置、导出 CSV/JSON、重置模拟数据。
- 数据使用浏览器 localStorage；各设备和浏览器不共享数据。浏览器的文件访问或存储策略可能限制直接打开 HTML 时的保存。推荐通过静态 HTTPS 网站体验 PWA。

## 2. Robinhood Smart Sync V1.1

Accounts → Sync → 选择该成员的目标 IRA → 选择最多 8 张 PNG/JPG/WEBP → Scan selected images → Review → Confirm & sync。

新版支持三类 Robinhood iPhone 截图：
- Account Overview：Roth IRA / Traditional IRA（包括 Trad. IRA），券商报告总资产、今日涨跌、Buying Power、现金（仅明确显示时）、税年累计存款、IRA Match、Gold 百分比。
- Holdings List：股票代码及股数，保留未显示持仓；若列表四舍五入后的股数与已有高精度持仓一致，保留高精度；如果股数变化且无法核对成本，平均成本标为未知。
- Position Detail：股票代码、完整小数股、平均成本、截图市场价格、市值（核对参考）；不将市值或截图日收益当成实时行情。若详情与列表股数冲突，建议详情值并要求逐行确认。

支持同次选择多张图。系统先独立识别每张截图，再依照目标 IRA 过滤：不同 IRA 自动排除，无法识别 IRA 必须由用户手动确认，重复文字结果只保留一次。切换目标账户可重新核对同一批 OCR 文字；每次仅保存一个账户，不会假定不同截图属于同一个人。已确认存款总额采用差额调整，重复导入不叠加。Cash 与 Buying Power 分开。券商报告资产单独显示，不加进持仓估值；只有明确勾选才用截图价格补充尚无报价的股票，保留已有行情。所有识别结果都必须经人工确认；歧义 ticker（例如 VTl → 建议 VTI）或冲突股数须逐行确认。截图无法证明成交时间或历史交易，不生成推测的买卖记录。

内置 Tesseract.js 5.1.1；首次联网下载 OCR 引擎及模型。图片只在本地浏览器处理，不上传或持久化截图。新增针对参考手机布局的局部 ticker、账户标签、持仓左列识别；布局变化、OCR 漏字、深色模式及不同设备仍可能影响识别。可使用 `Try sample text` 或 `Try mixed IRA sample` 测试；内置均为合成示例。用户提供的真实截图及原始识别文字不包含在发布包中。

## 3. Market data

默认均为模拟行情，绝不作为实时市场价格。手动编辑价格或模拟刷新可验证所有成员/账户/家庭分组资产同步变化。

Settings → Market prices 支持填写已经授权的 HTTPS 行情端点。端点必须由用户自己部署并确认行情许可证允许家庭多成员展示。前端发送去重后的 `symbols` 参数，不发送持股数量或账号，例如：

`GET https://your-authorized-api.example/quotes?symbols=VOO,NVDA,QQQ`

预期响应格式：

```json
{
  "prices": {
    "VOO": { "price": 520.10, "asOf": "2026-11-25T18:00:00Z", "source": "Example provider / delayed" },
    "NVDA": { "price": 150.25, "asOf": "2026-11-25T18:00:00Z", "source": "Example provider / delayed" }
  }
}
```

这些数值只是格式示例。需要跨源访问时，后端应配置明确的允许来源；正式服务应要求真实身份认证，并将服务端 API Key 保存在 Cloudflare secret 中。当前 demo 不发送认证 token，不应将受保护的生产行情端点改成公共接口来迁就演示。真实行情服务、后台定时更新和多设备行情缓存尚未配置。打开 app 后每 30 分钟自动刷新只在设置了可访问的端点且使用 Admin demo 身份时启用。失败保留旧报价。

候选行情服务：Alpaca Basic、其他许可适合家庭共享的供应商。Alpaca 免费方案实时权益行情仅 IEX，不等同全市场；多成员展示授权仍需确认。参考 https://docs.alpaca.markets/us/docs/about-market-data-api 。

## 4. Cloudflare 静态体验部署 / PWA

此版本无需构建，项目包含 `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`。

- 可以把项目的静态文件放进 GitHub 私有仓库，使用 Cloudflare Pages 连接 GitHub，静态站点不需要 build command，输出目录为包含 index.html 的目录。或使用 Cloudflare Pages Direct Upload，上传静态文件。
- 也可以使用 Cloudflare Workers Static Assets 部署这些文件。参考 https://developers.cloudflare.com/workers/static-assets/ 。
- iPhone：在 Safari 打开 HTTPS 网站 → Share → Add to Home Screen → 从桌面打开。
- Android：Chrome → Install app / Add to Home screen。
- manifest、图标和 service worker 已提供。静态 app shell 支持缓存；真实设备安装和离线行为需要部署后验证。截图 OCR 第一次运行仍需网络。
- 此 demo 站点的身份切换不是权限隔离，不能把真实金融数据放进去。没有实际创建任何云端项目或上传仓库。

## 5. V1 实现状态

已实现本地交互：家庭分组 CRUD（创建/重命名）；成员创建/编辑、主分组；多 IRA 账户；手动余额和持仓；交易记录；每位成员按税年配置的存款额度，跨个人 IRA 汇总；Match；计划预算及预留；本地站内提醒；截图文字解析/确认；行情手动或外部端点更新；CSV/JSON 导出；响应式布局；PWA 文件。

未实现正式环境：Supabase Auth、invite-only 注册、数据库 RLS、Group Admin 委托权限、跨设备同步、真实 Email / Push 发送、后台定时行情更新、真实行情供应商授权和接入、完整历史收益率图、云端备份恢复、正式审计安全验证。所有界面样例均为模拟数据。

## 6. 正式 V1 接入计划

1. Supabase：profiles、families、family_groups、memberships、investment_accounts、holdings、transactions、contributions、contribution_limits、quotes、plans、plan_items、notifications、push_subscriptions、audit_logs。每人一个 primary group，账户 ID 唯一；以个人/税年汇总 IRA contribution，match 独立。
2. 使用邀请制 Auth、成员对授权范围明确同意、family/group/member 级 RLS、服务器端权限验证。Admin 只可读取授权范围；成员写自己的账户。Group Admin 另行定义范围，默认不可跨组。交易与计划状态应使用数据库事务及幂等键避免重复。
3. Cloudflare Workers：仅受认证用户访问，授权行情提供商 key 放 secret，后台去重、缓存、按交易日更新并记录每个 symbol 的 source 和 timestamp。没有权限或价格过期时明确提示。
4. Resend + Web Push/VAPID：服务端 outbox、每个接收人独立权限、去重、重试和发送日志；邮件与推送使用同一 plan ID。锁屏通知默认不显示财务金额。Push 必须通过真实安装的 PWA、用户主动许可及订阅来接收。
5. 最后用真实但脱敏的 Robinhood 截图做 OCR 测试，并在真实 iPhone/Android 上做安装和通知验证。

## 7. 本次测试

JavaScript syntax 检查通过。使用本地 Tesseract 对五张用户提供的真实截图执行 OCR，辅以局部裁切；随后在 Chromium 将 OCR 结果输入新版解析器，验证三类模板、账户类型、资产快照、累计存款/Match、精确股数、平均成本和行情参考值。一个 ticker 存在 I/l 歧义，已设计为建议值且必须逐行确认。浏览器交互测试通过：跨 IRA 自动排除、切换目标账户、重复截图、累计存款幂等、保留高精度股数、成员与家庭筛选、发布及确认买入计划、390px 手机布局。未验证浏览器 CDN OCR 完整加载/识别路径、真实 iPhone PWA 安装、Supabase、Email/Push 或行情服务。正式部署前仍需要完成第 6 节；本版只适合使用模拟数据测试。
