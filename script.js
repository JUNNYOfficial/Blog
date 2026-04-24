// DEBUG v4
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
  },
  {
    "id": "f1",
    "title": "小脑编码时间统计先验知识",
    "summary": "[x] 已读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "7 分钟阅读",
    "body": [
      "[x] 已读",
      "英文标题： Neural circuits encode prior knowledge of temporal statistics作者： Julius Koppen, Ilse Klinkhamer, Marit Runge, Lucas Bayones, Devika Narain机构： 荷兰伊拉斯谟大学医学中心发表日期： 2026年4月7日DOI： 10.1038/s41593-026-02255-7",
      "研究背景与核心问题",
      "我们生活在一个充满不确定性的世界。当你听到远处传来汽车喇叭声，大脑需要判断\"这辆车大概多久会到\"；当你接球时，需要预判球到达的时间和位置。这些判断都不是精确的——感官信息总有噪声，但大脑依然能做出合理预测。",
      "贝叶斯推理理论告诉我们：在不确定条件下，大脑会结合\"先验知识\"（过去经验的统计规律）和\"当前感官证据\"来做最优推断。问题是：这种先验知识到底存储在大脑的哪个部位？以什么形式编码？",
      "传统观点认为小脑主要负责运动协调，但这篇论文提出了更深刻的见解：小脑可能是大脑中专门\"学习世界概率分布\"的器官。",
      "实验设计详解",
      "研究团队设计了一个精妙的小鼠眨眼条件反射实验：",
      "训练阶段： 小鼠面对一个视觉提示（条件刺激，CS），随后眼部会受到轻微气流吹拂（非条件刺激，US）。关键在于——CS和US之间的时间间隔不是固定的，而是从三种不同的概率分布中随机抽取：",
      "窄分布： 时间间隔高度可预测（不确定性低）",
      "中等分布： 时间间隔有一定变化",
      "宽分布： 时间间隔高度不确定",
      "小鼠需要学会：根据CS出现的时间，预测US何时到来，并在US到达前闭眼保护眼睛。",
      "测试阶段： 在某些试次中取消US，只呈现CS，观察小鼠的预测性眨眼行为如何随时间分布的统计特性而变化。",
      "技术手段",
      "☐ 大规模电生理记录： 在小脑皮层（特别是lobules IV/V和Simplex区域）同时记录数百个神经元的活动",
      "☐ 浦肯野细胞分型： 使用LFADS（Latent Factor Analysis via Dynamical Systems）深度学习技术，从群体神经活动中解码单个神经元的试次级活动",
      "☐ 光遗传学干预： 用光精确操控浦肯野细胞的活动，验证因果关系",
      "☐ 计算建模： 建立小脑-下橄榄核回路的计算模型，解释先验知识如何通过突触可塑性编码",
      "核心发现",
      "发现一：行为层面的统计学习小鼠的眨眼行为完美反映了训练分布的统计特性。当时间间隔服从窄分布时，小鼠的眨眼时机非常精准；当分布变宽（不确定性增加）时，眨眼行为变得更加保守，提前量更大——这正是贝叶斯最优策略的表现。",
      "发现二：浦肯野细胞编码先验分布小脑皮层的主要输出神经元——浦肯野细胞（Purkinje cells）的活动统计特性与行为同步变化。它们的简单棘波（simple spikes）发放模式直接映射了时间间隔的概率分布。",
      "发现三：全新信号——\"分布起始标记\"研究团队发现了一种前所未见的复杂棘波（complex spikes）信号模式：经过高不确定性环境长期训练后，浦肯野细胞会在概率分布的最早可能时刻产生特殊的复杂棘波。这相当于一个\"警报信号\"——提醒大脑\"最糟糕的情况可能现在就发生\"。",
      "发现四：因果验证当研究者用光遗传学暂时抑制浦肯野细胞活动时，小鼠基于先验知识的预测性眨眼完全消失，但本能反射（对实际气流的反应）仍然保留。这证明浦肯野细胞专门负责\"预测性\"行为，而非简单的反射弧。",
      "发现五：计算机制计算模型揭示：先验知识通过小脑皮层中两种对抗性可塑性机制的并置来编码——长时程抑制（LTD）和长时程增强（LTP）在小脑平行纤维-浦肯野细胞突触上形成动态平衡，最终稳定存储了概率分布的统计参数。",
      "科学意义",
      "这项研究首次提供了神经回路直接编码环境统计规律的实验证据，将抽象的贝叶斯计算理论锚定到了具体的神经硬件上。更重要的是，它重新定义了小脑的功能：小脑不仅仅是\"运动协调器\"，更是\"概率学习机\"——专门负责从经验中提取统计规律，并将其内化为预测行为的先验知识。",
      "这对理解人类的时间感知、节奏学习、甚至音乐能力都有深远启示。当你能准确跟上音乐节拍，或是预判交通状况时，你的小脑正在默默进行复杂的概率计算。"
    ]
  },
  {
    "id": "f2",
    "title": "人脑神经肽系统全脑图谱",
    "summary": "[x] 已读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "9 分钟阅读",
    "body": [
      "[x] 已读",
      "英文标题： Organization of neuropeptide systems in the human brain作者： Eric G. Ceballos, Ahmad Farahani, Zhen-Qi Liu 等机构： 蒙特利尔神经科学研究所（McGill University）发表日期： 2026年3月17日（2026年4月持续影响）DOI： 10.1038/s41593-026-02236-w",
      "研究背景与核心问题",
      "神经肽是大脑中一类特殊的化学信使。与快速作用的神经递质（如多巴胺、谷氨酸）不同，神经肽的释放需要较强的神经活动触发，它们在组织中扩散较慢，作用时间更长，影响的范围也更广。如果把神经递质比作点对点的电话通话，神经肽更像是广播电台——同时影响大片脑区。",
      "已知的神经肽家族超过100种，包括：",
      "催产素（Oxytocin）： 社会纽带、信任、母性行为",
      "神经肽Y（NPY）： 应激反应、食欲调控",
      "阿片肽（Opioids）： 疼痛调节、奖赏",
      "血管活性肠肽（VIP）： 昼夜节律、皮层可塑性",
      "瘦素（Leptin）： 代谢调控",
      "然而，尽管神经肽如此重要，人类大脑中这整个\"化学广播系统\"的全局组织结构却几乎是空白。大多数研究只关注单一神经肽在特定脑区的作用，缺乏系统级的理解。",
      "研究方法",
      "研究团队利用基因转录数据作为代理指标，构建了迄今最全面的人脑神经肽受体空间图谱：",
      "☐ 数据基础： 整合Allen Human Brain Atlas的空间转录组数据，覆盖整个大脑",
      "☐ 受体覆盖： 绘制38种神经肽受体，跨越14个不同的神经肽家族",
      "☐ 多尺度分析框架：",
      "☐ 进化分析： 追溯神经肽系统的进化起源，分析正选择压力",
      "核心发现",
      "发现一：皮层-皮层下梯度神经肽受体呈现惊人的空间组织性：大多数受体要么高度表达于皮层，要么高度表达于皮层下结构，形成了清晰的\"皮层-皮层下梯度\"。",
      "皮层偏好： VIP受体、生长抑素受体、黑色素浓缩激素（MCH）受体",
      "皮层下偏好： 催产素受体、降钙素受体",
      "广泛分布： 神经肽Y受体、阿片受体、内皮素受体",
      "发现二：下丘脑的\"神经肽枢纽\"下丘脑是神经肽信号的核心枢纽。研究团队将神经肽受体映射到下丘脑核团后，发现受体基因表达精确重现了下丘脑的经典解剖分区——这意味着下丘脑的功能分工很大程度上由其神经肽\"化学签名\"决定。",
      "发现三：与慢速神经递质的系统级对应神经肽受体优先与代谢型神经递质（如血清素、乙酰胆碱）共定位，而与离子型快速递质（如谷氨酸、GABA）的共定位较少。这揭示了一个系统级的组织原则：大脑存在两套平行的通讯系统——快速电信号系统（毫秒级）和慢速化学调制系统（秒到分钟级），后者专门负责状态调节和全局功能切换。",
      "发现四：神经肽塑造功能连接通过将神经肽分布与静息态fMRI功能连接图谱关联，研究发现特定神经肽家族（如张力素、内皮素、阿片、生长抑素、甘丙肽）与下丘脑的功能连接模式高度对齐。这说明神经肽不仅在大脑局部起作用，还构成了大尺度脑网络的功能\"调音台\"。",
      "发现五：行为功能光谱元分析解码显示，不同神经肽系统对应从感觉认知到奖赏、再到身体功能的全谱系行为域。这证实了神经肽不仅是\"边缘系统的调味品\"，而是贯穿所有认知功能的底层调制架构。",
      "发现六：进化上的关键创新进化分析揭示，神经肽在早期哺乳动物中经历了强烈的正选择，其精细化与新皮层和高级认知功能的涌现同步。这提示：神经肽系统可能是哺乳动物认知进化的关键分子基础之一。",
      "科学意义",
      "这项研究将神经肽从\"边缘调质\"提升到了\"大脑核心组织原则\"的地位。它证明，人脑不是由孤立的神经递质系统拼凑而成，而是存在一个高度组织化的\"化学调制网络\"，这个网络：",
      "按解剖梯度分布",
      "与连接组结构耦合",
      "与认知功能光谱对齐",
      "在进化上与高级认知同步出现",
      "对于精神疾病研究，这意味着许多症状（如抑郁症的全身不适、焦虑症的过度警觉）可能不仅仅是\"脑区功能障碍\"，而是整个化学调制网络的系统性失调。精准调控特定神经肽系统，可能是下一代神经精神疾病治疗的方向。"
    ]
  },
  {
    "id": "f3",
    "title": "干扰素信号驱动关节炎疼痛的持续化",
    "summary": "[x] 已读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "9 分钟阅读",
    "body": [
      "[x] 已读",
      "英文标题： Persistent interferon signaling causes sensory neuron plasticity and pain before and during arthritis作者： Jie Su, Ming-Dong Zhang, Jussi Kupari, Dongoh Kwak 等通讯作者： Patrik Ernfors机构： 瑞典卡罗林斯卡医学院发表日期： 2026年3月10日DOI： 10.1038/s41593-026-02234-y",
      "研究背景与核心问题",
      "类风湿性关节炎（RA）患者经历一种特殊而痛苦的矛盾：关节炎症消退后，疼痛依然持续。临床上常见这样的场景：血液检查显示炎症指标已恢复正常，关节肿胀已消退，但患者仍然报告剧烈疼痛，甚至对轻微触碰都无法忍受。",
      "传统观点认为，关节炎疼痛是炎症的直接结果——滑膜炎症刺激关节神经末梢，产生痛觉。但如果炎症已经消退，疼痛为何还在？",
      "更奇怪的是，很多RA患者在关节出现明显炎症之前就已经感到疼痛。这说明存在一个独立于炎症的持续致痛机制。",
      "Su等人的研究揭示了一个令人惊讶的 culprit：干扰素（Interferon）——一种通常被认为专门对抗病毒的免疫分子。",
      "实验设计",
      "动物模型： 使用软骨自身抗体诱导的关节炎小鼠模型（CAIA），这种模型能模拟人类RA的关键特征。",
      "多阶段追踪： 研究不仅观察关节炎发作后的状态，还仔细追踪了疾病前期（pre-arthritis）的表现。",
      "跨尺度技术整合：",
      "☐ 行为学： 机械痛觉过敏测试、肢体功能评估、 gait分析",
      "☐ 组织学： 背根神经节（DRG）免疫荧光、关节组织切片",
      "☐ 单细胞转录组： DRG感觉神经元的分子分型",
      "☐ 电生理： 离体DRG神经元膜片钳记录，检测兴奋性变化",
      "☐ 分子生物学： 信号通路 Western blot、细胞因子谱分析",
      "☐ 人类验证： 人DRG组织样本（来自遗体捐献）",
      "核心发现",
      "发现一：疼痛早于炎症在关节炎临床症状出现之前，小鼠就已经表现出明显的痛觉过敏。这推翻了\"疼痛=炎症结果\"的简单公式。",
      "发现二：干扰素的持续升高在疾病所有阶段（前期、急性期、慢性期），研究者都检测到I型干扰素（IFN-α/β）的持续高水平。更重要的是，这些干扰素并非来自关节滑膜，而是主要来自背根神经节（DRG）内的血管细胞和单核/巨噬细胞。",
      "发现三：特异性神经元亚型——GFRA3+ C纤维不是所有感觉神经元都对干扰素敏感。研究发现，一种表达GFRA3标记物的C纤维伤害感受器（peptidergic nociceptor）亚群是主要的疼痛介导者。这类神经元：",
      "表达干扰素受体",
      "在干扰素作用下膜兴奋性显著增加",
      "对机械刺激的反应阈值降低（即正常无害的触碰也被编码为疼痛）",
      "发现四：MNK1/MNK2-eIF4E信号轴干扰素并非直接刺激神经元，而是通过激活一条非经典的信号通路：干扰素 → 干扰素受体 → MNK1/2激酶激活 → eIF4E磷酸化 → 神经元蛋白翻译重编程 → 离子通道表达改变 → 神经元超兴奋",
      "这条通路的精妙之处在于：它绕过了传统的炎症信号（如TNF-α、IL-6），是一条独立的\"神经免疫对话\"通道。",
      "发现五：人类数据验证研究团队检查了人类DRG组织，发现人类感觉神经元同样表达干扰素受体。而且，只有患有疼痛性RA的个体才表现出升高的干扰素信号，无痛性RA患者和健康对照都没有这一现象。",
      "发现六：治疗验证——阻断信号通路可逆转疼痛使用小分子抑制剂阻断MNK1/2或eIF4E，能在已发病的小鼠中显著减轻疼痛、恢复肢体功能。这为精准治疗提供了明确的分子靶点。",
      "科学意义",
      "这项研究改写了我们对慢性疼痛的理解框架：",
      "☐ 疼痛可以独立于炎症存在：炎症消退不等于疼痛结束，两者有独立的分子机制",
      "☐ 免疫系统与神经系统直接对话：干扰素不仅是抗病毒分子，还是直接的致痛信号",
      "☐ 精准治疗的可能性：传统RA药物（如抗TNF疗法）可能对这类疼痛无效，针对干扰素-MNK-eIF4E轴的药物才是对症之策",
      "☐ 时间窗的启示：如果在关节炎前期就识别并阻断干扰素信号，可能预防慢性疼痛的建立",
      "这项工作为无数\"炎症指标正常但仍疼痛\"的RA患者带来了希望——他们的疼痛不是\"心理作用\"，而是有明确的神经免疫生物学基础。"
    ]
  },
  {
    "id": "f4",
    "title": "星形胶质细胞钙依赖谷氨酸释放",
    "summary": "[x] 已读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "8 分钟阅读",
    "body": [
      "[x] 已读",
      "英文标题： Astrocyte Ca2+-dependent glutamate release期刊： Nature NeuroscienceDOI： 10.1038/s41593-026-02251-x",
      "研究背景与核心问题",
      "星形胶质细胞（astrocytes）是大脑中最丰富的胶质细胞类型，长久以来被认为是神经元的\"支持细胞\"——提供营养、维持离子平衡、清除废物。但过去20年的研究逐渐揭示，星形胶质细胞主动参与信息处理。",
      "关键发现是：星形胶质细胞能感知神经活动（通过神经递质受体），产生细胞内钙信号升高，进而\"反馈\"影响神经元。但这种反馈的具体机制长期存在争议：",
      "支持派证据： 星形胶质细胞含有谷氨酸囊泡，钙升高后能检测到细胞外谷氨酸增加",
      "怀疑派质疑： 这些谷氨酸可能来自其他来源；星形胶质细胞的\"分泌\"机制与神经元完全不同，难以用传统神经科学框架解释",
      "核心问题是：星形胶质细胞的钙信号是否真的导致谷氨酸释放？如果是，通过什么分子机制？这如何影响突触可塑性？",
      "实验方法",
      "技术手段：",
      "☐ 基因编码钙指示剂（GCaMP）： 实时追踪星形胶质细胞钙动态",
      "☐ 谷氨酸传感器（iGluSnFR）： 在星形胶质细胞周围检测谷氨酸释放",
      "☐ 光遗传学： 选择性激活星形胶质细胞，观察钙信号与递质释放的因果关系",
      "☐ 电生理： 记录邻近神经元的突触后电流，判断谷氨酸释放的功能效应",
      "☐ 分子操控： 敲低/过表达候选分泌蛋白（如Bestrophin-1、TRPA1等），验证分子机制",
      "核心发现",
      "发现一：钙-分泌偶联的因果证实通过光遗传学精确操控星形胶质细胞钙信号，研究明确证实：钙升高确实触发谷氨酸释放。使用钙螯合剂阻断钙升高后，谷氨酸释放消失。",
      "发现二：分子机制——钙依赖性胞吐星形胶质细胞的谷氨酸释放不是通过缝隙连接或反转转运体，而是通过类似神经元的囊泡胞吐机制。但使用的分子机器有所不同：涉及Bestrophin-1（Best1）通道和SNARE蛋白复合体的特定组合。",
      "发现三：对突触可塑性的双向调控星形胶质细胞释放的谷氨酸作用于神经元的：",
      "NMDA受体： 增强突触可塑性（LTP）",
      "代谢型谷氨酸受体（mGluRs）： 抑制突触传递（LTD-like效应）",
      "这种双向性取决于谷氨酸释放的时空模式：局部、瞬时的释放增强突触；广泛、持续的释放导致抑制。",
      "发现四：在体功能验证在学习和记忆任务中，选择性阻断星形胶质细胞钙信号或谷氨酸释放，显著损害海马依赖的空间记忆形成。这证明星形胶质细胞的谷氨酸释放不是\"实验室现象\"，而是认知功能的必要组成部分。",
      "科学意义",
      "这项研究为\"三方突触（tripartite synapse）\"理论提供了关键证据：突触不仅是神经元之间的连接，而是神经元-星形胶质细胞-神经元的三方结构。星形胶质细胞不再是被动旁观者，而是：",
      "感知突触活动（通过钙信号）",
      "主动释放调质（谷氨酸、ATP、D-丝氨酸等）",
      "塑造突触可塑性和神经网络活动",
      "这改变了我们对大脑信息处理的基本理解：信息流动不仅通过电信号在神经元间传递，还通过化学信号在胶质细胞网络中传播。星形胶质细胞构成了一个平行的\"慢速调制网络\"，与神经元的快速信号网络相互作用。",
      "对于疾病研究，这意味着许多神经系统疾病（癫痫、阿尔茨海默病、抑郁症）中观察到的星形胶质细胞异常，可能不是疾病的次要后果，而是直接参与病理机制。靶向星形胶质细胞-神经元相互作用的药物，可能是新的治疗策略。"
    ]
  },
  {
    "id": "f5",
    "title": "胶质母细胞瘤恶性细胞群落空间结构",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "10 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Spatial and single-cell characterization of human glioblastoma tumor microenvironment reveals malignant cellular communities作者： 林俊#、陈春鹏#、瞿昆*、唐爱辉*、程传东*、李守振*（#共同一作，*共同通讯）机构： 中国科学技术大学发表日期： 2026年4月16日DOI： 10.1038/s41593-026-02265-5",
      "研究背景与核心问题",
      "胶质母细胞瘤（Glioblastoma, GBM）是最常见、最致命的成人脑肿瘤。患者确诊后中位生存期仅12-18个月。为什么这么难治？",
      "一个核心原因是极端异质性：即使在同一个肿瘤内部，不同区域的细胞也表现出完全不同的分子特征、生长速度和药物敏感性。更棘手的是，GBM的肿瘤微环境（tumor microenvironment, TME）极其复杂——包括血管、免疫细胞、神经元、胶质细胞等，它们与肿瘤细胞形成动态的\"共生\"关系。",
      "然而，传统的研究通常将肿瘤组织捣碎后做单细胞测序，完全丢失了空间信息。我们不知道：",
      "哪些细胞类型在空间上聚集在一起？",
      "它们之间如何物理接触和信号交流？",
      "这种空间组织如何驱动肿瘤进展和治疗抵抗？",
      "中科大的这项研究用空间组学技术回答这些问题。",
      "实验设计",
      "样本规模： 100例原发GBM患者的121个组学样本——这是迄今最大规模的GBM空间图谱。",
      "多模态技术整合：",
      "☐ 空间转录组（Visium/ Stereo-seq）： 在组织切片上定位基因表达的空间位置，分辨率接近单细胞水平",
      "☐ 单细胞RNA测序（scRNA-seq）： 解析细胞类型组成和状态",
      "☐ 单细胞ATAC测序（scATAC-seq）： 分析染色质可及性，推断基因调控状态",
      "☐ 多轮原位杂交（MERFISH/ seqFISH）： 高分辨率验证关键基因的空间表达",
      "☐ 空间蛋白质组（CODEX/ MIBI）： 蛋白质水平的空间分布",
      "☐ Patch-seq： 同时对单个细胞进行电生理记录和转录组测序，关联功能与分子特征",
      "核心发现",
      "发现一：四种保守的恶性\"细胞群落\"（Cellular Communities, CCs）研究首次定义了在患者间高度保守的四种恶性细胞群落：",
      "发现二：两种间充质样（MES-like）肿瘤亚群的功能分化研究进一步将MES样肿瘤细胞分为两个功能亚群：",
      "MES-Hyp（缺氧相关）： 与CC-1共定位，通过分泌VEGFA诱导TAMs向促肿瘤表型转化",
      "MES-Ast（血管相关）： 与CC-2共定位，通过TGFβ2促进血管重塑和肿瘤血供",
      "发现三：神经元-肿瘤突触连接Patch-seq分析首次证实：在CC-3区域，神经元与少突胶质前体样（OPC-like）肿瘤细胞之间形成了功能性突触连接。这意味着肿瘤细胞直接接收来自正常神经网络的电信号输入——这可能是肿瘤生长和侵袭的神经依赖机制。",
      "发现四：群落特异性细胞间通讯通过配体-受体分析，研究预测并验证了每个群落中特异的信号交流：",
      "CC-1：缺氧信号（HIF-1α）→ 巨噬细胞招募",
      "CC-2：血管生成因子（VEGF、Angiopoietin）→ 血管新生",
      "CC-3：神经导向因子（Semaphorin、Ephrin）→ 突触形成",
      "CC-4：基质重塑信号（MMP、TGF-β）→ 侵袭前沿推进",
      "发现五：空间梯度与进化动力学肿瘤内部存在从CC-1（核心）到CC-4（前沿）的空间梯度，这种梯度不是随机的，而是反映了肿瘤的进化轨迹——缺氧核心驱动细胞死亡和炎症，血管区提供营养，神经区 hijack 正常功能，前沿区推进侵袭。",
      "科学意义",
      "这项研究的意义远超GBM领域本身：",
      "☐ 空间组学的范式建立： 证明多模态空间组学能揭示传统单细胞方法完全错过的生物学规律",
      "☐ 精准治疗的新靶点： 不同群落可能需要完全不同的治疗策略。例如，针对CC-1的免疫治疗、针对CC-2的抗血管生成、针对CC-3的突触阻断",
      "☐ 肿瘤生态学概念： 肿瘤不是均质的\"细胞团\"，而是高度组织化的\"恶性生态系统\"，包含不同功能分区的群落",
      "☐ 神经-肿瘤互作的临床转化： 神经元-肿瘤突触的发现提示，抗癫痫药物或神经活性药物可能具有意想不到的抗肿瘤效果"
    ]
  },
  {
    "id": "f6",
    "title": "语言理解中的成分约束词预测",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "9 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Constituent-constrained word prediction during language comprehension作者： Jiajie Zou, David Poeppel, Nai Ding（丁鼐）机构： 浙江大学、纽约大学发表日期： 2026年4月21日",
      "研究背景与核心问题",
      "当你听到\"The cat sat on the...\"，你的大脑会立刻预测下一个词可能是\"mat\"或\"chair\"。这种\"下一个词预测\"被认为是人类语言系统的核心计算目标，也是当代大型语言模型（LLM）的基本训练范式。",
      "但大脑和LLM有一个关键差异：LLM逐词处理，而人类语言有层级结构——词组成短语，短语组成句子成分（constituents）。例如：",
      "\"[The cat] [sat on the mat]\" —— 两个主要成分",
      "\"The cat [sat] [on the mat]\" —— 动词短语内部结构",
      "核心问题是：大脑在预测下一个词时，是否考虑这种层级结构？它是否在所有位置都同样努力预测，还是会根据语法结构调整预测策略？",
      "实验设计",
      "实验一：普通话脑磁图（MEG）",
      "被试：普通话母语者",
      "刺激：自然连接的语音故事",
      "记录：306通道MEG，追踪单词级别的时间精度",
      "设计关键：操纵\"成分边界确定性\"——即听者是否能确定当前正处于一个语法成分的内部还是边界",
      "实验二：行为实验",
      "被试在不同语速条件下进行词汇判断",
      "验证MEG发现的成分边界效应是否反映真实的认知过程",
      "实验三：英语皮层电图（ECoG）",
      "被试：癫痫患者（临床植入电极）",
      "刺激：自然英语叙述",
      "记录：直接皮层电信号，高时间分辨率、高空间精度",
      "目的：验证效应的跨语言普遍性",
      "分析核心： 用大型语言模型（GPT-2）计算每个词的\"惊奇度（surprisal）\"——即模型预测该词的不确定性。然后比较成分内部vs.跨越成分边界的词，其神经反应与惊奇度的关系。",
      "核心发现",
      "发现一：成分内部的词预测更强当词出现在一个语法成分内部时（如介词短语\"on the mat\"中的\"mat\"），MEG反应与语言模型惊奇度的相关性显著强于跨越成分边界的词（如从主语到谓语的过渡）。",
      "这说明：大脑在成分内部更努力地预测下一个词。",
      "发现二：成分边界确定性的调节效应当听者能高确定性识别成分边界时，边界处的预测反应被抑制；当边界模糊时，预测反应增强。这表明语言系统不是机械地逐词预测，而是动态调整预测策略。",
      "发现三：行为层面的对应在词汇判断任务中，成分内部的词加工更快、更准确，除非语音呈现极慢（此时层级结构处理被削弱）。",
      "发现四：跨语言一致性英语ECoG数据重现了普通话MEG的核心发现，证明这不是汉语特有的现象，而是语言理解的普遍计算原则。",
      "科学意义",
      "这项研究对语言科学和人工智能都有深远启示：",
      "对神经科学：揭示了语言理解的\"层级预测架构\"——大脑不是简单的\"词序列预测器\"，而是\"成分结构预测器\"。这支持了生成语法学的核心直觉：语言处理的基本单元不是词，而是成分。",
      "对人工智能：当前LLM的纯自回归训练（逐词预测）可能缺少关键的认知成分——显式的层级结构表征。如果要在AI中实现更接近人类的语言理解，可能需要引入成分级别的预测机制，而非单纯的词级别预测。",
      "对临床：语言障碍（如失语症、阅读障碍）可能涉及成分边界识别或层级预测的损伤，这为诊断和康复提供了新思路。"
    ]
  },
  {
    "id": "f7",
    "title": "神经肽Y调控恐惧记忆建立与消退",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "8 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Neuropeptide Y co-opts neuronal ensembles for memory lability and stability作者： 吴延娇#、谷雪#、孔雅蕾、杨朔、徐天乐*、李伟广*（#共同一作，*共同通讯）机构： 上海交通大学医学院松江研究院、复旦大学脑科学转化研究院发表日期： 2026年3月31日",
      "研究背景与核心问题",
      "恐惧记忆是生命适应的核心机制。被火烧过的孩子学会远离火焰，被狗咬过的人对犬类保持警惕。但恐惧记忆必须同时满足两个看似矛盾的要求：",
      "☐ 稳定性： 危险信号确实出现时，恐惧反应必须可靠地启动（\"长记性\"）",
      "☐ 可变性（Lability）： 当环境变得安全时，恐惧反应必须能消退（\"放下恐惧\"）",
      "当这种平衡被打破——恐惧记忆过于稳定、无法消退——就会产生病理性焦虑、创伤后应激障碍（PTSD）等精神疾病。",
      "传统研究聚焦于谷氨酸能\"印迹细胞（engram cells）\"——一小群在恐惧学习中激活的兴奋性神经元。但近年发现，抑制性的GABA能神经元也参与记忆分配。问题是：抑制性神经元如何在分子层面控制恐惧记忆的\"稳定 vs. 可变\"平衡？",
      "实验设计",
      "核心模型： 小鼠情境性恐惧条件反射（contextual fear conditioning）+ 消退训练（extinction）",
      "技术组合：",
      "☐ 转基因小鼠： NPY-GFP报告小鼠，特异性标记表达神经肽Y（NPY）的GABA能神经元",
      "☐ 在体钙成像（光纤光度法）： 追踪vCA1区NPY+神经元在恐惧学习-消退过程中的实时活动",
      "☐ 光遗传学： 选择性激活或抑制NPY+神经元，验证因果作用",
      "☐ 化学遗传学（DREADDs）： 慢性操控NPY信号",
      "☐ 免疫组织化学： 标记即刻早期基因（c-Fos），识别参与记忆的神经元集群",
      "☐ 电生理： 离体脑片膜片钳，分析NPY对神经元兴奋性的影响",
      "☐ 分子干预： NPY1R和NPY2R的特异性拮抗剂/激动剂",
      "核心发现",
      "发现一：NPY+神经元在消退期特异性招募在恐惧条件作用阶段，NPY+神经元活动不高；但在消退训练阶段（反复暴露于安全环境），这些神经元被显著招募。这表明NPY系统专门负责\"安全学习\"，而非恐惧本身。",
      "发现二：两种受体，两个阶段NPY通过两种亲和力差异巨大的受体发挥分阶段作用：",
      "发现三：NPY使神经元集群\"重分配\"NPY的释放改变了参与恐惧记忆的神经元集群组成。具体而言，NPY促进了一种\"记忆去稳定化\"过程——原有的恐惧印迹细胞之间的连接被弱化，同时新的安全表征神经元被招募。",
      "发现四：恐惧消退的双过程模型验证研究结果支持经典的\"双过程理论\"：",
      "☐ 第一阶段（去稳定化）： NPY1R介导，原有恐惧记忆被\"解锁\"",
      "☐ 第二阶段（再巩固/新学习）： NPY2R介导，安全记忆被稳定写入",
      "如果只阻断NPY1R，消退学习无法启动；如果只阻断NPY2R，消退可以发生但很快复发。",
      "发现五：与PTSD治疗的关联PTSD患者的NPY水平通常较低。研究提示，在暴露疗法（类似于消退训练）期间增强NPY信号——例如通过NPY1R激动剂加速去稳定化，或通过NPY2R激动剂巩固安全记忆——可能是提高疗效的策略。",
      "科学意义",
      "这项研究将神经肽Y从\"应激调质\"重新定义为\"记忆可塑性守门人\"。它揭示了一个精妙的分子逻辑：",
      "**高亲和力受体（NPY1R）**负责\"开门\"——让旧记忆可编辑",
      "**低亲和力受体（NPY2R）**负责\"关门\"——让新记忆稳定",
      "这种\"双受体、双阶段\"机制可能是大脑解决\"稳定性-可变性困境\"的通用策略。对于PTSD、焦虑症等以恐惧记忆过度固化为特征的疾病，精准操控NPY系统提供了全新的治疗思路。"
    ]
  },
  {
    "id": "f8",
    "title": "HSV-1 H129株跨突触传播分子机制",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "7 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： （Nature Neuroscience, 2026年4月14日）作者： 罗敏华团队机构： 中国科学院武汉病毒研究所",
      "研究背景与核心问题",
      "神经环路示踪是理解大脑连接图谱的核心技术。其中，顺向跨突触示踪（从突触前到突触后追踪）尤其珍贵，因为它能揭示信息流动的方向。",
      "单纯疱疹病毒1型（HSV-1）的H129株是目前最主要的顺向示踪工具。武汉病毒所罗敏华团队此前开发了系列H129衍生工具（H129-G4、H129-dTK、H129-dgK-G4、H129Amp-CTG），填补了该领域的空白。",
      "但一个根本性问题长期悬而未决：H129是否真正以突触特异性方式传播？",
      "如果病毒只是随机从一个神经元扩散到邻近细胞（非特异性传播），那么示踪结果就无法准确反映真实的神经环路连接。这限制了H129工具的精准性，也阻碍了对其引发脑炎等病理过程的理解。",
      "实验设计",
      "技术平台：",
      "☐ H129-BAC系统： 细菌人工染色体介导的H129遗传改造平台",
      "☐ 活细胞成像： 实时追踪病毒颗粒在神经元间的转移",
      "☐ 突触标记： 共标记突触前/后标志物（Synapsin、PSD-95等），验证病毒是否穿越突触结构",
      "☐ 分子机制： 分析病毒进入神经元所需的受体（如HVEM、nectin-1等）在突触部位的富集",
      "☐ 电生理验证： 检测病毒感染是否影响突触传递功能",
      "核心发现",
      "发现一：突触特异性传播的分子证据H129病毒颗粒优先富集于突触前末梢，并通过轴突运输到达突触连接部位。病毒感染需要突触前/后膜上特定受体的精确匹配，而非简单的细胞接触。",
      "发现二：病毒利用内源性突触传递机制H129并非强行穿透细胞膜，而是\"搭便车\"利用神经元正常的突触囊泡释放和回收机制。这意味着：",
      "活跃的突触连接更容易被感染",
      "沉默的突触（inactive synapses）对病毒传播有抵抗力",
      "发现三：与病理过程的关联HSV-1脑内传播引发脑炎的机制得以澄清：病毒沿着神经环路特异性传播，而非随机扩散。这解释了为什么HSV-1脑炎常呈现特定的神经解剖分布模式。",
      "发现四：工具优化方向基于分子机制，研究团队提出了改进H129示踪工具的策略：",
      "通过改造病毒包膜蛋白，增强突触特异性",
      "开发\"活动依赖\"示踪工具——只标记功能活跃的突触连接",
      "科学意义",
      "这项研究解决了神经科学工具开发中的一个关键争议，为H129工具的可靠性和进一步优化奠定了分子基础。同时，它也揭示了病毒-神经系统互作的深层规律：神经环路的连接特性本身，就是病原体传播的\"路线图\"。"
    ]
  },
  {
    "id": "f9",
    "title": "分类是大脑的内在计算策略",
    "summary": "[x] 已读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "5 分钟阅读",
    "body": [
      "[x] 已读",
      "英文标题： Categorization is 'baked' into the brain作者： Lisa Feldman Barrett, Michael Miller发表日期： 2026年3月",
      "核心问题",
      "大脑如何知道\"这是一只狗\"？传统观点认为：感觉系统先提取特征（毛茸茸、四条腿、汪汪叫），然后分类系统将这些特征组合成\"狗\"这个概念。分类是感知的终点。",
      "但Barrett和Miller提出一个激进观点：分类不是终点，而是起点——它内嵌在信号处理的每一个阶段。",
      "关键论证",
      "感知即分类：当你看一只狗时，视网膜接收的光子信息在第一站——外侧膝状体（LGN）——就已经开始了分类：哪些边缘属于前景，哪些属于背景？到了初级视觉皮层（V1），神经元已经在分类\"这是直线还是曲线\"、\"运动方向是左还是右\"。",
      "情绪即分类：情绪不是由外部刺激\"触发\"的，而是大脑对内部感觉信号的分类结果。同样的心跳加速，在跑步时被分类为\"疲劳\"，在考试时可能被分类为\"焦虑\"。",
      "预测即分类：大脑不是被动接收信息，而是主动预测。预测的本质是：把当前感觉输入分类到已有的经验模式中。预测误差（prediction error）就是分类错误。",
      "分类贯穿全脑：从感觉皮层到前额叶，从边缘系统到脑干，所有层级都在进行不同抽象程度的分类：",
      "感觉皮层：分类物理特征",
      "联合皮层：分类物体和事件",
      "前额叶：分类情境和目标",
      "边缘系统：分类价值和情绪意义",
      "科学意义",
      "这篇综述将分类从认知心理学的概念提升到了大脑的核心计算策略。它意味着：",
      "☐ 认知障碍的新理解： 分类能力的损伤可能不是某个\"分类模块\"坏了，而是整个感觉-认知-情绪系统的分级失调",
      "☐ AI的启示： 当前深度神经网络的\"分类\"集中在网络末端（输出层），而大脑的分布式分类提示：在中间层引入显式分类机制可能提高效率和鲁棒性",
      "☐ 心理治疗的神经基础： 认知重评（cognitive reappraisal）本质上是对情绪体验重新分类，这篇综述为理解其神经机制提供了框架"
    ]
  },
  {
    "id": "f10",
    "title": "重新定义脊椎动物运动的中央模式发生器",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "5 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Redefining the central pattern generator for vertebrate locomotion作者： Abdeljabbar El Manira发表日期： 2026年3月4日",
      "核心问题",
      "你走路时不需要思考\"先抬左腿、再迈右腿\"——这种节律性运动由脊髓中的神经网络自动生成。这个网络被称为中央模式发生器（Central Pattern Generator, CPG）。",
      "经典CPG模型认为：少数\"起搏神经元\"像心脏起搏器一样产生节律，驱动运动神经元。但近年研究颠覆了这一图景。",
      "新观点",
      "CPG不是固定电路，而是动态网络：",
      "传统CPG假设特定的神经元集群执行特定的节律功能",
      "新证据表明：同一组神经元可以根据行为需求切换功能（如从游泳切换到步行）",
      "节律不是\"产生\"的，而是网络动态自组织的涌现性质",
      "感觉反馈是CPG的组成部分：",
      "传统观点：CPG产生节律，感觉反馈只是\"微调\"",
      "新证据：没有感觉输入，CPG无法产生自然运动模式",
      "感觉-运动回路是一个不可分的整体",
      "模块化与可重组性：",
      "脊椎动物的CPG由多个半独立模块组成（对应不同肢体/体节）",
      "这些模块可以灵活重组，产生从慢走到疾跑的各种步态",
      "重组不是由高层指令控制，而是模块间耦合强度的自组织结果",
      "科学意义",
      "对脊髓损伤康复有重要启示：如果CPG是动态网络而非固定电路，那么康复训练的目标不应该是\"修复特定通路\"，而是促进网络的自组织重组。这解释了为什么任务导向性训练比单纯的被动运动更有效。"
    ]
  },
  {
    "id": "f11",
    "title": "神经科学中的表征概念维度",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "5 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Clarifying the conceptual dimensions of representation in neuroscience作者： Stephan Pohl, Edgar Y. Walker, Wei Ji Ma发表日期： 2026年3月20日",
      "核心问题",
      "神经科学家每天都在谈论\"表征（representation）\"：海马位置细胞\"表征\"空间位置，视觉皮层\"表征\"边缘方向，前额叶\"表征\"决策变量。但\"表征\"到底是什么意思？",
      "这个术语的滥用导致了许多混乱：",
      "一个神经元的放电率是\"表征\"吗？",
      "整个神经群体的活动模式是\"表征\"吗？",
      "表征必须是对外部世界的\"映射\"吗？",
      "表征和\"编码（encoding）\"有什么区别？",
      "四维框架",
      "作者提出了一个统一的四维框架，用信息论语言明确表征的概念内涵：",
      "维度一：内容（Content）表征\"关于\"什么？是外部世界的一个特征，还是内部计算的一个变量？",
      "维度二：载体（Vehicle）表征的物理实现是什么？是单个神经元的放电率，是群体活动的模式，还是突触权重的分布？",
      "维度三：功能（Function）这个表征服务于什么计算功能？是用于感知、记忆、决策，还是运动控制？",
      "维度四：解释目标（Explanatory Target）我们试图解释的现象是什么？是行为层面的选择，是神经层面的机制，还是计算层面的算法？",
      "科学意义",
      "这篇论文的目标是为神经科学提供一个\"表征的语法\"——让研究者在使用这个概念时更加精确。它提醒我们：",
      "说\"神经元表征X\"时，必须明确X是什么、载体是什么、功能是什么",
      "不同层级的表征（分子、细胞、回路、系统）有不同的解释目标",
      "混淆这些维度会导致理论构建和实验设计的错误"
    ]
  },
  {
    "id": "f12",
    "title": "线粒体动态与神经发育障碍",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "7 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Mitochondrial dynamics in neurodevelopment and neurodevelopmental disorders作者： Carissa L. Sirois, Jiyoun Lee, Xinyu Zhao发表日期： 2026年3月4日",
      "核心问题",
      "线粒体是细胞的\"能量工厂\"，但它在神经元中的作用远不止产生ATP。神经元是身体中最耗能的细胞之一——人脑仅占体重2%，却消耗20%的能量。",
      "更特殊的是，神经元的线粒体需要：",
      "从胞体运输到遥远的轴突末梢（可能长达1米）",
      "在突触处局部提供能量和钙缓冲",
      "根据神经活动动态调整分布",
      "当线粒体的生物发生、降解、重塑或运输出问题，神经系统会怎样？",
      "关键内容",
      "线粒体运输的神经特异性：",
      "轴突中的线粒体通过马达蛋白（kinesin/dynein）沿微管运输",
      "突触活动调控线粒体的锚定和释放——活跃的突触吸引更多线粒体",
      "树突中的线粒体分布受局部钙信号和突触可塑性调节",
      "线粒体动态与神经发育：",
      "线粒体融合（fusion）促进代谢互补和功能恢复",
      "线粒体分裂（fission）实现质量控制（分离受损部分）",
      "线粒体自噬（mitophagy）清除严重损伤的线粒体",
      "这三个过程的平衡对神经元发育和突触成熟至关重要",
      "与神经发育障碍的关联：",
      "自闭症谱系障碍（ASD）： 多个ASD风险基因（如SHANK3、MECP2）影响线粒体功能",
      "注意缺陷多动障碍（ADHD）： 线粒体能量代谢异常",
      "精神分裂症： 线粒体DNA突变和氧化应激",
      "科学意义",
      "这篇综述将线粒体从\"背景细胞器\"提升到了神经发育的核心调控者。它提示：许多神经发育障碍可能有共同的线粒体病理基础，针对线粒体动态的药物（如促进线粒体生物发生或增强线粒体自噬）可能是广谱治疗策略。"
    ]
  },
  {
    "id": "f13",
    "title": "气候变化中的神经适应",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "6 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Neural adaptation to climate change: mechanisms, limits and opportunities作者： Jan Siemens, Patrick Haggard发表日期： 2026年3月17日",
      "核心问题",
      "全球变暖不只是环境问题，也是神经科学问题：",
      "高温如何影响神经系统功能？",
      "大脑能适应持续的高温暴露吗？",
      "适应的极限在哪里？",
      "行为和社会策略如何帮助应对热应激？",
      "关键内容",
      "热应激的神经机制：",
      "下丘脑的体温调节中枢整合外周温度感受器和核心温度信号",
      "高温导致神经元兴奋性改变、蛋白质变性、氧化应激增加",
      "严重热应激可引发血脑屏障破坏和神经炎症",
      "神经可塑性与热适应：",
      "反复热暴露可诱导热休克蛋白（HSPs）表达，增强细胞耐热性",
      "离子通道表达调整改变神经元兴奋性阈值",
      "但适应有极限：超过临界温度，可塑性机制无法补偿",
      "行为和社会策略：",
      "个体层面：寻找阴凉、减少活动、调整昼夜节律",
      "社会层面：集体迁移、建筑环境改造、工作时间调整",
      "这些策略的采纳本身受神经认知过程调控",
      "科学意义",
      "这篇综述开创性地将气候变化与神经科学连接起来。随着极端高温事件增加，理解神经热适应的机制和极限对公共卫生至关重要。它也提出了一个深刻的进化问题：人类大脑是在相对稳定的温度环境中进化的，面对快速升温，神经系统的适应能力是否足够？"
    ]
  },
  {
    "id": "f14",
    "title": "百万级人群研究：重复扩增与脑萎缩",
    "summary": "[ ] 未读",
    "tag": "论文",
    "source": "论文库",
    "date": "2026年4月24日",
    "reading": "8 分钟阅读",
    "body": [
      "[ ] 未读",
      "英文标题： Population-scale repeat expansions elucidate disease risk and brain atrophy作者： Sahar Gelfman 等机构： Regeneron再生基因中心发表日期： 2026年4月8日",
      "研究背景与核心问题",
      "一些神经系统疾病（如亨廷顿病、肌萎缩侧索硬化症ALS、脆性X综合征）由DNA中的**短串联重复序列（Short Tandem Repeats, STRs）**异常扩增引起。正常人有这些重复序列，但患者某个基因的特定重复区域长度异常增加，导致蛋白质功能失常。",
      "已知的有37个STR位点与疾病相关。但长期以来的问题是：",
      "这些致病性重复在普通人群中有多常见？",
      "它们是否只在疾病发作时才造成伤害？",
      "能否在症状出现前就识别风险？",
      "实验设计",
      "规模： 分析1,020,833份来自多样化人群的样本",
      "数据来源：",
      "短读长全外显子和全基因组测序数据",
      "与7,671个二元特征（疾病表型、影像学指标等）关联",
      "脑影像数据（MRI脑体积、神经丝轻链NfL水平）",
      "核心发现",
      "发现一：致病性重复比疾病更常见大多数STR位点的致病性重复频率高于相应疾病的患病率。这意味着：很多人携带致病性重复，但并未发病——重复是风险因素，不是充分条件。",
      "发现二：症状前数十年的脑萎缩即使在临床确诊前，致病性重复携带者就已经表现出：",
      "特定脑区体积减少（与疾病相关的靶区）",
      "神经丝轻链（NfL）水平升高——轴突损伤的标志",
      "例如，亨廷顿病相关HTT基因重复扩增的携带者，在症状出现前20年就已开始纹状体萎缩。",
      "发现三：重复长度-剂量效应重复长度越长：",
      "发病年龄越早",
      "神经退行性变越严重",
      "生物标志物异常越显著",
      "但存在一个\"阈值效应\"——超过某个临界长度，疾病几乎必然发生。",
      "科学意义",
      "☐ 预防医学的新窗口： 在症状出现前数十年就识别高风险个体，为干预提供了前所未有的时间窗口",
      "☐ 临床试验设计： 可以用生物标志物（NfL、脑体积）作为替代终点，加速药物开发",
      "☐ 遗传咨询的精细化： 重复长度检测可以提供个性化的风险预测，而非简单的\"携带/不携带\"",
      "☐ 理解疾病机制： 重复扩增导致的神经退行性变是一个缓慢过程，这提示早期干预（甚至在症状前）可能最有效"
    ]
  }
];

function createArticleCard(post) {
  const card = document.createElement('a');
  card.className = 'article-card';
  card.href = getPostUrl(post);
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

function getPostUrl(post) {
  if (post.id && post.id.startsWith('f')) {
    const num = post.id.slice(1).padStart(3, '0');
    return `papers/paper-${num}.html`;
  }
  return `article.html?id=${post.id}`;
}

function renderArticleCards(list) {
  console.log("[DEBUG] renderArticleCards called, list length:", list.length);
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
        <a href="${getPostUrl(post)}" class="read-more-link">
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
  console.log("[DEBUG] renderHome called, posts count:", posts.length);
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
    item.href = getPostUrl(post);
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
      card.href = getPostUrl(post);
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
