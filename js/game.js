Object.entries(PC_BODIES).forEach(([sceneId, bodyPc]) => {
  if (SCENES[sceneId]) {
    SCENES[sceneId].bodyPc = bodyPc;
  }
});


let currentSceneId = "SIN01";
let historyStack = [];
let routeRecords = [];
let pendingInputChoice = null;
let toastTimer = null;
let audioUnlocked = false;
let activeBgmSrc = "";
let hasStarted = false;
let fakeTimers = [];
let titleUiRevealTimer = null;
let bodyRevealDone = false;
let fakeSequenceStarted = false;
let activeFakeSceneId = null;
let fakeDialogueRevealDone = false;
let endingBodyHidden = false;
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
let floatingUiRafId = null;
let floatingUiTimerId = null;
let floatingUiRevision = 0;
let viewportUiRefreshTimer = null;

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
function isIosWebKit() {
  const userAgent =
    navigator.userAgent || "";

  const isIphoneOrIpad =
    /iPad|iPhone|iPod/.test(userAgent);

  const isModernIpad =
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1;

  return isIphoneOrIpad || isModernIpad;
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
function applySceneMobileVideoPosition(scene) {
  if (!isMobilePortrait()) {
    setMobileVideoPan(50, { instant: true });
    return;
  }

  const x = Number.isFinite(scene?.mobileVideoX)
    ? scene.mobileVideoX
    : 50;

  setMobileVideoPan(x, { instant: true });
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

setTimeout(() => {
  restore();
  scheduleFloatingUiPositions();
}, 520);
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
  resetEndingBodyVisibility();
  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;
  blockClickAfterNameClose = false;

if (!hasStarted) {
  gameStage.className = "game-stage pov-record";

  applySceneMobileVideoPosition(TITLE_SCREEN);
applyScenePcVideoPosition(TITLE_SCREEN);
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

    armTitleUiReveal();

    syncMobileVisualViewport();
    return;
  }
gameStage.className = `game-stage ${getSceneVisualClass(scene)} started`;

syncMobileVisualViewport();
applySceneMobileVideoPosition(scene);
applyScenePcVideoPosition(scene);
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
function cancelFloatingUiSchedule() {
  floatingUiRevision += 1;

  if (floatingUiRafId !== null) {
    cancelAnimationFrame(floatingUiRafId);
    floatingUiRafId = null;
  }

  if (floatingUiTimerId !== null) {
    clearTimeout(floatingUiTimerId);
    floatingUiTimerId = null;
  }
}

function scheduleFloatingUiPositions() {
  const revision = floatingUiRevision;
  const sceneId = currentSceneId;

  if (floatingUiRafId !== null) {
    cancelAnimationFrame(floatingUiRafId);
  }

  if (floatingUiTimerId !== null) {
    clearTimeout(floatingUiTimerId);
  }

  const updatePositions = () => {
    if (revision !== floatingUiRevision) return;
    if (sceneId !== currentSceneId) return;
    if (!hasStarted) return;

    updateMobileChoicePosition();
    updateFloatingBackButtonPosition();
    positionFakeReplayChoice();
  };

  floatingUiRafId = requestAnimationFrame(() => {
    floatingUiRafId = null;
    updatePositions();
  });

  /*
    아이폰 Safari의 키보드·주소창·웹폰트 재배치가
    끝난 뒤 최종 위치를 한 번 더 계산
  */
  floatingUiTimerId = setTimeout(() => {
    floatingUiTimerId = null;
    updatePositions();
  }, 320);
}

function scheduleFloatingBackButtonPosition() {
  scheduleFloatingUiPositions();
}

function scheduleMobileChoicePosition() {
  scheduleFloatingUiPositions();
}
function updateMobileChoicePosition() {
  if (!isMobilePortrait()) {
    gameStage.style.removeProperty(
      "--mobile-choice-top"
    );

    return;
  }

  /*
    아이폰에서는 설명란과 선택지를 실제 HTML 구조로 묶었으므로
    JavaScript로 좌표를 측정하지 않는다.
  */
  if (isIosWebKit()) {
    gameStage.style.removeProperty(
      "--mobile-choice-top"
    );

    return;
  }

  /*
    갤럭시 등 기존 모바일 레이아웃은
    현재 정상 동작하므로 기존 계산 방식을 유지한다.
  */
  if (
    !choiceBox ||
    choiceBox.children.length === 0
  ) {
    return;
  }

  if (
    !bodyBox ||
    bodyBox.classList.contains("hidden")
  ) {
    return;
  }

  if (
    choiceBox.classList.contains(
      "fake-replay-mode"
    )
  ) {
    return;
  }

  if (
    choiceBox.classList.contains(
      "true-end-choice-mode"
    )
  ) {
    return;
  }

  const bodyRect =
    bodyBox.getBoundingClientRect();

  const gap = 26;

  const top =
    Math.round(bodyRect.bottom + gap);

  gameStage.style.setProperty(
    "--mobile-choice-top",
    `${top}px`
  );
}
function updateFloatingBackButtonPosition() {
  if (!hasStarted) return;
  if (!backBtn) return;

  /*
    아이폰에서는 뒤로 버튼이 body-shell 안에 들어 있으므로
    위치를 JavaScript로 계산하지 않는다.
  */
  if (
    isMobilePortrait() &&
    isIosWebKit()
  ) {
    const isBodyVisible =
      !bodyBox.classList.contains("hidden");

    const isDialogueVisible =
      !dialogueBox.classList.contains("hidden");

    const isFakeOverlayVisible =
      !fakeEndingOverlay.classList.contains("hidden");

    const shouldHideBack =
      endingBodyHidden ||
      !isBodyVisible ||
      isDialogueVisible ||
      isFakeOverlayVisible;

    if (shouldHideBack) {
      backBtn.style.display = "none";
    } else {
      backBtn.style.removeProperty("display");
    }

    gameStage.style.removeProperty(
      "--floating-back-left"
    );

    gameStage.style.removeProperty(
      "--floating-back-top"
    );

    return;
  }

  /*
    갤럭시 모바일 TRUE END에서는
    기존 CSS 고정 위치 사용
  */
  if (
    currentSceneId === "END_LILY" &&
    isMobilePortrait()
  ) {
    const isBodyVisible =
      !bodyBox.classList.contains("hidden");

    const isDialogueVisible =
      !dialogueBox.classList.contains("hidden");

    const isFakeOverlayVisible =
      !fakeEndingOverlay.classList.contains("hidden");

    const shouldHideBack =
      endingBodyHidden ||
      !isBodyVisible ||
      isDialogueVisible ||
      isFakeOverlayVisible;

    if (shouldHideBack) {
      backBtn.style.display = "none";
    } else {
      backBtn.style.removeProperty("display");
    }

    return;
  }

  if (
    !fakeEndingOverlay.classList.contains("hidden")
  ) {
    backBtn.style.display = "none";
    return;
  }

  const isBodyVisible =
    !bodyBox.classList.contains("hidden");

  const isDialogueVisible =
    !dialogueBox.classList.contains("hidden");

  if (
    isDialogueVisible &&
    !isBodyVisible
  ) {
    backBtn.style.display = "none";
    return;
  }

  if (!isBodyVisible) {
    backBtn.style.display = "none";
    return;
  }

  backBtn.style.removeProperty("display");

  const rect =
    bodyBox.getBoundingClientRect();

  const buttonRect =
    backBtn.getBoundingClientRect();

  const buttonWidth =
    buttonRect.width || 62;

  const buttonHeight =
    buttonRect.height || 36;

  const sideGap =
    isMobilePortrait() ? 12 : 20;

  const bottomGap =
    isMobilePortrait() ? 12 : 16;

  let left;
  let top;

  if (isMobilePortrait()) {
    left =
      rect.right -
      buttonWidth -
      sideGap;

    top =
      rect.bottom -
      buttonHeight -
      bottomGap;
  } else {
    left =
      rect.right -
      buttonWidth -
      16;

    top =
      rect.bottom -
      buttonHeight -
      28;
  }

  const screenGap =
    isMobilePortrait() ? 8 : 14;

  left = Math.max(
    screenGap,
    Math.min(
      window.innerWidth -
        buttonWidth -
        screenGap,
      left
    )
  );

  if (!isMobilePortrait()) {
    top = Math.max(
      screenGap,
      Math.min(
        window.innerHeight -
          buttonHeight -
          screenGap,
        top
      )
    );
  }

  gameStage.style.setProperty(
    "--floating-back-left",
    `${left}px`
  );

  gameStage.style.setProperty(
    "--floating-back-top",
    `${top}px`
  );
}
function hideSceneContent() {
  clearBodyTypingTimers();
  cancelFloatingUiSchedule();
  /* 이전 장면에서 계산한 모바일 UI 위치 초기화 */
  gameStage.style.removeProperty("--mobile-choice-top");
  gameStage.style.removeProperty("--floating-back-left");
  gameStage.style.removeProperty("--floating-back-top");

  backBtn.style.display = "none";
  bodyBox.classList.add("hidden");
  bodyBox.classList.remove("fake-strike");
  bodyBox.innerHTML = "";
  bodyBox.scrollTop = 0;
choiceBox.classList.remove("choice-ink-reveal");
choiceBox.classList.remove("fake-replay-mode");
choiceBox.classList.remove("ending-tool-mode");
choiceBox.classList.remove("ending-body-tool-mode");
choiceBox.classList.remove("true-end-choice-mode");

clearFakeReplayPosition();
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
  if (currentSceneId !== scene.id || !hasStarted) return;

  if (hasSceneDialogue(scene)) {
    showSceneDialogueFirst(scene);
    return;
  }

  startBodyChoiceSequence(scene);
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

  scheduleFloatingBackButtonPosition();
  resetBodyAutoFollow();

  const bodyContent = document.createElement("div");
  bodyContent.className = "body-scroll-content";
  bodyBox.appendChild(bodyContent);

const lines = (!isMobilePortrait() && Array.isArray(scene.bodyPc))
  ? scene.bodyPc
  : (scene.body || []);
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
  choiceBox.classList.remove("fake-replay-mode");
  choiceBox.classList.remove("ending-tool-mode");
  choiceBox.classList.remove("ending-body-tool-mode");
  choiceBox.classList.remove("true-end-choice-mode");

  clearFakeReplayPosition();
  choiceBox.innerHTML = "";

  const isTrueEnd =
    scene.id === "END_LILY";

  /*
    TRUE END도 기존 choiceBox를 그대로 사용한다.

    모바일 TRUE END에서만 true-end-choice-mode를 붙여
    JavaScript 좌표 계산 대신 CSS 고정 위치를 사용한다.
  */
  if (isTrueEnd) {
    choiceBox.classList.add(
      "ending-body-tool-mode"
    );

    choiceBox.classList.add(
      "true-end-choice-mode"
    );
  }

  (scene.choices || []).forEach(
    (choice, index) => {
      const button =
        document.createElement("button");

      button.className = "choice-button";

      button.style.setProperty(
        "--choice-delay",
        `${index * 180}ms`
      );

      const text = isTrueEnd
        ? choice.label
        : `${index + 1}. ${choice.label}`;

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
    }
  );

  /*
    TRUE END에만 설명란 숨기기 버튼 추가
  */
  if (isTrueEnd) {
    const toggleBodyButton =
      document.createElement("button");

    toggleBodyButton.className =
      "choice-button ending-body-toggle-choice";

    updateEndingBodyToggleButton(
      toggleBodyButton
    );

    toggleBodyButton.addEventListener(
      "click",
      () => {
        unlockAudio();

        toggleEndingBodyVisibility(
          toggleBodyButton
        );
      }
    );

    choiceBox.appendChild(
      toggleBodyButton
    );
  }

  if (choiceBox.children.length === 0) {
    return;
  }

  requestAnimationFrame(() => {
    choiceBox.classList.add(
      "choice-ink-reveal"
    );

    /*
      TRUE END에서는 설명란의 실시간 좌표를 측정하지 않는다.
    */
    if (!isTrueEnd) {
      updateMobileChoicePosition();
    }

    updateFloatingBackButtonPosition();
  });

  if (isTrueEnd) {
    /*
      뒤로 버튼의 표시 여부만 확인한다.
      위치는 mobile.css에서 결정한다.
    */
    scheduleFloatingBackButtonPosition();
  } else {
    scheduleMobileChoicePosition();
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

  updateFloatingBackButtonPosition();
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
    showToast(`연결된 장면을 \n찾을 수 없습니다: ${targetId}`);
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

  /*
    blur 이벤트가 실행되기 전에 닫힌 상태로 변경한다.
    아이폰에서 viewport 복구 함수가 두 번 실행되는 것을 방지한다.
  */
  isNameInputOpen = false;
  ignoreNameInputOutsideClose = false;

  nameInput.value = "";
  nameInput.blur();

  gameStage.classList.remove("is-typing-name");

  if (clearPending) {
    pendingInputChoice = null;
  }

  if (hasStarted) {
    gameStage.classList.add("started");
  }

  syncMobileVisualViewport();

  /*
    프로그램으로 입력창을 닫은 경우에는
    여기에서 한 번만 viewport를 복구한다.
  */
  restoreMobileViewportAfterInput();
}
function submitName() {
  unlockAudio();

  const answer = normalizeAnswer(nameInput.value);

  if (isCorrectName(answer)) {
    nameFailCount = 0;

    const choice =
      pendingInputChoice?.choice ||
      { label: "이름을 말한다." };

    const selectedIndex =
      pendingInputChoice?.selectedIndex ?? 1;

    closeNameInputPanel({
      clearPending: false
    });

    if (isMobilePortrait()) {
      /*
        입력창이 닫힌 뒤 TRUE END로 이동하기 전까지
        기존 이름 장면의 선택지만 계속 숨긴다.

        기존 선택지 HTML은 삭제하지 않으므로
        다른 화면에 영향을 주지 않는다.
      */
      gameStage.classList.add(
        "is-typing-name"
      );

      setTimeout(() => {
        gameStage.classList.remove(
          "is-typing-name"
        );

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        syncMobileVisualViewport();

        goToScene(
          "END_LILY",
          choice,
          selectedIndex
        );
      }, 650);

      return;
    }

    goToScene(
      "END_LILY",
      choice,
      selectedIndex
    );

    return;
  }

  nameFailCount += 1;
  handleWrongName();
}

function handleWrongName() {
  nameInput.value = "";

  if (nameFailCount === 1) {
    shakeNameInput();
    showToast("아직 그 이름을 \n알지 못합니다.");
    return;
  }

  if (nameFailCount === 2) {
    inputPanel.classList.add("input-blue");
    shakeNameInput();
    showToast("이름이 멀어집니다.");
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
activeFakeSceneId = null;
fakeDialogueRevealDone = false;
}

function closeFakeEndingOverlay({ showReplayChoice = true } = {}) {
  const closedScene = getScene(activeFakeSceneId || currentSceneId);

  clearFakeTimers();

  fakeEndingOverlay.classList.add("hidden");
  fakeEndingOverlay.classList.remove("show-word");
  fakeEndingOverlay.classList.remove("show-dialogue");

  fakeWord.textContent = "";
  fakeSpeaker.textContent = "";
  fakeDialogue.innerHTML = "";

  fakeDialogueRevealDone = false;
  activeFakeSceneId = null;

  if (showReplayChoice) {
    renderFakeReplayChoice(closedScene);
  }

  scheduleFloatingBackButtonPosition();
}

function forceCompleteFakeDialogue() {
  const scene = getScene(activeFakeSceneId || currentSceneId);

  if (!scene) return;

  fakeTimers.forEach(timer => clearTimeout(timer));
  fakeTimers = [];

  fakeEndingOverlay.classList.remove("hidden");
  fakeEndingOverlay.classList.add("show-word");
  fakeEndingOverlay.classList.add("show-dialogue");

  fakeWord.textContent = scene.fakeWord || "거짓말.";
  fakeSpeaker.textContent = scene.fakeSpeaker || scene.speaker || "그녀";

  const dialogue =
    scene.fakeDialogue ??
    scene.dialogue ??
    "";

  revealFakeDialogueLines(dialogue, true, true);
}
function clearFakeReplayPosition() {
  gameStage.style.removeProperty("--fake-replay-left");
  gameStage.style.removeProperty("--fake-replay-top");
}
function resetEndingBodyVisibility() {
  endingBodyHidden = false;
  gameStage.classList.remove("ending-body-hidden");
}

function setEndingBodyHidden(hidden) {
  endingBodyHidden = hidden;
  gameStage.classList.toggle("ending-body-hidden", endingBodyHidden);

  updateFloatingBackButtonPosition();
  positionFakeReplayChoice();
}

function toggleEndingBodyVisibility(button) {
  setEndingBodyHidden(!endingBodyHidden);
  updateEndingBodyToggleButton(button);
}

function updateEndingBodyToggleButton(button) {
  if (!button) return;

  const text = endingBodyHidden ? "설명란 다시 보기" : "설명란 숨기기";

  button.innerHTML = `
    <span class="choice-label">
      ${createChoiceTextSpans(text, 1)}
    </span>
  `;

  button.setAttribute("aria-pressed", endingBodyHidden ? "true" : "false");
}
function positionFakeReplayChoice() {
  if (
    !choiceBox.classList.contains(
      "fake-replay-mode"
    )
  ) {
    return;
  }

  if (
    bodyBox.classList.contains("hidden")
  ) {
    return;
  }

  /*
    아이폰에서는 일반 흐름 배치 사용
  */
  if (
    isMobilePortrait() &&
    isIosWebKit()
  ) {
    clearFakeReplayPosition();
    return;
  }

  const rect =
    bodyBox.getBoundingClientRect();

  const gap =
    isMobilePortrait() ? 28 : 22;

  const bottomRoom =
    isMobilePortrait() ? 120 : 96;

  const viewportHeight =
    window.innerHeight;

  const left =
    rect.left + rect.width / 2;

  const top =
    Math.min(
      rect.bottom + gap,
      viewportHeight - bottomRoom
    );

  gameStage.style.setProperty(
    "--fake-replay-left",
    `${left}px`
  );

  gameStage.style.setProperty(
    "--fake-replay-top",
    `${top}px`
  );
}

function renderFakeReplayChoice(scene) {
  if (!scene) return;

  const canReplay =
    scene.endingType === "fake" ||
    scene.afterEndingOverlay === true;

  if (!canReplay) return;

  choiceBox.classList.remove(
    "choice-ink-reveal"
  );

  choiceBox.classList.add(
    "fake-replay-mode"
  );

  choiceBox.classList.add(
    "ending-tool-mode"
  );

  choiceBox.innerHTML = "";

  const replayButton =
    document.createElement("button");

  replayButton.className =
    "choice-button fake-replay-choice";

  replayButton.innerHTML = `
    <span class="choice-label">
      ${createChoiceTextSpans(
        "대사 다시 보기",
        0
      )}
    </span>
  `;

  replayButton.addEventListener(
    "click",
    () => {
      unlockAudio();

      choiceBox.classList.remove(
        "choice-ink-reveal"
      );

      choiceBox.classList.remove(
        "fake-replay-mode"
      );

      choiceBox.classList.remove(
        "ending-tool-mode"
      );

      clearFakeReplayPosition();
      choiceBox.innerHTML = "";

      fakeSequenceStarted = false;
      startFakeSequence(scene, true);
    }
  );

  const toggleBodyButton =
    document.createElement("button");

  toggleBodyButton.className =
    "choice-button ending-body-toggle-choice";

  updateEndingBodyToggleButton(
    toggleBodyButton
  );

  toggleBodyButton.addEventListener(
    "click",
    () => {
      unlockAudio();

      toggleEndingBodyVisibility(
        toggleBodyButton
      );
    }
  );

  choiceBox.appendChild(
    replayButton
  );

  choiceBox.appendChild(
    toggleBodyButton
  );

  requestAnimationFrame(() => {
    positionFakeReplayChoice();

    choiceBox.classList.add(
      "choice-ink-reveal"
    );
  });
}
function startFakeSequence(scene, fast = false) {
  if (fakeSequenceStarted) return;

  backBtn.style.display = "none";

  fakeSequenceStarted = true;
  activeFakeSceneId = scene.id;
  fakeDialogueRevealDone = false;

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

function revealFakeDialogueLines(dialogue, fast = false, instant = false) {
  fakeDialogue.innerHTML = "";
  fakeDialogueRevealDone = false;

  const lines = String(dialogue).split("\n");
  const lineDelay = fast ? 130 : 650;

  lines.forEach(line => {
    const div = document.createElement("div");
    div.className = `fake-dialogue-line ${line.trim() ? "" : "empty"}`;
    div.textContent = line || " ";
    fakeDialogue.appendChild(div);
  });

  const dialogueLines = [...fakeDialogue.querySelectorAll(".fake-dialogue-line")];

  if (instant) {
    dialogueLines.forEach(line => {
      line.classList.add("visible");
    });

    fakeDialogueRevealDone = true;
    return;
  }

  dialogueLines.forEach((line, index) => {
    const timer = setTimeout(() => {
      line.classList.add("visible");
    }, index * lineDelay);

    fakeTimers.push(timer);
  });

  const doneTimer = setTimeout(() => {
    fakeDialogueRevealDone = true;
  }, dialogueLines.length * lineDelay + 80);

  fakeTimers.push(doneTimer);
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
    showToast("이동할 루트를 \n찾을 수 없습니다.");
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

  showToast(`${getDisplayTitle(targetScene)} 장면으로 \n돌아갔습니다.`);
}

function jumpToRouteStart() {
  currentSceneId = "SIN01";
  historyStack = [];
  routeRecords = [];
  hasStarted = true;

  closeRouteModal();
  renderScene();

  showToast("이름 장면으로 \n돌아갔습니다.");
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
  if (!isNameInputOpen) return;
  if (inputPanel.classList.contains("hidden")) return;
  if (ignoreNameInputOutsideClose) return;

  if (event.target.closest("#inputPanel")) return;

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
function clearTitleUiRevealTimer() {
  if (titleUiRevealTimer) {
    clearTimeout(titleUiRevealTimer);
    titleUiRevealTimer = null;
  }
}

function getTitleRevealElements() {
  if (!titleScreen) return [];

  return [
    startGameBtn,
    titleScreen.querySelector(".title-guide")
  ].filter(Boolean);
}

function revealTitleUi() {
  clearTitleUiRevealTimer();

  if (!titleScreen) return;
  if (titleScreen.classList.contains("hidden")) return;

  titleScreen.classList.add("title-ui-ready");

  /*
    iPhone Safari 및 카카오톡 인앱 브라우저에서
    CSS 클래스가 적용되지 않는 경우를 대비해
    시작 버튼과 안내 문구를 인라인 스타일로도 표시한다.
  */
  getTitleRevealElements().forEach(element => {
    element.style.setProperty(
      "opacity",
      "1",
      "important"
    );

    element.style.setProperty(
      "visibility",
      "visible",
      "important"
    );

    element.style.setProperty(
      "pointer-events",
      "auto",
      "important"
    );

    element.style.setProperty(
      "filter",
      "none",
      "important"
    );
  });
}

function armTitleUiReveal() {
  clearTitleUiRevealTimer();

  if (!titleScreen) return;

  titleScreen.classList.remove("title-ui-ready");

  /*
    처음 화면으로 돌아왔을 때는
    이전에 넣은 강제 표시 스타일을 초기화한다.
  */
  getTitleRevealElements().forEach(element => {
    element.style.removeProperty("opacity");
    element.style.removeProperty("visibility");
    element.style.removeProperty("pointer-events");
    element.style.removeProperty("filter");
  });

  titleUiRevealTimer = setTimeout(() => {
    revealTitleUi();
  }, 9200);
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
function handleTitleRevealInput() {
  if (!titleScreen) return;
  if (titleScreen.classList.contains("hidden")) return;
  if (titleScreen.classList.contains("title-ui-ready")) return;

  revealTitleUi();
}

/*
  Safari, 카카오톡 인앱 브라우저, 일반 브라우저를 모두 지원
*/
titleScreen.addEventListener(
  "pointerdown",
  handleTitleRevealInput
);

titleScreen.addEventListener(
  "touchstart",
  handleTitleRevealInput,
  { passive: true }
);

titleScreen.addEventListener(
  "click",
  handleTitleRevealInput
);
startGameBtn.addEventListener("click", () => {
  clearTitleUiRevealTimer();

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
    /*
      입력 패널이 열려 있는 상태에서 사용자가 직접
      키보드만 닫았을 때에만 viewport를 복구한다.

      closeNameInputPanel()에서 프로그램으로 blur한 경우에는
      isNameInputOpen이 이미 false라서 중복 실행되지 않는다.
    */
    if (isNameInputOpen) {
      restoreMobileViewportAfterInput();
    }

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

  if (!fakeDialogueRevealDone) {
    forceCompleteFakeDialogue();
    return;
  }

  closeFakeEndingOverlay({ showReplayChoice: true });
});

namePunishOverlay.addEventListener("click", event => {
  event.preventDefault();
  event.stopPropagation();
  returnToTitleFromNamePunish();
});

function setMobileVideoPan(percent, options = {}) {
  mobileVideoPanPercent = Math.max(0, Math.min(100, percent));

  if (options.instant) {
    gameStage.classList.add("video-panning");
    gameStage.style.setProperty("--mobile-video-x", `${mobileVideoPanPercent}%`);

    requestAnimationFrame(() => {
      gameStage.classList.remove("video-panning");
    });

    return;
  }

  gameStage.style.setProperty("--mobile-video-x", `${mobileVideoPanPercent}%`);
}

let pcVideoXPercent = 50;
let pcVideoYPercent = 50;
let pcVideoDragging = false;

let pcVideoPanFrame = null;
let pendingPcVideoX = 50;
let pendingPcVideoY = 50;

const PC_VIDEO_DRAG_X_SPEED = 1.55;
const PC_VIDEO_DRAG_Y_SPEED = 2.45;

function setPcVideoPosition(x = 50, y = 50, options = {}) {
  pcVideoXPercent = Math.max(0, Math.min(100, x));
  pcVideoYPercent = Math.max(0, Math.min(100, y));

  if (options.instant) {
    gameStage.classList.add("video-panning");
  }

  gameStage.style.setProperty("--pc-video-x", `${pcVideoXPercent}%`);
  gameStage.style.setProperty("--pc-video-y", `${pcVideoYPercent}%`);

  if (options.instant) {
    requestAnimationFrame(() => {
      gameStage.classList.remove("video-panning");
    });
  }
}
function requestPcVideoPosition(x, y) {
  pendingPcVideoX = x;
  pendingPcVideoY = y;

  if (pcVideoPanFrame) return;

  pcVideoPanFrame = requestAnimationFrame(() => {
    pcVideoPanFrame = null;
    setPcVideoPosition(pendingPcVideoX, pendingPcVideoY);
  });
}
function applyScenePcVideoPosition(scene) {
  if (isMobilePortrait()) return;

  const x = Number.isFinite(scene?.pcVideoX) ? scene.pcVideoX : 50;
  const y = Number.isFinite(scene?.pcVideoY) ? scene.pcVideoY : 50;

  setPcVideoPosition(x, y, { instant: true });
}

function isPcVideoPanBlockedTarget(target) {
  return !!target.closest(
    "button, input, textarea, select, .modal, .body-box, .choice-box, .dialogue-box, .input-panel, #fakeEndingOverlay, #namePunishOverlay"
  );
}

function setupPcVideoPan() {
  let startX = 0;
  let startY = 0;
  let startVideoX = 50;
  let startVideoY = 50;

  gameStage.addEventListener("pointerdown", event => {
    if (isMobilePortrait()) return;
    if (event.button !== 0) return;
    if (isPcVideoPanBlockedTarget(event.target)) return;

    pcVideoDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startVideoX = pcVideoXPercent;
    startVideoY = pcVideoYPercent;

    gameStage.classList.add("video-panning");

    try {
      gameStage.setPointerCapture(event.pointerId);
    } catch (error) {
      // 무시
    }
  });

  gameStage.addEventListener("pointermove", event => {
    if (!pcVideoDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    const nextX = startVideoX - (dx / window.innerWidth) * 100 * PC_VIDEO_DRAG_X_SPEED;
    const nextY = startVideoY - (dy / window.innerHeight) * 100 * PC_VIDEO_DRAG_Y_SPEED;

    setPcVideoPosition(nextX, nextY);

    event.preventDefault();
  });

function stopPcVideoPan(event) {
  if (!pcVideoDragging) return;

  pcVideoDragging = false;
  gameStage.classList.remove("video-panning");

  if (pcVideoPanFrame) {
    cancelAnimationFrame(pcVideoPanFrame);
    pcVideoPanFrame = null;
  }

  setPcVideoPosition(pendingPcVideoX, pendingPcVideoY);

  try {
    gameStage.releasePointerCapture(event.pointerId);
  } catch (error) {
    // 무시
  }
}

  gameStage.addEventListener("pointerup", stopPcVideoPan);
  gameStage.addEventListener("pointercancel", stopPcVideoPan);
  gameStage.addEventListener("lostpointercapture", () => {
    pcVideoDragging = false;
    gameStage.classList.remove("video-panning");
  });
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
function refreshFloatingUiPositions() {
  scheduleFloatingBackButtonPosition();
  scheduleMobileChoicePosition();
  positionFakeReplayChoice();
}
function scheduleViewportUiRefresh() {
  if (viewportUiRefreshTimer !== null) {
    clearTimeout(viewportUiRefreshTimer);
  }

  /*
    Safari 주소창이나 키보드가 움직이는 동안에는 기다리고,
    화면 변화가 끝난 뒤 한 번만 다시 계산
  */
  viewportUiRefreshTimer = setTimeout(() => {
    viewportUiRefreshTimer = null;

    syncMobileVisualViewport();
    scheduleFloatingUiPositions();
  }, 260);
}

window.addEventListener(
  "resize",
  scheduleViewportUiRefresh
);

if (window.visualViewport) {
  window.visualViewport.addEventListener(
    "resize",
    scheduleViewportUiRefresh
  );

  window.visualViewport.addEventListener(
    "scroll",
    scheduleViewportUiRefresh
  );
}

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    syncMobileVisualViewport();
    scheduleFloatingUiPositions();
  }, 320);
});
const bodyResizeObserver = new ResizeObserver(() => {
  if (!hasStarted) return;
  if (bodyBox.classList.contains("hidden")) return;

  scheduleFloatingUiPositions();
});

bodyResizeObserver.observe(bodyBox);
setupRouteDrag();
setupBodyDragScroll();
setupMobileVisualViewport();
setupMobileVideoPan();
setupPcVideoPan();
setMobileVideoPan(50);
renderScene();