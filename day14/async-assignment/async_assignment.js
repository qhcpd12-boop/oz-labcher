const MAX_TIME = 10;  // 최대 초
let timerCount = 0;   // 현재 타이머 값
var timerMessage = ""; // 종료 메시지

// 에러 출력
function showError(msg) {
  const display = document.getElementById("timerDisplay");
  display.classList.add("error");
  display.textContent = "에러: " + msg;
}

// 타이머 시작
function startTimer(seconds = 10) {
  const display = document.getElementById("timerDisplay");
  const button = document.getElementById("startTimer");

  timerCount = seconds;
  display.classList.remove("error");
  button.disabled = true;

  const timer = setInterval(function() {
    display.textContent = `타이머: ${timerCount}초`;
    timerCount--;

    if (timerCount < 0) {
      clearInterval(timer);
      timerMessage = "타이머 종료!";
      display.textContent = timerMessage;
      button.disabled = false;
    }
  }, 1000);
}

// 버튼 클릭 이벤트
document.getElementById("startTimer").addEventListener("click", function() {
  const input = document.getElementById("timerInput").value;
  const num = Number(input);

  if (input === "" || isNaN(num) || num < 1 || num > MAX_TIME) {
    return showError(`유효한 숫자(1-${MAX_TIME})를 입력하세요!`);
  }

  startTimer(num);
});