const STORAGE_KEY = "ccti-mvp-state-v1";
const VALID_SCREENS = new Set(["home", "test", "universe", "atlas", "villages", "tasks", "dashboard", "result"]);

const archetypes = [
  {
    id: "cyber_shepherd",
    name: "赛博放羊人",
    symbol: "CS",
    faction: "游牧者",
    drive: "build",
    domain: "pixel",
    social: "mute",
    linkage: "cloud",
    stageFocus: ["connect", "value"],
    code: "Cloud / Pixel / Mute",
    tags: ["AI", "数字游民", "远程赋能", "品牌系统"],
    tagline: "你适合把屏幕另一端的技术，翻译成乡村真实能用的工具。",
    summary: "你不一定要长期驻村，但很擅长用 AI、设计、自动化和内容系统为村庄补上一块数字能力。安静、专注、交付稳定，是你最有价值的协作方式。",
    strength: "远程交付、工具搭建、数字内容、信息整理",
    blindspot: "容易低估线下沟通成本，需要一个懂在地秩序的搭档。",
    nextStep: "先接一个 3 天内能完成的远程任务，把能力变成可见样品。",
    pairings: ["红头文件翻译官", "田间猎头", "土味主理人"],
    villages: ["创客型", "开放型", "数字游民友好型"],
    colors: ["#1f5b68", "#f4b942", "#e7f2ee"]
  },
  {
    id: "wildflower_poet",
    name: "野花诗人",
    symbol: "WP",
    faction: "归野者",
    drive: "zen",
    domain: "pixel",
    social: "mute",
    linkage: "explorer",
    stageFocus: ["escape", "connect"],
    code: "Explorer / Pixel / Mute",
    tags: ["自然观察", "内容创作", "疗愈", "美育"],
    tagline: "你会先听见风、光和人的细微变化，再把它们变成可被看见的故事。",
    summary: "你的价值不是把乡村包装得热闹，而是发现它本来存在的温度。摄影、文字、绘画、记录和美育都可能成为你进入乡村的第一把钥匙。",
    strength: "审美感知、文字影像、自然记录、情绪连接",
    blindspot: "容易停在感受层，需要小任务帮你把感受转成行动。",
    nextStep: "从一次村庄观察日记或一组照片开始，积累自己的乡村表达样本。",
    pairings: ["大地堡垒", "土味主理人", "篝火局长"],
    villages: ["文艺型", "自然疗愈型", "公共文化型"],
    colors: ["#6e8d49", "#d65a31", "#fff7e2"]
  },
  {
    id: "earthy_operator",
    name: "土味主理人",
    symbol: "EO",
    faction: "造村者",
    drive: "build",
    domain: "soil",
    social: "loud",
    linkage: "rooted",
    stageFocus: ["connect", "value", "node"],
    code: "Rooted / Soil / Loud",
    tags: ["空间改造", "民宿", "在地运营", "社区营造"],
    tagline: "你适合把一块闲置空间，慢慢经营成有人气、有秩序、有收入的现场。",
    summary: "你有把人、空间、村民关系和日常运营拧在一起的能力。你不是只做概念的人，而是能把想法落到桌椅、动线、菜单、活动和现金流里的人。",
    strength: "线下运营、空间组织、村民沟通、活动落地",
    blindspot: "容易把太多事扛在自己身上，需要稳定分工和财务节奏。",
    nextStep: "梳理一个可复制的小空间模型，从一场活动或一个周末项目试起。",
    pairings: ["赛博放羊人", "野花诗人", "红头文件翻译官"],
    villages: ["开放型", "文旅基础型", "闲置空间型"],
    colors: ["#255f50", "#d65a31", "#f4f7f2"]
  },
  {
    id: "policy_translator",
    name: "红头文件翻译官",
    symbol: "PT",
    faction: "守望者",
    drive: "build",
    domain: "soil",
    social: "mute",
    linkage: "migratory",
    stageFocus: ["value", "node"],
    code: "Migratory / Soil / Mute",
    tags: ["政策", "资源对接", "风险控制", "项目操盘"],
    tagline: "你能把看不懂的政策、流程和风险，翻译成团队能执行的路线图。",
    summary: "你不一定是最外放的人，但你很清楚乡村项目真正卡在哪里。政策、审批、预算、产权、合作边界，是你能帮团队守住的底线。",
    strength: "政策拆解、风险识别、流程管理、资源协调",
    blindspot: "表达可能偏严肃，需要和会讲故事的人一起把价值讲出去。",
    nextStep: "为一个乡创想法做一页风险清单，先帮团队少踩坑。",
    pairings: ["赛博放羊人", "土味主理人", "田间猎头"],
    villages: ["保守转型型", "治理复杂型", "项目申报型"],
    colors: ["#2d4e8f", "#f4b942", "#eef2f8"]
  },
  {
    id: "campfire_director",
    name: "篝火局长",
    symbol: "CD",
    faction: "归野者",
    drive: "zen",
    domain: "pixel",
    social: "loud",
    linkage: "explorer",
    stageFocus: ["connect", "node"],
    code: "Explorer / Pixel / Loud",
    tags: ["社群组织", "活动策划", "氛围制造", "青年连接"],
    tagline: "你适合点燃第一场聚会，让彼此陌生的人开始愿意一起做点什么。",
    summary: "你的天赋在于把空气变热，把人和人之间的冰融开。你能让乡村活动从冷启动变成真正有人留下来的社群现场。",
    strength: "活动发起、破冰连接、社群运营、传播动员",
    blindspot: "点子容易太多，需要一个能控预算和排期的搭档。",
    nextStep: "先组织一场 10-20 人的小活动，保留名单、反馈和复盘。",
    pairings: ["大地堡垒", "流动图书馆馆长", "红头文件翻译官"],
    villages: ["青年活动型", "文艺型", "开放型"],
    colors: ["#d65a31", "#2d4e8f", "#fff1e9"]
  },
  {
    id: "dreamcatcher_host",
    name: "捕梦网主理人",
    symbol: "DH",
    faction: "归野者",
    drive: "zen",
    domain: "pixel",
    social: "loud",
    linkage: "explorer",
    stageFocus: ["connect", "value"],
    code: "Explorer / Pixel / Loud",
    tags: ["儿童美育", "公益教育", "工作坊", "情感陪伴"],
    tagline: "你适合把课程、游戏和陪伴，织成乡村儿童能真正接住的体验。",
    summary: "你有耐心，也懂得如何把艺术、阅读、自然观察和情绪表达变成工作坊。你的参与方式往往柔软，但能留下很长的回响。",
    strength: "课程设计、儿童陪伴、工作坊组织、情绪感知",
    blindspot: "需要提前确认在地需求，避免把城市课程直接搬过去。",
    nextStep: "设计一节 45 分钟的自然美育课，并找一个真实场景试讲。",
    pairings: ["流动图书馆馆长", "土味主理人", "乡野匠人"],
    villages: ["儿童友好型", "公共文化型", "文艺型"],
    colors: ["#7a4f9a", "#f4b942", "#f3eef7"]
  },
  {
    id: "village_hacker",
    name: "村庄黑客",
    symbol: "VH",
    faction: "游牧者",
    drive: "build",
    domain: "pixel",
    social: "mute",
    linkage: "cloud",
    stageFocus: ["value", "node"],
    code: "Cloud / Pixel / Mute",
    tags: ["AI 工具", "数据", "系统设计", "技术落地"],
    tagline: "你适合直接拆问题、写流程、搭系统，把乡村痛点变成可运行的方案。",
    summary: "你关注的是效率和可复制性。对你来说，乡村不是浪漫滤镜，而是一组可以被数据、工具和流程优化的真实问题。",
    strength: "系统设计、数据采集、自动化、技术诊断",
    blindspot: "容易先做工具再找需求，需要和在地使用者反复对齐。",
    nextStep: "选择一个具体痛点，做出最小可用工具或流程模板。",
    pairings: ["红头文件翻译官", "田间猎头", "土味主理人"],
    villages: ["创客型", "产业升级型", "数字基础型"],
    colors: ["#16231f", "#4aa3a2", "#e9f4f0"]
  },
  {
    id: "cloud_landlord",
    name: "云端地主",
    symbol: "CL",
    faction: "游牧者",
    drive: "build",
    domain: "pixel",
    social: "loud",
    linkage: "migratory",
    stageFocus: ["value", "node"],
    code: "Migratory / Pixel / Loud",
    tags: ["远程办公", "数字游民营地", "资源整合", "联合办公"],
    tagline: "你适合把远程办公的人、空间、网络和乡村资源组织成一个新据点。",
    summary: "你能理解城市青年的工作方式，也能看见乡村空间的潜力。你的关键能力是把流动的人变成稳定的协作网络。",
    strength: "资源整合、营地运营、社群转化、商业设计",
    blindspot: "容易过早扩大规模，需要先验证淡旺季和真实入住需求。",
    nextStep: "先做一场 7 天共居共创试验，验证空间、网络和活动节奏。",
    pairings: ["赛博放羊人", "篝火局长", "红头文件翻译官"],
    villages: ["数字游民友好型", "文旅基础型", "交通便利型"],
    colors: ["#2d4e8f", "#3d7a66", "#edf3f0"]
  },
  {
    id: "earth_fortress",
    name: "大地堡垒",
    symbol: "EF",
    faction: "造村者",
    drive: "build",
    domain: "soil",
    social: "mute",
    linkage: "rooted",
    stageFocus: ["connect", "value"],
    code: "Rooted / Soil / Mute",
    tags: ["木工", "农业", "修缮", "建造"],
    tagline: "你适合把事情一点点做实，让乡村项目有能站得住的地基。",
    summary: "你不一定爱表达，但你会修、会种、会搭、会守。很多乡创项目真正需要的不是更多口号，而是你这种稳定的落地能力。",
    strength: "手作建造、基础维护、农业实践、长期执行",
    blindspot: "容易被低估，需要把过程记录下来，让贡献被看见。",
    nextStep: "选一个可完成的小修缮或种植任务，记录前后变化。",
    pairings: ["野花诗人", "篝火局长", "土味主理人"],
    villages: ["农业基础型", "空间修缮型", "长期建设型"],
    colors: ["#5a6b35", "#d65a31", "#f3f6ed"]
  },
  {
    id: "field_headhunter",
    name: "田间猎头",
    symbol: "FH",
    faction: "游牧者",
    drive: "build",
    domain: "pixel",
    social: "loud",
    linkage: "migratory",
    stageFocus: ["value", "node"],
    code: "Migratory / Pixel / Loud",
    tags: ["人才匹配", "资源链接", "招募伙伴", "跨界协作"],
    tagline: "你适合在人群里发现合适的人，再把他们带到合适的村庄和项目里。",
    summary: "你对人很敏锐，知道谁能补团队的短板，也知道项目需要怎样的能力。你的价值不只在社交，而是在判断和撮合。",
    strength: "识人判断、资源链接、团队组建、跨圈传播",
    blindspot: "匹配之后还要跟进协作质量，否则关系会停在热闹层。",
    nextStep: "为一个真实任务列出 3 类必需角色，并邀请候选人。",
    pairings: ["村庄黑客", "红头文件翻译官", "大地堡垒"],
    villages: ["项目孵化型", "人才缺口型", "开放型"],
    colors: ["#d65a31", "#255f50", "#fff4ed"]
  },
  {
    id: "mobile_librarian",
    name: "流动图书馆馆长",
    symbol: "ML",
    faction: "守望者",
    drive: "zen",
    domain: "pixel",
    social: "mute",
    linkage: "migratory",
    stageFocus: ["connect", "value"],
    code: "Migratory / Pixel / Mute",
    tags: ["公共文化", "知识传播", "村史馆", "书籍流转"],
    tagline: "你适合把书、故事、档案和记忆，整理成乡村公共生活的一部分。",
    summary: "你擅长慢慢建立秩序：书架、目录、村史、访谈、展陈、阅读活动。你的工作常常安静，却能改变一个地方的文化密度。",
    strength: "知识整理、文化记录、公共空间、阅读活动",
    blindspot: "需要找到持续运营的人和场地，避免项目变成一次性布置。",
    nextStep: "先做一个 30 本书的小书架和一张借阅表，再观察使用情况。",
    pairings: ["捕梦网主理人", "篝火局长", "乡野匠人"],
    villages: ["公共文化型", "老龄化型", "村史资源型"],
    colors: ["#2d4e8f", "#f4b942", "#eef3ff"]
  },
  {
    id: "rural_artisan",
    name: "乡野匠人",
    symbol: "RA",
    faction: "守望者",
    drive: "build",
    domain: "soil",
    social: "mute",
    linkage: "rooted",
    stageFocus: ["value", "node"],
    code: "Rooted / Soil / Mute",
    tags: ["非遗", "手工艺", "在地技艺", "文化传承"],
    tagline: "你适合守住一门手艺，也适合让它在新的生活方式里重新被需要。",
    summary: "你更相信手上的功夫和时间的沉淀。你的角色不是怀旧，而是把在地技艺转成课程、产品、展陈和新的文化连接。",
    strength: "技艺传承、产品打磨、工作坊、在地知识",
    blindspot: "容易埋头做作品，需要懂传播和商业的人帮你打开市场。",
    nextStep: "把一项技艺拆成 3 步体验课，先让外来者能学会一小部分。",
    pairings: ["野花诗人", "捕梦网主理人", "田间猎头"],
    villages: ["非遗资源型", "手作产业型", "长期建设型"],
    colors: ["#6a4a2f", "#3d7a66", "#f6f0e8"]
  }
];

const questions = [
  {
    scene: "城市出口",
    title: "连续加班后，你终于有一个完整周末。你更想怎么靠近乡村？",
    options: [
      ["先找个安静村子住两晚，什么都不安排。", "让身体和情绪先回到地面。", { drive: { zen: 3 }, linkage: { explorer: 2 }, stage: { escape: 2 }, social: { mute: 1 } }],
      ["翻出一个乡村项目，看看自己能帮哪一块。", "意义感比休息更能让你回血。", { drive: { build: 3 }, stage: { value: 2 }, domain: { soil: 1 } }],
      ["打开 AI 和资料库，先做一份远程方案。", "能在线解决的问题就先在线推进。", { domain: { pixel: 3 }, linkage: { cloud: 2 }, social: { mute: 1 }, drive: { build: 1 } }],
      ["约几个人一起去踩点，路上就开始组局。", "你需要人和现场同时出现。", { social: { loud: 3 }, linkage: { migratory: 2 }, stage: { connect: 2 } }]
    ]
  },
  {
    scene: "村口现场",
    title: "第一次到合作村，村民围过来问你是来干嘛的。你会怎么回应？",
    options: [
      ["先听他们讲村里的事，不急着介绍自己。", "关系建立在理解之前。", { drive: { zen: 2 }, social: { mute: 2 }, stage: { connect: 1 }, linkage: { explorer: 1 } }],
      ["直接说清楚能做什么、多久交付、需要什么配合。", "边界越清楚，合作越稳。", { drive: { build: 2 }, domain: { soil: 2 }, stage: { value: 2 }, social: { mute: 1 } }],
      ["拿出作品案例，让大家先看到效果。", "样品比长篇解释更有说服力。", { domain: { pixel: 2 }, drive: { build: 1 }, stage: { value: 2 } }],
      ["把大家拉到一起聊，顺手组织一个小茶局。", "你相信气氛对了，事情就能开始。", { social: { loud: 3 }, stage: { connect: 2 }, linkage: { rooted: 1 } }]
    ]
  },
  {
    scene: "技能选择",
    title: "如果只能带一项能力进村，你最想带哪一项？",
    options: [
      ["影像、文字、设计或 AI 创作。", "把乡村之美转成可传播内容。", { domain: { pixel: 3 }, drive: { zen: 1 }, social: { mute: 1 } }],
      ["木工、种植、修缮或线下运营。", "让事情在现场真实发生。", { domain: { soil: 3 }, linkage: { rooted: 1 }, drive: { build: 1 } }],
      ["活动策划、社群组织、资源链接。", "让合适的人围到同一张桌子旁。", { social: { loud: 3 }, stage: { connect: 2 }, domain: { pixel: 1 } }],
      ["政策拆解、预算、流程和风险控制。", "先把坑填上，团队才跑得远。", { domain: { soil: 2 }, drive: { build: 2 }, social: { mute: 1 }, stage: { node: 1 } }]
    ]
  },
  {
    scene: "协作方式",
    title: "一个村庄需要帮忙做农产品包装，你最自然的参与方式是？",
    options: [
      ["远程做视觉和文案，按节点交付。", "你可以不在现场，但会准时上线。", { linkage: { cloud: 3 }, domain: { pixel: 3 }, social: { mute: 1 } }],
      ["去村里住几天，边看产品边改方案。", "你需要闻到现场的味道。", { linkage: { migratory: 3 }, domain: { pixel: 1 }, drive: { build: 1 } }],
      ["长期接手销售、陈列和复购运营。", "包装只是入口，经营才是核心。", { linkage: { rooted: 3 }, domain: { soil: 2 }, social: { loud: 1 }, stage: { value: 1 } }],
      ["先围观学习，顺手发一篇观察记录。", "你还在确认自己和乡村的距离。", { linkage: { explorer: 3 }, drive: { zen: 2 }, stage: { escape: 1 } }]
    ]
  },
  {
    scene: "团队短板",
    title: "你加入的小队全是点子王，但迟迟没有落地。你会怎么做？",
    options: [
      ["拉一张任务表，定负责人和截止时间。", "先让混乱变成进度。", { drive: { build: 3 }, domain: { soil: 2 }, stage: { value: 1 } }],
      ["找一个靠谱执行者加入。", "你知道队伍缺的不是灵感。", { social: { loud: 2 }, stage: { node: 2 }, drive: { build: 1 } }],
      ["做一个最小样品，不争论了先测试。", "样品会让团队从想象回到现实。", { domain: { pixel: 2 }, drive: { build: 2 }, social: { mute: 1 } }],
      ["先确认大家为什么想做这件事。", "动机不稳，排期也会崩。", { drive: { zen: 2 }, stage: { connect: 2 }, social: { mute: 1 } }]
    ]
  },
  {
    scene: "乡村夜晚",
    title: "夜里大家围坐聊天，你通常会变成哪种角色？",
    options: [
      ["安静听着，偶尔说一句很准的话。", "你的存在感不靠音量。", { social: { mute: 3 }, drive: { zen: 1 } }],
      ["把话题串起来，让每个人都加入。", "你天然会照顾场子。", { social: { loud: 3 }, stage: { connect: 1 } }],
      ["拿出电脑，把刚聊到的点整理成文档。", "灵感最好当天归档。", { domain: { pixel: 2 }, social: { mute: 1 }, drive: { build: 1 } }],
      ["问村里明天需要谁帮忙干活。", "聊完就该知道下一步。", { domain: { soil: 2 }, drive: { build: 2 }, linkage: { rooted: 1 } }]
    ]
  },
  {
    scene: "任务偏好",
    title: "以下哪种任务最让你愿意马上报名？",
    options: [
      ["为村里的旧照片做一次数字档案整理。", "记忆需要被好好保存。", { domain: { pixel: 2 }, social: { mute: 1 }, drive: { zen: 2 }, stage: { connect: 1 } }],
      ["修一个公共空间的长凳和招牌。", "用手做出来的东西最踏实。", { domain: { soil: 3 }, linkage: { rooted: 1 }, drive: { build: 2 } }],
      ["策划一场青年乡村晚会。", "现场的热度会带来新的关系。", { social: { loud: 3 }, linkage: { migratory: 1 }, stage: { connect: 2 } }],
      ["搭一个线上报名和资料收集表。", "流程顺了，后面就省力。", { domain: { pixel: 3 }, linkage: { cloud: 2 }, drive: { build: 1 } }]
    ]
  },
  {
    scene: "时间投入",
    title: "你目前最现实的乡村参与频率是？",
    options: [
      ["先看看、偶尔参加活动。", "你还在试探，不想一下子承诺太重。", { linkage: { explorer: 3 }, stage: { escape: 2 } }],
      ["每月或每季去几天。", "城市和乡村之间来回切换比较适合你。", { linkage: { migratory: 3 }, stage: { connect: 1 } }],
      ["主要远程参与，必要时到现场。", "你更擅长稳定在线。", { linkage: { cloud: 3 }, domain: { pixel: 1 } }],
      ["可以长期在村里扎下来。", "你愿意把生活和建设放在同一个地方。", { linkage: { rooted: 3 }, domain: { soil: 1 }, stage: { value: 1 } }]
    ]
  },
  {
    scene: "村格选择",
    title: "如果让你选择一个村庄开始，你更偏向哪一种？",
    options: [
      ["自然环境好、节奏慢，适合修复自己。", "你需要一段柔软的入口。", { drive: { zen: 3 }, linkage: { explorer: 1 }, stage: { escape: 2 } }],
      ["有闲置空间和产业基础，可以马上做项目。", "你希望看到真实增长。", { drive: { build: 3 }, domain: { soil: 1 }, stage: { value: 2 } }],
      ["有年轻人、网络好，适合远程办公和共创。", "你想把云端能力接到在地。", { domain: { pixel: 2 }, linkage: { cloud: 2 }, social: { loud: 1 } }],
      ["有非遗、村史或儿童空间，适合文化工作。", "文化和教育是你的入口。", { drive: { zen: 1 }, domain: { pixel: 1 }, stage: { connect: 2 } }]
    ]
  },
  {
    scene: "冲突处理",
    title: "团队和村里对方案产生分歧，你第一反应是？",
    options: [
      ["把双方真实顾虑列出来，再谈方案。", "你相信冲突背后有未被说出的需求。", { social: { mute: 1 }, drive: { zen: 2 }, stage: { connect: 2 } }],
      ["找关键人单独沟通，先稳定关系。", "关系稳住，事才谈得下去。", { social: { loud: 2 }, domain: { soil: 1 }, stage: { node: 1 } }],
      ["回到合同、预算和责任边界。", "模糊地带最容易伤害合作。", { domain: { soil: 2 }, drive: { build: 2 }, social: { mute: 1 } }],
      ["做 A/B 方案，用小范围试点说话。", "让结果帮大家降低争论。", { domain: { pixel: 2 }, drive: { build: 2 }, linkage: { cloud: 1 } }]
    ]
  },
  {
    scene: "成长阶段",
    title: "现在的你最接近哪一句话？",
    options: [
      ["我需要先从城市压力里缓一缓。", "乡村是恢复能量的地方。", { stage: { escape: 3 }, drive: { zen: 2 } }],
      ["我想认识一群能一起做事的人。", "关系网络比单点体验更重要。", { stage: { connect: 3 }, social: { loud: 1 } }],
      ["我已经想做一个能跑起来的项目。", "你需要真实产出和长期机制。", { stage: { value: 3 }, drive: { build: 2 } }],
      ["我想带人、带资源，做一个节点。", "你开始从参与者变成组织者。", { stage: { node: 3 }, social: { loud: 1 }, drive: { build: 1 } }]
    ]
  },
  {
    scene: "内容表达",
    title: "你看到一片快被遗忘的老屋，脑子里先出现什么？",
    options: [
      ["拍下来，写一段关于时间和人的文字。", "你先捕捉气味和情绪。", { domain: { pixel: 2 }, drive: { zen: 2 }, social: { mute: 1 } }],
      ["能不能改成工作坊、民宿或公共空间。", "你会自然评估空间潜力。", { domain: { soil: 2 }, drive: { build: 2 }, linkage: { rooted: 1 } }],
      ["需要查产权、结构安全和改造成本。", "你会先看风险和边界。", { domain: { soil: 2 }, social: { mute: 1 }, stage: { value: 1 } }],
      ["这里可以办一场很有记忆点的活动。", "你已经在想人群如何进入。", { social: { loud: 2 }, domain: { pixel: 1 }, stage: { connect: 2 } }]
    ]
  },
  {
    scene: "数字工具",
    title: "村里想提高农产品销量，你最想先做哪件事？",
    options: [
      ["梳理用户画像和卖点，重写详情页。", "先把话说清楚。", { domain: { pixel: 3 }, drive: { build: 1 }, linkage: { cloud: 1 } }],
      ["改包装、拍照片、做短视频脚本。", "让产品先变得能被理解和喜欢。", { domain: { pixel: 2 }, drive: { zen: 1 }, social: { mute: 1 } }],
      ["联系渠道、达人和团购资源。", "销售需要关系网络。", { social: { loud: 3 }, stage: { node: 1 }, drive: { build: 1 } }],
      ["先看产能、库存、物流和成本。", "卖得出去之前，要接得住订单。", { domain: { soil: 3 }, drive: { build: 2 }, social: { mute: 1 } }]
    ]
  },
  {
    scene: "儿童空间",
    title: "村里的儿童空间需要一次周末活动，你更想负责哪块？",
    options: [
      ["自然观察和绘本共读。", "你想把注意力还给孩子。", { drive: { zen: 2 }, domain: { pixel: 1 }, stage: { connect: 2 } }],
      ["活动流程、招募和现场氛围。", "你会让孩子、家长和志愿者都进入状态。", { social: { loud: 3 }, stage: { connect: 2 } }],
      ["手作材料、场地布置和安全检查。", "体验好不好，细节会说话。", { domain: { soil: 2 }, drive: { build: 1 }, social: { mute: 1 } }],
      ["线上报名表、照片归档和复盘报告。", "一次活动也要留下可复用资产。", { domain: { pixel: 2 }, linkage: { cloud: 1 }, stage: { value: 1 } }]
    ]
  },
  {
    scene: "长期关系",
    title: "你理想中的乡村关系更像什么？",
    options: [
      ["一个能偶尔回去充电的地方。", "不必占有，保持连接就好。", { drive: { zen: 2 }, linkage: { explorer: 2 }, stage: { escape: 1 } }],
      ["一个可以周期性共创的基地。", "每次来都让事情往前一点。", { linkage: { migratory: 3 }, stage: { value: 1 }, drive: { build: 1 } }],
      ["一个线上线下一直协作的网络。", "地理距离不该限制参与。", { linkage: { cloud: 3 }, domain: { pixel: 2 } }],
      ["一个真正生活和工作的地方。", "你愿意把根扎进日常。", { linkage: { rooted: 3 }, domain: { soil: 1 }, drive: { build: 1 } }]
    ]
  },
  {
    scene: "项目启动",
    title: "如果你发起一个乡创小项目，第一份文件会是什么？",
    options: [
      ["一页愿景和故事。", "先让人知道为什么值得做。", { drive: { zen: 2 }, domain: { pixel: 1 }, social: { loud: 1 } }],
      ["一张任务排期表。", "没有排期的热情很快会散。", { drive: { build: 2 }, domain: { soil: 2 }, stage: { value: 1 } }],
      ["一个角色招募清单。", "你先看队伍缺什么人。", { social: { loud: 2 }, stage: { node: 2 } }],
      ["一个最小可行 demo。", "能跑起来的东西最诚实。", { domain: { pixel: 2 }, drive: { build: 2 }, social: { mute: 1 } }]
    ]
  },
  {
    scene: "价值判断",
    title: "你最希望别人如何评价你的乡村参与？",
    options: [
      ["他让我们重新看见这个地方的美。", "你在意感受被重新打开。", { drive: { zen: 3 }, domain: { pixel: 1 } }],
      ["他真的把事情做成了。", "结果对你很重要。", { drive: { build: 3 }, domain: { soil: 1 }, stage: { value: 1 } }],
      ["他带来了很多合适的人。", "你是关系网络的放大器。", { social: { loud: 3 }, stage: { node: 2 } }],
      ["他留下了一套别人还能继续用的方法。", "可复制性是你的浪漫。", { domain: { pixel: 2 }, drive: { build: 2 }, social: { mute: 1 } }]
    ]
  },
  {
    scene: "线下落地",
    title: "到了村里后，你最不能忍受哪种情况？",
    options: [
      ["大家一直开会，但没人动手。", "你需要看到实物和进度。", { drive: { build: 2 }, domain: { soil: 2 } }],
      ["只有活动热闹，结束后没有沉淀。", "你在意长期机制。", { drive: { build: 2 }, stage: { value: 2 }, social: { mute: 1 } }],
      ["没人听村民真实想法。", "你在意关系里的尊重。", { drive: { zen: 2 }, stage: { connect: 2 } }],
      ["好资源没人整理，信息到处散落。", "你想把混乱变成系统。", { domain: { pixel: 2 }, social: { mute: 1 }, drive: { build: 1 } }]
    ]
  },
  {
    scene: "个人能量",
    title: "在一个 10 人共创营里，你最舒服的位置是？",
    options: [
      ["负责一个安静但关键的模块。", "少说话也能交付高质量。", { social: { mute: 3 }, domain: { pixel: 1 } }],
      ["负责全场流程和大家的状态。", "你能感觉到谁掉线了。", { social: { loud: 3 }, stage: { connect: 1 } }],
      ["负责工具、资料和复盘。", "你是团队的系统缓存。", { domain: { pixel: 2 }, social: { mute: 1 }, drive: { build: 1 } }],
      ["负责现场物料、动线和执行。", "你会把事情摆到正确位置。", { domain: { soil: 2 }, drive: { build: 1 }, linkage: { rooted: 1 } }]
    ]
  },
  {
    scene: "未来角色",
    title: "三年后，你希望自己在乡创网络里更像哪种人？",
    options: [
      ["持续记录乡村变化的创作者。", "你想让更多人看见乡村的细节。", { drive: { zen: 2 }, domain: { pixel: 2 }, stage: { value: 1 } }],
      ["能独立运营一个乡村空间的主理人。", "你想拥有一个真实现场。", { linkage: { rooted: 2 }, domain: { soil: 2 }, drive: { build: 2 } }],
      ["连接城市青年和乡村项目的组织者。", "你想成为网络节点。", { social: { loud: 2 }, linkage: { migratory: 1 }, stage: { node: 3 } }],
      ["用技术和方法帮很多村庄降本增效的人。", "你想把能力规模化。", { domain: { pixel: 3 }, linkage: { cloud: 2 }, drive: { build: 2 } }]
    ]
  },
].map((question) => ({
  ...question,
  options: question.options.map(([label, helper, scores], index) => ({
    key: String.fromCharCode(65 + index),
    label,
    helper,
    scores
  }))
}));

const tasks = [
  {
    id: "ai_packaging",
    title: "农产品包装一页改造",
    type: "云端",
    summary: "为一个真实农产品输出命名、卖点、包装方向和 3 条短文案。",
    tags: ["AI", "设计", "文案"],
    fit: { domain: ["pixel"], linkage: ["cloud"], drive: ["build"] },
    recommendedFor: ["cyber_shepherd", "village_hacker", "wildflower_poet"]
  },
  {
    id: "public_bench",
    title: "公共长凳修缮日",
    type: "在地",
    summary: "完成一个公共空间的小修缮，记录材料、工时和前后对比。",
    tags: ["木工", "修缮", "记录"],
    fit: { domain: ["soil"], linkage: ["rooted"], drive: ["build"] },
    recommendedFor: ["earth_fortress", "earthy_operator", "rural_artisan"]
  },
  {
    id: "village_archive",
    title: "村史照片数字档案",
    type: "候鸟",
    summary: "采访 3 位村民，整理 20 张老照片，形成一份轻量村史页面。",
    tags: ["档案", "访谈", "公共文化"],
    fit: { domain: ["pixel"], linkage: ["migratory"], drive: ["zen"] },
    recommendedFor: ["mobile_librarian", "wildflower_poet", "policy_translator"]
  },
  {
    id: "children_workshop",
    title: "自然美育 45 分钟课",
    type: "探索",
    summary: "设计并试跑一节儿童自然观察课，沉淀教案、物料和复盘。",
    tags: ["儿童", "美育", "工作坊"],
    fit: { domain: ["pixel"], linkage: ["explorer"], drive: ["zen"], social: ["loud"] },
    recommendedFor: ["dreamcatcher_host", "mobile_librarian", "campfire_director"]
  },
  {
    id: "campfire_night",
    title: "青年乡村篝火夜",
    type: "团队",
    summary: "组织 15-30 人的低门槛交流活动，目标是形成下一批任务小队。",
    tags: ["活动", "社群", "招募"],
    fit: { social: ["loud"], linkage: ["migratory", "explorer"] },
    recommendedFor: ["campfire_director", "field_headhunter", "cloud_landlord"]
  },
  {
    id: "policy_sheet",
    title: "乡创项目风险清单",
    type: "云端",
    summary: "把一个项目拆成政策、产权、预算、运营和安全 5 类风险。",
    tags: ["政策", "流程", "风控"],
    fit: { domain: ["soil"], social: ["mute"], drive: ["build"] },
    recommendedFor: ["policy_translator", "earthy_operator", "village_hacker"]
  },
  {
    id: "digital_nomad_week",
    title: "7 天数字游民共居试验",
    type: "候鸟",
    summary: "验证空间、网络、工作节奏和社群活动，输出一份营地复盘。",
    tags: ["营地", "远程办公", "共创"],
    fit: { social: ["loud"], linkage: ["migratory"], domain: ["pixel"] },
    recommendedFor: ["cloud_landlord", "campfire_director", "cyber_shepherd"]
  },
  {
    id: "craft_microclass",
    title: "非遗手作体验课拆解",
    type: "在地",
    summary: "把一项在地技艺拆成可体验的 3 步课程，并设计报名页文案。",
    tags: ["非遗", "课程", "产品"],
    fit: { domain: ["soil"], linkage: ["rooted"], drive: ["build"] },
    recommendedFor: ["rural_artisan", "dreamcatcher_host", "field_headhunter"]
  },
  {
    id: "team_roster",
    title: "共创小队角色招募",
    type: "团队",
    summary: "为一个乡村需求配置 4 类角色，发布招募文案并筛选候选人。",
    tags: ["组队", "人才", "资源"],
    fit: { social: ["loud"], drive: ["build"] },
    recommendedFor: ["field_headhunter", "policy_translator", "earthy_operator"]
  }
];

const villageProfiles = [
  {
    id: "hollow_activation",
    name: "待激活空心村",
    type: "待激活空心村",
    location: "广东清远·三和村",
    summary: "闲置农房连片，基础薄弱但租金极低。适合从零搭建小空间模型，验证修缮、运营和在地关系的闭环。",
    needs: ["空间修缮", "产业导入", "村民沟通", "运营模型"],
    tags: ["老屋资源", "低成本启动", "从零到一", "长期建设"],
    scores: { open: 55, culture: 60, industry: 25, digital: 20 },
    fit: { action: ["build"], linkage: ["rooted", "migratory"], orientation: ["craft", "system"] },
    stage: ["connect", "value"],
    color: "#6a4a2f",
    caseName: "三禾·稻里民宿",
    caseSummary: "广东清远三坑镇三和村，曾是'无环境、无产业、无发展'的三无村。政府实行风险兜底机制，镇属公司统一流转闲置用地，引入社会资本打造温泉民宿集群。2023年吸引超60万游客，经济效益超2亿元，入选《2024世界旅游联盟：旅游助力乡村振兴案例》。40位村民就地就业，年工资收入达5万元。"
  },
  {
    id: "culture_tourism",
    name: "文旅机遇村",
    type: "文旅机遇村",
    location: "浙江安吉·余村",
    summary: "已有一定文旅流量和基础设施，需要内容策划、社群运营和新业态孵化能力的人持续注入活力。",
    needs: ["内容策划", "社群运营", "新业态孵化", "品牌传播"],
    tags: ["流量基础", "青年社群", "空间充足", "政策支持"],
    scores: { open: 90, culture: 80, industry: 65, digital: 82 },
    fit: { action: ["transform", "perceive"], linkage: ["migratory", "cloud"], orientation: ["emotion", "system"] },
    stage: ["value", "node"],
    color: "#255f50",
    caseName: "DN余村数字游民公社",
    caseSummary: "浙江安吉余村，'绿水青山就是金山银山'理念发源地。2023年建成全国规模最大的数字游民社区DN余村，7188㎡容纳140人办公居住，入驻率保持95%以上。累计接待超700名数字游民，落地60多个新经济项目。创新'云村民→数字游民→全球合伙人'三步走入乡路径，注册云村民超7万人。新乡民数量已超过原乡民。"
  },
  {
    id: "industry_practical",
    name: "产业实干村",
    type: "产业实干村",
    location: "宁夏中宁·枸杞产区",
    summary: "有特色农产品或加工基础，需要技术升级、品牌包装和供应链组织能力，把好东西卖出好价格。",
    needs: ["品牌包装", "电商运营", "加工技术", "供应链管理"],
    tags: ["特色物产", "产业升级", "技术赋能", "市场对接"],
    scores: { open: 60, culture: 45, industry: 88, digital: 50 },
    fit: { action: ["build", "transform"], linkage: ["migratory", "rooted"], orientation: ["craft", "system"] },
    stage: ["value", "node"],
    color: "#d65a31",
    caseName: "中宁枸杞产业链",
    caseSummary: "宁夏中宁县是世界枸杞发源地，'中宁枸杞'品牌价值超190亿元。通过'龙头企业+合作社+农户'模式，构建了种植、加工、研发、电商、文旅全产业链。开发枸杞原浆、枸杞芽茶等深加工产品，与福建武夷山红茶跨界融合探索'山海协作'。全县枸杞种植面积达18万亩，综合产值突破130亿元，直接带动10万余农户增收。"
  },
  {
    id: "suburban_new",
    name: "城郊新乡村",
    type: "城郊新乡村",
    location: "江苏无锡·桃源村",
    summary: "距城市1小时以内，基础设施较好，适合城乡双栖的'钟摆人'落地小业态、验证商业模式。",
    needs: ["业态孵化", "周末运营", "设计策划", "社群连接"],
    tags: ["交通便利", "基建完善", "低风险", "双栖友好"],
    scores: { open: 85, culture: 75, industry: 72, digital: 70 },
    fit: { action: ["transform", "build"], linkage: ["migratory", "cloud"], orientation: ["craft", "system"] },
    stage: ["connect", "value"],
    color: "#2d4e8f",
    caseName: "山南头整村改造",
    caseSummary: "江苏无锡阳山镇桃源村山南头，曾是民居闲置率高达80%的典型空心村。通过'三块地'改革，聘请专业团队整村规划，按照'三原翻建+集中移建+抗震加固'三种模式推进农房翻建。盘活闲置宅基地建设集体用房近3万㎡，招引美术馆、咖啡馆、派对空间等17个项目。2024年村级固定收入达641万元，农民人均收入超7.7万元。"
  },
  {
    id: "art_experiment",
    name: "艺术实验田",
    type: "艺术实验田",
    location: "福建屏南·龙潭村",
    summary: "已有艺术家和新村民聚集、文创氛围浓厚，适合创作、策展、美育和社区营造类项目扎根生长。",
    needs: ["艺术策展", "美育课程", "社群营造", "文创开发"],
    tags: ["文创氛围", "新村民社群", "古建活化", "艺术驻留"],
    scores: { open: 88, culture: 95, industry: 55, digital: 62 },
    fit: { action: ["perceive", "transform"], linkage: ["rooted", "migratory"], orientation: ["emotion", "craft"] },
    stage: ["connect", "value", "node"],
    color: "#7a4f9a",
    caseName: "龙潭村文创振兴",
    caseSummary: "福建屏南县龙潭村，一座500余年历史的传统古村落。2017年前仅剩100余留守老人，59座古宅空置荒芜。通过'人人都是艺术家'公益艺术教学和'新村民'招募，吸引130多名来自全国各地的画家、音乐人、设计师入驻创业，把老宅改造为47家民宿、书吧、咖啡馆、工作室。2024年接待游客超60万人次，村集体收入达78.73万元，农民人均可支配收入从7600元跃升至35000元，增长360%。龙潭村入选文旅部乡村旅游扶贫示范案例。"
  },
  {
    id: "pristine_haven",
    name: "原生秘境村",
    type: "原生秘境村",
    location: "云南大理·云谷",
    summary: "自然景观极佳但交通不便、节奏缓慢，适合自然观察、疗愈内容创作、深度驻留和慢生活方式实验。",
    needs: ["自然记录", "疗愈内容", "生态保护", "慢生活运营"],
    tags: ["极致自然", "慢节奏", "深度驻留", "疗愈空间"],
    scores: { open: 50, culture: 70, industry: 20, digital: 25 },
    fit: { action: ["perceive"], linkage: ["rooted", "migratory"], orientation: ["emotion"] },
    stage: ["escape", "connect"],
    color: "#6e8d49",
    caseName: "大理云谷疗愈社区",
    caseSummary: "云南大理苍山脚下的山谷村落，以慢生活、自然疗愈和社区营造闻名。新村民将白族老院改造为疗愈空间、美育工坊和生态农场，发展出禅修、瑜伽、自然教育、手作体验等多元业态。吸引了大批从一线城市'逃离'的创意工作者，形成了一种低密度、高连接的自组织社区模式，成为国内'旅居式乡建'的标杆样本。"
  }
];

const xctiAxis = {
  action: {
    perceive: { label: "感知", prefix: "感知者", color: "#e6d5b8", drive: "zen", domain: "pixel", strength: "触觉、审美、同理心、记录" },
    build: { label: "建造", prefix: "建造者", color: "#829460", drive: "build", domain: "soil", strength: "物理落地、硬核产出、技艺、维护" },
    transform: { label: "转化", prefix: "转化者", color: "#4e6c50", drive: "build", domain: "pixel", strength: "连接、做局、组装、破壁" }
  },
  linkage: {
    rooted: { label: "在地", suffix: "在地型", text: "泥巴度 100%。肉身扎根，活成村里的一棵树。", stage: ["connect", "value", "node"] },
    migratory: { label: "流动", suffix: "流动型", text: "钟摆生存。像季风一样往返，城乡双栖。", stage: ["connect", "value"] },
    cloud: { label: "云端", suffix: "云端型", text: "赛博放牧。身在格子间，键盘在田野，流而不离。", stage: ["value", "node"] }
  },
  orientation: {
    emotion: { label: "情感", text: "关系本位。修补人际，提供附近性的温暖。", social: "loud" },
    craft: { label: "技艺", text: "作品本位。拿产品、代码或视觉硬实力说话。", social: "mute" },
    system: { label: "组织", text: "机制本位。搭框架、分利益、搞系统闭环。", social: "loud" }
  }
};

const xctiRows = [
  ["01", "PRE", "野花通灵师", "长驻村落。对大地的微观变化与村民的细微情绪有极高共情力的精神原住民。"],
  ["02", "PRC", "田野引路人", "长驻村落。精通自然观察或在地美育，带着外部访客和孩子用脚步丈量风土的向导。"],
  ["03", "PRS", "风土倾听者", "长驻村落。通过口述史、社会调研理顺乡村记忆，为底层治理提供理性依据的清醒记录者。"],
  ["04", "PME", "季风体验官", "城乡双栖。钟摆式进村，通过高品质的肉身参与，为村落带来外部视角的重度观察者。"],
  ["05", "PMC", "山野拾荒者", "城乡双栖。带着搜集癖漫游不同村落，寻找老物件、旧技艺并做现代化翻译的像素游侠。"],
  ["06", "PMS", "巡回号脉师", "城乡双栖。带着清醒客观的第三方视角定期进村，为乡村组织与空间痛点做诊断的专家。"],
  ["07", "PCE", "泥土精神股东", "云端协作。身在格子间，心在泥土中，在网络上长期为特定村落的喜怒哀乐摇旗呐喊的人。"],
  ["08", "PCC", "云游叙事者", "云端协作。用精湛的数字媒体与音视频剪辑技术，在远程将乡村风物翻译给城市消费者的天才。"],
  ["09", "PCS", "数字风土智库", "云端协作。远程收集多地乡创样本，进行底层数据编码与比较研究的云端大脑。"],
  ["10", "BRE", "大地料理师", "长驻村落。扎根乡村厨房、手作坊，用有风味、有人情味的产品温暖在场社区的疗愈匠人。"],
  ["11", "BRC", "在地守艺人", "长驻村落。不搞宏大叙事，纯粹依靠双手、设计或硬核技术重塑局部空间的实干派。"],
  ["12", "BRS", "生态修复师", "长驻村落。用硬核系统工程死磕乡村物理环境改良的学者型农人。"],
  ["13", "BME", "温度重塑者", "城乡双栖。阶段性进村，把冷冰冰的废弃空间改造成充满壁炉与人情温度空间的魔法师。"],
  ["14", "BMC", "季风工作坊主", "城乡双栖。携带专业技术，周期性进村通过短期工作坊实现高爆发作品产出的技能候鸟。"],
  ["15", "BMS", "柔性更新者", "城乡双栖。阶段性介入，帮村落做微景观改造、产业系统搭建的结构工程师。"],
  ["16", "BCE", "视觉翻译官", "云端协作。在云端将粗糙的乡村农副产品，用温情与高级感的视觉、包装进行重塑的极客。"],
  ["17", "BCC", "赛博数字匠", "云端协作。远程产出高精度施工图、代码或工业设计，流而不离的技术中流砥柱。"],
  ["18", "BCS", "乡村后端架设师", "云端协作。用财务模型、合作社 ERP 系统或代码为乡村集体经济搭建硬核后台的架构师。"],
  ["19", "CRE", "大地策展人", "长驻村落。用公共艺术节、村口篝火局、在地戏剧等文化活动激活凝聚力的灵魂人物。"],
  ["20", "CRC", "共生体系主理人", "长驻村落。用系统运营技能维持青年社区、村民、地方三方咬合运转的硬核管家。"],
  ["21", "CRS", "新乡民守门人", "长驻村落。驻村青创基地的全职操盘手，理顺复杂利益网络、安顿新来伙伴的老大哥。"],
  ["22", "CME", "社群云主理", "城乡双栖。往返两端，在线上线下维护乡创社群温度，让流动青年产生精神家园认同。"],
  ["23", "CMC", "乡创合伙人", "城乡双栖。频繁下乡，用商务嗅觉和技艺转化力，为乡村风物寻找城市买单方的买手。"],
  ["24", "CMS", "资源摆渡人", "城乡双栖。把城市商业资本、品牌与乡村集体经济进行机制缝合的红娘。"],
  ["25", "CCE", "数字田园织网手", "云端协作。远程运营线上互助网络、公益系统，用分布式协同给乡村弱势群体提供情感连接。"],
  ["26", "CCC", "乡创全息导师", "云端协作。远程给多个年轻团队做技术指导，用经验和硬核技艺为后辈遮风挡雨的伯乐。"],
  ["27", "CCS", "开源乡村架构师", "云端协作。用 Notion、GitHub 或分布式协作流搭建线上共创系统的数字总师。"]
];

const xctiArchetypes = xctiRows.map(buildXctiArchetype);

const xctiQuestions = [
  makeXctiQuestion("世界线认领", "现在的你，更像处于哪种状态？", [
    ["白天在城市系统里运转，夜晚反复幻想另一种生活。", { action: { perceive: 2 }, linkage: { cloud: 1 }, orientation: { emotion: 1 }, stage: { escape: 2 } }],
    ["已经进入乡村或流动现场，正在真实面对理想与现实。", { action: { build: 1, transform: 1 }, linkage: { rooted: 2, migratory: 1 }, orientation: { system: 1 }, stage: { value: 2 } }]
  ]),
  makeXctiQuestion("世界线认领", "哪句话更接近你最近一年的人生感受？", [
    ["我越来越像系统里的零件，每天都觉得在被消耗。", { action: { perceive: 2 }, linkage: { cloud: 1 }, orientation: { emotion: 1 }, stage: { escape: 2 } }],
    ["我想离真实世界近一点，但不知道怎么迈出那一步。", { action: { perceive: 1 }, linkage: { migratory: 1 }, orientation: { craft: 1 }, stage: { connect: 2 } }],
    ["我还没找到真正想扎根的地方。", { linkage: { migratory: 2, cloud: 1 }, orientation: { emotion: 1 }, stage: { escape: 1 } }],
    ["理想很热，但现实真的很重，我在咬牙撑着。", { action: { build: 2 }, linkage: { rooted: 2 }, orientation: { system: 1 }, stage: { value: 2 } }],
    ["我开始理解土地比想象中复杂得多。", { action: { perceive: 1, build: 1 }, linkage: { rooted: 2 }, orientation: { system: 1 }, stage: { connect: 1 } }],
    ["我正在学着用长期主义的方式活，但偶尔也会怀疑。", { action: { transform: 1 }, linkage: { rooted: 1 }, orientation: { system: 2 }, stage: { node: 1 } }]
  ]),
  makeXctiQuestion("世界线认领", "如果把乡创比作一场文明实验，你觉得自己更像？", [
    ["准备进入实验的人。", { action: { perceive: 1 }, linkage: { migratory: 1 }, orientation: { emotion: 1 }, stage: { connect: 1 } }],
    ["远程观察的人。", { action: { perceive: 1 }, linkage: { cloud: 2 }, orientation: { system: 1 }, stage: { escape: 1 } }],
    ["被召唤但还在犹豫的人。", { action: { perceive: 2 }, linkage: { cloud: 1 }, orientation: { emotion: 1 }, stage: { escape: 2 } }],
    ["正在施工的人。", { action: { build: 2 }, linkage: { rooted: 2 }, orientation: { craft: 1 }, stage: { value: 1 } }],
    ["已经疲惫但没离开的人。", { action: { build: 1 }, linkage: { rooted: 2 }, orientation: { emotion: 1 }, stage: { value: 1 } }],
    ["试图搭建系统的人。", { action: { transform: 2 }, linkage: { cloud: 1, rooted: 1 }, orientation: { system: 2 }, stage: { node: 2 } }]
  ]),
  makeXctiQuestion("精神内伤", "连续高强度工作或处理事务后，你最想做的是？", [
    ["一个人消失到山里，谁也别找我。", { action: { perceive: 2 }, linkage: { rooted: 1 }, orientation: { emotion: 1 }, stage: { escape: 2 }, energy: { low: 2 } }],
    ["找最信任的人深聊到凌晨。", { action: { transform: 1 }, linkage: { migratory: 1 }, orientation: { emotion: 2 }, energy: { social: 1 } }],
    ["睡觉，断网，睡到自然醒。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { emotion: 1 }, energy: { low: 2 } }],
    ["离开当下环境，去另一个地方走走。", { action: { perceive: 1 }, linkage: { migratory: 2 }, orientation: { emotion: 1 } }],
    ["做一顿饭，把房间或空间收拾干净。", { action: { build: 2 }, linkage: { rooted: 1 }, orientation: { emotion: 1, craft: 1 } }],
    ["突然开启一个新计划。", { action: { transform: 2 }, linkage: { cloud: 1 }, orientation: { system: 1 }, stage: { value: 1 } }]
  ]),
  makeXctiQuestion("精神内伤", "哪种瞬间最容易让你觉得不想这样活了？", [
    ["所有人都面无表情地刷手机。", { action: { perceive: 1 }, orientation: { emotion: 2 }, stage: { escape: 1 } }],
    ["加班改一份明天可能就被推翻的方案。", { action: { build: 1 }, orientation: { craft: 1 }, energy: { low: 1 } }],
    ["聚会上每个人都在表演自己，没有一句真话。", { action: { transform: 1 }, orientation: { emotion: 2 } }],
    ["一整天没有碰到泥土、植物、风。", { action: { perceive: 2 }, linkage: { rooted: 1 }, orientation: { emotion: 1 } }],
    ["忙忙碌碌，但好像什么都没真正改变。", { action: { build: 1, transform: 1 }, orientation: { system: 1 }, energy: { low: 1 } }],
    ["创造欲被一点点掏空。", { action: { perceive: 1, build: 1 }, orientation: { craft: 2 } }]
  ]),
  makeXctiQuestion("精神内伤", "如果突然获得一个月完全自由时间，你更可能？", [
    ["去乡村长住，彻底放空。", { action: { perceive: 2 }, linkage: { rooted: 2 }, orientation: { emotion: 1 }, stage: { escape: 2 } }],
    ["在家独处，读书、发呆、做饭。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { emotion: 1 } }],
    ["发起一个一直想做的小项目。", { action: { transform: 2 }, orientation: { system: 1 }, stage: { value: 1 } }],
    ["去学一门手艺。", { action: { build: 2 }, linkage: { rooted: 1 }, orientation: { craft: 2 } }],
    ["加入一个感兴趣的社区。", { action: { transform: 1 }, linkage: { migratory: 1 }, orientation: { emotion: 1, system: 1 } }],
    ["边旅行边工作或创作。", { action: { perceive: 1 }, linkage: { migratory: 2 }, orientation: { craft: 1 } }]
  ]),
  makeXctiQuestion("精神电量", "你恢复能量最快的方式是？", [
    ["风、树、泥土、星空。", { action: { perceive: 2 }, linkage: { rooted: 1 }, orientation: { emotion: 1 } }],
    ["一群有趣、真诚的人。", { action: { transform: 1 }, orientation: { emotion: 2, system: 1 } }],
    ["让身体动起来，劳动、运动或手工。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["深夜独自思考、写作、创作。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["和一两个深度连接的人长谈。", { orientation: { emotion: 2 }, linkage: { rooted: 1 } }],
    ["自由移动，换环境。", { linkage: { migratory: 2 }, action: { perceive: 1 } }]
  ]),
  makeXctiQuestion("精神电量", "最近一个月，你觉得自己最接近哪种状态？", [
    ["充满干劲，觉得一切都在往好的方向走。", { energy: { full: 3 }, action: { transform: 1 }, stage: { value: 1 } }],
    ["正常波动，有高有低，总体还能承受。", { energy: { steady: 3 }, orientation: { system: 1 } }],
    ["有点疲惫，但还能撑，需要一次休息。", { energy: { tired: 3 }, action: { perceive: 1 } }],
    ["很累了，但不知道该怎么停下来。", { energy: { overdrawn: 3 }, orientation: { system: 1 } }],
    ["已经快被掏空了，做什么都提不起劲。", { energy: { empty: 3 }, stage: { escape: 1 } }]
  ]),
  makeXctiQuestion("精神电量", "最近一个月，哪种感觉更常出现？", [
    ["心很累，觉得做的一切都没什么意义。", { fatigue: { meaning: 2 }, orientation: { emotion: 1 } }],
    ["身体很累，主要是事情太多。", { fatigue: { body: 2 }, action: { build: 1 } }],
    ["社交上很累，应付各种关系让我精疲力尽。", { fatigue: { social: 2 }, orientation: { system: 1 } }],
    ["孤独，觉得没人真正理解我在做什么。", { fatigue: { lonely: 2 }, orientation: { emotion: 1 } }]
  ]),
  makeXctiQuestion("土地关系", "第一次到陌生乡村，你最先注意的是？", [
    ["空气、气味、声音。", { action: { perceive: 2 }, orientation: { emotion: 1 } }],
    ["房子的结构、材质、细节。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["村民的表情、状态、对话。", { action: { perceive: 1 }, orientation: { emotion: 2 } }],
    ["山、水、树、田野的走向。", { action: { perceive: 2 }, linkage: { rooted: 1 } }],
    ["整体的氛围和节奏。", { action: { perceive: 1 }, orientation: { emotion: 1, system: 1 } }],
    ["这里是怎么运转的。", { action: { transform: 1 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("土地关系", "如果长期驻村，你最想拥有？", [
    ["一块自己的菜地。", { action: { perceive: 1, build: 1 }, linkage: { rooted: 2 }, orientation: { emotion: 1 } }],
    ["一个安静的工作空间。", { action: { build: 1 }, orientation: { craft: 1 }, linkage: { cloud: 1 } }],
    ["一个公共厨房。", { action: { build: 1 }, orientation: { emotion: 2 }, linkage: { rooted: 1 } }],
    ["一个可以一起生活的院子。", { action: { transform: 1 }, orientation: { emotion: 1, system: 1 }, linkage: { rooted: 1 } }],
    ["一个手工或改造工坊。", { action: { build: 2 }, orientation: { craft: 2 } }],
    ["一个能一起搞事情的共创社群。", { action: { transform: 2 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("土地关系", "看到一栋废弃老房子，你第一反应是？", [
    ["真想住进去。", { action: { perceive: 1 }, linkage: { rooted: 2 }, orientation: { emotion: 1 } }],
    ["这里能改得很好看。", { action: { build: 1 }, orientation: { craft: 2 } }],
    ["这里以前发生过什么？", { action: { perceive: 2 }, orientation: { system: 1 } }],
    ["适合做公共空间。", { action: { transform: 2 }, orientation: { emotion: 1, system: 1 } }],
    ["拍下来一定很有感觉。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["这里怎么运营才能活下去？", { action: { transform: 1 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("土地关系", "下面哪种劳动最让你感到舒服？", [
    ["慢慢做一件东西。", { action: { build: 2 }, orientation: { craft: 2 } }],
    ["照顾植物或动物。", { action: { perceive: 1, build: 1 }, linkage: { rooted: 1 }, orientation: { emotion: 1 } }],
    ["给朋友们做顿饭。", { action: { build: 1 }, orientation: { emotion: 2 } }],
    ["组织一场活动。", { action: { transform: 2 }, orientation: { system: 1, emotion: 1 } }],
    ["解决复杂问题。", { action: { build: 1, transform: 1 }, orientation: { system: 2 } }],
    ["把空间经营成大家喜欢待的地方。", { action: { transform: 1, build: 1 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("土地关系", "如果没有收入压力，你最想长期做？", [
    ["在地创作。", { action: { perceive: 1 }, linkage: { rooted: 1 }, orientation: { craft: 1 } }],
    ["风土研究。", { action: { perceive: 2 }, orientation: { system: 1 } }],
    ["生态种植或自然农法。", { action: { build: 2 }, linkage: { rooted: 1 }, orientation: { system: 1 } }],
    ["社群运营或社区营造。", { action: { transform: 2 }, orientation: { system: 1, emotion: 1 } }],
    ["空间改造或建筑设计。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["流动式生活，不同地方短居。", { linkage: { migratory: 2 }, action: { perceive: 1 } }]
  ]),
  makeXctiQuestion("社群行为", "第一次进入陌生社群，你通常会？", [
    ["先在一旁观察。", { action: { perceive: 2 }, orientation: { system: 1 } }],
    ["看到需要帮忙就顺手做。", { action: { build: 2 }, orientation: { emotion: 1 } }],
    ["很快认识大家，主动聊天。", { action: { transform: 2 }, orientation: { emotion: 1 } }],
    ["找到组织者，聊聊他们的想法。", { action: { transform: 1 }, orientation: { system: 2 } }],
    ["默默拍照、记录环境。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["观察规则和权力结构。", { action: { perceive: 1 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("社群行为", "社区里发生矛盾时，你更可能？", [
    ["站出来调和气氛。", { action: { transform: 1 }, orientation: { emotion: 2 } }],
    ["提出机制方案。", { action: { transform: 1 }, orientation: { system: 2 } }],
    ["安静离开现场。", { action: { perceive: 1 }, orientation: { emotion: 1 }, energy: { low: 1 } }],
    ["私下分别找两边聊。", { action: { transform: 1 }, orientation: { emotion: 1, system: 1 } }],
    ["快速执行一个解决方案。", { action: { build: 2 }, orientation: { system: 1 } }],
    ["退后观察根源。", { action: { perceive: 2 }, orientation: { system: 1 } }]
  ]),
  makeXctiQuestion("社群行为", "在人群里，你更容易成为？", [
    ["氛围制造者。", { action: { transform: 2 }, orientation: { emotion: 2 } }],
    ["组织协调者。", { action: { transform: 2 }, orientation: { system: 2 } }],
    ["安静的支持者。", { action: { build: 1 }, orientation: { emotion: 1, craft: 1 } }],
    ["技术外挂。", { action: { build: 2 }, linkage: { cloud: 1 }, orientation: { craft: 2 } }],
    ["内容记录者。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["长期推动者。", { action: { transform: 1 }, orientation: { system: 2 }, stage: { node: 1 } }]
  ]),
  makeXctiQuestion("社群行为", "如果今晚突然停电，你更可能？", [
    ["生火做饭，张罗大家吃东西。", { action: { build: 1 }, orientation: { emotion: 2 } }],
    ["组织大家聊天、唱歌、讲故事。", { action: { transform: 2 }, orientation: { emotion: 1 } }],
    ["检查电路。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["搬个凳子去院子里看星星。", { action: { perceive: 2 }, orientation: { emotion: 1 } }],
    ["用手机记录这个特别的夜晚。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["维持现场秩序，安抚大家。", { action: { transform: 1 }, orientation: { system: 1, emotion: 1 } }]
  ]),
  makeXctiQuestion("社群行为", "你更相信？", [
    ["情感连接。", { orientation: { emotion: 3 }, action: { perceive: 1 } }],
    ["长期协作。", { orientation: { system: 2 }, linkage: { rooted: 1 } }],
    ["技术效率。", { orientation: { craft: 2 }, linkage: { cloud: 1 } }],
    ["自然规律。", { action: { perceive: 2 }, linkage: { rooted: 1 } }],
    ["个体创造力。", { orientation: { craft: 2 }, action: { build: 1 } }],
    ["社群共识。", { orientation: { system: 2 }, action: { transform: 1 } }]
  ]),
  makeXctiQuestion("流动与归属", "你理想中的生活状态是？", [
    ["长期扎根在一个地方。", { linkage: { rooted: 3 }, stage: { value: 1 } }],
    ["城乡双栖，两边都有生活。", { linkage: { migratory: 3 } }],
    ["全球流动，不被地理限制。", { linkage: { migratory: 2, cloud: 1 } }],
    ["周期性迁徙，跟随季节或心情。", { linkage: { migratory: 3 }, action: { perceive: 1 } }],
    ["在不同社区之间游牧。", { linkage: { migratory: 2 }, action: { transform: 1 } }],
    ["云端协作，肉身不动但精神在线。", { linkage: { cloud: 3 }, orientation: { craft: 1 } }]
  ]),
  makeXctiQuestion("流动与归属", "你理解的稳定更接近？", [
    ["有固定住所。", { linkage: { rooted: 2 }, orientation: { emotion: 1 } }],
    ["有稳定关系。", { linkage: { rooted: 1 }, orientation: { emotion: 2 } }],
    ["有稳定收入来源。", { orientation: { system: 2 }, action: { transform: 1 } }],
    ["精神自由，不被人捆绑。", { linkage: { migratory: 2 }, action: { perceive: 1 } }],
    ["永远有退路。", { linkage: { migratory: 1, cloud: 1 }, orientation: { system: 1 } }],
    ["能持续创造。", { action: { build: 1 }, orientation: { craft: 2 } }]
  ]),
  makeXctiQuestion("流动与归属", "你更认同哪种说法？", [
    ["要理解一个地方，必须住上一两年。", { linkage: { rooted: 3 }, action: { perceive: 1 } }],
    ["保持流动才能保持清醒。", { linkage: { migratory: 3 }, action: { perceive: 1 } }],
    ["在哪里都能生活，关键是有没有对的人和事。", { linkage: { migratory: 1 }, orientation: { emotion: 2 } }],
    ["物理距离不重要，精神上能连接就行。", { linkage: { cloud: 3 }, orientation: { emotion: 1 } }]
  ]),
  makeXctiQuestion("流动与归属", "如果未来十年只能选一种，你更愿意？", [
    ["长期经营一个地方。", { linkage: { rooted: 2 }, action: { transform: 1 }, orientation: { system: 1 } }],
    ["不断探索新的地方。", { linkage: { migratory: 2 }, action: { perceive: 1 } }],
    ["在不同社群之间建立连接。", { action: { transform: 2 }, linkage: { migratory: 1 }, orientation: { system: 1 } }],
    ["远程线上参与共创。", { linkage: { cloud: 3 }, orientation: { craft: 1 } }],
    ["支持别人完成理想。", { orientation: { emotion: 2 }, action: { transform: 1 } }],
    ["记录不同地方的人和故事。", { action: { perceive: 2 }, linkage: { migratory: 1 }, orientation: { craft: 1 } }]
  ]),
  makeXctiQuestion("流动与归属", "你觉得家更像？", [
    ["一块土地。", { linkage: { rooted: 2 }, action: { perceive: 1 } }],
    ["一群人。", { orientation: { emotion: 2 }, action: { transform: 1 } }],
    ["一种状态。", { action: { perceive: 1 }, linkage: { migratory: 1 } }],
    ["一个精神据点。", { linkage: { cloud: 1 }, orientation: { emotion: 1 } }],
    ["一个持续生长的空间。", { action: { build: 1, transform: 1 }, orientation: { system: 1 } }],
    ["一个随时可以回去的地方。", { linkage: { rooted: 1, migratory: 1 }, orientation: { emotion: 1 } }]
  ]),
  makeXctiQuestion("流动与归属", "你最害怕的是？", [
    ["被困住，动弹不得。", { linkage: { migratory: 2 }, action: { perceive: 1 } }],
    ["被遗忘，没有留下痕迹。", { orientation: { craft: 1, emotion: 1 }, action: { perceive: 1 } }],
    ["没有价值，不被需要。", { action: { build: 1 }, orientation: { system: 1, emotion: 1 } }],
    ["与世界失去连接。", { orientation: { emotion: 2 }, action: { transform: 1 } }],
    ["完全麻木，不再有任何感受。", { action: { perceive: 2 }, orientation: { emotion: 1 } }],
    ["无法创造，灵感枯竭。", { action: { build: 1 }, orientation: { craft: 2 } }]
  ]),
  makeXctiQuestion("价值与未来", "你觉得未来真正重要的社会能力是？", [
    ["社区营造能力。", { action: { transform: 2 }, orientation: { system: 1, emotion: 1 } }],
    ["土地与生态认知。", { action: { perceive: 1, build: 1 }, linkage: { rooted: 1 } }],
    ["传统技艺与手作能力。", { action: { build: 2 }, orientation: { craft: 2 } }],
    ["系统设计与组织能力。", { action: { transform: 1 }, orientation: { system: 2 } }],
    ["技术与数字协作能力。", { linkage: { cloud: 2 }, orientation: { craft: 2 } }],
    ["跨社群连接与沟通能力。", { action: { transform: 2 }, linkage: { migratory: 1 }, orientation: { emotion: 1 } }]
  ]),
  makeXctiQuestion("价值与未来", "你最愿意长期投入时间的事情是？", [
    ["手艺。", { action: { build: 2 }, orientation: { craft: 2 } }],
    ["内容创作。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["公共空间运营。", { action: { transform: 1, build: 1 }, linkage: { rooted: 1 }, orientation: { system: 1 } }],
    ["社群关系建设。", { action: { transform: 2 }, orientation: { emotion: 1, system: 1 } }],
    ["开源协作与工具开发。", { linkage: { cloud: 2 }, action: { build: 1, transform: 1 }, orientation: { system: 1 } }],
    ["社会创新实验。", { action: { transform: 2 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("价值与未来", "乡村生活最吸引你的红利是什么？", [
    ["松弛感。", { action: { perceive: 2 }, orientation: { emotion: 1 }, stage: { escape: 1 } }],
    ["掌控感。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["归属感。", { orientation: { emotion: 2 }, linkage: { rooted: 1 } }],
    ["价值感。", { action: { transform: 1, build: 1 }, orientation: { system: 1 } }],
    ["自由感。", { linkage: { migratory: 2, cloud: 1 }, action: { perceive: 1 } }]
  ]),
  makeXctiQuestion("价值与未来", "在理想乡村未来里，你更希望自己是？", [
    ["深深扎根的人。", { linkage: { rooted: 3 }, action: { perceive: 1 } }],
    ["记录和传播的人。", { action: { perceive: 1 }, linkage: { cloud: 1 }, orientation: { craft: 1 } }],
    ["组织和连接的人。", { action: { transform: 2 }, orientation: { system: 1, emotion: 1 } }],
    ["动手改造的人。", { action: { build: 2 }, orientation: { craft: 1 } }],
    ["用技术连接城乡的人。", { linkage: { cloud: 2 }, action: { build: 1 }, orientation: { craft: 1 } }],
    ["设计规则和工具的人。", { action: { transform: 1 }, orientation: { system: 2 } }]
  ]),
  makeXctiQuestion("价值与未来", "如果参与乡村项目，你更倾向于哪种参与方式？", [
    ["长期驻村，成为在地团队的一员。", { linkage: { rooted: 3 }, stage: { value: 1 } }],
    ["每年去几次，每次待几周，深度参与。", { linkage: { migratory: 3 }, stage: { connect: 1 } }],
    ["远程支持，平时在线上协作。", { linkage: { cloud: 3 }, orientation: { craft: 1 } }],
    ["偶尔去体验一下，保持松散连接。", { linkage: { migratory: 1, cloud: 1 }, action: { perceive: 1 }, stage: { escape: 1 } }]
  ])
];

archetypes.splice(0, archetypes.length, ...xctiArchetypes);
questions.splice(0, questions.length, ...xctiQuestions);

const universeFactions = [
  {
    name: "感知者",
    subtitle: "Action P",
    thesis: "像植物一样吸收。以触觉、审美、同理心和记录能力，重新感知人与土地的关系。",
    members: xctiRows.slice(0, 9).map((row) => row[2]),
    color: "#e6d5b8"
  },
  {
    name: "建造者",
    subtitle: "Action B",
    thesis: "像铁匠一样死磕。通过物理落地、硬核产出、技艺和维护，让想法真正留下来。",
    members: xctiRows.slice(9, 18).map((row) => row[2]),
    color: "#829460"
  },
  {
    name: "转化者",
    subtitle: "Action C",
    thesis: "像酵母一样发酵。擅长连接、做局、组装与破壁，把松散的人和资源织成协作网络。",
    members: xctiRows.slice(18, 27).map((row) => row[2]),
    color: "#4e6c50"
  }
];

const growthStages = {
  escape: {
    name: "逃离期",
    focus: "疗愈、探索，恢复情绪能量",
    mission: "完成一次低压力观察任务，留下照片、文字或语音记录。",
    mentor: "野花通灵师 / 大地料理师"
  },
  connect: {
    name: "连接期",
    focus: "社群参与、技能交换，建立乡村链接",
    mission: "报名一个 3 天内可交付的小任务，认识至少一位互补队友。",
    mentor: "大地策展人 / 云游叙事者"
  },
  value: {
    name: "价值期",
    focus: "项目孵化、长期运营，创造实际价值",
    mission: "把一次任务整理成案例，形成可复用流程、清单或作品样本。",
    mentor: "共生体系主理人 / 资源摆渡人"
  },
  node: {
    name: "节点期",
    focus: "带人带资源，成为协作网络核心节点",
    mission: "发起一个小队任务，配置创意、执行、链接和风控角色。",
    mentor: "乡创合伙人 / 赛博数字匠"
  }
};

const badgeCatalog = [
  { id: "identity", name: "人格觉醒", rule: "完成测试", test: () => isComplete() },
  { id: "digital_villager", name: "数字村民", rule: "保存身份资料", test: () => Boolean(state.profile.name || state.profile.skills || state.profile.contact) },
  { id: "first_match", name: "初次组队", rule: "提交任务报名", test: () => state.applications.length > 0 },
  { id: "village_link", name: "村格链接", rule: "关注一个村庄", test: () => state.savedVillages.length > 0 },
  { id: "field_proof", name: "完成一件小事", rule: "标记任务完成", test: () => state.completedTasks.length > 0 }
];

const roadmapPhases = [
  ["文化构建与传播", "定义27乡创人格，打造乡野大陆世界观，通过卡牌、短视频、梗文化冷启动。"],
  ["产品开发与测试", "上线 H5/小程序人格测试，接入 AI 匹配、组队系统、任务与村格推荐。"],
  ["生态运营与价值实现", "运营数字村民社群，落地人-村项目匹配，举办线下共创营并沉淀案例。"]
];

const mediaAssets = [
  ["卡牌素材", "实体/数字卡牌，用于线下活动、线上收藏和人格交换。"],
  ["海报素材", "人格海报搭配趣味文案，适合朋友圈、小红书和乡村墙面传播。"],
  ["短视频素材", "12个人格 15-30 秒剧情短片，用乡村场景展示角色差异。"],
  ["梗文化素材", "表情包、角色语录和社交货币，提高转发与二创空间。"],
  ["公众号推文", "人格解析、乡创故事、村庄匹配指南，承接深度内容沉淀。"]
];

const dimensions = {
  drive: { left: "疗愈 Z", right: "建设 B", leftKey: "zen", rightKey: "build" },
  domain: { left: "数字 P", right: "土地 S", leftKey: "pixel", rightKey: "soil" },
  social: { left: "隐士 M", right: "连接 L", leftKey: "mute", rightKey: "loud" }
};

const linkageLabels = {
  rooted: "扎根派",
  migratory: "候鸟派",
  cloud: "云端派",
  explorer: "探索派"
};

const stageLabels = {
  escape: "逃离期",
  connect: "连接期",
  value: "价值期",
  node: "节点期"
};

const initialState = {
  screen: "home",
  questionIndex: 0,
  answers: Array(questions.length).fill(null),
  savedTasks: [],
  applications: [],
  completedTasks: [],
  savedVillages: [],
  expandedVillage: null,
  startedAt: "",
  completedAt: "",
  profile: {
    name: "",
    city: "",
    skills: "",
    mode: "",
    contact: "",
    availability: ""
  },
  analytics: {
    starts: 0,
    completions: 0,
    cardsSaved: 0,
    sharesCopied: 0,
    profilesSaved: 0,
    taskApplications: 0,
    taskCompletions: 0,
    villageFollows: 0,
    digitalVillagerActivations: 0
  },
  semiIdentity: null
};

let state = loadState();
const app = document.querySelector("#app");

document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);

render();

// After OAuth redirect, complete Semi binding if there's a pending result
(function checkSemiCallback() {
  var pendingId = sessionStorage.getItem("ccti-pending-result-id");
  if (pendingId && window.CCTI_API) {
    CCTI_API.handleSemiCallback().then(function (res) {
      if (res.ok && res.identity) {
        state.semiIdentity = res.identity;
        persist();
        render();
      }
    }).catch(function () {
      // Not logged in — ignore
    });
  }
})();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(initialState);
    const parsed = JSON.parse(raw);
    const screen = VALID_SCREENS.has(parsed.screen) ? parsed.screen : initialState.screen;
    return {
      ...clone(initialState),
      ...parsed,
      screen,
      answers: normalizeAnswers(parsed.answers),
      profile: { ...initialState.profile, ...(parsed.profile || {}) },
      analytics: { ...initialState.analytics, ...(parsed.analytics || {}) },
      savedTasks: Array.isArray(parsed.savedTasks) ? parsed.savedTasks : [],
      applications: Array.isArray(parsed.applications) ? parsed.applications : [],
      completedTasks: Array.isArray(parsed.completedTasks) ? parsed.completedTasks : [],
      savedVillages: Array.isArray(parsed.savedVillages) ? parsed.savedVillages : []
    };
  } catch {
    return clone(initialState);
  }
}

function normalizeAnswers(answers) {
  const next = Array(questions.length).fill(null);
  if (!Array.isArray(answers)) return next;
  answers.slice(0, questions.length).forEach((answer, index) => {
    next[index] = Number.isInteger(answer) ? answer : null;
  });
  return next;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      ${renderScreen()}
    </div>
  `;

  if (state.screen === "result" && isComplete()) {
    requestAnimationFrame(() => {
      const canvas = document.querySelector("#resultCard");
      if (!canvas) return;
      const result = computeResult();
      const img = new Image();
      img.onload = function() { drawCard(canvas, result, 720, 1080, img); };
      img.onerror = function() { drawCard(canvas, result, 720, 1080, null); };
      img.src = "assets/figs/" + result.primary.code.toLowerCase() + ".png";
    });
  }
  window.scrollTo(0, 0);
}

function renderTopbar() {
  const resultEnabled = isComplete();
  return `
    <header class="topbar">
      <div class="brand" data-screen="home">
        <img src="assets/main.png" alt="乡野青创">
        <div class="brand-copy">
          <p class="brand-title">乡野青创</p>
          <p class="brand-kicker">找到属于你的乡村</p>
        </div>
      </div>
      <nav class="nav-actions" aria-label="主导航">
        <button class="nav-pill ${state.screen === "test" ? "is-active" : ""}" data-screen="test">测试</button>
        <button class="nav-pill ${state.screen === "atlas" ? "is-active" : ""}" data-screen="atlas">图鉴</button>
        <button class="nav-pill ${state.screen === "result" ? "is-active" : ""}" data-screen="result" ${resultEnabled ? "" : "disabled"}>结果</button>
      </nav>
    </header>
  `;
}

function renderScreen() {
  if (state.screen === "home") return renderHome();
  if (state.screen === "universe") return renderUniverse();
  if (state.screen === "atlas") return renderAtlas();
  if (state.screen === "villages") return renderVillages();
  if (state.screen === "tasks") return renderTasks();
  if (state.screen === "dashboard") return renderDashboard();
  if (state.screen === "result") {
    return isComplete() ? renderResult() : renderIncompleteResult();
  }
  return renderTest();
}

function renderHome() {
  const answeredCount = state.answers.filter(Number.isInteger).length;
  const result = isComplete() ? computeResult() : null;
  const ctaLabel = answeredCount ? (isComplete() ? "查看身份卡" : "继续测试") : "开始测试";
  const ctaAction = isComplete() ? "result" : "start-test";

  return `
    <main class="home-page">
      <section class="home-hero">
        <span class="scene-label">H5 MVP</span>
        <h1>找到属于你的<br>乡创人格</h1>
        <p>${questions.length} 道情境题，测出你的乡建者人格类型，匹配最适合的乡村与共创任务。</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-block" ${ctaAction === "result" ? 'data-screen="result"' : 'data-action="start-test"'}>
            ${ctaLabel}
          </button>
          ${result ? `
            <button class="btn btn-ghost" data-screen="atlas">浏览全部 ${archetypes.length} 种人格</button>
          ` : ""}
        </div>
      </section>

      <section class="quick-links">
        <div class="quick-link" data-screen="atlas">
          <span class="link-icon">📋</span>
          <strong>人格图鉴</strong>
          <span>${archetypes.length} 种类型</span>
        </div>
        <div class="quick-link" data-screen="${result ? "villages" : "test"}">
          <span class="link-icon">🏘️</span>
          <strong>村庄匹配</strong>
          <span>${villageProfiles.length} 个村庄</span>
        </div>
        <div class="quick-link" data-screen="${result ? "tasks" : "test"}">
          <span class="link-icon">🌱</span>
          <strong>共创任务</strong>
          <span>${tasks.length} 个任务</span>
        </div>
      </section>

      ${renderMvpKpis()}
    </main>
  `;
}

function renderMvpKpis() {
  const stats = getDashboardStats();
  const cards = [
    ["题库规模", `${questions.length} 题`, "已绑定维度权重"],
    ["人格角色", `${archetypes.length} 类`, "第一季图鉴可浏览"],
    ["任务样本", `${tasks.length} 个`, "支持收藏和报名"],
    ["村庄样本", `${villageProfiles.length} 个`, "规则推荐可解释"],
    ["成长勋章", `${badgeCatalog.length} 枚`, "任务驱动升级"],
    ["本机完成率", `${stats.completionRate}%`, "用于 Demo 验证"],
    ["线索数", `${stats.leads} 条`, "资料/报名/关注"]
  ];

  return `
    <section class="kpi-strip" aria-label="MVP 指标">
      ${cards.map(([label, value, helper]) => `
        <div class="kpi-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${escapeHtml(helper)}</small>
        </div>
      `).join("")}
    </section>
  `;
}

function renderUniverse() {
  return `
    <main class="universe-page">
      <section class="page-heading">
        <h1>乡野大陆世界观</h1>
        <p>让"下乡"变成身份认同与协作游戏</p>
        <button class="btn btn-primary" data-screen="${isComplete() ? "result" : "test"}" style="justify-self:start">
          ${isComplete() ? "看我的身份" : "觉醒人格"}
        </button>
      </section>

      <section class="faction-grid">
        ${universeFactions.map((faction) => `
          <article class="faction-card" style="border-left: 4px solid ${escapeAttr(faction.color)}">
            <span>${escapeHtml(faction.subtitle)}</span>
            <h2>${escapeHtml(faction.name)}</h2>
            <p>${escapeHtml(faction.thesis)}</p>
            <div class="tag-row">
              ${faction.members.map((member) => `<span class="tag tag-green">${escapeHtml(member)}</span>`).join("")}
            </div>
          </article>
        `).join("")}
      </section>
    </main>
  `;
}

function renderTest() {
  const index = clamp(state.questionIndex, 0, questions.length - 1);
  state.questionIndex = index;
  const question = questions[index];
  const answeredCount = state.answers.filter(Number.isInteger).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const selected = state.answers[index];

  return `
    <main class="test-page">
      <section class="question-card" aria-labelledby="question-title">
        <div class="test-header">
          <div class="step-pill">${index + 1}/${questions.length}</div>
          <div class="progress-wrap">
            <div class="progress-label">
              <span>已完成 ${answeredCount} 题</span>
              <span>${progress}%</span>
            </div>
            <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
              <div class="progress-bar" style="width:${progress}%"></div>
            </div>
          </div>
          <button class="btn btn-ghost" data-action="restart" style="min-height:36px;padding:5px 12px;font-size:13px">重测</button>
        </div>
        <div class="question-body">
          <span class="scene-label">${escapeHtml(question.scene)}</span>
          <h2 id="question-title" class="question-title">${escapeHtml(question.title)}</h2>
          <div class="option-list">
            ${question.options.map((option, optionIndex) => renderOption(option, optionIndex, selected)).join("")}
          </div>
        </div>
        <footer class="test-footer">
          <button class="btn btn-ghost" data-action="prev" ${index === 0 ? "disabled" : ""}>上一题</button>
          <button class="btn btn-primary" data-action="next" ${Number.isInteger(selected) ? "" : "disabled"}>
            ${index === questions.length - 1 ? "生成身份卡" : "下一题"}
          </button>
        </footer>
      </section>
    </main>
  `;
}

function renderOption(option, optionIndex, selected) {
  const isSelected = selected === optionIndex;
  return `
    <button class="option-btn ${isSelected ? "is-selected" : ""}" data-action="answer" data-answer="${optionIndex}">
      <span class="option-mark">${option.key}</span>
      <span class="option-text">
        <strong>${escapeHtml(option.label)}</strong>
        <span>${escapeHtml(option.helper)}</span>
      </span>
      <span class="check-slot" aria-hidden="true">${isSelected ? '<svg><use href="#icon-check"></use></svg>' : ""}</span>
    </button>
  `;
}

function renderSidePanel() {
  const scores = calculateScores();
  if (isXctiDataset()) return renderXctiSidePanel(scores);

  const resultPreview = getDominants(scores);
  const tiles = [
    ["drive", resultPreview.drive.key === "zen" ? "疗愈动机" : "建设动机", resultPreview.drive.key === "zen" ? "先恢复，再靠近" : "先创造，再沉淀"],
    ["domain", resultPreview.domain.key === "pixel" ? "数字创意" : "土地实干", resultPreview.domain.key === "pixel" ? "内容、设计、工具" : "运营、建造、农业"],
    ["social", resultPreview.social.key === "mute" ? "安静交付" : "连接组织", resultPreview.social.key === "mute" ? "深度专注" : "召集和破冰"],
    ["linkage", linkageLabels[resultPreview.linkage.key], "当前参与方式"]
  ];

  return `
    <aside class="side-panel" aria-label="实时倾向">
      <div class="side-visual">
        <div class="radar-map">
          ${tiles.map((tile, index) => `
            <div class="map-tile ${index < state.answers.filter(Number.isInteger).length % 5 ? "is-lit" : ""}">
              <strong>${escapeHtml(tile[1])}</strong>
              <span>${escapeHtml(tile[2])}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="score-preview">
        ${Object.entries(dimensions).map(([key, config]) => {
          const total = (scores[key][config.leftKey] || 0) + (scores[key][config.rightKey] || 0);
          const right = total ? Math.round(((scores[key][config.rightKey] || 0) / total) * 100) : 50;
          return `
            <div class="metric">
              <div class="metric-top"><span>${config.left}</span><span>${config.right}</span></div>
              <div class="mini-track"><div class="mini-fill" style="width:${right}%"></div></div>
            </div>
          `;
        }).join("")}
        <div class="metric">
          <div class="metric-top"><span>参与方式</span><span>${linkageLabels[resultPreview.linkage.key]}</span></div>
          <div class="mini-track"><div class="mini-fill" style="width:${dominancePercent(scores.linkage, resultPreview.linkage.key)}%"></div></div>
        </div>
        <div class="metric">
          <div class="metric-top"><span>成长阶段</span><span>${stageLabels[resultPreview.stage.key]}</span></div>
          <div class="mini-track"><div class="mini-fill" style="width:${dominancePercent(scores.stage, resultPreview.stage.key)}%"></div></div>
        </div>
      </div>
    </aside>
  `;
}

function renderXctiSidePanel(scores) {
  const action = dominant(scores.action).key;
  const linkage = dominant(scores.linkage).key === "explorer" ? "migratory" : dominant(scores.linkage).key;
  const orientation = dominant(scores.orientation).key;
  const energy = computeEnergy(scores);
  const tiles = [
    [xctiAxis.action[action].prefix, xctiAxis.action[action].strength],
    [xctiAxis.linkage[linkage].suffix, xctiAxis.linkage[linkage].text],
    [`${xctiAxis.orientation[orientation].label}本位`, xctiAxis.orientation[orientation].text],
    ["精神电量", `${energy}% · ${energyLabel(energy)}`]
  ];

  return `
    <aside class="side-panel" aria-label="实时倾向">
      <div class="side-visual">
        <div class="radar-map">
          ${tiles.map((tile, index) => `
            <div class="map-tile ${index < state.answers.filter(Number.isInteger).length % 5 ? "is-lit" : ""}">
              <strong>${escapeHtml(tile[0])}</strong>
              <span>${escapeHtml(tile[1])}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="score-preview">
        ${renderTriMetric("行动力", scores.action, ["perceive", "build", "transform"], ["感知", "建造", "转化"])}
        ${renderTriMetric("连接方式", scores.linkage, ["rooted", "migratory", "cloud"], ["在地", "流动", "云端"])}
        ${renderTriMetric("价值倾向", scores.orientation, ["emotion", "craft", "system"], ["情感", "技艺", "组织"])}
        <div class="metric">
          <div class="metric-top"><span>精神电量</span><span>${energy}%</span></div>
          <div class="mini-track"><div class="mini-fill" style="width:${energy}%"></div></div>
        </div>
      </div>
    </aside>
  `;
}

function renderIncompleteResult() {
  const firstOpen = firstUnansweredIndex();
  return `
    <section class="card card-padded" style="text-align:center">
      <h2>还差 ${questions.length - state.answers.filter(Number.isInteger).length} 题</h2>
      <p style="color:var(--muted)">完成全部题目后会生成你的 CCTI 身份卡、人格报告和任务推荐。</p>
      <button class="btn btn-primary" data-action="go-unanswered" data-index="${firstOpen}">
        继续测试
      </button>
    </section>
  `;
}

function renderResult() {
  const result = computeResult();
  const primary = result.primary;
  const secondary = result.secondary;
  const recommendations = getRecommendedTasks(result).slice(0, 2);
  const villages = getRecommendedVillages(result).slice(0, 2);

  return `
    <main class="result-page">
      <section class="result-card-section">
        <canvas id="resultCard" width="720" height="1080" aria-label="CCTI 人格身份卡"></canvas>
        <div class="result-actions">
          <button class="btn btn-primary" data-action="save-card">
            <svg><use href="#icon-download"></use></svg>保存卡片
          </button>
          <button class="btn btn-ghost" data-action="copy-share">
            <svg><use href="#icon-copy"></use></svg>复制分享
          </button>
        </div>
      </section>

      <div class="result-figure">
        <img src="assets/figs/${primary.code.toLowerCase()}.png" alt="${escapeHtml(primary.name)}" onerror="this.style.display='none'">
      </div>

      <section class="result-hero">
        <h1 class="result-name">${escapeHtml(primary.name)}</h1>
        <p class="result-tagline">${escapeHtml(primary.tagline)}</p>
        <span class="result-code">${escapeHtml(primary.code)}</span>
        <div class="tag-row" style="padding:12px 0 0">
          <span class="tag" style="border-color:rgba(255,255,255,0.35);color:white">${escapeHtml(primary.faction)}</span>
          ${primary.tags.map((tag) => `<span class="tag" style="border-color:rgba(255,255,255,0.35);color:white">${escapeHtml(tag)}</span>`).join("")}
          <span class="tag" style="border-color:rgba(255,255,255,0.35);color:white">副人格 ${escapeHtml(secondary.name)}</span>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-card"></use></svg>人格画像</h2>
        <p class="copy">${escapeHtml(primary.summary)}</p>
        <div class="insight-grid" style="margin-top:12px">
          <div class="insight-item">
            <strong>优势位</strong>
            <p>${escapeHtml(primary.strength)}</p>
          </div>
          <div class="insight-item">
            <strong>盲区</strong>
            <p>${escapeHtml(primary.blindspot)}</p>
          </div>
          <div class="insight-item">
            <strong>下一步</strong>
            <p>${escapeHtml(primary.nextStep)}</p>
          </div>
          <div class="insight-item">
            <strong>最佳队友</strong>
            <p>${primary.pairings.map(escapeHtml).join(" / ")}</p>
          </div>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-spark"></use></svg>AI 风格解析</h2>
        <p class="copy">${escapeHtml(getPersonalizedAdvice(result))}</p>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-map"></use></svg>适配村庄</h2>
        <div class="village-grid">
          ${villages.map((village) => renderVillageCard(village, result)).join("")}
        </div>
        <button class="btn btn-ghost" data-screen="villages" style="margin-top:12px">看更多村庄</button>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-leaf"></use></svg>推荐任务</h2>
        <div class="task-grid">
          ${recommendations.map((task) => renderTaskCard(task, result)).join("")}
        </div>
        <button class="btn btn-ghost" data-screen="tasks" style="margin-top:12px">看更多任务</button>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-chart"></use></svg>维度坐标</h2>
        <div class="dimension-grid">
          ${renderDimensionRows(result)}
        </div>
      </section>

      ${renderProfilePanel()}
      ${renderSemiSection()}

      <div style="text-align:center;margin-top:8px">
        <button class="btn btn-ghost" data-screen="dashboard">运营看板</button>
        <button class="btn btn-ghost" data-screen="universe">乡野世界观</button>
      </div>
    </main>
  `;
}

function renderDimensionRows(result) {
  if (result.action) {
    return `
      <div class="dimension-row">
        <span>感知 P</span>
        <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.action}%"></i></div>
        <span>转化 C</span>
      </div>
      <div class="dimension-row">
        <span>在地 R</span>
        <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.linkage}%"></i></div>
        <span>云端 C</span>
      </div>
      <div class="dimension-row">
        <span>情感 E</span>
        <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.orientation}%"></i></div>
        <span>组织 S</span>
      </div>
      <div class="dimension-row">
        <span>阶段</span>
        <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.stage}%"></i></div>
        <span>${stageLabels[result.stage]}</span>
      </div>
    `;
  }

  const rows = Object.entries(dimensions).map(([key, config]) => {
    const position = result.positions[key];
    return `
      <div class="dimension-row">
        <span>${config.left}</span>
        <div class="dimension-track"><i class="dimension-dot" style="left:${position}%"></i></div>
        <span>${config.right}</span>
      </div>
    `;
  });
  rows.push(`
    <div class="dimension-row">
      <span>方式</span>
      <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.linkage}%"></i></div>
      <span>${linkageLabels[result.linkage]}</span>
    </div>
  `);
  rows.push(`
    <div class="dimension-row">
      <span>阶段</span>
      <div class="dimension-track"><i class="dimension-dot" style="left:${result.positions.stage}%"></i></div>
      <span>${stageLabels[result.stage]}</span>
    </div>
  `);
  return rows.join("");
}

function renderGrowthPanel(result) {
  const xp = calculateXp();
  const stage = growthStages[result.stage];
  const earned = getEarnedBadges();
  const nextBadge = badgeCatalog.find((badge) => !earned.some((item) => item.id === badge.id));
  return `
    <div class="growth-grid">
      <div class="growth-card">
        <span>当前阶段</span>
        <strong>${escapeHtml(stage.name)}</strong>
        <p>${escapeHtml(stage.focus)}</p>
      </div>
      <div class="growth-card">
        <span>贡献值</span>
        <strong>${xp}</strong>
        <div class="mini-track"><div class="mini-fill" style="width:${Math.min(100, xp % 100 || (xp ? 100 : 12))}%"></div></div>
      </div>
      ${result.energy ? `
        <div class="growth-card">
          <span>精神电量</span>
          <strong>${result.energy}%</strong>
          <p>${escapeHtml(energyLabel(result.energy))} · ${escapeHtml(fatigueLabel(result.fatigue))}</p>
        </div>
      ` : ""}
      <div class="growth-card">
        <span>导师建议</span>
        <strong>${escapeHtml(stage.mentor)}</strong>
        <p>${escapeHtml(stage.mission)}</p>
      </div>
    </div>
    <div class="badge-row">
      ${badgeCatalog.map((badge) => {
        const isEarned = earned.some((item) => item.id === badge.id);
        return `<span class="badge ${isEarned ? "is-earned" : ""}">${escapeHtml(badge.name)}<small>${escapeHtml(badge.rule)}</small></span>`;
      }).join("")}
    </div>
    ${nextBadge ? `<p class="match-reason">下一枚勋章：${escapeHtml(nextBadge.name)}，条件是${escapeHtml(nextBadge.rule)}。</p>` : `<p class="match-reason">第一季勋章已全部解锁，可以进入小队共创和导师匹配阶段。</p>`}
  `;
}

function renderDigitalVillager(result) {
  const residentId = `CCTI-${result.primary.symbol}-${hashCode(`${state.profile.name || "guest"}-${result.primary.id}`)}`;
  const mode = state.profile.mode ? linkageLabels[state.profile.mode] : linkageLabels[result.linkage];
  const targetVillage = getRecommendedVillages(result)[0];
  return `
    <div class="resident-card">
      <div>
        <span>数字村民编号</span>
        <strong>${escapeHtml(residentId)}</strong>
        <p>${escapeHtml(mode)} · ${escapeHtml(state.profile.city || "待填写城市")} · ${escapeHtml(state.profile.availability || "待确认时间")}</p>
      </div>
      <div>
        <span>云端贡献入口</span>
        <strong>${escapeHtml(targetVillage.name)}</strong>
        <p>优先从「${escapeHtml(targetVillage.needs[0])}」切入，累计远程设计、文案、资源对接等贡献值。</p>
      </div>
    </div>
  `;
}

function renderTeamPanel(result) {
  const team = getRecommendedTeam(result);
  return `
    <div class="team-grid">
      ${team.map((member) => `
        <article class="team-card">
          <span>${escapeHtml(member.role)}</span>
          <strong>${escapeHtml(member.name)}</strong>
          <p>${escapeHtml(member.reason)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderProfilePanel() {
  return `
    <form class="profile-panel" data-action="save-profile">
      <h2 class="section-title"><svg><use href="#icon-card"></use></svg> 身份资料</h2>
      <div class="profile-grid">
        <div class="field">
          <label for="profile-name">昵称</label>
          <input id="profile-name" name="name" maxlength="24" value="${escapeAttr(state.profile.name)}" placeholder="你的乡创名">
        </div>
        <div class="field">
          <label for="profile-city">所在城市</label>
          <input id="profile-city" name="city" maxlength="32" value="${escapeAttr(state.profile.city)}" placeholder="如 上海 / 杭州">
        </div>
        <div class="field">
          <label for="profile-mode">参与方式</label>
          <select id="profile-mode" name="mode">
            <option value="">跟随测试结果</option>
            ${Object.entries(linkageLabels).map(([value, label]) => `<option value="${value}" ${state.profile.mode === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="profile-availability">可投入时间</label>
          <select id="profile-availability" name="availability">
            <option value="">暂不确定</option>
            ${["一次周末", "每月 2-3 天", "远程每周 4 小时", "可驻村 1 周以上"].map((value) => `<option value="${value}" ${state.profile.availability === value ? "selected" : ""}>${value}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="profile-contact">联系方式</label>
          <input id="profile-contact" name="contact" maxlength="48" value="${escapeAttr(state.profile.contact)}" placeholder="微信 / 手机 / 邮箱">
        </div>
        <div class="field">
          <label for="profile-skills">技能关键词</label>
          <input id="profile-skills" name="skills" maxlength="80" value="${escapeAttr(state.profile.skills)}" placeholder="如 AI、摄影、木工、政策、儿童美育">
        </div>
      </div>
      <div style="margin-top:14px">
        <button class="btn btn-primary" type="submit">保存资料</button>
      </div>
    </form>
  `;
}

function renderSemiSection() {
  if (state.semiIdentity) {
    var id = state.semiIdentity;
    var didShort = (id.did || "").slice(0, 20) + "…";
    return `
      <section class="section-block semi-bound">
        <h2 class="section-title"><svg><use href="#icon-check"></use></svg>Semi 身份已绑定</h2>
        <div class="semi-info">
          <p><strong>${escapeHtml(id.handle || "匿名")}</strong></p>
          <p class="semi-did">${escapeHtml(didShort)}</p>
        </div>
      </section>
    `;
  }
  return `
    <section class="section-block semi-bind">
      <h2 class="section-title"><svg><use href="#icon-send"></use></svg>保存至 Semi 身份</h2>
      <p class="copy">将你的乡创人格绑定到 Semi 去中心化身份，在生态内展示和复用。</p>
      <div style="margin-top:14px">
        <button class="btn btn-primary" data-action="bind-semi">用 Semi 保存身份</button>
      </div>
    </section>
  `;
}

function renderAtlas() {
  return `
    <main class="atlas-page">
      <section class="page-heading">
        <h1>人格图鉴</h1>
        <p>全部 ${archetypes.length} 个乡创人格类型</p>
        <button class="btn btn-primary" data-screen="test" style="justify-self:start">去测试</button>
      </section>
      <section class="atlas-grid">
        ${archetypes.map(renderAtlasCard).join("")}
      </section>
    </main>
  `;
}

function renderAtlasCard(type) {
  return `
    <article class="atlas-card">
      <div class="atlas-visual" style="background:${type.colors[0]}">
        <img src="assets/figs/${type.code.toLowerCase()}.png" alt="${escapeHtml(type.name)}" onerror="this.parentElement.innerHTML='<strong>${escapeHtml(type.faction)}</strong><span class=\\'atlas-symbol\\'>${escapeHtml(type.symbol)}</span>'">
      </div>
      <div class="atlas-body">
        <h2>${escapeHtml(type.name)}</h2>
        <p>${escapeHtml(type.tagline)}</p>
        <div class="tag-row" style="padding:10px 0 0">
          ${type.tags.slice(0, 3).map((tag) => `<span class="tag tag-green">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderTasks() {
  const result = isComplete() ? computeResult() : null;
  const list = result ? getRecommendedTasks(result) : tasks;
  const applicationCount = state.applications.length;
  const completedCount = state.completedTasks.length;
  return `
    <main class="tasks-page">
      <section class="page-heading">
        <h1>共创任务</h1>
        <p>${result ? `按你的 ${escapeHtml(result.primary.name)} 画像排序` : "完成测试后按你的 CCTI 坐标排序"}</p>
        <button class="btn btn-primary" data-screen="${result ? "result" : "test"}" style="justify-self:start">
          ${result ? "看身份卡" : "去测试"}
        </button>
      </section>
      <section class="task-grid">
        ${list.map((task) => renderTaskCard(task, result)).join("")}
      </section>
      ${state.savedTasks.length || applicationCount || completedCount ? `<div class="empty-note">已收藏 ${state.savedTasks.length} 个，已报名 ${applicationCount} 个，已完成 ${completedCount} 个</div>` : ""}
    </main>
  `;
}

function renderTaskCard(task, result = null) {
  const saved = state.savedTasks.includes(task.id);
  const applied = state.applications.some((entry) => entry.taskId === task.id);
  const completed = state.completedTasks.includes(task.id);
  const reason = result ? getTaskReason(task, result) : "完成测试后会显示匹配理由。";
  return `
    <article class="task-card">
      <header>
        <h3>${escapeHtml(task.title)}</h3>
        <span class="task-type">${escapeHtml(task.type)}</span>
      </header>
      <p>${escapeHtml(task.summary)}</p>
      <p class="match-reason">${escapeHtml(reason)}</p>
      <div class="task-meta">
        ${task.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="task-actions">
        <button class="task-btn ${applied ? "is-saved" : ""}" data-action="apply-task" data-task="${task.id}">
          ${applied ? "已报名" : "报名"}
        </button>
        <button class="task-btn ${saved ? "is-saved" : ""}" data-action="save-task" data-task="${task.id}">
          ${saved ? "已收藏" : "收藏"}
        </button>
        <button class="task-btn ${completed ? "is-saved" : ""}" data-action="complete-task" data-task="${task.id}">
          ${completed ? "已完成" : "完成"}
        </button>
      </div>
    </article>
  `;
}

function renderVillages() {
  const result = isComplete() ? computeResult() : null;
  const list = result ? getRecommendedVillages(result) : villageProfiles;
  return `
    <main class="villages-page">
      <section class="page-heading">
        <h1>村庄匹配</h1>
        <p>${result ? `按 ${escapeHtml(result.primary.name)} 坐标排序` : "完成测试后按你的参与方式排序"}</p>
        <button class="btn btn-primary" data-screen="${result ? "tasks" : "test"}" style="justify-self:start">
          ${result ? "看共创任务" : "先做测试"}
        </button>
      </section>
      <section class="village-grid">
        ${list.map((village) => renderVillageCard(village, result)).join("")}
      </section>
      ${state.savedVillages.length ? `<div class="empty-note">已关注 ${state.savedVillages.length} 个村庄</div>` : ""}
    </main>
  `;
}

function renderVillageCard(village, result = null) {
  const saved = state.savedVillages.includes(village.id);
  const reason = result ? getVillageReason(village, result) : "完成测试后会显示你的适配理由。";
  const expanded = state.expandedVillage === village.id;
  return `
    <article class="village-card">
      <div class="village-visual" style="background:${escapeAttr(village.color)}">
        <span>${escapeHtml(village.type)}</span>
        <strong>${escapeHtml(village.caseName)}</strong>
      </div>
      <div class="village-body">
        <h3>${escapeHtml(village.name)}</h3>
        <p>${escapeHtml(village.summary)}</p>
        <p class="match-reason">${escapeHtml(reason)}</p>
        ${renderVillageScores(village)}
        <div class="task-meta">
          ${village.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="needs-list">
          ${village.needs.map((need) => `<span>${escapeHtml(need)}</span>`).join("")}
        </div>
        <button class="task-btn toggle-case" data-action="expand-village" data-village="${village.id}">
          ${expanded ? "收起案例" : "看真实案例"}
        </button>
        ${expanded ? `<div class="village-case"><p>${escapeHtml(village.caseSummary)}</p></div>` : ""}
        <button class="task-btn ${saved ? "is-saved" : ""}" data-action="save-village" data-village="${village.id}">
          ${saved ? "已关注" : "关注村庄"}
        </button>
      </div>
    </article>
  `;
}

function renderVillageScores(village) {
  const labels = { open: "开放度", culture: "文化密度", industry: "产业基础", digital: "数字条件" };
  return `
    <div class="village-score-grid">
      ${Object.entries(village.scores).map(([key, value]) => `
        <div class="village-score">
          <span>${escapeHtml(labels[key])}</span>
          <div class="mini-track"><div class="mini-fill" style="width:${value}%"></div></div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDashboard() {
  const stats = getDashboardStats();
  const result = isComplete() ? computeResult() : null;
  const funnel = [
    ["开始测试", state.analytics.starts],
    ["完成测试", state.analytics.completions],
    ["保存卡片", state.analytics.cardsSaved],
    ["复制分享", state.analytics.sharesCopied],
    ["保存资料", state.analytics.profilesSaved],
    ["报名任务", state.analytics.taskApplications],
    ["完成任务", state.analytics.taskCompletions],
    ["数字村民", state.analytics.digitalVillagerActivations],
    ["关注村庄", state.analytics.villageFollows]
  ];

  return `
    <main class="dashboard-page">
      <section class="page-heading">
        <h1>运营看板</h1>
        <p>本地埋点数据，演示完成率和线索沉淀</p>
        <button class="btn btn-primary" data-screen="home" style="justify-self:start">回到首页</button>
      </section>

      <section class="dashboard-grid">
        <article class="dashboard-card">
          <span>测试完成率</span>
          <strong>${stats.completionRate}%</strong>
          <p>${state.analytics.completions} 次完成</p>
        </article>
        <article class="dashboard-card">
          <span>线索沉淀</span>
          <strong>${stats.leads}</strong>
          <p>资料/报名/关注</p>
        </article>
        <article class="dashboard-card">
          <span>贡献值</span>
          <strong>${stats.xp}</strong>
          <p>${state.completedTasks.length} 个任务完成</p>
        </article>
        <article class="dashboard-card">
          <span>当前画像</span>
          <strong>${escapeHtml(result ? result.primary.name : "未完成")}</strong>
          <p>${escapeHtml(result ? `${linkageLabels[result.linkage]} · ${stageLabels[result.stage]}` : "先完成测试")}</p>
        </article>
      </section>

      <section class="section-block">
        <h2 class="section-title"><svg><use href="#icon-chart"></use></svg>本地漏斗</h2>
        <div class="funnel-list">
          ${funnel.map(([label, value]) => `
            <div class="funnel-row">
              <span>${escapeHtml(label)}</span>
              <div class="funnel-track"><i style="width:${stats.maxFunnel ? Math.max(6, Math.round((value / stats.maxFunnel) * 100)) : 0}%"></i></div>
              <strong>${value}</strong>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function handleClick(event) {
  const control = event.target.closest("[data-action], [data-screen]");
  if (!control || control.disabled) return;

  if (control.dataset.screen) {
    state.screen = control.dataset.screen;
    if (state.screen === "test") state.questionIndex = clamp(state.questionIndex, 0, questions.length - 1);
    persist();
    render();
    return;
  }

  const action = control.dataset.action;
  if (action === "start-test") {
    if (!state.answers.some(Number.isInteger) && !state.startedAt) {
      state.startedAt = new Date().toISOString();
      state.analytics.starts += 1;
    }
    state.screen = "test";
    persist();
    render();
  }
  if (action === "answer") {
    if (!state.answers.some(Number.isInteger) && !state.startedAt) {
      state.startedAt = new Date().toISOString();
      state.analytics.starts += 1;
    }
    state.answers[state.questionIndex] = Number(control.dataset.answer);
    persist();
    render();
  }
  if (action === "next") {
    if (state.questionIndex >= questions.length - 1) {
      if (isComplete() && !state.completedAt) {
        state.completedAt = new Date().toISOString();
        state.analytics.completions += 1;
      }
      state.screen = "result";
    } else {
      state.questionIndex += 1;
    }
    persist();
    render();
  }
  if (action === "prev") {
    state.questionIndex = Math.max(0, state.questionIndex - 1);
    persist();
    render();
  }
  if (action === "restart") {
    state.answers = Array(questions.length).fill(null);
    state.questionIndex = 0;
    state.screen = "test";
    state.completedAt = "";
    state.startedAt = new Date().toISOString();
    state.analytics.starts += 1;
    persist();
    render();
    toast("已重新开始测试");
  }
  if (action === "go-unanswered") {
    state.questionIndex = Number(control.dataset.index) || 0;
    state.screen = "test";
    persist();
    render();
  }
  if (action === "save-card") {
    downloadCard();
  }
  if (action === "copy-share") {
    copyShareText();
  }
  if (action === "save-task") {
    toggleTask(control.dataset.task);
  }
  if (action === "apply-task") {
    applyTask(control.dataset.task);
  }
  if (action === "complete-task") {
    completeTask(control.dataset.task);
  }
  if (action === "save-village") {
    toggleVillage(control.dataset.village);
  }
  if (action === "expand-village") {
    state.expandedVillage = state.expandedVillage === control.dataset.village ? null : control.dataset.village;
    persist();
    render();
  }
  if (action === "bind-semi") {
    handleBindSemi();
  }
}

function handleBindSemi() {
  var result = computeResult();
  var answersObj = {};
  state.answers.forEach(function (a, i) { if (Number.isInteger(a)) answersObj[i] = a; });
  var personality = {
    primaryId: result.primary.id,
    primaryName: result.primary.name,
    secondaryId: result.secondary.id,
    secondaryName: result.secondary.name,
    drive: result.drive,
    domain: result.domain,
    social: result.social,
    linkage: result.linkage,
    stage: result.stage
  };
  toast("正在提交…");
  CCTI_API.submitTest(answersObj, personality, state.profile).then(function (res) {
    if (res.ok && res.resultId) {
      sessionStorage.setItem("ccti-pending-result-id", res.resultId);
    }
    CCTI_API.initSemiAuth();
  }).catch(function () {
    CCTI_API.initSemiAuth();
  });
}

function handleSubmit(event) {
  const form = event.target.closest("[data-action='save-profile']");
  if (!form) return;
  event.preventDefault();
  const formData = new FormData(form);
  state.profile = {
    name: String(formData.get("name") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    skills: String(formData.get("skills") || "").trim(),
    mode: String(formData.get("mode") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    availability: String(formData.get("availability") || "").trim()
  };
  state.analytics.profilesSaved += 1;
  if (state.profile.name || state.profile.contact || state.profile.skills) {
    state.analytics.digitalVillagerActivations += 1;
  }
  persist();
  toast("身份资料已保存");
  if (state.screen === "result") {
    requestAnimationFrame(() => {
      const canvas = document.querySelector("#resultCard");
      if (canvas) drawCard(canvas, computeResult(), 720, 1080);
    });
  }
}

function toggleTask(taskId) {
  if (!taskId) return;
  if (state.savedTasks.includes(taskId)) {
    state.savedTasks = state.savedTasks.filter((id) => id !== taskId);
    toast("已取消收藏");
  } else {
    state.savedTasks = [...state.savedTasks, taskId];
    toast("任务已收藏");
  }
  persist();
  render();
}

function applyTask(taskId) {
  if (!taskId) return;
  const applied = state.applications.some((entry) => entry.taskId === taskId);
  if (applied) {
    state.applications = state.applications.filter((entry) => entry.taskId !== taskId);
    toast("已取消报名意向");
  } else {
    const result = isComplete() ? computeResult() : null;
    state.applications = [
      ...state.applications,
      {
        taskId,
        appliedAt: new Date().toISOString(),
        personality: result?.primary.id || "",
        profile: {
          city: state.profile.city,
          skills: state.profile.skills,
          availability: state.profile.availability
        }
      }
    ];
    state.analytics.taskApplications += 1;
    toast("报名意向已记录");
  }
  persist();
  render();
}

function completeTask(taskId) {
  if (!taskId) return;
  if (state.completedTasks.includes(taskId)) {
    state.completedTasks = state.completedTasks.filter((id) => id !== taskId);
    toast("已取消完成标记");
  } else {
    state.completedTasks = [...state.completedTasks, taskId];
    if (!state.applications.some((entry) => entry.taskId === taskId)) {
      const result = isComplete() ? computeResult() : null;
      state.applications = [
        ...state.applications,
        {
          taskId,
          appliedAt: new Date().toISOString(),
          personality: result?.primary.id || "",
          profile: {
            city: state.profile.city,
            skills: state.profile.skills,
            availability: state.profile.availability
          }
        }
      ];
    }
    state.analytics.taskCompletions += 1;
    toast("任务完成，贡献值已增加");
  }
  persist();
  render();
}

function toggleVillage(villageId) {
  if (!villageId) return;
  if (state.savedVillages.includes(villageId)) {
    state.savedVillages = state.savedVillages.filter((id) => id !== villageId);
    toast("已取消关注");
  } else {
    state.savedVillages = [...state.savedVillages, villageId];
    state.analytics.villageFollows += 1;
    toast("村庄已关注");
  }
  persist();
  render();
}

function calculateScores() {
  const scores = {
    drive: { zen: 0, build: 0 },
    domain: { pixel: 0, soil: 0 },
    social: { mute: 0, loud: 0 },
    linkage: { rooted: 0, migratory: 0, cloud: 0, explorer: 0 },
    stage: { escape: 0, connect: 0, value: 0, node: 0 },
    action: { perceive: 0, build: 0, transform: 0 },
    orientation: { emotion: 0, craft: 0, system: 0 },
    energy: { full: 0, steady: 0, tired: 0, overdrawn: 0, empty: 0 },
    fatigue: { meaning: 0, body: 0, social: 0, lonely: 0 }
  };

  state.answers.forEach((answer, questionIndex) => {
    if (!Number.isInteger(answer)) return;
    const option = questions[questionIndex]?.options[answer];
    if (!option) return;
    Object.entries(option.scores).forEach(([dimension, entries]) => {
      if (!scores[dimension]) scores[dimension] = {};
      Object.entries(entries).forEach(([key, value]) => {
        if (!Number.isFinite(scores[dimension][key])) scores[dimension][key] = 0;
        scores[dimension][key] += value;
      });
    });
  });

  return scores;
}

function getDominants(scores) {
  return {
    drive: dominant(scores.drive),
    domain: dominant(scores.domain),
    social: dominant(scores.social),
    linkage: dominant(scores.linkage),
    stage: dominant(scores.stage)
  };
}

function computeResult() {
  if (isXctiDataset()) return computeXctiResult();

  const scores = calculateScores();
  const dominantSet = getDominants(scores);
  const ranked = archetypes.map((type) => {
    let score = 0;
    if (type.drive === dominantSet.drive.key) score += 18;
    if (type.domain === dominantSet.domain.key) score += 22;
    if (type.social === dominantSet.social.key) score += 18;
    if (type.linkage === dominantSet.linkage.key) score += 24;
    if (type.stageFocus.includes(dominantSet.stage.key)) score += 12;
    score += proportionalScore(scores.drive, type.drive) * 8;
    score += proportionalScore(scores.domain, type.domain) * 10;
    score += proportionalScore(scores.social, type.social) * 8;
    score += proportionalScore(scores.linkage, type.linkage) * 10;
    score += Math.max(...type.stageFocus.map((stage) => proportionalScore(scores.stage, stage))) * 6;
    return { type, score };
  }).sort((a, b) => b.score - a.score);

  const primary = ranked[0].type;
  const secondary = ranked.find((entry) => entry.type.id !== primary.id)?.type || ranked[1].type;
  return {
    primary,
    secondary,
    scores,
    drive: dominantSet.drive.key,
    domain: dominantSet.domain.key,
    social: dominantSet.social.key,
    linkage: dominantSet.linkage.key,
    stage: dominantSet.stage.key,
    positions: {
      drive: binaryPosition(scores.drive, "zen", "build"),
      domain: binaryPosition(scores.domain, "pixel", "soil"),
      social: binaryPosition(scores.social, "mute", "loud"),
      linkage: ordinalPosition(["explorer", "cloud", "migratory", "rooted"], dominantSet.linkage.key),
      stage: ordinalPosition(["escape", "connect", "value", "node"], dominantSet.stage.key)
    }
  };
}

function isXctiDataset() {
  return archetypes[0]?.code?.length === 3 && Boolean(archetypes[0]?.action);
}

function computeXctiResult() {
  const scores = calculateScores();
  const action = dominant(scores.action).key;
  const linkage = dominant(scores.linkage).key === "explorer" ? "migratory" : dominant(scores.linkage).key;
  const orientation = dominant(scores.orientation).key;
  const stage = dominant(scores.stage).value ? dominant(scores.stage).key : inferXctiStage(action, linkage, orientation);
  const ranked = archetypes.map((type) => {
    let score = 0;
    if (type.action === action) score += 38;
    if (type.linkageMode === linkage) score += 34;
    if (type.orientation === orientation) score += 38;
    score += proportionalScore(scores.action, type.action) * 16;
    score += proportionalScore(scores.linkage, type.linkageMode) * 14;
    score += proportionalScore(scores.orientation, type.orientation) * 16;
    return { type, score };
  }).sort((a, b) => b.score - a.score);

  const primary = ranked[0].type;
  const secondary = ranked.find((entry) => entry.type.id !== primary.id)?.type || ranked[1].type;
  const energy = computeEnergy(scores);
  const fatigue = dominant(scores.fatigue);
  return {
    primary,
    secondary,
    scores,
    action,
    orientation,
    energy,
    fatigue: fatigue.value ? fatigue.key : "meaning",
    drive: primary.drive,
    domain: primary.domain,
    social: primary.social,
    linkage: primary.linkage,
    stage,
    positions: {
      action: ordinalPosition(["perceive", "build", "transform"], action),
      linkage: ordinalPosition(["rooted", "migratory", "cloud"], linkage),
      orientation: ordinalPosition(["emotion", "craft", "system"], orientation),
      stage: ordinalPosition(["escape", "connect", "value", "node"], stage)
    }
  };
}

function computeEnergy(scores) {
  const energy = scores.energy || {};
  const weighted =
    (energy.full || 0) * 92 +
    (energy.steady || 0) * 76 +
    (energy.tired || 0) * 56 +
    (energy.overdrawn || 0) * 36 +
    (energy.empty || 0) * 18;
  const total = Object.values(energy).reduce((sum, value) => sum + value, 0);
  return total ? Math.round(weighted / total) : 72;
}

function energyLabel(value) {
  if (value >= 85) return "满电";
  if (value >= 65) return "稳定";
  if (value >= 45) return "需要休息";
  if (value >= 25) return "透支";
  return "快没电";
}

function fatigueLabel(key) {
  return {
    meaning: "意义感疲劳",
    body: "身体过载",
    social: "关系消耗",
    lonely: "孤独型疲劳"
  }[key] || "状态波动";
}

function inferXctiStage(action, linkage, orientation) {
  if (linkage === "cloud" && orientation === "system") return "node";
  if (action === "transform" || orientation === "system") return "value";
  if (linkage === "rooted") return "connect";
  return "escape";
}

function calculateXp() {
  let xp = 0;
  if (isComplete()) xp += 40;
  xp += state.applications.length * 18;
  xp += state.completedTasks.length * 45;
  xp += state.savedVillages.length * 16;
  if (state.profile.name || state.profile.skills || state.profile.contact) xp += 24;
  return xp;
}

function getEarnedBadges() {
  return badgeCatalog.filter((badge) => badge.test());
}

function getRecommendedTeam(result) {
  const roles = ["风控翻译", "现场执行", "资源链接"];
  return result.primary.pairings.map((name, index) => {
    const type = archetypes.find((item) => item.name === name);
    return {
      name,
      role: roles[index] || "协作补位",
      reason: type
        ? `补上${type.strength}，平衡你在 ${result.primary.blindspot.replace("。", "")} 上的风险。`
        : "用于补足团队结构，让创意、执行、链接和长期运营更完整。"
    };
  });
}

function getRecommendedTasks(result) {
  const profileText = `${state.profile.skills} ${state.profile.mode}`.toLowerCase();
  return [...tasks].map((task) => {
    let score = 0;
    if (task.recommendedFor.includes(result.primary.id)) score += 40;
    if (task.recommendedFor.includes(result.secondary.id)) score += 16;
    Object.entries(task.fit).forEach(([dimension, accepted]) => {
      if (accepted.includes(result[dimension])) score += 12;
    });
    task.tags.forEach((tag) => {
      if (profileText && profileText.includes(tag.toLowerCase())) score += 5;
    });
    return { ...task, sortScore: score };
  }).sort((a, b) => b.sortScore - a.sortScore);
}

function getRecommendedVillages(result) {
  return [...villageProfiles].map((village) => {
    let score = 0;
    if (village.fit.action && village.fit.action.includes(result.action)) score += 22;
    if (village.fit.linkage && village.fit.linkage.includes(result.linkage)) score += 20;
    if (village.fit.orientation && village.fit.orientation.includes(result.orientation)) score += 18;
    if (village.stage.includes(result.stage)) score += 12;
    if (result.primary.villages) {
      result.primary.villages.forEach((type) => {
        const vt = village.type.replace("型", "");
        const tt = type.replace("型", "");
        if (vt.includes(tt) || tt.includes(vt)) score += 8;
      });
    }
    return { ...village, sortScore: score };
  }).sort((a, b) => b.sortScore - a.sortScore);
}

function getTaskReason(task, result) {
  const matches = [];
  Object.entries(task.fit).forEach(([dimension, accepted]) => {
    if (accepted.includes(result[dimension])) {
      matches.push(dimensionLabel(dimension, result[dimension]));
    }
  });
  if (task.recommendedFor.includes(result.primary.id)) matches.push(`适配 ${result.primary.name}`);
  if (!matches.length) return "它能补足你的协作履历，适合做一次低门槛尝试。";
  return `匹配理由：${matches.slice(0, 3).join("、")}。`;
}

function getVillageReason(village, result) {
  const matches = [];
  if (village.fit.action && village.fit.action.includes(result.action)) {
    matches.push(xctiAxis.action[result.action]?.label || result.action);
  }
  if (village.fit.linkage && village.fit.linkage.includes(result.linkage)) {
    matches.push(xctiAxis.linkage[result.linkage]?.label || result.linkage);
  }
  if (village.fit.orientation && village.fit.orientation.includes(result.orientation)) {
    matches.push(xctiAxis.orientation[result.orientation]?.text || result.orientation);
  }
  if (village.stage.includes(result.stage)) matches.push(stageLabels[result.stage] || result.stage);
  if (!matches.length) return "这个村庄适合作为跨类型探索样本。";
  return `适配 ${matches.slice(0, 3).join("、")}，可先从 ${village.needs[0]} 切入。`;
}

function getPersonalizedAdvice(result) {
  const mode = state.profile.mode ? linkageLabels[state.profile.mode] : linkageLabels[result.linkage];
  const skills = state.profile.skills ? `你填过的技能是「${state.profile.skills}」，` : "";
  const availability = state.profile.availability ? `在「${state.profile.availability}」的时间范围内，` : "";
  return `${skills}${availability}建议用「${mode}」方式先完成一个可展示的小成果。你的人格优势在 ${result.primary.strength}，最适合先和「${result.primary.pairings[0]}」型队友配对，让想法、现场和交付节奏同时闭环。`;
}

function dimensionLabel(dimension, key) {
  const labels = {
    drive: { zen: "疗愈动机", build: "建设动机" },
    domain: { pixel: "数字能力", soil: "在地实干" },
    social: { mute: "安静交付", loud: "连接组织" },
    linkage: linkageLabels,
    stage: stageLabels
  };
  return labels[dimension]?.[key] || key;
}

function getDashboardStats() {
  const starts = Math.max(state.analytics.starts, state.analytics.completions);
  const completions = state.analytics.completions;
  const xp = calculateXp();
  const leads = Number(Boolean(state.profile.name || state.profile.contact || state.profile.skills))
    + state.applications.length
    + state.savedVillages.length;
  const maxFunnel = Math.max(
    1,
    state.analytics.starts,
    state.analytics.completions,
    state.analytics.cardsSaved,
    state.analytics.sharesCopied,
    state.analytics.profilesSaved,
    state.analytics.taskApplications,
    state.analytics.taskCompletions,
    state.analytics.digitalVillagerActivations,
    state.analytics.villageFollows
  );
  return {
    completionRate: starts ? Math.round((completions / starts) * 100) : 0,
    cardSaveRate: completions ? Math.round((state.analytics.cardsSaved / completions) * 100) : 0,
    xp,
    leads,
    maxFunnel
  };
}

function dominant(bucket) {
  const entries = Object.entries(bucket);
  const [key, value] = entries.reduce((best, entry) => entry[1] > best[1] ? entry : best, entries[0]);
  return { key, value };
}

function proportionalScore(bucket, key) {
  const total = Object.values(bucket).reduce((sum, value) => sum + value, 0);
  if (!total) return 0;
  return (bucket[key] || 0) / total;
}

function dominancePercent(bucket, key) {
  const total = Object.values(bucket).reduce((sum, value) => sum + value, 0);
  if (!total) return 50;
  return Math.max(12, Math.round(((bucket[key] || 0) / total) * 100));
}

function binaryPosition(bucket, leftKey, rightKey) {
  const total = (bucket[leftKey] || 0) + (bucket[rightKey] || 0);
  if (!total) return 50;
  return Math.round(((bucket[rightKey] || 0) / total) * 100);
}

function ordinalPosition(order, key) {
  const index = Math.max(0, order.indexOf(key));
  return Math.round((index / (order.length - 1)) * 100);
}

function isComplete() {
  return state.answers.every(Number.isInteger);
}

function firstUnansweredIndex() {
  const index = state.answers.findIndex((answer) => !Number.isInteger(answer));
  return index === -1 ? 0 : index;
}

function downloadCard() {
  if (!isComplete()) return;
  const result = computeResult();
  const canvas = document.querySelector("#exportCanvas");
  drawCard(canvas, result, 1080, 1620);
  const link = document.createElement("a");
  link.download = `CCTI-${result.primary.name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  state.analytics.cardsSaved += 1;
  persist();
  toast("人格卡已生成");
}

async function copyShareText() {
  const result = computeResult();
  const text = `我的乡野青创人格是「${result.primary.name}」：${result.primary.tagline} 适配队友：${result.primary.pairings.join("、")}。`;
  try {
    await navigator.clipboard.writeText(text);
    state.analytics.sharesCopied += 1;
    persist();
    toast("分享文案已复制");
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    state.analytics.sharesCopied += 1;
    persist();
    toast("分享文案已复制");
  }
}

function drawCard(canvas, result, width, height, img) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const type = result.primary;
  const scale = width / 1080;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = type.colors[2] || "#f4f7f2";
  ctx.fillRect(0, 0, width, height);

  drawTerrain(ctx, width, height, type.colors);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 64 * scale, 76 * scale, width - 128 * scale, height - 152 * scale, 28 * scale);
  ctx.fill();
  ctx.strokeStyle = "#16231f";
  ctx.lineWidth = 4 * scale;
  ctx.stroke();

  ctx.fillStyle = type.colors[0];
  roundRect(ctx, 96 * scale, 110 * scale, width - 192 * scale, 330 * scale, 22 * scale);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,.16)";
  for (let i = 0; i < 9; i += 1) {
    ctx.fillRect((120 + i * 92) * scale, 136 * scale, 38 * scale, 260 * scale);
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = `${26 * scale}px sans-serif`;
  ctx.fillText("乡野青创", 132 * scale, 174 * scale);

  ctx.font = `900 ${78 * scale}px sans-serif`;
  ctx.fillText(type.name, 132 * scale, 278 * scale);

  ctx.font = `700 ${30 * scale}px sans-serif`;
  ctx.fillText(type.code, 132 * scale, 332 * scale);

  if (img) {
    const maxW = 120 * scale;
    const maxH = 156 * scale;
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const dw = img.width * ratio;
    const dh = img.height * ratio;
    const dx = (width - 250 * scale) + (maxW - dw) / 2;
    const dy = 136 * scale + (maxH - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  } else {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4 * scale;
    roundRect(ctx, (width - 250 * scale), 154 * scale, 120 * scale, 120 * scale, 18 * scale);
    ctx.stroke();
    ctx.font = `900 ${46 * scale}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(type.symbol, width - 190 * scale, 230 * scale);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "#16231f";
  ctx.font = `800 ${30 * scale}px sans-serif`;
  ctx.fillText("你的乡创定位", 132 * scale, 520 * scale);
  ctx.font = `${31 * scale}px sans-serif`;
  wrapText(ctx, type.tagline, 132 * scale, 580 * scale, width - 264 * scale, 48 * scale, 3);

  const chips = [type.faction, ...type.tags.slice(0, 4)];
  let chipX = 132 * scale;
  let chipY = 780 * scale;
  ctx.font = `800 ${24 * scale}px sans-serif`;
  chips.forEach((chip) => {
    const chipWidth = ctx.measureText(chip).width + 42 * scale;
    if (chipX + chipWidth > width - 132 * scale) {
      chipX = 132 * scale;
      chipY += 58 * scale;
    }
    ctx.fillStyle = "#e7f2ee";
    roundRect(ctx, chipX, chipY, chipWidth, 40 * scale, 20 * scale);
    ctx.fill();
    ctx.fillStyle = "#255f50";
    ctx.fillText(chip, chipX + 20 * scale, chipY + 28 * scale);
    chipX += chipWidth + 12 * scale;
  });

  ctx.fillStyle = "#16231f";
  ctx.font = `800 ${28 * scale}px sans-serif`;
  ctx.fillText("最佳队友", 132 * scale, 970 * scale);
  ctx.font = `${28 * scale}px sans-serif`;
  wrapText(ctx, type.pairings.join(" / "), 132 * scale, 1024 * scale, width - 264 * scale, 42 * scale, 2);

  ctx.font = `800 ${28 * scale}px sans-serif`;
  ctx.fillText("适配村格", 132 * scale, 1148 * scale);
  ctx.font = `${28 * scale}px sans-serif`;
  wrapText(ctx, type.villages.join(" / "), 132 * scale, 1202 * scale, width - 264 * scale, 42 * scale, 2);

  const name = state.profile.name ? state.profile.name : "一位正在靠近乡村的青年";
  ctx.fillStyle = type.colors[1] || "#f4b942";
  roundRect(ctx, 132 * scale, 1348 * scale, width - 264 * scale, 92 * scale, 18 * scale);
  ctx.fill();
  ctx.fillStyle = "#16231f";
  ctx.font = `900 ${30 * scale}px sans-serif`;
  ctx.fillText(name, 168 * scale, 1405 * scale);
  ctx.font = `${22 * scale}px sans-serif`;
  ctx.fillText("测试生成 · 可继续进化的人格坐标", 168 * scale, 1436 * scale);
}

function drawTerrain(ctx, width, height, colors) {
  const green = colors[0] || "#255f50";
  const accent = colors[1] || "#d65a31";
  ctx.fillStyle = green;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.76);
  ctx.bezierCurveTo(width * 0.18, height * 0.69, width * 0.32, height * 0.85, width * 0.5, height * 0.76);
  ctx.bezierCurveTo(width * 0.7, height * 0.66, width * 0.82, height * 0.8, width, height * 0.72);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.86);
  ctx.bezierCurveTo(width * 0.22, height * 0.8, width * 0.34, height * 0.93, width * 0.58, height * 0.86);
  ctx.bezierCurveTo(width * 0.78, height * 0.8, width * 0.9, height * 0.88, width, height * 0.84);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = String(text).split("");
  let line = "";
  let lines = 0;
  for (let i = 0; i < chars.length; i += 1) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = chars[i];
      lines += 1;
      if (lines >= maxLines) return;
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) {
    ctx.fillText(line, x, y + lines * lineHeight);
  }
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 2200);
}

function buildXctiArchetype([number, code, name, definition]) {
  const actionKey = { P: "perceive", B: "build", C: "transform" }[code[0]];
  const linkageKey = { R: "rooted", M: "migratory", C: "cloud" }[code[1]];
  const orientationKey = { E: "emotion", C: "craft", S: "system" }[code[2]];
  const action = xctiAxis.action[actionKey];
  const linkage = xctiAxis.linkage[linkageKey];
  const orientation = xctiAxis.orientation[orientationKey];
  const tags = [action.label, linkage.label, orientation.label, number].map(String);

  return {
    id: `xcti_${code.toLowerCase()}`,
    number,
    name,
    symbol: code,
    faction: `${action.prefix} · ${linkage.suffix}`,
    action: actionKey,
    linkageMode: linkageKey,
    orientation: orientationKey,
    drive: action.drive,
    domain: action.domain,
    social: orientation.social,
    linkage: linkageKey,
    stageFocus: linkage.stage,
    code,
    tags,
    tagline: definition,
    summary: definition,
    strength: `${action.strength}；${orientation.text}`,
    blindspot: getXctiBlindspot(actionKey, linkageKey, orientationKey),
    nextStep: getXctiNextStep(actionKey, linkageKey, orientationKey),
    pairings: getXctiPairings(code),
    villages: getXctiVillages(actionKey, linkageKey, orientationKey),
    colors: [action.color, orientationKey === "emotion" ? "#e6d5b8" : orientationKey === "craft" ? "#829460" : "#4e6c50", "#f8f3ea"]
  };
}

function makeXctiQuestion(scene, title, items) {
  return {
    scene,
    title,
    options: items.map(([label, scores], index) => ({
      key: String.fromCharCode(65 + index),
      label,
      helper: xctiOptionHint(scores),
      scores
    }))
  };
}

function xctiOptionHint(scores) {
  const parts = [];
  const topAction = scores.action ? dominant(scores.action).key : "";
  const topLinkage = scores.linkage ? dominant(scores.linkage).key : "";
  const topOrientation = scores.orientation ? dominant(scores.orientation).key : "";
  if (topAction) parts.push(xctiAxis.action[topAction].label);
  if (topLinkage && xctiAxis.linkage[topLinkage]) parts.push(xctiAxis.linkage[topLinkage].label);
  if (topOrientation) parts.push(`${xctiAxis.orientation[topOrientation].label}本位`);
  return parts.length ? `倾向：${parts.join(" / ")}` : "用于识别你的精神电量与状态波动";
}

function getXctiBlindspot(action, linkage, orientation) {
  if (action === "perceive") return "容易停留在感受里，需要把观察转成一个小作品或一次真实行动。";
  if (action === "build") return "容易埋头死磕，忘记解释自己的价值，也容易把身体用到太满。";
  if (linkage === "cloud") return "容易低估线下关系的复杂度，需要一个懂现场的人帮你校准。";
  if (orientation === "system") return "容易过早进入机制设计，需要先确认真实的人是否愿意一起走。";
  return "容易在关系、作品和秩序之间来回摇摆，需要给自己一个更小的入口。";
}

function getXctiNextStep(action, linkage, orientation) {
  if (linkage === "rooted") return "先在一个具体地方生活三天，做一件能被别人看见的小事。";
  if (linkage === "migratory") return "先完成一次短住或工作坊，把移动经验沉淀成记录和清单。";
  if (linkage === "cloud") return "先接一个远程小任务，让键盘真的连到一块土地。";
  if (orientation === "system") return "先写一页协作规则，不要急着搭平台。";
  if (action === "build") return "先做一个小物件、小页面或小改造，让手和现实重新对齐。";
  return "先记录一段真实感受，再决定要不要进入更深的协作。";
}

function getXctiPairings(code) {
  const actionChar = code[0];
  const orientationChar = code[2];
  if (orientationChar === "E") return ["共生体系主理人", "在地守艺人", "资源摆渡人"];
  if (orientationChar === "C") return ["大地策展人", "新乡民守门人", "社群云主理"];
  if (actionChar === "P") return ["生态修复师", "季风工作坊主", "乡村后端架设师"];
  if (actionChar === "B") return ["风土倾听者", "社群云主理", "开源乡村架构师"];
  return ["在地守艺人", "视觉翻译官", "乡创全息导师"];
}

function getXctiVillages(action, linkage, orientation) {
  const villages = [];
  if (action === "perceive" && orientation === "emotion") villages.push("原生秘境村", "艺术实验田");
  if (action === "perceive" && orientation === "craft") villages.push("艺术实验田", "文旅机遇村");
  if (action === "perceive" && orientation === "system") villages.push("文旅机遇村", "城郊新乡村");
  if (action === "build" && linkage === "rooted") villages.push("待激活空心村", "产业实干村");
  if (action === "build" && linkage === "migratory") villages.push("产业实干村", "城郊新乡村");
  if (action === "build" && linkage === "cloud") villages.push("产业实干村", "文旅机遇村");
  if (action === "transform" && linkage === "rooted") villages.push("艺术实验田", "待激活空心村");
  if (action === "transform" && linkage === "migratory") villages.push("文旅机遇村", "产业实干村");
  if (action === "transform" && linkage === "cloud") villages.push("城郊新乡村", "文旅机遇村");
  if (orientation === "emotion" && !villages.length) villages.push("原生秘境村", "艺术实验田");
  if (!villages.length) villages.push("城郊新乡村", "文旅机遇村");
  return villages.slice(0, 3);
}

function renderTriMetric(label, bucket, order, labels) {
  const dominantKey = dominant(bucket).key;
  const position = ordinalPosition(order, dominantKey);
  return `
    <div class="metric">
      <div class="metric-top"><span>${escapeHtml(label)}</span><span>${escapeHtml(labels[order.indexOf(dominantKey)] || "")}</span></div>
      <div class="mini-track"><div class="mini-fill" style="width:${Math.max(10, position)}%"></div></div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hashCode(value) {
  const text = String(value);
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36).slice(0, 5).toUpperCase();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
