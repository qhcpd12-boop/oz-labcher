//배열
const books = [];//책 목록에 저장
const rentals = [];//대여상태 저장
// 도서 추가
function addBook() {///책 추가 버튼 클릭 시 실행되는 함수
  const title = document.getElementById('bookTitle').value.trim();//책 제목 입력값 가져오기,
  // getElementById('bookTitle') -> id가 bookTitle인 요소 선택
  // .value -> 선택한 요소의 입력값 가져오기
  // .trim() -> 문자열 양쪽 공백 제거
  const price = Number(document.getElementById('bookPrice').value);//책 가격 입력값 가져오기, 숫자로 변환(Number)

  if (!title || isNaN(price) || price <= 0) {//유효성 검증: 제목이 비어있거나, 가격이 숫자가 아니거나, 가격이 0 이하인 경우
    return alert('입력 오류!');//경고창(alert) 띄우고 함수 종료(return)
  }

  books.push({ title, price });//책 목록에 새 책 객체(title, price) 추가.books 배열에 {title, price} 객체 추가
  rentals.push(createBookRental(title));//대여 상태 객체 생성하여 rentals 배열에 추가.
  // createBookRental(title) 함수는 클로저를 이용해 책 제목에 대한 대여 상태를 관리하는 객체를 반환.대여상태를 책제목보고 대여했는지 관리

  const li = document.createElement('li');// 브라우저에 새로운 리스트 아이템(li) 요소 생성
  li.innerHTML = // 리스트 아이템의 HTML 내용 설정. 책 제목과 가격을 표시하고, 삭제 및 대여/반납 버튼 추가
  `<span>${title} - ${price}원 (대여 가능)</span>// 책 제목과 가격 표시, 초기 상태는 대여 가능
    <button onclick="removeBook(this)">삭제</button>// 삭제 버튼, 클릭 시 removeBook 함수 호출, this는 클릭된 버튼 요소를 전달
    <button onclick="toggleRental(this)">대여/반납</button>// 대여/반납 버튼, 클릭 시 toggleRental 함수 호출, this는 클릭된 버튼 요소를 전달
  `;
  document.getElementById('bookList').appendChild(li);// 생성된 리스트 아이템을 HTML 문서의 bookList 요소에 추가하여 화면에 표시
  // getElementById('bookList') -> id가 bookList인 요소 선택
  // .appendChild(li) -> 선택한 요소의 자식으로 li 요소 추가
}

// 삭제
function removeBook(btn) {// 삭제 버튼 클릭 시 실행되는 함수, btn은 클릭된 버튼 요소
  const li = btn.parentElement;// 클릭된 버튼의 부모 요소(li) 선택
  const title = li.querySelector('span').textContent.split(' - ')[0];//li.querySelector->요소찾기, 
  // span 요소의 텍스트에서 ' - '로 분할하여 첫 번째 부분(책 제목) 가져오기. 예: "책 제목 - 가격원 (대여 가능)"에서 "책 제목" 추출
  //split-문자열 자르기=>책 제목만 추출
  books.splice(books.findIndex(b => b.title === title), 1);// 배열에서 몇번째인지 찾기 예-books={[tittle:'책1'},
  // {title='책2'}]"책2"찾으면 결과=1,첫번째열은 0,두번째열은 1
//
  rentals.splice(rentals.findIndex(r => r.getStatus().title === title), 1);
  li.remove();// HTML에서 해당 리스트 아이템 제거
}

// 데이터 처리
function processBooks() {// 책 목록을 처리하여 결과를 화면에 표시하는 함수
  const result = document.getElementById('results');// 결과를 표시할 HTML 요소 선택

  // 책 목록을 가공하여 문자열로 변환

  const prefixed = books.map(b => `Book: ${b.title} - ${b.price}원`);// books 배열의 각 책 객체를 "Book: 제목 - 가격원" 형식의 문자열로 변환하여 prefixed 배열에 저장
  const high = books.filter(b => b.price >= 10000);// books 배열에서 가격이 10000원 이상인 책 객체만 필터링하여 high 배열에 저장.조건에 맞는것만 저장 filter
  const total = books.reduce((a, b) => a + b.price, 0);// books 배열의 모든 책 가격을 합산하여 total 변수에 저장. reduce 함수는 누적값(a)과 현재값(b)을 이용하여 합산, 초기값은 0
  // a는 누적값, b는 현재값(책 객체), a + b.price는 누적값에 현재 책의 가격을 더하는 연산
  
  result.innerHTML = //html 요소의 내용을 설정하여 결과를 화면에 표시. 전체 책 목록, 고가 책 목록, 총합을 각각 섹션으로 나누어 표시
  `
    <h3>전체</h3>${prefixed.join('<br>') || '없음'}//join('<br>')은 줄바꿈 출력,또는 책이 없을 때 '없음' 표시
    <h3>고가</h3>${high.map(b => `${b.title} - ${b.price}`).join('<br>') || '없음'}// 고가책모은배얄.map(b => `${b.title} - ${b.price}`) 
    // 책 제목과 가격을 "제목 - 가격" 형식의 문자열로 변환, join('<br>')로 줄바꿈 출력, 또는 책이 없을 때 '없음' 표시
    <h3>총합</h3>${total}원 //REDUCE로 계산된 총합을 "총합" 섹션에 표시
  `;
}

// 클로저
const createBookRental = (title) => {// 책 제목을 인자로 받아 해당 책의 대여 상태를 관리하는 객체를 생성하는 함수
  let borrowed = false, count = 0;// 대여 여부(borrowed)와 대여 횟수(count)를 초기화.

  return {// 대여 상태를 관리하는 객체 반환
    borrow() {// 책을 대여하는 메서드,대여하면 카운트 증가
      if (borrowed) return alert('이미 대여중'), false;// 이미 대여 중인 경우 경고창(alert) 띄우고 false 반환하여 대여 실패
      borrowed = true; count++; return true;// 대여하면 count 증가, borrowed 상태를 true로 변경, 대여 성공(true) 반환
    },
    returnBook() { borrowed = false; },// 책을 반납하는 메서드, 반납하면 borrowed 상태를 false로 변경
    getStatus() { return { title, borrowed, count }; }// 현재 대여 상태를 반환하는 메서드, 책 제목, 대여 여부, 대여 횟수를 객체 형태로 반환
  };
};

// 대여/반납
function toggleRental(btn) {// 대여/반납 버튼 클릭 시 실행되는 함수, btn은 클릭된 버튼 요소
  const li = btn.parentElement;// 클릭된 버튼의 부모 요소(li) 선택
  const title = li.querySelector('span').textContent.split(' - ')[0];// span 요소의 텍스트에서 ' - '로 분할하여 첫 번째 부분(책 제목) 가져오기. 
  // 예: "책 제목 - 가격원 (대여 가능)"에서 "책 제목" 추출

  const r = rentals.find(x => x.getStatus().title === title);// rentals 배열에서 getStatus().title이 클릭된 책 제목과 
  // 일치하는 대여 상태 객체를 찾아 r 변수에 저장. find 함수는 조건에 맞는 첫 번째 요소를 반환
  const b = books.find(x => x.title === title);// books 배열에서 title이 클릭된 책 제목과 일치하는 책 객체를 찾아 b 변수에 저장.
  // find 함수는 조건에 맞는 첫 번째 요소를 반환

  const s = r.getStatus();// 현재 대여 상태 객체를 s 변수에 저장. s는 { title, borrowed, count } 형태의 객체

  if (s.borrowed) {// 현재 대여 중인 경우, 반납 처리
    r.returnBook();// 반납 처리: r 객체의 returnBook() 메서드 호출하여 대여 상태를 반납으로 변경
    li.querySelector('span').textContent = `${title} - ${b.price}원 (대여 가능)`;// 리스트 아이템의 텍스트를 "책 제목 - 가격원 (대여 가능)" 형식으로 업
    // 데이트하여 대여 가능 상태 표시
  } else if (r.borrow()) {// 현재 대여 가능 상태인 경우, 대여 처리
    li.querySelector('span').textContent = `${title} - ${b.price}원 (대여 중)`;/// 리스트 아이템의 텍스트를 "책 제목 - 가격원 (대여 중)" 형식으로 
    // 업데이트하여 대여 중 상태 표시
  }
}

// 전체 상태 보기
function showAllRentalStatus() {// 전체 대여 상태를 처리하여 결과를 화면에 표시하는 함수
  const result = document.getElementById('results');// 결과를 표시할 HTML 요소 선택

  result.innerHTML = rentals.length// rentals 배열이 비어있지 않으면 대여 상태를 문자열로 변환하여 표시, 비어있으면 '데이터 없음' 표시
    ? rentals.map(r => { // rentals 배열의 각 대여 상태 객체를 문자열로 변환하여 배열로 반환
        const s = r.getStatus();// 현재 대여 상태 객체를 s 변수에 저장. s는 { title, borrowed, count } 형태의 객체
        return `${s.title} : ${s.borrowed ? '대여 중' : '가능'} (${s.count}회)`;// 대여 상태를 "책 제목 : 대여 중/가능 (대여 횟수회)" 형식의 문자열로 반환
      }).join('<br>')// 변환된 문자열 배열을 join('<br>')로 줄바꿈하여 하나의 문자열로 결합하여 결과 요소에 표시
    : '데이터 없음';// rentals 배열이 비어있으면 '데이터 없음' 표시
}