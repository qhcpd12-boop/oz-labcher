const taskInput = document.getElementById('taskInput');//입력창
const addButton = document.getElementById('addButton');//추가버튼
const taskList = document.getElementById('taskList');//리스트,목럭
const clearButton = document.getElementById('clearButton');//전체삭제
const taskCount = document.getElementById('taskCount');//리스트개수 세기
const prioritySelect = document.getElementById("priority") ;//사용자입력

// 할 일 개수 업데이트 함수
function updateTaskCount() {//업데이트되는 입력값을 센다
    const count = taskList.children.length;//
    taskCount.textContent = `현재 할 일: ${count}개`;//리스트 길이를 세서 현재할일 ()개로 출력
}

// 할 일 추가 함수
function addTask() {
    const taskText = taskInput.value.trim();//trim공백빼고 입력값쓴것이 taskTwxt에 저장됨.숙제하기쓰면 테스크인풋.벨류는 숙제하기

    // 입력 검증
    if (taskText === "") {//입력창에 글자 치지 않으면
        alert('할 일을 입력해주세요!');//경고창 '할일을 입력해주세요'뜨고 입력안되고 종료 쓰면 리스트 생성
        return;//끝내라는
    }

    // li classList 이름을 'task-item'응로한다  화면에 안보이고 li라는 요소를 만들고 li classList에 들어 갈건 task-item이라는 이름표 붙이는이는것 
    const li = document.createElement('li');//li를 만든다
    li.classList.add('task-item');//li 클래스에 태스크 아이템 이라는 이름을 붙인다. html에서 <li>task-itam</>로 쓰는거랑 같음

    // span 생성
    const span = document.createElement('span');//스팬태그를 만든다
    span.textContent = taskText;//스팬에 입력한 택스트를 스팬태 넣는다  할일 내용입력창(스팬)에 쓴더

    // ⭐ 우선순위 적용
    const priority = prioritySelect.value;//사용자가 선택한 값
    if (priority === 'high') {//그 선택한 우선 순위가 하이인지 비교하는 연산자===를 통해 비교
        span.style.color = 'red'; //하이를 누르면 글자 빨간색 다른걸 누르면 실행안함
    }

    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';//삭제버튼 텍스트는 '삭제'로 한다
    deleteBtn.classList.add('delete-button');//삭제버튼을 나타내는 클래스 추가-->클래스는 css로 꾸며주거나 자바스크립으로 선택할때도사용

    // 완료 토글
    span.addEventListener('click', function () {
        span.classList.toggle('completed');//스팬을 클릭하면 컴플리티트 넣거나 빼기
    });

    // 요소 합치기
    li.appendChild(span);//li에 스팬넣기
    li.appendChild(deleteBtn);//삭제버튼 넣기
    taskList.appendChild(li);//완성된 li를 taskList에 넣기

    // ⭐ querySelectorAll 사용 (삭제 버튼 이벤트)
    const deleteButtons = document.querySelectorAll('.delete-button');//석제버튼들=모든삭제버튼을 선택
    deleteButtons.forEach((btn) => {//모든 삭제 버튼 하나씩꺼냄
        btn.onclick = function () {//버튼 클릭했을 때
            btn.parentElement.remove();//버튼의 parentElemant부모요소가 li여서 한줄씩 지워라 할일삭제
            updateTaskCount();//갯수 지우고 다시 세서 계산
        };
    });

    // 입력창 초기화 입력창에 추가한뒤 입력창 빈칸 만든다
    taskInput.value = "";

    // 개수 업데이트.할일 개수 다시 세서 화면에 출력
    updateTaskCount();
}

// 전체 삭제 함수
function clearAllTasks() {
    taskList.innerHTML = "";//목록 전체 ""아무것도 없게
    updateTaskCount();//개수다시 업데이트
}

// 버튼 클릭 이벤트
addButton.addEventListener('click', addTask);//추가버튼 클릭하면 할일 추가

// Enter 키 이벤트 (keydown 사용)
taskInput.addEventListener('keydown', function (event) {//입력창에 글씨입력하고 키를 누르면
    if (event.key === 'Enter') {//그 키가 엔터면
        addTask();//할일 추가  addTask 실행
    }
});

// 전체 삭제 버튼 이벤트 삭제버튼을  클릭하면 모든게 삭제된다
clearButton.addEventListener('click', clearAllTasks);