const posts = [
  {
    id: '1',
    title: '视觉注意力与脑科学阅读方式',
    summary: '用黑白灰搭配记录文献、实验和思考，避免视觉干扰让内容更清晰。',
    tag: '论文',
    date: '2026年4月20日',
    reading: '6 分钟阅读',
    body: [
      '研究者应当把笔记做成可查阅的结构，黑白灰的层次让内容本身成为核心。',
      '在阅读神经科学文献时，沿着结论、方法、结果三个维度拆解更高效。',
      '这种思路适合长期追踪论文，同时保留你自己的实验思考。'
    ]
  },
  {
    id: '2',
    title: '前额叶网络与决策过程摘要',
    summary: '将复杂脑网络拆解成关键变量，形成可复用的科研笔记结构。',
    tag: '论文',
    date: '2026年4月22日',
    reading: '7 分钟阅读',
    body: [
      '这篇文章中提到的前额叶决策环路，为实验设计提供了清晰的层次。',
      '笔记中把结论与方法分开表述，便于未来对比不同模型的结果。',
      '在做研究时，保持记录的统一格式能让笔记长期保存价值。'
    ]
  },
  {
    id: '3',
    title: '记录日常研究灵感',
    summary: '将实验观察、读书心得与生活中的脑科学感知拆成独立日志。',
    tag: '日常',
    date: '2026年4月23日',
    reading: '4 分钟阅读',
    body: [
      '清晨时段常常是捕捉灵感的最佳时机。把突发的想法立刻写进日记。',
      '把工作与生活中的观察区分成“研究”和“感受”，避免混淆。',
      '这类日常记录是以后复盘和调整研究节奏的关键材料。'
    ]
  },
  {
    id: '4',
    title: '神经科学笔记的格式建议',
    summary: '为脑科学笔记提供一个既简洁又可扩展的记录模板。',
    tag: '日常',
    date: '2026年4月24日',
    reading: '5 分钟阅读',
    body: [
      '笔记模板建议包含背景、问题、方法、结果和下一步五部分。',
      '黑白灰风格下，使用细线和留白分割信息块，比颜色区分更耐看。',
      '这个模板既适合写论文总结，也适合写日常实验日志。'
    ]
  },
  {
    id: '5',
    title: '为什么笔记空间只用黑白灰',
    summary: '去掉颜色干扰，用网格、边框和留白建立信息层次，让内容本身成为主角。',
    tag: '设计',
    date: '2026年4月24日',
    reading: '5 分钟阅读',
    body: [
      '颜色在信息设计中是一把双刃剑。过多色彩会分散注意力，让阅读变成视觉扫描。',
      '用灰度层次代替颜色区分，边框与留白形成自然的信息区块，笔记更清晰也更耐看。',
      '这套极简风格的目标不是冷淡，而是让每一次打开页面都能立刻进入阅读状态。'
    ]
  },
  {
    id: '6',
    title: '视觉层次与记忆编码',
    summary: '从实验设计到数据解释，分解视觉注意和记忆形成之间的关系。',
    tag: '论文',
    source: '2026 · Nature Neuroscience',
    date: '2026年4月18日',
    reading: '8 分钟阅读',
    body: [
      '这篇论文探讨了视觉层次结构如何影响海马体的记忆编码效率。',
      '实验使用了层级化的视觉刺激，发现深层特征更容易被长期记住。',
      '关键方法：fMRI 结合层级化图像呈现，分析不同视觉区域的激活模式。',
      '可借鉴点：实验设计中的层级刺激范式，可用于我自己的视觉注意实验。'
    ]
  },
  {
    id: '7',
    title: '前额叶网络与决策过程',
    summary: '提炼决策模型中的关键变量，形成适用于后续实验的对照框架。',
    tag: '论文',
    source: '2025 · Neuron',
    date: '2026年4月15日',
    reading: '7 分钟阅读',
    body: [
      '前额叶皮层在决策过程中扮演了信息整合与价值评估的双重角色。',
      '论文提出的多变量决策模型，将选择过程分解为感知、评估、执行三个阶段。',
      '关键发现：背外侧前额叶（dlPFC）在冲突决策中的激活显著增强。',
      '对我的研究的潜在影响：可以借鉴其多变量分析方法来分析我的实验数据。'
    ]
  },
  {
    id: '8',
    title: '记忆巩固与睡眠节律',
    summary: '记录该文的实验步骤与可复制点，为自己的实验设计提供参考。',
    tag: '论文',
    source: '2024 · eLife',
    date: '2026年4月10日',
    reading: '6 分钟阅读',
    body: [
      '睡眠纺锤波和慢波振荡在记忆巩固过程中起到了关键作用。',
      '实验设计：通过睡眠实验室监测，比较学习前后的记忆表现。',
      '关键数据：慢波睡眠期间的神经重放频率与第二天记忆测试成绩呈正相关。',
      '可复制点：睡眠监测与记忆测试的时间窗口设计，可以纳入我的后续研究。'
    ]
  },
  {
    id: '9',
    title: '今日实验',
    summary: '记录实验步骤、关键观察和需要进一步优化的地方。',
    tag: '日常',
    date: '2026年4月24日',
    reading: '3 分钟阅读',
    body: [
      '今天的视觉注意实验进展顺利，被试反应时间比预期快了约 15%。',
      '关键观察：在层级化刺激条件下，被试的准确率显著提高。',
      '需要优化的地方：刺激呈现时间的随机化策略需要调整，以减少预期效应。',
      '下一步：修改实验程序，增加更多的试次以确保统计功效。'
    ]
  },
  {
    id: '10',
    title: '读书摘录',
    summary: '把脑科学文本中的核心概念拆成简短笔记，方便之后快速回顾。',
    tag: '日常',
    date: '2026年4月23日',
    reading: '4 分钟阅读',
    body: [
      '今天阅读了《认知神经科学》中关于工作记忆容量的章节。',
      '核心概念：工作记忆的容量限制（4±1 个组块）并非固定不变，而是受注意策略调节。',
      '有趣的发现：通过训练可以显著提高工作记忆的广度，但这种提升是否具有迁移性仍有争议。',
      '后续计划：查找相关的训练研究文献，深入了解其神经机制。'
    ]
  },
  {
    id: '11',
    title: '灵感与问题',
    summary: '把研究中浮现的每一个问题写下来，避免"灵光一闪"后遗忘。',
    tag: '日常',
    date: '2026年4月22日',
    reading: '3 分钟阅读',
    body: [
      '突然想到：是否可以将层级化视觉刺激的范式应用到决策任务中？',
      '假设：深层特征的处理可能会影响决策速度，因为需要更长的时间来整合信息。',
      '可行实验方案：修改现有的视觉注意实验，加入二选一决策环节。',
      '需要验证的点：决策时间是否与刺激层级深度呈线性关系，还是有阈值效应？'
    ]
  }
,
  ...
    {
      "id": "f1",
      "title": "小脑编码时间统计先验知识",
      "summary": "研究背景与问题：  大脑在感觉输入不确定时依赖先验知识进行贝叶斯推理，但神经回路如何编码环境统计规律的直接证据有限。小脑是否参与先验知识的学习和表征？...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[x] 已读",
        "原标题: Neural circuits encode prior knowledge of temporal statistics作者: Koppen et al., Devika Narain 团队期刊: Nature Neuroscience发表日期: 2026-04-07DOI: —",
        "研究背景与问题：  大脑在感觉输入不确定时依赖先验知识进行贝叶斯推理，但神经回路如何编码环境统计规律的直接证据有限。小脑是否参与先验知识的学习和表征？",
        "实验操作：  小鼠眨眼条件反射 + 浦肯野细胞电生理记录 + 计算建模",
        "主要结论：  小脑浦肯野细胞学习时间变量的先验概率分布，并编码为简单/复杂尖峰信号。计算模型表明对抗性长期可塑性机制形成先验知识。"
      ]
    },
    {
      "id": "f2",
      "title": "神经肽系统的人脑组织图谱",
      "summary": "研究背景与问题：  神经肽系统在情绪、动机和行为调控中起关键作用，但人脑中神经肽系统的完整空间组织图谱尚缺乏。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[x] 已读",
        "原标题: Organization of neuropeptide systems in the human brain期刊: Nature NeuroscienceDOI: 10.1038/s41593-026-02236-w",
        "研究背景与问题：  神经肽系统在情绪、动机和行为调控中起关键作用，但人脑中神经肽系统的完整空间组织图谱尚缺乏。",
        "实验操作：  人脑组织样本的空间转录组/蛋白质组分析",
        "主要结论：  绘制了人脑多肽能神经元的全脑投射图谱，揭示了下丘脑等关键区域的神经肽网络组织规律。"
      ]
    },
    {
      "id": "f3",
      "title": "干扰素驱动关节炎疼痛的关节病理",
      "summary": "研究背景与问题：  关节炎疼痛涉及外周和中枢双重机制，但炎症信号如何驱动关节病理与疼痛尚不完全清楚。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[x] 已读",
        "原标题: Interferon drives joint pathology in arthritis pain期刊: Nature NeuroscienceDOI: 10.1038/s41593-026-02255-7",
        "研究背景与问题：  关节炎疼痛涉及外周和中枢双重机制，但炎症信号如何驱动关节病理与疼痛尚不完全清楚。",
        "实验操作：  关节炎动物模型 + 炎症因子检测 + 神经电生理",
        "主要结论：  干扰素信号通路在关节炎关节病理和疼痛中发挥核心驱动作用。"
      ]
    },
    {
      "id": "f4",
      "title": "星形胶质细胞钙依赖谷氨酸释放",
      "summary": "研究背景与问题：  星形胶质细胞通过钙信号调控突触传递，但钙依赖的谷氨酸释放机制及其生理意义存在争议。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[x] 已读",
        "原标题: Astrocyte Ca2+-dependent glutamate release期刊: Nature NeuroscienceDOI: 10.1038/s41593-026-02251-x",
        "研究背景与问题：  星形胶质细胞通过钙信号调控突触传递，但钙依赖的谷氨酸释放机制及其生理意义存在争议。",
        "实验操作：  星形胶质细胞钙成像 + 谷氨酸传感器 + 突触传递记录",
        "主要结论：  证实星形胶质细胞钙依赖谷氨酸释放的分子机制及其在突触可塑性中的调控作用。"
      ]
    },
    {
      "id": "f5",
      "title": "胶质母细胞瘤恶性细胞群落空间结构",
      "summary": "研究背景与问题：  胶质母细胞瘤（GBM）微环境复杂，肿瘤内异质性高，缺乏对细胞空间组织及互作机制的系统解析。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Spatial and single-cell characterization of human glioblastoma tumor microenvironment reveals malignant cellular communities作者: 瞿昆/唐爱辉/程传东/李守振等（中科大）期刊: Nature Neuroscience发表日期: 2026-04-16DOI: 10.1038/s41593-026-02265-5",
        "研究背景与问题：  胶质母细胞瘤（GBM）微环境复杂，肿瘤内异质性高，缺乏对细胞空间组织及互作机制的系统解析。",
        "实验操作：  100例GBM患者的121个组学数据（空间转录组、单细胞RNA/ATAC、原位杂交、空间蛋白质组、Patch-seq）",
        "主要结论：  定义四种恶性细胞群落（CC-1缺氧核心、CC-2血管富集、CC-3神经元富集、CC-4 AC样），揭示不同群落内肿瘤细胞与微环境细胞的独特互作模式。"
      ]
    },
    {
      "id": "f6",
      "title": "语言理解中的成分约束词预测",
      "summary": "研究背景与问题：  下一个单词的预测被认为是人类语言系统的核心计算目标，但大脑是否在所有位置都同等优化词预测精度？...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Constituent-constrained word prediction during language comprehension作者: 丁鼐团队（浙江大学）期刊: Nature Neuroscience发表日期: 2026-04-21",
        "研究背景与问题：  下一个单词的预测被认为是人类语言系统的核心计算目标，但大脑是否在所有位置都同等优化词预测精度？",
        "实验操作：  普通话使用者脑磁图（MEG）实验 + 自然英语叙述皮质电图（ECoG）分析",
        "主要结论：  语言系统并非单纯优化词预测精度，而是通过成分约束管理来平衡单词预测的贡献。成分边界内的词预测反应强于跨边界位置。"
      ]
    },
    {
      "id": "f7",
      "title": "神经肽Y调控恐惧记忆建立与消退",
      "summary": "研究背景与问题：  恐惧记忆的可变性与稳定性平衡对生存适应至关重要，但抑制性神经元如何在分子层面调控这一平衡尚不明确。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Neuropeptide Y co-opts neuronal ensembles for memory lability and stability作者: 徐天乐/李伟广等（上海交大/复旦）期刊: Nature Neuroscience发表日期: 2026-03-31",
        "研究背景与问题：  恐惧记忆的可变性与稳定性平衡对生存适应至关重要，但抑制性神经元如何在分子层面调控这一平衡尚不明确。",
        "实验操作：  小鼠恐惧条件反射 + vCA1区NPY+ GABA能神经元记录 + NPY1R/NPY2R操控",
        "主要结论：  NPY通过两种亲和力不同的受体（NPY1R和NPY2R）分阶段协同调控恐惧记忆：早期促进消退启动，后期稳定消退记忆。"
      ]
    },
    {
      "id": "f8",
      "title": "HSV-1 H129株跨突触传播分子机制",
      "summary": "研究背景与问题：  H129作为顺向神经环路示踪工具，其是否经突触特异性传播长期存在争议。...",
      "tag": "论文",
      "source": "一、Nature Neuroscience 研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: （未完整获取）作者: 罗敏华团队（武汉病毒所）期刊: Nature Neuroscience发表日期: 2026-04-14",
        "研究背景与问题：  H129作为顺向神经环路示踪工具，其是否经突触特异性传播长期存在争议。",
        "实验操作：  H129遗传改造平台 + 突触传递分子机制分析",
        "主要结论：  首次揭示H129利用神经元突触传递分子机制实现突触特异的神经元间传播，为优化顺向跨突触示踪工具提供设计依据。"
      ]
    },
    {
      "id": "f9",
      "title": "分类是大脑的内在计算策略",
      "summary": "研究背景与问题：  分类（将对象分组到等价类中）是适应性行为的基础，但传统观点认为分类是感知的最后阶段。...",
      "tag": "论文",
      "source": "二、Nature Reviews Neuroscience 综述",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[x] 已读",
        "原标题: Categorization is 'baked' into the brain作者: Barrett & Miller期刊: Nature Reviews Neuroscience发表日期: 2026年3月",
        "研究背景与问题：  分类（将对象分组到等价类中）是适应性行为的基础，但传统观点认为分类是感知的最后阶段。",
        "核心观点：  分类不是感知的终点，而是贯穿信号处理全过程的核心计算策略。大脑在信号处理的各个阶段都在进行类别化操作。"
      ]
    },
    {
      "id": "f10",
      "title": "重新定义脊椎动物运动的中央模式发生器",
      "summary": "核心观点：  重新审视脊椎动物运动控制的中央模式发生器（CPG）概念，整合最新分子和环路层面的研究发现。...",
      "tag": "论文",
      "source": "二、Nature Reviews Neuroscience 综述",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Redefining the central pattern generator for vertebrate locomotion作者: Abdeljabbar El Manira期刊: Nature Reviews Neuroscience发表日期: 2026-03-04",
        "核心观点：  重新审视脊椎动物运动控制的中央模式发生器（CPG）概念，整合最新分子和环路层面的研究发现。"
      ]
    },
    {
      "id": "f11",
      "title": "神经科学中的表征概念维度",
      "summary": "核心观点：  建立统一框架，从信息论角度区分神经科学中\"表征\"的四个概念维度，为表征概念提供明确特征描述。...",
      "tag": "论文",
      "source": "二、Nature Reviews Neuroscience 综述",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Clarifying the conceptual dimensions of representation in neuroscience作者: Pohl, Walker, Ma期刊: Nature Reviews Neuroscience发表日期: 2026-03-20",
        "核心观点：  建立统一框架，从信息论角度区分神经科学中\"表征\"的四个概念维度，为表征概念提供明确特征描述。"
      ]
    },
    {
      "id": "f12",
      "title": "线粒体动态与神经发育障碍",
      "summary": "核心观点：  线粒体生物发生、降解、重塑和运输机制对神经发育至关重要，其异常与神经发育障碍密切相关。...",
      "tag": "论文",
      "source": "二、Nature Reviews Neuroscience 综述",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Mitochondrial dynamics in neurodevelopment and neurodevelopmental disorders作者: Sirois, Lee, Zhao期刊: Nature Reviews Neuroscience发表日期: 2026-03-04",
        "核心观点：  线粒体生物发生、降解、重塑和运输机制对神经发育至关重要，其异常与神经发育障碍密切相关。"
      ]
    },
    {
      "id": "f13",
      "title": "气候变化中的神经适应",
      "summary": "核心观点：  升温环境挑战神经系统，探讨神经热适应机制、适应极限以及行为和社会策略如何塑造热韧性。...",
      "tag": "论文",
      "source": "二、Nature Reviews Neuroscience 综述",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Neural adaptation to climate change: mechanisms, limits and opportunities作者: Siemens, Haggard期刊: Nature Reviews Neuroscience发表日期: 2026-03-17",
        "核心观点：  升温环境挑战神经系统，探讨神经热适应机制、适应极限以及行为和社会策略如何塑造热韧性。"
      ]
    },
    {
      "id": "f14",
      "title": "人群规模重复扩增揭示疾病风险与脑萎缩",
      "summary": "研究背景与问题：  短串联重复序列（STR）扩增与多种神经疾病相关，但大规模人群中的频率和表型关联尚不清楚。...",
      "tag": "论文",
      "source": "三、Nature 主刊研究论文",
      "date": "2026年4月24日",
      "reading": "3 分钟阅读",
      "body": [
        "[ ] 未读",
        "原标题: Population-scale repeat expansions elucidate disease risk and brain atrophy作者: Sahar Gelfman 团队（Regeneron）期刊: Nature发表日期: 2026-04-08",
        "研究背景与问题：  短串联重复序列（STR）扩增与多种神经疾病相关，但大规模人群中的频率和表型关联尚不清楚。",
        "实验操作：  1,020,833份多样本中37个STR位点分析 + 脑影像关联",
        "主要结论：  致病性重复频率高于相应疾病患病率；重复扩增与神经丝轻链水平升高及特定脑区体积减少相关，即使在确诊前数十年。"
      ]
    }
];

function createArticleCard(post) {
  const card = document.createElement('a');
  card.className = 'article-card';
  card.href = `article.html?id=${post.id}`;
  card.innerHTML = `
    <p class="eyebrow">${post.tag}</p>
    <h2 class="article-card-title">${post.title}</h2>
    <p class="article-card-summary">${post.summary}</p>
    <div class="article-card-footer">
      <span>${post.date}</span>
      <span>${post.reading}</span>
    </div>
  `;
  return card;
}

function renderArticleCards(list) {
  const grid = document.getElementById('articleGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!list.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '暂无文章，稍后再来看看。';
    grid.appendChild(empty);
    return;
  }
  list.forEach(post => grid.appendChild(createArticleCard(post)));
}

function setActiveFilter(selectedTag) {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.classList.toggle('active', pill.textContent === selectedTag);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 1800);
}

function setSectionObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
          link.classList.toggle('active', entry.isIntersecting);
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(section => observer.observe(section));
}

function renderDailyPosts() {
  const dailyPosts = posts.filter(post => post.tag === '日常');
  const grid = document.getElementById('dailyPostsGrid');
  const totalPostsEl = document.getElementById('totalPosts');
  const todayPostsEl = document.getElementById('todayPosts');

  if (!grid) return;

  // Update stats
  if (totalPostsEl) totalPostsEl.textContent = dailyPosts.length;
  if (todayPostsEl) {
    const d = new Date();
    const today = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    const todayCount = dailyPosts.filter(post => post.date === today).length;
    todayPostsEl.textContent = todayCount;
  }

  grid.innerHTML = '';
  if (!dailyPosts.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-daily';
    empty.innerHTML = `
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>暂无日常记录</h3>
      <p>新的灵感和观察正在路上...</p>
    `;
    grid.appendChild(empty);
    return;
  }

  dailyPosts.forEach((post, index) => {
    const card = document.createElement('article');
    card.className = 'daily-post-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="daily-post-header">
        <div class="daily-post-meta">
          <span class="daily-date">${post.date}</span>
          <span class="daily-reading">${post.reading}</span>
        </div>
        <div class="daily-post-type">
          <span class="type-badge">日常</span>
        </div>
      </div>
      <h3 class="daily-post-title">${post.title}</h3>
      <p class="daily-post-summary">${post.summary}</p>
      <div class="daily-post-actions">
        <a href="article.html?id=${post.id}" class="read-more-link">
          <span>继续阅读</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderHome() {
  renderArticleCards(posts.slice(0, 2));

  const filterRow = document.querySelector('.filter-row');
  if (filterRow) {
    filterRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      const selected = pill.textContent.trim();
      const filtered = (selected === '全部' ? posts : posts.filter(post => post.tag === selected)).slice(0, 2);
      setActiveFilter(selected);
      renderArticleCards(filtered);
    });
  }

  setSectionObserver();
}

function handleShare() {
  const shareButton = document.querySelector('.icon-button');
  if (!shareButton) return;
  shareButton.addEventListener('click', () => {
    const shareData = {
      title: document.getElementById('articleTitle')?.textContent || 'JUNNYOfficial Blog',
      text: '分享一篇极简设计与阅读风格的文章。',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => showToast('分享已取消'));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('链接已复制，可粘贴分享');
      });
    }
  });
}

function renderArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const article = posts.find(item => item.id === id) || posts[0];
  const title = document.getElementById('articleTitle');
  const tag = document.getElementById('articleTag');
  const date = document.getElementById('articleDate');
  const reading = document.getElementById('articleReading');
  const body = document.getElementById('articleBody');
  const related = document.getElementById('relatedList');

  if (!title || !tag || !date || !reading || !body || !related) return;

  title.textContent = article.title;
  tag.textContent = article.source || article.tag;
  date.textContent = article.date;
  reading.textContent = article.reading;
  body.innerHTML = article.body.map(paragraph => `<p>${paragraph}</p>`).join('');

  posts.filter(item => item.id !== article.id).slice(0, 5).forEach(post => {
    const item = document.createElement('a');
    item.className = 'related-item';
    item.href = `article.html?id=${post.id}`;
    item.innerHTML = `
      <h4 class="related-item-title">${post.title}</h4>
      <p class="related-item-meta">${post.tag} · ${post.date}</p>
    `;
    related.appendChild(item);
  });
}

function renderNotes() {
  const grid = document.getElementById('notesGrid');
  const filterRow = document.getElementById('notesFilter');
  if (!grid) return;

  const papers = posts.filter(post => post.tag === '论文');

  function render(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<p class="empty-state">暂无论文</p>';
      return;
    }
    list.forEach(post => {
      const card = document.createElement('a');
      card.className = 'note-card';
      card.href = `article.html?id=${post.id}`;
      card.innerHTML = `
        <p class="eyebrow">${post.source || post.tag}</p>
        <h4>${post.title}</h4>
        <p>${post.summary || ''}</p>
      `;
      grid.appendChild(card);
    });
  }

  render(papers);

  if (filterRow) {
    filterRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      const selected = pill.textContent.trim();

      filterRow.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (selected === '全部') {
        render(papers);
      } else if (selected === 'Nature Neuroscience') {
        render(papers.filter(p => p.source && p.source.includes('Nature Neuroscience') && !p.source.includes('Reviews')));
      } else if (selected === 'Nature Reviews') {
        render(papers.filter(p => p.source && p.source.includes('Nature Reviews')));
      } else if (selected === 'Nature') {
        render(papers.filter(p => p.source && p.source.includes('Nature') && !p.source.includes('Neuroscience')));
      }
    });
  }
}

const page = document.body.dataset.page;
if (page === 'home') {
  renderHome();
} else if (page === 'article') {
  renderArticle();
} else if (page === 'daily-posts') {
  renderDailyPosts();
} else if (page === 'notes') {
  renderNotes();
}
