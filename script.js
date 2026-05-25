(function () {
  "use strict";

  const signs = [
    {
      name: "大安",
      keywords: "平稳 / 守正 / 可缓行",
      summary: "大安主安定。事情的底盘还在，眼下适合守住基本面，先确认方向，再慢慢推进。",
      situation: "真正有价值的信息不在声势里，而在那些已经反复出现的小迹象里。",
      action: "把最重要的一项条件写清楚，今天只推进确定性最高的一步。"
    },
    {
      name: "留连",
      keywords: "迟滞 / 牵挂 / 需理线",
      summary: "留连主拖延与反复。事情未必坏，但线头较多，容易因为犹豫、等待或旧事未了而慢下来。",
      situation: "卡住的地方多半不是结果，而是过程里有一处没有说透、没有确认或没有放下。",
      action: "先处理一个悬而未决的小环节，别急着用大动作换答案。"
    },
    {
      name: "速喜",
      keywords: "消息 / 轻快 / 可顺势",
      summary: "速喜主快讯与顺势。若已有苗头，近期容易见到回应；若想行动，可趁清明的时候推进。",
      situation: "机会更像一阵风，来得快，也需要你手上有准备好的帆。",
      action: "今天适合发出明确邀请、提交材料、确认时间，别让好时机停在想法里。"
    },
    {
      name: "赤口",
      keywords: "口舌 / 冲突 / 慎言",
      summary: "赤口主争执与误会。此时最怕话说重、节奏抢、立场硬，越想赢一口气越容易失分。",
      situation: "表面的问题可能是态度，深处的问题是边界、规则或利益没有摆正。",
      action: "重要沟通先写下来，删掉刺激性的字眼，再决定要不要发出去。"
    },
    {
      name: "小吉",
      keywords: "小成 / 贵人 / 渐进",
      summary: "小吉主小有所得。不是一锤定音的大胜，而是细节转暖、有人相助、事情开始变顺。",
      situation: "好运藏在具体的人和具体的动作里，越落地，越容易看见进展。",
      action: "去找那个最可能给你反馈的人，问一个具体问题，拿到一个具体答复。"
    },
    {
      name: "空亡",
      keywords: "未明 / 空转 / 宜缓",
      summary: "空亡主虚与未定。此时信息不足，期待容易落空，不宜把一时的感受当作最终判断。",
      situation: "你看到的可能只是事情的一层影子，真正的变量还没有浮出水面。",
      action: "先暂停重大决定，补齐事实、预算、时间或对方态度中的缺口。"
    }
  ];

  const topicNotes = {
    feeling: {
      name: "感情",
      lens: "看关系里行动是否连续、态度是否稳定，也看双方是否愿意把话说清楚。",
      focus: "关系的热度、回应和边界"
    },
    work: {
      name: "工作",
      lens: "看权责、资源、时间表是否真实落地，也看关键人是否给出明确支持。",
      focus: "机会、协作、权责和进度"
    },
    money: {
      name: "财务",
      lens: "先看现金流和风险边界，再看收益空间，不宜只被短期情绪带着走。",
      focus: "收入、支出、收益和风险"
    },
    study: {
      name: "学业",
      lens: "把目标拆成可交付的小段，进展比焦虑更能给你答案。",
      focus: "考试、学习节奏和结果反馈"
    },
    health: {
      name: "健康",
      lens: "身体问题以专业判断为准，这里只提醒你留意节奏、睡眠和压力。",
      focus: "身体信号、休息和压力"
    },
    travel: {
      name: "出行",
      lens: "证件、时间、路线和备选方案比临时兴起更重要。",
      focus: "路线、时间、安排和变动"
    },
    general: {
      name: "综合",
      lens: "未写具体问题时，就把这一课当作今日处事提醒，先看最现实的一步。",
      focus: "眼前这件事的节奏和取舍"
    }
  };

  const localReadings = {
    feeling: {
      大安: {
        situation: "感情问到大安，关系的底色偏稳。若已有对象，适合把节奏放慢，看对方是否持续回应；若是暧昧或复合，不宜急着逼答案。",
        action: "少试探，多确认。今天适合说一句清楚、温和的话，观察对方接下来的行动。"
      },
      留连: {
        situation: "感情问到留连，多半有牵挂、犹豫或旧事未了。对方未必无意，但现在容易反复，话说一半、情绪拖着。",
        action: "先别追问最终结果，把一件没说透的小事讲明白，再看关系会不会松动。"
      },
      速喜: {
        situation: "感情问到速喜，近期容易有消息、回应或突然靠近。若你们本就有互动，这一课偏向顺势推进。",
        action: "可以主动发出轻巧明确的邀请，不要绕太多弯，也不要一次把压力给满。"
      },
      赤口: {
        situation: "感情问到赤口，最怕误会、争执和赌气。现在说重话容易伤人，也容易把原本能谈的事推向对立。",
        action: "重要的话先缓一缓，改成表达感受和边界，少用质问句。"
      },
      小吉: {
        situation: "感情问到小吉，属于小有进展。关系不会一下定局，但可能出现善意、帮忙、关心或更柔和的互动。",
        action: "抓住一个自然场景靠近一点，用具体行动代替情绪化确认。"
      },
      空亡: {
        situation: "感情问到空亡，信息还不实，容易把想象当答案。对方态度、现实条件或你的真实需求里，有一块还没浮出来。",
        action: "暂时不要做重大决定，先观察三天，看行动是否比话更一致。"
      }
    },
    work: {
      大安: {
        situation: "工作问到大安，当前局面偏稳。适合守住基本盘、按流程推进，不必急着换方向或做过大的承诺。",
        action: "把目标、负责人和截止时间再确认一遍，先完成最确定的一项。"
      },
      留连: {
        situation: "工作问到留连，进度容易拖，可能卡在沟通、审批、资源或某个迟迟不表态的人身上。",
        action: "今天先追一个明确回复，别让事情停在模糊等待里。"
      },
      速喜: {
        situation: "工作问到速喜，容易有消息、机会或快速反馈。面试、合作、提案、推进项目都适合趁热打铁。",
        action: "把材料发出去，主动约时间，争取在窗口期内拿到下一步。"
      },
      赤口: {
        situation: "工作问到赤口，口舌和冲突的信号较强。会议、谈判、汇报中容易因为边界不清或语气过硬出问题。",
        action: "所有关键沟通留痕，先讲事实和方案，再讲立场。"
      },
      小吉: {
        situation: "工作问到小吉，有小机会、小进展或贵人相助。它不是立刻大成，但适合通过一个具体节点打开局面。",
        action: "找最可能支持你的人要一次反馈，把机会落到一个明确动作上。"
      },
      空亡: {
        situation: "工作问到空亡，信息不足或预期偏虚。项目、岗位、合作条件里可能有尚未说明的变量。",
        action: "先不要拍板，补齐预算、权限、时间表和责任边界。"
      }
    },
    money: {
      大安: {
        situation: "财务问到大安，宜稳不宜躁。适合守财、做预算、维持长期安排，不适合为了刺激感突然加码。",
        action: "先盘清现金流和固定支出，再决定要不要动用额外资金。"
      },
      留连: {
        situation: "财务问到留连，钱容易被拖住，可能是回款慢、决策慢、账目没理清，或旧支出还在牵扯。",
        action: "把应收应付列出来，先处理最容易拖成麻烦的一笔。"
      },
      速喜: {
        situation: "财务问到速喜，短期有进账、优惠、成交或好消息的机会，但越快越要确认细节。",
        action: "可以推进小额、清楚、可退出的决定，大额事项仍要复核。"
      },
      赤口: {
        situation: "财务问到赤口，容易因钱起争执，或因为口头承诺、冲动消费、合同细节带来不舒服。",
        action: "别靠口头约定，金额、期限、责任都写清楚。"
      },
      小吉: {
        situation: "财务问到小吉，偏小利、小成。适合稳稳拿到一部分收益，或通过他人介绍得到一点机会。",
        action: "先抓确定的小收益，不要为了更大的想象放弃手边确定性。"
      },
      空亡: {
        situation: "财务问到空亡，风险大于清晰度。收益描述可能好听，但核心信息、成本或后果还没看全。",
        action: "暂缓投入，至少再补一个独立来源的信息。"
      }
    },
    study: {
      大安: {
        situation: "学业问到大安，基础还在，适合稳扎稳打。越是焦虑，越要回到计划和复习节奏里。",
        action: "今天只抓一个薄弱点，做完一组题或一页笔记。"
      },
      留连: {
        situation: "学业问到留连，容易拖延、分心或反复卡在同一类问题上。不是不会，而是节奏被打散了。",
        action: "把任务拆小，先做二十五分钟，不求多，只求重新启动。"
      },
      速喜: {
        situation: "学业问到速喜，适合冲刺、提交、报名、询问结果。短期反馈会比较快。",
        action: "把最该交付的东西先交出去，别为了完美拖住进度。"
      },
      赤口: {
        situation: "学业问到赤口，容易和老师、同学、家人因为压力产生摩擦，也可能因粗心失分。",
        action: "少争辩，多复核。今天重点检查错题和要求。"
      },
      小吉: {
        situation: "学业问到小吉，进展虽小但有用。你可能得到提醒、帮助或一个能打开思路的反馈。",
        action: "找人问一个具体问题，比自己闷头耗着更有效。"
      },
      空亡: {
        situation: "学业问到空亡，目标可能太虚，或你对结果的判断缺少依据。现在不宜只靠感觉估分。",
        action: "用一次模拟、清单或客观反馈来校准现状。"
      }
    },
    health: {
      大安: {
        situation: "健康问到大安，整体提示是先稳住节奏。若已有不适，不要吓自己，也不要忽视持续信号。",
        action: "规律吃睡，记录症状；持续或加重时及时找专业医生。"
      },
      留连: {
        situation: "健康问到留连，说明问题可能和长期疲劳、压力、拖延检查有关。小不适被放久了就会牵扯精力。",
        action: "把休息和检查排进日程，不要只靠忍。"
      },
      速喜: {
        situation: "健康问到速喜，短期状态有转轻的机会，也适合尽快处理预约、复查、调整作息。",
        action: "趁今天精神尚可，完成一个健康相关的小安排。"
      },
      赤口: {
        situation: "健康问到赤口，注意上火、急躁、争执带来的消耗。情绪和身体可能互相放大。",
        action: "少熬夜少硬扛，今天避免刺激性沟通和过量消耗。"
      },
      小吉: {
        situation: "健康问到小吉，适合从小习惯改善。一次大的改变未必必要，稳定的小修正更有用。",
        action: "选一个最容易坚持的动作，比如早睡半小时或散步二十分钟。"
      },
      空亡: {
        situation: "健康问到空亡，信息不明，不适合自行下结论。模糊担心会放大焦虑，明确检查更可靠。",
        action: "有症状就记录并咨询专业人士，不用卦象替代诊断。"
      }
    },
    travel: {
      大安: {
        situation: "出行问到大安，整体偏稳，按计划走即可。重点在提前确认，不在临时改来改去。",
        action: "检查证件、时间、地址和交通方式，留出缓冲。"
      },
      留连: {
        situation: "出行问到留连，容易有延误、等待、改期或行程拖慢。不是不能去，而是别把时间卡太死。",
        action: "预留备选路线和宽松时间，重要安排提前确认。"
      },
      速喜: {
        situation: "出行问到速喜，适合快速成行、临时好消息或顺路达成某件事，但也要防急中出错。",
        action: "现在就确认票、车、地址，能定的别拖。"
      },
      赤口: {
        situation: "出行问到赤口，注意沟通摩擦、票务争议、路线误会或同行人意见不合。",
        action: "把行程发给相关的人，费用和集合点说清楚。"
      },
      小吉: {
        situation: "出行问到小吉，途中容易有小便利、小惊喜或他人帮忙。适合轻装、灵活安排。",
        action: "保留一点弹性，不要把行程排满。"
      },
      空亡: {
        situation: "出行问到空亡，计划里有不确定信息。目的地、天气、证件、付款或时间可能还有空缺。",
        action: "确认所有关键条件后再出发，缺一项就先缓。"
      }
    },
    general: {
      大安: {
        situation: "综合问到大安，事情的底盘偏稳。此时不必急着求变，先守住你已经拥有的确定性。",
        action: "今天只推进最重要、最确定的一步。"
      },
      留连: {
        situation: "综合问到留连，说明事情仍有牵扯。你可能不是没答案，而是被旧线头和等待感拖住。",
        action: "找出那个最拖你的环节，先把它处理掉。"
      },
      速喜: {
        situation: "综合问到速喜，近期容易有回应和转机。适合主动一点，让想法进入现实流动。",
        action: "把消息发出去，把时间约下来，把第一步落地。"
      },
      赤口: {
        situation: "综合问到赤口，提醒你慎言慎冲动。现在容易因为一句话、一个态度让局面变硬。",
        action: "先冷静，再表达；先写下来，再决定要不要说。"
      },
      小吉: {
        situation: "综合问到小吉，事情有小成之象。别嫌进展小，小的确定性正在给你铺路。",
        action: "抓住一个具体反馈，让事情往前动一点。"
      },
      空亡: {
        situation: "综合问到空亡，现阶段信息不足。你以为的答案可能只是想象，还需要事实来落地。",
        action: "先暂停重大决定，补齐关键事实。"
      }
    }
  };

  const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
  ];

  const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const chineseMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  const chineseDays = [
    "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
  ];

  const elements = {
    question: document.querySelector("#question"),
    button: document.querySelector("#cast-button"),
    panel: document.querySelector("#result-panel"),
    readingTime: document.querySelector("#reading-time"),
    resultName: document.querySelector("#result-name"),
    resultKeywords: document.querySelector("#result-keywords"),
    summary: document.querySelector("#summary"),
    situation: document.querySelector("#situation"),
    action: document.querySelector("#action"),
    questionEcho: document.querySelector("#question-echo"),
    sixItems: Array.from(document.querySelectorAll(".six-grid span"))
  };

  elements.button.addEventListener("click", function () {
    const question = elements.question.value.trim();
    const reading = castReading(new Date(), question);
    renderReading(reading, question);
  });

  function castReading(date, question) {
    const lunar = solarToLunar(date);
    const hourNumber = getHourNumber(date);
    const index = positiveModulo(lunar.month + lunar.day + hourNumber - 3, signs.length);
    const sign = signs[index];
    const topic = detectTopic(question);

    return {
      sign,
      topic,
      lunar,
      branch: branches[hourNumber - 1],
      solarText: formatSolar(date)
    };
  }

  function renderReading(reading, question) {
    const lunarText = formatLunar(reading.lunar);
    const analysis = buildLocalAnalysis(reading, question);

    elements.panel.classList.remove("is-hidden");
    elements.readingTime.textContent = `${reading.solarText} · 农历${lunarText} · ${reading.branch}时`;
    elements.resultName.textContent = reading.sign.name;
    elements.resultKeywords.textContent = reading.sign.keywords;
    elements.summary.textContent = reading.sign.summary;
    elements.situation.classList.remove("is-loading");
    elements.situation.textContent = analysis.situation;
    elements.action.textContent = analysis.action;
    elements.questionEcho.textContent = question
      ? `所问：${question} · 分类：${analysis.topicName}`
      : `所问：未写下具体问题 · 分类：${analysis.topicName}`;

    elements.sixItems.forEach(function (item) {
      item.classList.toggle("is-active", item.dataset.sign === reading.sign.name);
    });

    elements.button.querySelector("span").textContent = "再掐一算";
    elements.panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function buildLocalAnalysis(reading, question) {
    const topic = topicNotes[reading.topic];
    const readingSet = localReadings[reading.topic] || localReadings.general;
    const matched = readingSet[reading.sign.name] || localReadings.general[reading.sign.name];
    const questionLead = question ? `你问的是“${question}”，归到${topic.name}类。` : `这次没有写具体问题，按${topic.name}类来看。`;
    const situation = `${questionLead}${matched.situation}`;
    const action = `${matched.action} ${topic.lens}`;

    return {
      situation,
      action,
      topicName: topic.name,
      focus: topic.focus
    };
  }

  function detectTopic(text) {
    if (!text) return "general";
    if (/感情|恋|爱|喜欢|复合|分手|婚|对象|伴侣|男友|女友|暧昧|关系/.test(text)) return "feeling";
    if (/工作|老板|同事|项目|offer|面试|跳槽|升职|客户|生意|创业|合作|合同/.test(text)) return "work";
    if (/钱|财|投资|股票|基金|买|卖|房|车|工资|收入|债/.test(text)) return "money";
    if (/考试|学习|论文|学校|留学|证书|成绩|课程/.test(text)) return "study";
    if (/病|身体|健康|医院|睡眠|焦虑|疼|药/.test(text)) return "health";
    if (/出行|旅行|搬家|签证|航班|车票|路线|远行/.test(text)) return "travel";
    return "general";
  }

  function getHourNumber(date) {
    return (Math.floor((date.getHours() + 1) / 2) % 12) + 1;
  }

  function solarToLunar(date) {
    const baseDate = new Date(1900, 0, 31);
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let offset = Math.floor((target.getTime() - baseDate.getTime()) / 86400000);
    let year;
    let daysOfYear = 0;

    for (year = 1900; year < 2050 && offset > 0; year += 1) {
      daysOfYear = lunarYearDays(year);
      offset -= daysOfYear;
    }

    if (offset < 0) {
      offset += daysOfYear;
      year -= 1;
    }

    const leap = leapMonth(year);
    let isLeap = false;
    let month;
    let daysOfMonth = 0;

    for (month = 1; month < 13 && offset > 0; month += 1) {
      if (leap > 0 && month === leap + 1 && !isLeap) {
        month -= 1;
        isLeap = true;
        daysOfMonth = leapDays(year);
      } else {
        daysOfMonth = monthDays(year, month);
      }

      if (isLeap && month === leap + 1) {
        isLeap = false;
      }

      offset -= daysOfMonth;
    }

    if (offset < 0) {
      offset += daysOfMonth;
      month -= 1;
    }

    return {
      year,
      month,
      day: offset + 1,
      isLeap
    };
  }

  function lunarYearDays(year) {
    let sum = 348;
    const info = lunarInfo[year - 1900];

    for (let mask = 0x8000; mask > 0x8; mask >>= 1) {
      if ((info & mask) !== 0) {
        sum += 1;
      }
    }

    return sum + leapDays(year);
  }

  function leapDays(year) {
    if (leapMonth(year) === 0) return 0;
    return (lunarInfo[year - 1900] & 0x10000) !== 0 ? 30 : 29;
  }

  function leapMonth(year) {
    return lunarInfo[year - 1900] & 0xf;
  }

  function monthDays(year, month) {
    return (lunarInfo[year - 1900] & (0x10000 >> month)) !== 0 ? 30 : 29;
  }

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function formatSolar(date) {
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`;
  }

  function formatLunar(lunar) {
    const leap = lunar.isLeap ? "闰" : "";
    return `${leap}${chineseMonths[lunar.month - 1]}月${chineseDays[lunar.day - 1]}`;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }
})();
