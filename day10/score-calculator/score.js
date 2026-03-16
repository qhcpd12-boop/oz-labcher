// 점수 입력
let scoreㅑ = Number(prompt("점수를 입력하세요 (0~100)"));

// 보너스 5점 추가 (복합 대입 연산자 사용)
score += 5;

// 최종 점수 제한 (최대 105점)
let finalScore = (score <= 105) ? score : 105;

// 등급 부여 (if / else if / else)
let grade;
if (finalScore >= 90) {
    grade = "A";
} else if (finalScore >= 80) {
    grade = "B";
} else if (finalScore >= 70) {
    grade = "C";
} else if (finalScore >= 60) {
    grade = "D";
} else {
    grade = "F";
}

// 합격 / 불합격 (삼항 연산자)
let result = (finalScore >= 60) ? "Pass" : "Fail";

// 등급별 메시지 출력 (switch)
let message;
switch(grade) {
    case "A":
        message = "Excellent work!";
        break;
    case "B":
        message = "Good job!";
        break;
    case "C":
        message = "Satisfactory performance.";
        break;
    case "D":
        message = "Needs improvement.";
        break;
    case "F":
        message = "Please try harder!";
        break;
    default:
        message = "";
}

// 결과 출력
console.log("입력 점수:", score - 5); // 원래 점수
console.log("최종점수:", finalScore);
console.log("등급:", grade);
console.log("결과:", result);
console.log("메시지:", message);

//let input=jprompt("점수를 입력하세요");
console.log(input);
console.log(typeof input);
let score=Number(input);
console.log(score);
console.log(typeof score);

let lastscore =score + bonus_score;
console.log(lastscore)
console.log(typeof lastscore);
