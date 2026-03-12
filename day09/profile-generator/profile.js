//변수선언
let age=10;
age=40;
console.log(age);

var name = "team";
name ="boyoun";
console.log(name);

const profile = { nickname: "bomi" };
profile.nickname ="team";
console.log(profile);


//문자열 처리
const profileText = "name: bomi\nage: 20\nhobbies: watching movies";
console.log(profileText);

//배열선언
const hobbies=["reading","gaming","coding"];

const username ="bomi";
const userage= 20;
const job="teacher"

const sentence="이름은"+username+"이고 나이는"+userage+"살이고 취미는 "+hobbies+"입니다";
console.log(sentence);


//배열결합
console.log("my hobbies:"+hobbies.join(","));

//객체 선언
const person = {name: "bomi",age: 20,isStudent: true};

//객체 속성 사용하여 문장 생성
const profileSentence = "이름은"+person.name+"이고 나이는"+person.age+"살이며 학생 여부는"+person.isStudent+"입니다.";
console.log(profileSentence);

// 배열 선언
const hobbies1=["reading","gaming","coding"];

// 객체 선언
const person1={name:"bomi",age:20,isStudent:true};

// typeof로 데이터 타입 확인
console.log(typeof hobbies1);
console.log(typeof person1);

