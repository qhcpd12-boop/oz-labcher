const timerInput = document.querySelector("#timerInput");
const startTimer = document.querySelector("#startTimer");
const timerDisplay = document.querySelector("#timerDisplay");

const resetTimerInput = () => {
  // timerInput 초기화
};

const resetTimerDisp = () => {
  // timerDisplay 초기화
};
fa
const showTimerSec = (sec) => {
  resetTimerDisp();
  // timerDisplay에 sec 표시
};

const showTimerComplete = () => {
  resetTimerDisp();
  // timerDisplay에 타이머 종료 메세지 표시
};

const showTimerError = (message) => {
  // timerDisplay에 오류 메세지 표시
};

const processTimer = (sec) => {
  showTimerSec(sec);
  // 1초마다 반복되는 함수
  const timer = setInterval(() => {
    // 1초마다 sec 감소,
    sec -= 1;
    // sec이 0보다 크면 sec 표시
    if (sec < 0) {
      clearInterval(timer);
      // 타이머 종료 메세지 표시
    }
  }, 1000);
};

// 타이머 시작
function handleClickTimer() {
  try {
    // timer input에서 sec 가져오기
    processTimer(time);
  } catch (error) {
    // 오류 메세지 출력
    showTimerError(error.message);
    resetTimerInput();
  }
}