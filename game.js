const TITLE_SCREEN = {
  videoSrc: "videos/start.mp4",
  bgmSrc: "audio/start.mp3",
  videoLoop: true
};

const CORRECT_NAMES = [
  "릴리",
  "검은 점",
  "검은점",
  "태초의 관념",
  "lili"
];
const SCENES = {

  SIN01: {
    id: "SIN01",
    type: "input",
    pov: "record",
    title: "이름",
    body: [
      "그녀는 이곳을 나가지 못한다.",
      "",
      "아무리 울부짖어도,",
      "아무리 기억하려해도,",
      "그녀는 이름을 찾을 수 없다.",
      "",
      "이름 잃은 자는 오늘도",
      "안개에 잠긴 채 걷는다.",
      "",
      "자신이 누구였는지도 잊은 채.",
      "",
      "그녀의 이름은 무엇인가?"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "그녀의 이름을 말한다.", action: "input" },
      { label: "그녀의 이름을 들여다본다.", action: "go", target: "SIN02" }
    ],
    videoSrc: "videos/sin01.mp4",
    bgmSrc: "audio/sin01.mp3"
  },

  SIN02: {
    id: "SIN02",
    type: "scene",
    pov: "record",
    title: "태초",
    body: [
      "하얀색은 시작처럼 보였다.",
      "",
      "그 위에 남은 것은",
      "아직 불리지 못한 흔적처럼 보였다.",
      "",
      "태초의 색은 무엇인가?"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "하얀색", action: "go", target: "SIN03" },
      { label: "검은색", action: "go", target: "SIN03_1" }
    ],
    videoSrc: "videos/sin02.mp4",
    bgmSrc: "audio/sin02.mp3"
  },

  SIN03: {
    id: "SIN03",
    type: "scene",
    pov: "lily",
    title: "생명의 어머니",
    body: [
      "나는 생명의 어머니였다.",
      "",
      "천사도, 거인도, 요정도, 인간도",
      "모두 나의 힘으로 피어났다.",
      "",
      "하지만 생명이 피어난 자리에는",
      "언제나 죽음이 따라왔다.",
      "",
      "그리고 어느 순간,",
      "나 또한 그것을 피할 수 없음을 깨달았다.",
      "",
      "처음으로, 끝이라는 것이 두려웠다.",
      "",
      "나는 내가 피워낸 꽃들이 필요했다.",
      "",
      "피워낸 생명들이 내게 돌아온다면,",
      "나는 끝나지 않을 수 있을 것 같았다.",
      "",
      "생명들은 나에게..."
    ],
    speaker: null,
    dialogue: null,
    choices: [
  { label: "돌아왔다.", action: "go", target: "END1" },
  { label: "돌아오지 않았다.", action: "go", target: "SIN05" }
],
    videoSrc: "videos/sin03.mp4",
    bgmSrc: "audio/sin03.mp3",
    videoLoop: false
  },

  SIN03_1: {
    id: "SIN03_1",
    type: "scene",
    pov: "record",
    title: "태초의 검은색",
    body: [
      "태초의 실험실이었다.",
      "",
      "생명이 피어난 자리라기보다,",
      "생명이 무엇인지 시험되던 자리.",
      "",
      "첫 번째 창조는 움직였지만,",
      "스스로 원하는 것이 없었다.",
      "",
      "명령이 있으면 움직였고,",
      "명령이 없으면 멈췄다.",
      "",
      "그것은 살아 있는 것처럼 보였지만,",
      "살아가지는 않았다.",
      "",
      "그녀와 함께 태초에 나타났던 그들은",
      "첫 번째 창조를 보며 말했다.",
      "",
      "“의지가 없는 존재를", 
      "생명이라 할 수는 없어.",
      "그저 네 마음 내키는 대로 움직이는 꼭두각시에 불과하지.”",
      "",
      "모든 생명에게는 의지가",
      "필요하다는 그들의 말.",
      "",
      "그녀는 그 말을 이해하지 못했다.",
      "그럼에도"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "언젠가 이해되리라 믿었다.", action: "go", target: "END2" },
      { label: "그들의 말을 들어주었다.", action: "go", target: "SIN04_1" }
    ],
    videoSrc: "videos/sin03_01.mp4",
    bgmSrc: "audio/sin03_01.mp3"
  },

  SIN04_1: {
    id: "SIN04_1",
    type: "scene",
    pov: "record",
    title: "두려움",
    body: [
      "생명은 그녀의 힘으로 피어났다.",
      "",
      "그러나 생명이 눈을 뜰수록,",
      "그녀의 힘은 조금씩 옅어졌다.",
      "",
      "스스로 걷고,",
      "스스로 말하고,",
      "스스로 선택할수록,",
      "그녀는 점점 희미해져갔다.",
      "",
      "그 순간 그녀는",
      "자신의 끝이 보였다.",
      "",
      "처음으로",
      "두려움을 느낀 그녀는"
    ],
    speaker: "그녀",
    dialogue: "왜… 힘이 사라지는 거지?\n\n내가 만든 것들이 살아갈수록…\n내가 사라져야 하는 건가?",
    choices: [
      { label: "생명의 순리를 받아들였다.", action: "go", target: "END3" },
      { label: "자신의 것을 되찾기로 했다.", action: "go", target: "SIN05_1" }
    ],
    videoSrc: "videos/sin04_1.mp4",
    bgmSrc: "audio/sin04_1.mp3"
  },

  SIN05: {
    id: "SIN05",
    type: "scene",
    pov: "lily",
    title: "생명과 소멸",
    body: [
      "그저 돌아가고 싶었다.",
      "",
      "죽음이 다가오기 전으로,",
      "내가 처음으로 두려움을 알기 전으로.",
      "",
      "나는 나만의 해결법을 찾았다.",
      "",
      "모든 것을 되돌릴 수 있다고 믿었다.",
      "",
      "그러나 그들이 나를 막아섰다.",
      "",
      "태초부터 함께했던 그들이",
      "나를 향해 공격을 퍼붓기 시작했다.",
      "",
      "더는 어쩔 수 없었다.",
      "피할 수 없다면…"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "나를 도와줄 자를 찾아간다.", action: "go", target: "SIN06" },
      { label: "나를 막는 자들에게 맞선다.", action: "go", target: "END4" }
    ],
    videoSrc: "videos/sin05.mp4",
    bgmSrc: "audio/sin05.mp3"
  },

  SIN05_1: {
    id: "SIN05_1",
    type: "scene",
    pov: "record",
    title: "회수",
    body: [
      "그녀는 학살이라 부르지 않았다.",
      "",
      "그저 자신의 것을 되찾는 일.",
      "",
      "자신에게서 비롯된 것을",
      "다시 제자리로 돌려놓는 일.",
      "",
      "자신의 것을 돌려받는 일에",
      "허락은 필요하지 않았다.",
      "",
      "그녀가 지나간 곳에는",
      "생명이 남지 않았고,",
      "검은 액체의 흔적만이 남았다.",
      "",
      "태초의 그들은",
      "그녀를 설득할 수 없었다.",
      "",
      "그녀는 처음부터 그들마저",
      "삼킬 생각이었기 때문에.",
      "",
      "그들과 그녀의 전쟁은",
      "필연이었다.",
      "",
      "이제 남은 것은",
      "그녀가 이 전쟁을", 
      "어떻게 시작할지뿐이었다.",
      "",
      "그녀는"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "전쟁의 이름을 떠올렸다.", action: "go", target: "SIN06_1" },
      { label: "곧장 전쟁을 일으켰다.", action: "go", target: "END5" }
    ],
    videoSrc: "videos/sin05_01.mp4",
    bgmSrc: "audio/sin05_01.mp3"
  },

  SIN06: {
    id: "SIN06",
    type: "scene",
    pov: "lily",
    title: "[란] 반고",
    body: [
      "[란] 반고.",
      "",
      "그의 본신은 천궁에 닿을 만큼 거대했고,",
      "발 하나만으로도 산을 짓눌렀다.",
      "",
      "천궁은 그를 담기엔 좁았기에,",
      "그는 지상에 남아 아래의 존재들을 내려다보았다.",
      "",
      "지상에는 매일같이 싸움이 일어났지만,",
      "그가 몸을 일으킬 만한 전쟁은 없었다.",
      "",
      "그러나 마침내,",
      "그가 움직일 이유가 생겼다.",
      "",
      "그 이유를 들고 간 것은 나였다."
    ],
    speaker: "그녀",
    dialogue: "반고, 너에게 최후의 전쟁을 보여주마.",
    choices: [
      { label: "천궁으로 올라가자.", action: "go", target: "END6" },
      { label: "지상을 막아.", action: "go", target: "SIN07_1" }
    ],
    videoSrc: "videos/sin06.mp4",
    bgmSrc: "audio/sin06.mp3"
  },

  SIN06_1: {
    id: "SIN06_1",
    type: "scene",
    pov: "record",
    title: "[란] 반고",
    body: [
      "하나의 대륙을 가른 이름이 있었다.",
      "",
      "[란] 반고.",
      "",
      "한 걸음에 땅이 갈라졌고,",
      "손을 움직이면 폭풍이 일었다.",
      "",
      "잔혹함과 호전성까지 더해져,",
      "태초의 바다는 그로 인해",
      "오랜시간 붉게 물들어 있었다.",
      "",
      "끝내 그들, [란]들이",
      "그를 완전한 석상으로",
      "만들기 전까지",
      "붉은 해가 이어졌다.",
      "",
      "그러나 그 봉인도 오래가지 않았다.",
      "",
      "반고는 오래전부터",
      "이미 움직일 수 있었다.",
      "",
      "그러나, 움직이지 않았을 뿐.",
      "",
      "언젠가 자신의 피를 끓게 할",
      "마지막 전쟁이 온다는",
      "이야기를 들은 뒤로,",
      "",
      "그는 그저",
      "지상을 내려다보고 있었다.",
      "",
      "그녀가 찾아오기 전까지.",
      "",
      "그러나, 이제",
      "반고는 마지막 전쟁을 위해",
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "천궁으로 올라갔다.", action: "go", target: "END6" },
      { label: "지상에서 일어섰다.", action: "go", target: "SIN07_1" }
    ],
    videoSrc: "videos/sin06_01.mp4",
    bgmSrc: "audio/sin06_01.mp3"
  },

  SIN07_1: {
    id: "SIN07_1",
    type: "scene",
    pov: "record",
    title: "전쟁의 결과",
    body: [
      "그녀는 태초의 전쟁을 벌였다.",
      "",
      "모든 것을 흡수해",
      "다시 원래대로 되돌리고자 했다.",
      "",
      "그들은 그녀를 막기 위해",
      "천궁에서 전쟁을 벌였고,",
      "",
      "반고를 따르는 거인들은",
      "지상에서 피조물들을 막았다.",
      "",
      "그리고 오랜 전쟁 끝에,",
      "그녀는…"
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "승리했다.", action: "go", target: "END7" },
      { label: "패배했다.", action: "go", target: "SIN08_1" }
    ],
    videoSrc: "videos/sin07_1.mp4",
    bgmSrc: "audio/sin07_1.mp3"
  },

  SIN08_1: {
    id: "SIN08_1",
    type: "scene",
    pov: "record",
    title: "하얀 공간",
    body: [
      "그녀는 패배했다.",
      "",
      "그 사실을 인정한 순간,",
      "새하얀 안개가 걷히기 시작했다.",
      "",
      "전쟁도, 죽음도, 이름도,",
      "모두 멀어졌다.",
      "",
      "남은 것은",
      "아무것도 없는 하얀 공간뿐이었다.",
      "",
      "그녀가 천천히 뒤를 돌아보았다.",
      "",
      "그곳에는",
      "태초부터 함께했던 이들이 있었다.",
      "",
      "그들 중 하나가",
      "검은 점을 바라보며 물었다.",
      "",
      "잊고 있던 이름들이",
      "하나씩 떠올랐다.",
      "",
      "그들의 이름도.",
      "",
      "그리고,",
      "나의 이름도.",
      "나의 이름은…"
    ],
    speaker: "???",
    dialogue: "너의 이름은 뭐야?",
    choices: [
      { label: "릴리.", action: "go", target: "SIN01" }
    ],
    videoSrc: "videos/sin08_1.mp4",
    bgmSrc: "audio/sin08_1.mp3"
  },

  END1: {
    id: "END1",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "바람",
    endingIndexText: "END 01 / 07",
    body: [
      "천사도, 거인도, 요정도, 인간도",
      "모든 생명이 내게 돌아왔다.",
      "",
      "그들은 나를 위해",
      "몸과 혼을 바쳤고,",
      "",
      "모든 것은 다시",
      "검은 점으로 돌아가길 바랐다."
    ],
    fakeWord: "아니.",
    speaker: "그녀",
    dialogue: "그들은 돌아오지 않았다.\n그들은 나를 따르지 않았다.\n\n내가 전쟁을 원한 게 아니야.\n그들이 그렇게 만든 거지.",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end01.mp4",
    bgmSrc: "audio/end01.mp3"
  },

  END2: {
    id: "END2",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "후회",
    endingIndexText: "END 02 / 07",
    body: [
      "그녀는 후회했다.",
      "",
      "의지를 가진 생명을 만든 것을.",
      "스스로 걷고,",
      "스스로 거절할 수 있게 둔 것을.",
      "",
      "그녀는 그것을",
      "자유라 부르지 않았다.",
      "",
      "자신에게 돌아오지 않는 마음.",
      "자신의 뜻을 벗어난 움직임.",
      "",
      "그녀는 그것을 배신이라 불렀다."
    ],
    fakeWord: "후회.",
    skipFakeStrike: true,
    speaker: "그녀",
    dialogue: "의지를 주지 않았다면,\n그들은 나를 떠나지 않았겠지.\n\n자유라니.\n참 우스운 말이야.",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end02.mp4",
    bgmSrc: "audio/end02.mp3"
  },

  END3: {
    id: "END3",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "부정",
    endingIndexText: "END 03 / 07",
    body: [
      "그녀는 받아들였다.",
      "",
      "생명에는 끝이 있고,",
      "창조주 또한 예외가 아니라고.",
      "",
      "자신이 피운 것들이 살아간다면,",
      "그것으로 충분하다고.",
      "",
      "그녀는 조용히",
      "자신의 끝을 기다렸다."
    ],
    fakeWord: "거짓말.",
    speaker: "그녀",
    dialogue: "내가 왜 끝을 받아들여야 하지?\n\n내가 만든 것들도 살아가는데,\n어째서 내가 사라져야 하는 거지?",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end03.mp4",
    bgmSrc: "audio/end03.mp3"
  },

  END4: {
    id: "END4",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "소멸",
    endingIndexText: "END 04 / 07",
    body: [
      "그들은 나를 막았다.",
      "",
      "태초부터 함께했던 이들이",
      "나를 향해 손을 들었다.",
      "",
      "나는 물러서지 않았다.",
      "",
      "하늘도, 땅도, 생명도",
      "내 손끝에서 쉽게 사라졌다.",
      "",
      "모든 것은 다시",
      "검은 점으로 돌아가는 듯했다.",
      "",
      "그러나, 이것은 내가 원한 끝이 아니었다."
    ],
    fakeWord: "거짓말.",
    speaker: "그녀",
    dialogue: "이런 결말, 나는 고른 적 없어.",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end04.mp4",
    bgmSrc: "audio/end04.mp3"
  },

  END5: {
    id: "END5",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "패배",
    endingIndexText: "END 05 / 07",
    body: [
     "그녀는 망설이지 않았다.",
  "",
  "태초의 그들을 흡수하기 위해",
  "곧장 그들에게 달려들었다.",
  "",
  "검은 액체가 퍼져 나갔고,",
  "전쟁은 끝나지 않았다.",
  "",
  "하루가 지나고,",
  "계절이 지나고,",
  "이름 없는 시간이 흘렀다.",
  "",
  "세상의 절반이",
  "암흑으로 물들었을 때에도,",
  "그녀는 멈추지 않았다.",
  "",
  "그러나 그녀는 혼자였다.",
  "",
  "태초의 그들은",
  "남은 피조물들과 함께",
  "끝내 그녀를 몰아붙였다.",
  "",
  "그리고 마침내,",
  "그녀는 모든 것을 잃고 소멸했다.",
  "",
  "누군가 그녀 곁에 있었다면,",
  "불가능했을 결말이었다."
    ],
    fakeWord: "가짜.",
    speaker: "그녀",
    dialogue: "재밌나?\n내가 패배하는 환상을\n그렇게 보고 싶었나?\n\n이건 내가 겪은 끝이 아니야.",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end05.mp4",
    bgmSrc: "audio/end05.mp3"
  },

  END6: {
    id: "END6",
    type: "ending",
    endingType: "fake",
    pov: "ending",
    title: "일식",
    endingIndexText: "END 06 / 07",
    body: [
      "사람들은 그것을 천재지변이라 여겼다.",
      "",
      "거대한 붉은 눈동자가",
      "하늘에 떠 있었고,",
      "천둥이 대지를 울렸으며,",
      "붉은 비와 우박이 끝없이 쏟아졌다.",
      "",
      "짐승들은 울부짖었고,",
      "사람들은 하늘을 올려다본 채",
      "세상의 끝을 두려워했다.",
      "",
      "그것은 재앙처럼 보였다.",
      "",
      "아니, 누구라도 재앙이라",
      "믿을 수밖에 없었다.",
      "",
      "하늘에 떠오른 붉은 눈이",
      "마치 지상의 존재들을",
      "내려다보는 것 같았으니."
    ],
    fakeWord: "거짓말.",
    speaker: "그녀",
    dialogue: "반고는 천궁을 싫어했다.\n아무것도 없는 공간이라며 답답해했지.\n\n그런 놈이 스스로 천궁에 올랐다고?\n\n성의 없는 환상이야.",
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end06.mp4",
    bgmSrc: "audio/end06.mp3"
  },

  END7: {
    id: "END7",
    type: "ending",
    endingType: "terminal",
    pov: "ending",
    title: "안개",
    endingIndexText: "END 07 / 07",
    body: [
      "그녀는 승리했다.",
      "",
      "모든 것은 다시",
      "검은 점으로 돌아갔다.",
      "",
      "전쟁은 끝났고,",
      "그녀를 막던 그들도 사라졌다.",
      "",
      "그러나 그토록 원하던",
      "승리의 안도감은 거짓이었다.",
      "",
      "그녀의 마지막 진실은",
      "안개 속으로 사라진다.",
      "",
      "하얀 안개가 내려앉았다.",
      "",
      "그 안에서, 그녀는",
      "더 이상 이름을 찾지 않을 것이다."
    ],

    /*
      END7은 fake 엔딩은 아니지만,
      본문이 끝난 뒤 별도 판정 연출을 띄운다.
    */
    afterEndingOverlay: true,
    afterEndingDelay: 900,
    skipFakeStrike: true,

    fakeWord: "거짓된 승리.",
    fakeSpeaker: "기록",
    fakeDialogue: "그녀는 안개 속에 갇혔다.\n그녀는 더 이상 진실을 눈치채지 못할 것이다.",

    speaker: null,
    dialogue: null,
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/end07.mp4",
    bgmSrc: "audio/end07.mp3"
  },

  END_LILY: {
    id: "END_LILY",
    type: "ending",
    endingType: "terminal",
    pov: "ending",
    title: "릴리",
    endingIndexText: "TRUE END",
    endingIntroDelay: 2800,
    body: [
      "릴리는 이곳을 나갈 것이다.",
      "",
      "아무리 울부짖었어도,",
      "아무리 기억나지 않았어도,",
      "릴리는 결국 이름을 찾아냈기에.",
      "",
      "이름을 되찾은 오늘,",
      "안개 너머의 문을 향해 걷는다.",
      "",
      "자신이 누구였는지",
      "다시 깨달은 채."
    ],
    speaker: null,
    dialogue: null,
    choices: [
      { label: "다시하기", action: "restart" },
      { label: "뒤로가기", action: "back" }
    ],
    videoSrc: "videos/true_end.mp4",
    bgmSrc: "audio/true_end.mp3"
  }
};
let currentSceneId = "SIN01";
let historyStack = [];
let routeRecords = [];
let pendingInputChoice = null;
let toastTimer = null;
let audioUnlocked = false;
let activeBgmSrc = "";
let hasStarted = false;
let fakeTimers = [];
let bodyRevealDone = false;
let fakeSequenceStarted = false;
let videoRevealTimer = null;
let videoRenderToken = 0;
let bodyCharTimers = [];
let bodyTypingActive = false;
let bodyAutoFollowEnabled = true;
let bodyAutoFollowFrame = null;
let bodyAutoFollowTarget = null;
let bodyScrollFollowFrame = null;
let bodyScrollTargetTop = 0;
let bodyCompleteCallback = null;
let bodyCompleteDone = false;
let videoRevealWaiting = false;
let videoSkipHandler = null;

let isNameInputOpen = false;
let ignoreNameInputOutsideClose = false;
let blockClickAfterNameClose = false;

let dialogueAdvanceActive = false;
let dialogueAdvanceSceneId = null;
let nameFailCount = 0;
let isVideoPaused = false;
let suppressNextStageClick = false;
let mobileVideoPanPercent = 50;
let mobileVideoPanning = false;
let mobileVideoPanStartX = 0;
let mobileVideoPanStartPercent = 50;
let mobileVideoPanMoved = false;

const NAME_PUNISH_VIDEO_SRC = "videos/name_fail.mp4";

const gameStage = document.getElementById("gameStage");
const bgVideo = document.getElementById("bgVideo");
const bgmAudio = document.getElementById("bgmAudio");
const videoPauseBtn = document.getElementById("videoPauseBtn");

const titleScreen = document.getElementById("titleScreen");
const playScreen = document.getElementById("playScreen");
const startGameBtn = document.getElementById("startGameBtn");

const sceneTitle = document.getElementById("sceneTitle");
const bodyBox = document.getElementById("bodyBox");
const choiceBox = document.getElementById("choiceBox");

const dialogueBox = document.getElementById("dialogueBox");
const speakerName = document.getElementById("speakerName");
const dialogueText = document.getElementById("dialogueText");

const inputPanel = document.getElementById("inputPanel");
const nameInput = document.getElementById("nameInput");
const nameSubmitBtn = document.getElementById("nameSubmitBtn");

const endingBadge = document.getElementById("endingBadge");

const fakeEndingOverlay = document.getElementById("fakeEndingOverlay");
const fakeCloseBtn = document.getElementById("fakeCloseBtn");
const fakeWord = document.getElementById("fakeWord");
const fakeSpeaker = document.getElementById("fakeSpeaker");
const fakeDialogue = document.getElementById("fakeDialogue");

const toast = document.getElementById("toast");
const namePunishOverlay = document.getElementById("namePunishOverlay");
const namePunishVideo = document.getElementById("namePunishVideo");
const namePunishText = document.getElementById("namePunishText");

const routeBtn = document.getElementById("routeBtn");
const routeModal = document.getElementById("routeModal");
const routeCloseBtn = document.getElementById("routeCloseBtn");
const routeViewport = document.getElementById("routeViewport");
const routeCanvas = document.getElementById("routeCanvas");

const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");
const confirmModal = document.getElementById("confirmModal");
const cancelRestartBtn = document.getElementById("cancelRestartBtn");
const confirmRestartBtn = document.getElementById("confirmRestartBtn");

const saveBtn = document.getElementById("saveBtn");
const saveModal = document.getElementById("saveModal");
const saveCloseBtn = document.getElementById("saveCloseBtn");
const slotList = document.getElementById("slotList");

function getScene(id) {
  return SCENES[id];
}

function isMobilePortrait() {
  return window.matchMedia("(max-width: 900px) and (orientation: portrait)").matches;
}

function getSceneVisualClass(scene) {
  const sceneClass = scene?.id ? `scene-${scene.id.toLowerCase()}` : "";

  if (scene?.pov === "lily") {
    return `${sceneClass} pov-lily`.trim();
  }

  if (scene?.pov === "ending") {
    const endingTypeClass = scene.endingType ? `ending-${scene.endingType}` : "ending-normal";
    const trueEndClass = scene.id === "END_LILY" ? "ending-true" : "";

    return `${sceneClass} pov-ending ${endingTypeClass} ${trueEndClass}`.trim();
  }

  return `${sceneClass} pov-record`.trim();
}

function getRouteNodeClass(scene) {
  if (scene?.pov === "lily") return "lily";
  if (scene?.pov === "ending") return "ending";
  return "record";
}

function syncMobileVisualViewport() {
  if (!isMobilePortrait()) {
    gameStage.style.removeProperty("--mobile-vv-offset-top");
    gameStage.style.removeProperty("--mobile-vv-center-y");
    return;
  }

  const vv = window.visualViewport;
  const offsetTop = vv ? vv.offsetTop : 0;
  const height = vv ? vv.height : window.innerHeight;

  gameStage.style.setProperty("--mobile-vv-offset-top", `${offsetTop}px`);
  gameStage.style.setProperty("--mobile-vv-center-y", `${offsetTop + height * 0.5}px`);

  if (hasStarted) {
    gameStage.classList.add("started");
  }
}

function restoreMobileViewportAfterInput() {
  if (!isMobilePortrait()) return;

  const restore = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    syncMobileVisualViewport();

    if (hasStarted) {
      gameStage.classList.add("started");
    }
  };

  requestAnimationFrame(restore);
  setTimeout(restore, 80);
  setTimeout(restore, 220);
}

function setupMobileVisualViewport() {
  syncMobileVisualViewport();

  window.addEventListener("resize", syncMobileVisualViewport);

  window.addEventListener("orientationchange", () => {
    setTimeout(syncMobileVisualViewport, 120);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncMobileVisualViewport);
    window.visualViewport.addEventListener("scroll", syncMobileVisualViewport);
  }
}

function renderScene() {
  const scene = getScene(currentSceneId);

  if (!scene) {
    showToast(`장면을 찾을 수 없습니다: ${currentSceneId}`);
    return;
  }

  setVideoPaused(false);

  clearFakeTimers();
  resetFakeEffect();

  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;
  blockClickAfterNameClose = false;

  if (!hasStarted) {
    gameStage.className = "game-stage pov-record";

    renderVideo(
      TITLE_SCREEN.videoSrc,
      TITLE_SCREEN.videoLoop ?? true,
      false,
      null,
      TITLE_SCREEN
    );

    changeBgm(TITLE_SCREEN.bgmSrc);

    titleScreen.classList.remove("hidden");
    playScreen.classList.add("hidden");

    syncMobileVisualViewport();
    return;
  }

  gameStage.className = `game-stage ${getSceneVisualClass(scene)} started`;

  syncMobileVisualViewport();

  changeBgm(scene.bgmSrc);

  titleScreen.classList.add("hidden");
  playScreen.classList.remove("hidden");

  renderSceneTitle(scene);
  renderEndingBadge(scene);
  hideSceneContent();

  inputPanel.classList.add("hidden");
  pendingInputChoice = null;

  backBtn.disabled = historyStack.length === 0;

  renderVideo(
    scene.videoSrc,
    scene.videoLoop ?? true,
    scene.showAfterVideo ?? true,
    () => {
      if (currentSceneId !== scene.id || !hasStarted) return;
      startSceneTextSequence(scene);
    },
    scene
  );
}

function hideSceneContent() {
  clearBodyTypingTimers();

  bodyBox.classList.add("hidden");
  bodyBox.classList.remove("fake-strike");
  bodyBox.innerHTML = "";
  bodyBox.scrollTop = 0;

  choiceBox.classList.remove("choice-ink-reveal");
  choiceBox.innerHTML = "";

  dialogueBox.classList.add("hidden");
  speakerName.textContent = "";
  dialogueText.textContent = "";

  inputPanel.classList.add("hidden");

  bodyRevealDone = false;
  fakeSequenceStarted = false;
  bodyTypingActive = false;
  bodyCompleteCallback = null;
  bodyCompleteDone = false;

  inputPanel.classList.remove("input-shake");
  inputPanel.classList.remove("input-blue");
  nameInput.classList.remove("input-shake");

  gameStage.classList.remove("is-typing-name");

  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;
  blockClickAfterNameClose = false;

  videoRevealWaiting = false;
  videoSkipHandler = null;

  dialogueAdvanceActive = false;
  dialogueAdvanceSceneId = null;
}

function startSceneTextSequence(scene) {
  if (scene.type === "ending") {
    startEndingSequence(scene);
    return;
  }

  if (hasSceneDialogue(scene)) {
    showSceneDialogueFirst(scene);
    return;
  }

  startBodyChoiceSequence(scene);
}

function startEndingSequence(scene) {
  const delay = scene.endingIntroDelay ?? 2300;

  setTimeout(() => {
    if (currentSceneId !== scene.id || !hasStarted) return;

    if (hasSceneDialogue(scene)) {
      showSceneDialogueFirst(scene);
      return;
    }

    startBodyChoiceSequence(scene);
  }, delay);
}

function hasSceneDialogue(scene) {
  return Boolean((scene.speaker || scene.dialogue) && scene.endingType !== "fake");
}

function showSceneDialogueFirst(scene) {
  dialogueAdvanceActive = true;
  dialogueAdvanceSceneId = scene.id;

  renderDialogue(scene, true);
}

function advanceDialogueToBody() {
  if (!dialogueAdvanceActive) return false;

  const scene = getScene(dialogueAdvanceSceneId);

  if (!scene) {
    dialogueAdvanceActive = false;
    dialogueAdvanceSceneId = null;
    hideDialogueBox();
    return false;
  }

  hideDialogueBox();
  startBodyChoiceSequence(scene);

  return true;
}

function hideDialogueBox() {
  dialogueAdvanceActive = false;
  dialogueAdvanceSceneId = null;

  dialogueBox.classList.remove("dialogue-reveal");
  dialogueBox.classList.remove("dialogue-awaiting");
  dialogueBox.classList.add("hidden");

  speakerName.textContent = "";
  dialogueText.innerHTML = "";
}

function startBodyChoiceSequence(scene) {
  renderBody(scene, () => {
    setTimeout(() => {
      if (currentSceneId !== scene.id || !hasStarted) return;

      const shouldShowChoices =
        scene.type !== "ending" ||
        scene.endingType === "linked" ||
        scene.endingType === "terminal";

      if (shouldShowChoices) {
        renderChoices(scene);
      } else {
        choiceBox.classList.remove("choice-ink-reveal");
        choiceBox.innerHTML = "";
      }
    }, 450);
  });
}

function resetBodyAutoFollow() {
  bodyAutoFollowEnabled = true;
  bodyAutoFollowTarget = null;
  bodyScrollTargetTop = 0;

  if (bodyAutoFollowFrame) {
    cancelAnimationFrame(bodyAutoFollowFrame);
    bodyAutoFollowFrame = null;
  }

  if (bodyScrollFollowFrame) {
    cancelAnimationFrame(bodyScrollFollowFrame);
    bodyScrollFollowFrame = null;
  }
}

function pauseBodyAutoFollow() {
  bodyAutoFollowEnabled = false;
  bodyAutoFollowTarget = null;
  bodyScrollTargetTop = bodyBox.scrollTop;

  if (bodyAutoFollowFrame) {
    cancelAnimationFrame(bodyAutoFollowFrame);
    bodyAutoFollowFrame = null;
  }

  if (bodyScrollFollowFrame) {
    cancelAnimationFrame(bodyScrollFollowFrame);
    bodyScrollFollowFrame = null;
  }
}

function requestBodyAutoFollow(targetLine, force = false) {
  if (!force && !bodyAutoFollowEnabled) return;
  if (!targetLine) return;
  if (bodyBox.classList.contains("hidden")) return;

  bodyAutoFollowTarget = targetLine;

  if (bodyAutoFollowFrame) return;

  bodyAutoFollowFrame = requestAnimationFrame(() => {
    bodyAutoFollowFrame = null;

    if (!force && !bodyAutoFollowEnabled) return;
    if (!bodyAutoFollowTarget) return;

    const boxRect = bodyBox.getBoundingClientRect();
    const lineRect = bodyAutoFollowTarget.getBoundingClientRect();
    const bottomSafeArea = 58;

    const overBottom = lineRect.bottom - (boxRect.bottom - bottomSafeArea);

    if (overBottom > 0) {
      smoothBodyScrollTo(bodyBox.scrollTop + overBottom);
    }
  });
}

function smoothBodyScrollTo(targetTop) {
  const maxScrollTop = Math.max(0, bodyBox.scrollHeight - bodyBox.clientHeight);

  bodyScrollTargetTop = Math.min(targetTop, maxScrollTop);

  if (bodyScrollFollowFrame) return;

  const follow = () => {
    const current = bodyBox.scrollTop;
    const diff = bodyScrollTargetTop - current;
    const ease = 0.09;

    if (Math.abs(diff) < 0.45) {
      bodyBox.scrollTop = bodyScrollTargetTop;
      bodyScrollFollowFrame = null;
      return;
    }

    bodyBox.scrollTop = current + diff * ease;
    bodyScrollFollowFrame = requestAnimationFrame(follow);
  };

  bodyScrollFollowFrame = requestAnimationFrame(follow);
}

function clearBodyTypingTimers() {
  bodyCharTimers.forEach(timer => clearTimeout(timer));
  bodyCharTimers = [];
}

function finishBodyReveal() {
  if (bodyCompleteDone) return;

  bodyCompleteDone = true;
  bodyTypingActive = false;
  bodyRevealDone = true;

  const callback = bodyCompleteCallback;
  bodyCompleteCallback = null;

  if (typeof callback === "function") {
    callback();
  }
}

function revealAllBodyChars() {
  if (!bodyTypingActive) return;

  clearBodyTypingTimers();

  bodyBox.querySelectorAll(".novel-char").forEach(char => {
    char.classList.add("visible");
  });

  bodyBox.querySelectorAll(".body-line").forEach(line => {
    line.classList.add("visible");
  });

  const scene = getScene(currentSceneId);

  if (scene?.endingType === "fake" && scene.skipFakeStrike !== true) {
  bodyBox.querySelectorAll(".body-line:not(.empty)").forEach((line, index) => {
    line.style.setProperty("--strike-delay", `${index * 90}ms`);
    line.classList.add("fake-line-strike");
  });
}

  const lastLine = bodyBox.querySelector(".body-line:last-child");
  requestBodyAutoFollow(lastLine, true);

  finishBodyReveal();
}

function renderSceneTitle(scene) {
  sceneTitle.classList.remove("hidden");
  sceneTitle.textContent = scene.title || "";
}

function renderEndingBadge(scene) {
  if (scene.type !== "ending") {
    endingBadge.classList.add("hidden");
    endingBadge.innerHTML = "";
    return;
  }

  endingBadge.classList.remove("hidden");

  const label = scene.endingIndexText || "ENDING";

  endingBadge.innerHTML = `
    <span class="ending-badge-label">${escapeHtml(label)}</span>
  `;
}

function renderBody(scene, onComplete) {
  clearBodyTypingTimers();

  bodyRevealDone = false;
  fakeSequenceStarted = false;
  bodyTypingActive = true;
  bodyCompleteDone = false;
  bodyCompleteCallback = onComplete;

  bodyBox.classList.remove("hidden");
  bodyBox.classList.remove("fake-strike");
  bodyBox.innerHTML = "";
  bodyBox.scrollTop = 0;

  resetBodyAutoFollow();

  const bodyContent = document.createElement("div");
  bodyContent.className = "body-scroll-content";
  bodyBox.appendChild(bodyContent);

  const lines = scene.body || [];
  const isFakeEnding = scene.endingType === "fake";
  const shouldStrikeBody = isFakeEnding && scene.skipFakeStrike !== true;

  let lastDelay = 0;

  const bodyStartDelay = 120;
  const charDelay = 28;
  const lineDelay = 260;

  lines.forEach((line, lineIndex) => {
    const div = document.createElement("div");
    div.className = `body-line ${line ? "" : "empty"}`;
    div.style.setProperty("--line-delay", `${lineIndex * 120}ms`);

    if (!line) {
      div.innerHTML = "&nbsp;";
      bodyContent.appendChild(div);

      const emptyLineTimer = setTimeout(() => {
        requestBodyAutoFollow(div);
      }, bodyStartDelay + lineIndex * lineDelay + 80);

      bodyCharTimers.push(emptyLineTimer);
      return;
    }

    let lineLastDelay = 0;
    let charOrder = 0;

    const appendAnimatedChar = (parent, char) => {
      const span = document.createElement("span");
      span.className = "novel-char";

      span.textContent = char === " " ? "\u00A0" : char;

      const randomBlur = 2.5 + Math.random() * 4.5;
      const randomY = 2 + Math.random() * 7;
      const randomOpacity = 0.82 + Math.random() * 0.18;

      const baseDelay = charOrder * charDelay;
      const jitter = Math.random() * 35;
      const delay = bodyStartDelay + lineIndex * lineDelay + baseDelay + jitter;

      span.style.setProperty("--char-delay", `${delay}ms`);
      span.style.setProperty("--char-blur", `${randomBlur}px`);
      span.style.setProperty("--char-y", `${randomY}px`);
      span.style.setProperty("--char-opacity", randomOpacity.toFixed(2));

      parent.appendChild(span);

      const timer = setTimeout(() => {
        span.classList.add("visible");
        requestBodyAutoFollow(div);
      }, delay);

      bodyCharTimers.push(timer);

      lineLastDelay = Math.max(lineLastDelay, delay);
      lastDelay = Math.max(lastDelay, delay);
      charOrder += 1;
    };

    if (isMobilePortrait()) {
      const tokens = line.split(/(\s+)/);

      tokens.forEach(token => {
        if (!token) return;

        if (/^\s+$/.test(token)) {
          div.appendChild(document.createTextNode(" "));
          return;
        }

        const wordSpan = document.createElement("span");
        wordSpan.className = "mobile-word";

        [...token].forEach(char => {
          appendAnimatedChar(wordSpan, char);
        });

        div.appendChild(wordSpan);
      });
    } else {
      [...line].forEach(char => {
        appendAnimatedChar(div, char);
      });
    }

    bodyContent.appendChild(div);

    if (shouldStrikeBody) {
  const strikeTimer = setTimeout(() => {
    div.style.setProperty("--strike-delay", "0ms");
    div.classList.add("fake-line-strike");
  }, lineLastDelay + 420);

  bodyCharTimers.push(strikeTimer);
  }
 });
  const lineTimer = setTimeout(() => {
    bodyBox.querySelectorAll(".body-line").forEach(line => {
      line.classList.add("visible");
    });
  }, 80);

  bodyCharTimers.push(lineTimer);

  const completeTimer = setTimeout(() => {
    finishBodyReveal();

    const shouldShowEndingOverlay =
      scene.endingType === "fake" ||
      scene.afterEndingOverlay === true;

    if (shouldShowEndingOverlay) {
      const autoFakeTimer = setTimeout(() => {
        if (currentSceneId !== scene.id || !hasStarted) return;
        if (fakeSequenceStarted) return;

        startFakeSequence(scene);
      }, scene.fakeAutoDelay ?? scene.afterEndingDelay ?? 650);

      fakeTimers.push(autoFakeTimer);
    }
  }, lastDelay + 780);

  bodyCharTimers.push(completeTimer);
}

function renderChoices(scene) {
  choiceBox.classList.remove("choice-ink-reveal");
  choiceBox.innerHTML = "";

  (scene.choices || []).forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.style.setProperty("--choice-delay", `${index * 180}ms`);

    const text = `${index + 1}. ${choice.label}`;

    button.innerHTML = `
      <span class="choice-label">
        ${createChoiceTextSpans(text, index)}
      </span>
    `;

    if (choice.action === "disabled") {
      button.classList.add("disabled");
    }

    button.addEventListener("click", () => {
      unlockAudio();
      handleChoice(choice, index);
    });

    choiceBox.appendChild(button);
  });

  if ((scene.choices || []).length > 0) {
    requestAnimationFrame(() => {
      choiceBox.classList.add("choice-ink-reveal");
    });
  }
}

function createChoiceTextSpans(text, choiceIndex) {
  return [...text].map((char, charIndex) => {
    const safeChar = char === " " ? "&nbsp;" : escapeHtml(char);

    const delay = choiceIndex * 180 + charIndex * 28 + Math.random() * 45;
    const blur = 2.5 + Math.random() * 3.5;
    const y = 2 + Math.random() * 5;
    const opacity = 0.86 + Math.random() * 0.14;

    return `
      <span
        class="choice-char"
        style="
          --choice-char-delay:${delay}ms;
          --choice-char-blur:${blur}px;
          --choice-char-y:${y}px;
          --choice-char-opacity:${opacity.toFixed(2)};
        "
      >${safeChar}</span>
    `;
  }).join("");
}

function renderDialogue(scene, waitForClick = false) {
  dialogueBox.classList.remove("dialogue-reveal");
  dialogueBox.classList.remove("dialogue-awaiting");

  if ((!scene.dialogue && !scene.speaker) || scene.endingType === "fake") {
    dialogueBox.classList.add("hidden");
    speakerName.textContent = "";
    dialogueText.innerHTML = "";
    return;
  }

  dialogueBox.classList.remove("hidden");
  speakerName.textContent = scene.speaker || "";
  dialogueText.innerHTML = createDialogueTextSpans(scene.dialogue || "");

  requestAnimationFrame(() => {
    dialogueBox.classList.add("dialogue-reveal");

    if (waitForClick) {
      dialogueBox.classList.add("dialogue-awaiting");
    }
  });
}

function createDialogueTextSpans(text) {
  let charIndex = 0;

  return [...String(text)].map(char => {
    if (char === "\n") {
      return "<br>";
    }

    const safeChar = char === " " ? "&nbsp;" : escapeHtml(char);

    const delay = charIndex * 34 + Math.random() * 45;
    const blur = 2.5 + Math.random() * 3.5;
    const y = 2 + Math.random() * 5;
    const opacity = 0.88 + Math.random() * 0.12;

    charIndex += 1;

    return `<span class="dialogue-char" style="--dialogue-char-delay:${delay}ms; --dialogue-char-blur:${blur}px; --dialogue-char-y:${y}px; --dialogue-char-opacity:${opacity.toFixed(2)};">${safeChar}</span>`;
  }).join("");
}

function handleChoice(choice, selectedIndex) {
  if (choice.action === "disabled") {
    showToast(choice.message || "아직 선택할 수 없습니다.");
    return;
  }

  if (choice.action === "go") {
    goToScene(choice.target, choice, selectedIndex);
    return;
  }

  if (choice.action === "input") {
    openInput(choice, selectedIndex);
    return;
  }

  if (choice.action === "back") {
    goBack();
    return;
  }

  if (choice.action === "restart") {
    openRestartConfirm();
  }
}

function goToScene(targetId, choice, selectedIndex) {
  const currentScene = getScene(currentSceneId);
  const targetScene = getScene(targetId);

  if (!targetScene) {
    showToast(`연결된 장면을 찾을 수 없습니다: ${targetId}`);
    return;
  }

  historyStack.push(currentSceneId);

  routeRecords.push({
    fromSceneId: currentSceneId,
    fromTitle: getDisplayTitle(currentScene),
    fromPov: currentScene.pov,
    selectedLabel: choice.label,
    selectedIndex,
    allChoices: getRouteChoices(currentScene),
    targetSceneId: targetId
  });

  currentSceneId = targetId;
  renderScene();
}

function openInput(choice, selectedIndex) {
  pendingInputChoice = { choice, selectedIndex };
  nameFailCount = 0;

  openNameInputPanel();
}

function openNameInputPanel() {
  inputPanel.classList.remove("hidden");
  inputPanel.classList.remove("input-shake");
  inputPanel.classList.remove("input-blue");
  nameInput.classList.remove("input-shake");

  gameStage.classList.add("is-typing-name");

  if (hasStarted) {
    gameStage.classList.add("started");
  }

  isNameInputOpen = true;
  ignoreNameInputOutsideClose = true;
  blockClickAfterNameClose = false;

  nameInput.value = "";

  syncMobileVisualViewport();

  setTimeout(() => {
    if (!isMobilePortrait()) {
      nameInput.focus();
    }

    syncMobileVisualViewport();
    ignoreNameInputOutsideClose = false;
  }, 120);
}

function closeNameInputPanel({ clearPending = false } = {}) {
  inputPanel.classList.add("hidden");
  inputPanel.classList.remove("input-shake");
  inputPanel.classList.remove("input-blue");
  nameInput.classList.remove("input-shake");

  nameInput.value = "";
  nameInput.blur();

  gameStage.classList.remove("is-typing-name");

  if (clearPending) {
    pendingInputChoice = null;
  }

  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;

  if (hasStarted) {
    gameStage.classList.add("started");
  }

  syncMobileVisualViewport();
  restoreMobileViewportAfterInput();
}

function submitName() {
  unlockAudio();

  const answer = normalizeAnswer(nameInput.value);

  if (isCorrectName(answer)) {
    nameFailCount = 0;

    const choice = pendingInputChoice?.choice || { label: "이름을 말한다." };
    const selectedIndex = pendingInputChoice?.selectedIndex ?? 1;

    closeNameInputPanel({ clearPending: false });

    goToScene("END_LILY", choice, selectedIndex);
    return;
  }

  nameFailCount += 1;
  handleWrongName();
}

function handleWrongName() {
  nameInput.value = "";

  if (nameFailCount === 1) {
    shakeNameInput();
    showToast("아직 그 이름을 알지 못합니다.");
    return;
  }

  if (nameFailCount === 2) {
    inputPanel.classList.add("input-blue");
    shakeNameInput();
    showToast("이름이 멀어지고 있습니다.");
    return;
  }

  showNamePunishOverlay();
}

function shakeNameInput() {
  inputPanel.classList.remove("input-shake");
  nameInput.classList.remove("input-shake");

  void inputPanel.offsetWidth;

  if (isMobilePortrait()) {
    inputPanel.classList.add("input-shake");

    setTimeout(() => {
      inputPanel.classList.remove("input-shake");
    }, 430);

    return;
  }

  inputPanel.classList.add("input-shake");
  nameInput.classList.add("input-shake");

  setTimeout(() => {
    inputPanel.classList.remove("input-shake");
    nameInput.classList.remove("input-shake");
  }, 520);
}

function showNamePunishOverlay() {
  namePunishOverlay.classList.remove("hidden");
  namePunishOverlay.classList.remove("name-punish-show");

  namePunishText.textContent = "돌아가!";

  namePunishVideo.pause();
  namePunishVideo.src = NAME_PUNISH_VIDEO_SRC;
  namePunishVideo.currentTime = 0;
  namePunishVideo.load();

  requestAnimationFrame(() => {
    namePunishOverlay.classList.add("name-punish-show");
  });

  namePunishVideo.play().catch(() => {});
}

function returnToTitleFromNamePunish() {
  namePunishVideo.pause();
  namePunishVideo.removeAttribute("src");
  namePunishVideo.load();

  namePunishOverlay.classList.add("hidden");
  namePunishOverlay.classList.remove("name-punish-show");

  nameFailCount = 0;
  pendingInputChoice = null;
  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;
  blockClickAfterNameClose = false;

  inputPanel.classList.add("hidden");
  inputPanel.classList.remove("input-shake");
  inputPanel.classList.remove("input-blue");
  nameInput.classList.remove("input-shake");
  nameInput.value = "";

  currentSceneId = "SIN01";
  historyStack = [];
  routeRecords = [];
  hasStarted = false;

  renderScene();
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase();
}

function isCorrectName(answer) {
  return CORRECT_NAMES.some(correct => correct.toLowerCase() === answer);
}

function goBack() {
  if (historyStack.length === 0) {
    showToast("이전 장면이 없습니다.");
    return;
  }

  currentSceneId = historyStack.pop();
  routeRecords.pop();
  renderScene();
}

function openRestartConfirm() {
  confirmModal.classList.remove("hidden");
}

function closeRestartConfirm() {
  confirmModal.classList.add("hidden");
}

function restartGame() {
  currentSceneId = "SIN01";
  historyStack = [];
  routeRecords = [];
  hasStarted = false;

  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;
  blockClickAfterNameClose = false;

  closeRestartConfirm();
  renderScene();
}

function clearFakeTimers() {
  fakeTimers.forEach(timer => clearTimeout(timer));
  fakeTimers = [];

  clearTimeout(videoRevealTimer);
}

function resetFakeEffect() {
  bodyBox.classList.remove("fake-strike");

  bodyBox.querySelectorAll(".fake-line-strike").forEach(line => {
    line.classList.remove("fake-line-strike");
  });

  fakeEndingOverlay.classList.add("hidden");
  fakeEndingOverlay.classList.remove("show-word");
  fakeEndingOverlay.classList.remove("show-dialogue");

  fakeWord.textContent = "";
  fakeSpeaker.textContent = "";
  fakeDialogue.innerHTML = "";

  bodyRevealDone = false;
  fakeSequenceStarted = false;
}

function closeFakeEndingOverlay() {
  clearFakeTimers();

  fakeEndingOverlay.classList.add("hidden");
  fakeEndingOverlay.classList.remove("show-word");
  fakeEndingOverlay.classList.remove("show-dialogue");

  fakeWord.textContent = "";
  fakeSpeaker.textContent = "";
  fakeDialogue.innerHTML = "";
}

function startFakeSequence(scene, fast = false) {
  if (fakeSequenceStarted) return;

  fakeSequenceStarted = true;

  const shouldStrikeBody = scene.skipFakeStrike !== true;

  const lines = shouldStrikeBody
    ? [...bodyBox.querySelectorAll(".body-line:not(.empty)")]
    : [];

  const pendingLines = lines.filter(line => {
    return !line.classList.contains("fake-line-strike");
  });

  const strikeGap = fast ? 35 : 120;

  pendingLines.forEach((line, index) => {
    line.style.setProperty("--strike-delay", `${index * strikeGap}ms`);
    line.classList.add("fake-line-strike");
  });

  const waitTime = pendingLines.length > 0
    ? pendingLines.length * strikeGap + (fast ? 160 : 760)
    : (fast ? 120 : 420);

  const wordTimer = setTimeout(() => {
    fakeEndingOverlay.classList.remove("hidden");
    fakeEndingOverlay.classList.add("show-word");

    fakeWord.textContent = scene.fakeWord || "거짓말.";
    fakeSpeaker.textContent = scene.fakeSpeaker || scene.speaker || "그녀";
    fakeDialogue.innerHTML = "";
  }, waitTime);

  const dialogueTimer = setTimeout(() => {
    fakeEndingOverlay.classList.add("show-dialogue");

    const dialogue =
      scene.fakeDialogue ??
      scene.dialogue ??
      "";

    revealFakeDialogueLines(dialogue, fast);
  }, waitTime + (fast ? 420 : 1200));

  fakeTimers.push(wordTimer, dialogueTimer);
}

function revealFakeDialogueLines(dialogue, fast = false) {
  fakeDialogue.innerHTML = "";

  const lines = String(dialogue).split("\n");
  const lineDelay = fast ? 130 : 650;

  lines.forEach(line => {
    const div = document.createElement("div");
    div.className = `fake-dialogue-line ${line.trim() ? "" : "empty"}`;
    div.textContent = line || " ";
    fakeDialogue.appendChild(div);
  });

  [...fakeDialogue.querySelectorAll(".fake-dialogue-line")].forEach((line, index) => {
    const timer = setTimeout(() => {
      line.classList.add("visible");
    }, index * lineDelay);

    fakeTimers.push(timer);
  });
}

function updateVideoPauseButton() {
  if (!videoPauseBtn) return;

  videoPauseBtn.textContent = isVideoPaused ? "재생" : "정지";

  videoPauseBtn.setAttribute(
    "aria-label",
    isVideoPaused ? "영상 재생" : "영상 일시정지"
  );

  videoPauseBtn.classList.toggle("video-paused", isVideoPaused);
}

function setVideoPaused(paused) {
  isVideoPaused = paused;

  if (bgVideo) {
    if (isVideoPaused) {
      bgVideo.pause();
    } else if (bgVideo.src) {
      bgVideo.play().catch(() => {});
    }
  }

  updateVideoPauseButton();
}

function toggleVideoPause() {
  setVideoPaused(!isVideoPaused);
}

function renderVideo(src, shouldLoop = true, waitFirstPlay = true, onReveal = null, scene = null) {
  if (!src) {
    if (typeof onReveal === "function") {
      onReveal();
    }

    return;
  }

  clearTimeout(videoRevealTimer);

  videoRevealWaiting = false;
  videoSkipHandler = null;

  videoRenderToken += 1;

  const token = videoRenderToken;

  let revealed = false;

  const revealContent = () => {
    if (revealed) return;
    if (token !== videoRenderToken) return;

    revealed = true;
    videoRevealWaiting = false;
    videoSkipHandler = null;

    clearTimeout(videoRevealTimer);

    if (typeof onReveal === "function") {
      onReveal();
    }
  };

  if (waitFirstPlay && typeof onReveal === "function") {
    videoRevealWaiting = true;
    videoSkipHandler = revealContent;
  }

  const stopAtLastFrame = video => {
    if (!video) return;

    video.pause();

    if (Number.isFinite(video.duration) && video.duration > 0) {
      try {
        video.currentTime = Math.max(0, video.duration - 0.05);
      } catch {}
    }
  };

  const startLoopAgain = video => {
    if (!video) return;

    video.loop = true;

    try {
      video.currentTime = 0;
    } catch {}

    video.play().catch(() => {});
  };

const setupVideo = (video, isMainVideo) => {
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("autoplay", "");

  video.onended = null;
  video.onerror = null;

    video.loop = waitFirstPlay ? false : shouldLoop;

    if (video.dataset.src !== src) {
      video.dataset.src = src;
      video.src = src;
      video.load();
    }

    try {
      video.currentTime = 0;
    } catch {}

    video.onended = () => {
      if (token !== videoRenderToken) return;

      if (waitFirstPlay) {
        if (shouldLoop) {
          startLoopAgain(video);
        } else {
          video.loop = false;
          stopAtLastFrame(video);
        }

        if (isMainVideo) {
          revealContent();
        }

        return;
      }

      if (!shouldLoop) {
        video.loop = false;
        stopAtLastFrame(video);
      }
    };

   video.onerror = () => {
  console.error("비디오 로드 실패:", src, video.error);

  if (isMainVideo) {
    revealContent();
  }
};
    video.play().catch(() => {
      if (isMainVideo) {
        revealContent();
      }
    });
  };

  setupVideo(bgVideo, true);

  if (!waitFirstPlay) {
    revealContent();
    return;
  }

  const setRevealTimer = () => {
    if (token !== videoRenderToken) return;
    if (!bgVideo) return;

    const delay = getRevealDelay(bgVideo, scene);

    clearTimeout(videoRevealTimer);

    videoRevealTimer = setTimeout(() => {
      if (token !== videoRenderToken) return;
      revealContent();
    }, delay);
  };

  if (Number.isFinite(bgVideo.duration) && bgVideo.duration > 0) {
    setRevealTimer();
  } else {
    bgVideo.addEventListener("loadedmetadata", setRevealTimer, { once: true });
  }
}

function getRevealDelay(video, scene) {
  const duration = Number.isFinite(video.duration) ? video.duration : 0;

  if (!duration) return 0;

  if (scene?.revealAtSec != null) {
    return Math.max(0, scene.revealAtSec * 1000);
  }

  if (scene?.revealRatio != null) {
    return Math.max(0, duration * scene.revealRatio * 1000);
  }

  const beforeEnd = scene?.revealBeforeEnd ?? 2.0;
  return Math.max(0, (duration - beforeEnd) * 1000);
}

function changeBgm(src) {
  if (!src) return;

  if (!audioUnlocked) return;
  if (activeBgmSrc === src) return;

  fadeAudioTo(0, 250, () => {
    bgmAudio.src = src;
    activeBgmSrc = src;
    bgmAudio.volume = 0;

    bgmAudio.play()
      .then(() => fadeAudioTo(0.72, 500))
      .catch(() => {});
  });
}

function fadeAudioTo(targetVolume, duration, callback) {
  const startVolume = bgmAudio.volume || 0;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    bgmAudio.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(step);
}

function unlockAudio() {
  if (audioUnlocked) return;

  audioUnlocked = true;

  const scene = hasStarted ? getScene(currentSceneId) : null;
  const src = scene?.bgmSrc || TITLE_SCREEN.bgmSrc;

  changeBgm(src);
}

function getDisplayTitle(scene) {
  if (!scene) return "";
  return scene.title || scene.id;
}

function getRouteChoices(scene) {
  return (scene.choices || [])
    .filter(choice => ["go", "input", "disabled"].includes(choice.action))
    .map(choice => choice.label);
}

function buildRouteMap() {
  routeCanvas.innerHTML = "";

  const startStep = document.createElement("div");
  startStep.className = "route-step";
  startStep.innerHTML = `
    <div class="route-node record route-jump-node" data-route-start="true" title="이름 장면으로 돌아가기">
      <div class="route-title">START</div>
      <strong>이름</strong>
    </div>
  `;
  routeCanvas.appendChild(startStep);

  routeRecords.forEach((record, stepIndex) => {
    const step = document.createElement("div");
    step.className = "route-step";

    const scene = getScene(record.fromSceneId);
    const nodeClass = getRouteNodeClass(scene);

    const choices = record.allChoices.map((label, index) => {
      const selected = index === record.selectedIndex;

      return `
        <span
          class="route-choice ${selected ? "selected" : "ghost"}"
          data-route-jump="${stepIndex}"
          title="${selected ? "이 선택을 다시 고르기 전 장면으로 돌아가기" : ""}"
        >
          ${selected ? "선택" : "미선택"} · ${escapeHtml(label)}
        </span>
      `;
    }).join("");

    step.innerHTML = `
      <div
        class="route-node ${nodeClass} route-jump-node"
        data-route-jump="${stepIndex}"
        title="${escapeHtml(record.fromTitle)} 장면으로 돌아가기"
      >
        <div class="route-title">${stepIndex + 1}. ${escapeHtml(record.fromTitle)}</div>
        ${choices}
      </div>
    `;

    routeCanvas.appendChild(step);
  });

  const currentScene = getScene(currentSceneId);
  const currentStep = document.createElement("div");
  currentStep.className = "route-step";
  currentStep.innerHTML = `
    <div class="route-node ${getRouteNodeClass(currentScene)} current-route-node">
      <div class="route-title">현재</div>
      <strong>${escapeHtml(getDisplayTitle(currentScene))}</strong>
    </div>
  `;
  routeCanvas.appendChild(currentStep);
}

function jumpToRouteStep(stepIndex) {
  const record = routeRecords[stepIndex];

  if (!record) {
    showToast("이동할 루트를 찾을 수 없습니다.");
    return;
  }

  const targetSceneId = record.fromSceneId;
  const targetScene = getScene(targetSceneId);

  if (!targetScene) {
    showToast(`장면을 찾을 수 없습니다: ${targetSceneId}`);
    return;
  }

  routeRecords = routeRecords.slice(0, stepIndex);
  historyStack = routeRecords.map(record => record.fromSceneId);

  currentSceneId = targetSceneId;
  hasStarted = true;

  closeRouteModal();
  renderScene();

  showToast(`${getDisplayTitle(targetScene)} 장면으로 돌아갔습니다.`);
}

function jumpToRouteStart() {
  currentSceneId = "SIN01";
  historyStack = [];
  routeRecords = [];
  hasStarted = true;

  closeRouteModal();
  renderScene();

  showToast("이름 장면으로 돌아갔습니다.");
}

function openRouteModal() {
  buildRouteMap();
  routeModal.classList.remove("hidden");
}

function closeRouteModal() {
  routeModal.classList.add("hidden");
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove("hidden");

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openSaveModal() {
  renderSaveSlots();
  saveModal.classList.remove("hidden");
}

function closeSaveModal() {
  saveModal.classList.add("hidden");
}

function getSaveKey(slot) {
  return `sealed-one-save-${slot}`;
}

function saveSlot(slot) {
  const titleInput = document.querySelector(`[data-slot-title="${slot}"]`);
  const customTitle = titleInput ? titleInput.value.trim() : "";

  const data = {
    slotTitle: customTitle || `저장 슬롯 ${slot}`,
    currentSceneId,
    historyStack: [...historyStack],
    routeRecords: JSON.parse(JSON.stringify(routeRecords)),
    hasStarted,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem(getSaveKey(slot), JSON.stringify(data));
  renderSaveSlots();
  showToast(`저장 슬롯 ${slot}에 저장했습니다.`);
}

function deleteSlot(slot) {
  const raw = localStorage.getItem(getSaveKey(slot));

  if (!raw) {
    showToast("초기화할 저장 데이터가 없습니다.");
    return;
  }

  localStorage.removeItem(getSaveKey(slot));
  renderSaveSlots();
  showToast(`저장 슬롯 ${slot}을 초기화했습니다.`);
}

function loadSlot(slot) {
  const raw = localStorage.getItem(getSaveKey(slot));

  if (!raw) {
    showToast("불러올 저장 데이터가 없습니다.");
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (!data.currentSceneId || !getScene(data.currentSceneId)) {
      showToast("저장 데이터의 장면을 찾을 수 없습니다.");
      return;
    }

    currentSceneId = data.currentSceneId;
    historyStack = Array.isArray(data.historyStack) ? data.historyStack : [];
    routeRecords = Array.isArray(data.routeRecords) ? data.routeRecords : [];
    hasStarted = data.hasStarted ?? true;

    closeSaveModal();
    renderScene();
    showToast(`저장 슬롯 ${slot}을 불러왔습니다.`);
  } catch {
    showToast("저장 데이터를 불러오지 못했습니다.");
  }
}

function renderSaveSlots() {
  slotList.innerHTML = "";

  for (let slot = 1; slot <= 3; slot += 1) {
    const raw = localStorage.getItem(getSaveKey(slot));

    let slotTitle = `저장 슬롯 ${slot}`;
    let info = "비어 있음";
    let hasSave = false;

    if (raw) {
      try {
        const data = JSON.parse(raw);
        const scene = getScene(data.currentSceneId);
        const title = scene ? getDisplayTitle(scene) : data.currentSceneId;

        slotTitle = data.slotTitle || `저장 슬롯 ${slot}`;
        info = `${title} · ${formatDate(data.savedAt)}`;
        hasSave = true;
      } catch {
        slotTitle = `저장 슬롯 ${slot}`;
        info = "손상된 저장 데이터";
        hasSave = true;
      }
    }

    const slotEl = document.createElement("div");
    slotEl.className = `slot ${hasSave ? "has-save" : "empty-save"}`;

    slotEl.innerHTML = `
      <input
        class="slot-title-input"
        data-slot-title="${slot}"
        value="${escapeHtml(slotTitle)}"
        placeholder="저장 슬롯 ${slot}"
        maxlength="18"
      />

      <div class="slot-info">${escapeHtml(info)}</div>

      <div class="slot-buttons">
        <button type="button" data-save="${slot}">저장</button>
        <button type="button" data-load="${slot}" ${hasSave ? "" : "disabled"}>불러오기</button>
        <button type="button" data-delete="${slot}" ${hasSave ? "" : "disabled"}>초기화</button>
      </div>
    `;

    slotList.appendChild(slotEl);
  }

  slotList.querySelectorAll("[data-save]").forEach(button => {
    button.addEventListener("click", () => {
      saveSlot(button.dataset.save);
    });
  });

  slotList.querySelectorAll("[data-load]").forEach(button => {
    button.addEventListener("click", () => {
      loadSlot(button.dataset.load);
    });
  });

  slotList.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => {
      deleteSlot(button.dataset.delete);
    });
  });

  slotList.querySelectorAll(".slot-title-input").forEach(input => {
    input.addEventListener("keydown", event => {
      event.stopPropagation();

      if (event.key === "Enter") {
        input.blur();
      }
    });

    input.addEventListener("click", event => {
      event.stopPropagation();
    });

    input.addEventListener("focus", event => {
      event.target.select();
    });
  });
}

function formatDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function setupRouteDrag() {
  let isDown = false;
  let didDrag = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  const DRAG_THRESHOLD = 8;

  routeViewport.addEventListener("pointerdown", event => {
    isDown = true;
    didDrag = false;

    startX = event.clientX;
    startY = event.clientY;
    scrollLeft = routeViewport.scrollLeft;
    scrollTop = routeViewport.scrollTop;

    try {
      routeViewport.setPointerCapture(event.pointerId);
    } catch {}
  });

  routeViewport.addEventListener("pointermove", event => {
    if (!isDown) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      didDrag = true;
    }

    routeViewport.scrollLeft = scrollLeft - dx;
    routeViewport.scrollTop = scrollTop - dy;
  });

  routeViewport.addEventListener("pointerup", event => {
    if (!isDown) return;

    const wasDrag = didDrag;
    isDown = false;

    try {
      routeViewport.releasePointerCapture(event.pointerId);
    } catch {}

    if (wasDrag) return;

    const target = document.elementFromPoint(event.clientX, event.clientY);
    handleRouteJumpTarget(target);
  });

  routeViewport.addEventListener("pointercancel", event => {
    isDown = false;

    try {
      routeViewport.releasePointerCapture(event.pointerId);
    } catch {}
  });
}

function handleRouteJumpTarget(target) {
  if (!target) return;

  const startNode = target.closest("[data-route-start]");

  if (startNode && routeCanvas.contains(startNode)) {
    jumpToRouteStart();
    return;
  }

  const jumpTarget = target.closest("[data-route-jump]");

  if (!jumpTarget || !routeCanvas.contains(jumpTarget)) return;

  const stepIndex = Number(jumpTarget.dataset.routeJump);

  if (!Number.isInteger(stepIndex)) {
    showToast("루트 이동 정보를 읽지 못했습니다.");
    return;
  }

  jumpToRouteStep(stepIndex);
}

function stopNameCloseEvent(event) {
  event.preventDefault();
  event.stopPropagation();

  if (typeof event.stopImmediatePropagation === "function") {
    event.stopImmediatePropagation();
  }
}

function handleNameInputOutsidePointer(event) {
  if (!isMobilePortrait()) return;

  if (!isNameInputOpen) return;
  if (inputPanel.classList.contains("hidden")) return;
  if (ignoreNameInputOutsideClose) return;

  if (event.target.closest("#inputPanel")) return;

  if (event.target.closest(".top-controls")) return;

  if (
    event.target.closest(".modal") ||
    event.target.closest("#fakeEndingOverlay") ||
    event.target.closest("#namePunishOverlay")
  ) {
    return;
  }

  closeNameInputPanel({ clearPending: true });

  blockClickAfterNameClose = true;
  suppressNextStageClick = true;

  setTimeout(() => {
    blockClickAfterNameClose = false;
    suppressNextStageClick = false;
  }, 180);

  stopNameCloseEvent(event);
}

function handleNameInputBlockedClick(event) {
  if (!blockClickAfterNameClose) return;

  stopNameCloseEvent(event);
}

document.addEventListener("contextmenu", event => {
  event.preventDefault();
});

document.addEventListener("dragstart", event => {
  event.preventDefault();
});

document.addEventListener("pointerdown", handleNameInputOutsidePointer, true);
document.addEventListener("touchstart", handleNameInputOutsidePointer, true);
document.addEventListener("click", handleNameInputBlockedClick, true);

bodyBox.addEventListener("wheel", pauseBodyAutoFollow, { passive: true });
bodyBox.addEventListener("touchstart", pauseBodyAutoFollow, { passive: true });

if (videoPauseBtn) {
  videoPauseBtn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    toggleVideoPause();
  });
}

document.addEventListener("keydown", event => {
  if (event.code !== "Space") return;

  const activeTag = document.activeElement?.tagName?.toLowerCase();

  if (
    activeTag === "input" ||
    activeTag === "textarea" ||
    document.activeElement?.isContentEditable
  ) {
    return;
  }

  event.preventDefault();
  toggleVideoPause();
});

gameStage.addEventListener("click", event => {
  if (suppressNextStageClick) {
    suppressNextStageClick = false;
    return;
  }

  if (!hasStarted) return;

  if (event.target.closest("button")) return;
  if (event.target.closest("input")) return;
  if (event.target.closest("#routeModal")) return;
  if (event.target.closest("#saveModal")) return;
  if (event.target.closest("#confirmModal")) return;
  if (event.target.closest("#fakeEndingOverlay")) return;
  if (event.target.closest("#namePunishOverlay")) return;

  if (videoRevealWaiting && typeof videoSkipHandler === "function") {
    videoSkipHandler();
    return;
  }

  if (dialogueAdvanceActive) {
    advanceDialogueToBody();
    return;
  }

  const scene = getScene(currentSceneId);

  if (scene?.endingType === "fake") {
    if (bodyTypingActive) {
      revealAllBodyChars();

      setTimeout(() => {
        if (currentSceneId !== scene.id || !hasStarted) return;
        if (fakeSequenceStarted) return;

        startFakeSequence(scene, true);
      }, 80);

      return;
    }

    if (bodyRevealDone && !fakeSequenceStarted) {
      startFakeSequence(scene, true);
      return;
    }
  }

  revealAllBodyChars();
});

startGameBtn.addEventListener("click", () => {
  hasStarted = true;
  renderScene();
  unlockAudio();
});

nameSubmitBtn.addEventListener("click", submitName);

nameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    submitName();
  }
});

nameInput.addEventListener("focus", () => {
  if (isMobilePortrait()) {
    syncMobileVisualViewport();

    if (isNameInputOpen) {
      gameStage.classList.add("is-typing-name");

      if (hasStarted) {
        gameStage.classList.add("started");
      }
    }

    return;
  }

  gameStage.classList.add("is-typing-name");
});

nameInput.addEventListener("blur", () => {
  if (isMobilePortrait()) {
    restoreMobileViewportAfterInput();
    return;
  }

  gameStage.classList.remove("is-typing-name");
});

routeBtn.addEventListener("click", () => {
  unlockAudio();
  openRouteModal();
});

routeCloseBtn.addEventListener("click", closeRouteModal);

routeModal.addEventListener("click", event => {
  if (event.target === routeModal) {
    closeRouteModal();
  }
});

backBtn.addEventListener("click", () => {
  unlockAudio();
  goBack();
});

homeBtn.addEventListener("click", () => {
  unlockAudio();
  openRestartConfirm();
});

cancelRestartBtn.addEventListener("click", closeRestartConfirm);
confirmRestartBtn.addEventListener("click", restartGame);

confirmModal.addEventListener("click", event => {
  if (event.target === confirmModal) {
    closeRestartConfirm();
  }
});

saveBtn.addEventListener("click", () => {
  unlockAudio();
  openSaveModal();
});

saveCloseBtn.addEventListener("click", closeSaveModal);

saveModal.addEventListener("click", event => {
  if (event.target === saveModal) {
    closeSaveModal();
  }
});

fakeCloseBtn.addEventListener("click", event => {
  event.preventDefault();
  event.stopPropagation();
  closeFakeEndingOverlay();
});

fakeEndingOverlay.addEventListener("click", event => {
  event.preventDefault();
  closeFakeEndingOverlay();
});

namePunishOverlay.addEventListener("click", event => {
  event.preventDefault();
  event.stopPropagation();
  returnToTitleFromNamePunish();
});

function setMobileVideoPan(percent) {
  mobileVideoPanPercent = Math.max(0, Math.min(100, percent));
  gameStage.style.setProperty("--mobile-video-x", `${mobileVideoPanPercent}%`);
}

function setupMobileVideoPan() {
  let panCandidate = false;
  let panLocked = false;
  let panStartY = 0;

  const PAN_THRESHOLD = 10;

  function isPanBlockedTarget(target) {
    return Boolean(
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select") ||
      target.closest(".input-panel") ||
      target.closest(".dialogue-box") ||
      target.closest(".modal") ||
      target.closest("#fakeEndingOverlay") ||
      target.closest("#namePunishOverlay")
    );
  }

  gameStage.addEventListener("pointerdown", event => {
    if (!isMobilePortrait()) return;
    if (!hasStarted) return;
    if (isPanBlockedTarget(event.target)) return;

    panCandidate = true;
    panLocked = false;

    mobileVideoPanning = false;
    mobileVideoPanMoved = false;

    mobileVideoPanStartX = event.clientX;
    panStartY = event.clientY;
    mobileVideoPanStartPercent = mobileVideoPanPercent;
  }, true);

  gameStage.addEventListener("pointermove", event => {
    if (!panCandidate) return;
    if (!isMobilePortrait()) return;

    const dx = event.clientX - mobileVideoPanStartX;
    const dy = event.clientY - panStartY;

    if (!panLocked) {
      if (Math.abs(dx) < PAN_THRESHOLD && Math.abs(dy) < PAN_THRESHOLD) return;

      if (Math.abs(dx) <= Math.abs(dy) * 1.15) {
        panCandidate = false;
        return;
      }

      panLocked = true;
      mobileVideoPanning = true;
      mobileVideoPanMoved = true;
      gameStage.classList.add("video-panning");

      try {
        gameStage.setPointerCapture(event.pointerId);
      } catch {}
    }

    const deltaPercent = -(dx / window.innerWidth) * 120;
    setMobileVideoPan(mobileVideoPanStartPercent + deltaPercent);

    suppressNextStageClick = true;

    event.preventDefault();
    event.stopPropagation();
  }, true);

  gameStage.addEventListener("pointerup", event => {
    if (!panCandidate && !mobileVideoPanning) return;

    panCandidate = false;
    panLocked = false;
    mobileVideoPanning = false;

    gameStage.classList.remove("video-panning");

    try {
      gameStage.releasePointerCapture(event.pointerId);
    } catch {}

    if (mobileVideoPanMoved) {
      suppressNextStageClick = true;

      setTimeout(() => {
        suppressNextStageClick = false;
      }, 80);
    }
  }, true);

  gameStage.addEventListener("pointercancel", event => {
    panCandidate = false;
    panLocked = false;
    mobileVideoPanning = false;

    gameStage.classList.remove("video-panning");

    try {
      gameStage.releasePointerCapture(event.pointerId);
    } catch {}
  }, true);
}

function setupBodyDragScroll() {
  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;
  let moved = false;

  bodyBox.addEventListener("pointerdown", event => {
    if (bodyBox.classList.contains("hidden")) return;

    pauseBodyAutoFollow();

    isDragging = true;
    moved = false;
    startY = event.clientY;
    startScrollTop = bodyBox.scrollTop;

    bodyBox.classList.add("body-dragging");

    try {
      bodyBox.setPointerCapture(event.pointerId);
    } catch {}

    event.stopPropagation();
  });

  bodyBox.addEventListener("pointermove", event => {
    if (!isDragging) return;

    const dy = event.clientY - startY;

    if (Math.abs(dy) > 4) {
      moved = true;
    }

    bodyBox.scrollTop = startScrollTop - dy;

    event.preventDefault();
    event.stopPropagation();
  });

  bodyBox.addEventListener("pointerup", event => {
    if (!isDragging) return;

    isDragging = false;
    bodyBox.classList.remove("body-dragging");

    try {
      bodyBox.releasePointerCapture(event.pointerId);
    } catch {}

    event.stopPropagation();

    if (moved) {
      suppressNextStageClick = true;
      event.preventDefault();

      setTimeout(() => {
        suppressNextStageClick = false;
      }, 0);
    }
  });

  bodyBox.addEventListener("pointercancel", event => {
    isDragging = false;
    bodyBox.classList.remove("body-dragging");

    try {
      bodyBox.releasePointerCapture(event.pointerId);
    } catch {}
  });
}

setupRouteDrag();
setupBodyDragScroll();
setupMobileVisualViewport();
setupMobileVideoPan();
setMobileVideoPan(50);
renderScene();