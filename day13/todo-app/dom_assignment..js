// DOM 요소 선택
const taskInput = document.getElementById('taskInput');//입력창 돔트리에서 taskInput을 가져왔다
const addButton = document.getElementById('addButton');//추가버튼
const taskList = document.getElementById('taskList');//리스트,목럭
const cclearButton = document.getElementById('clearButton');//전체삭제

// 할 일 추가 함수
function addTask() {//할일 추가 버튼 클릭
    const taskText = taskInput.value.trim();//유저가입력할 창에 글자로 입력값을 가져와 양쪽 공백제거trim()후 변수에저장
//"  공부 "라고 치면 "공부"라고 값이 나옴 taskInput.value->사용자가 친 임력값 을 const taskText 변수값에 저장,"공부하기"로 출력
 // 입력 검증
    if (taskText === "") {//아무것도 안쓰면 alert('할일을 입력해 주세요')라고 경고창 띄우고 
        alert('할 일을 입력해주세요!');
        return;// 함수 종료 없으면 빈값인데도 li가 생서되서 빈 리스트 생김
    }
    // li 생성 ,if문에서 입력창에 입력값치면 ""에 입력값추가 됨 리스트추가
    const li = document.createElement('li');//->li라는 태그를 만들고 =만든걸 li에 저장한다
    li.classList.add('task-item');//li 클래스에 붙인다 'task-item이라고->. <li>class='task-item'</li> -->css스타일 적용하려고
    //classList.add붙이는게 디자인,스타일 붙이려고

    // span 상자만들고  그안에 작성하는 입략값은 
    const span = document.createElement('span');//->span이라는 태그 만들고 만든 입력창에 입력값을 넣으면 span에 저장된다
    span.textContent = taskText;//->span에 텍스트를 쓴다=압력창에 쓴 텍스트

    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';//버튼에 글자로 '삭제'라고하고
    deleteBtn.classList.add('delete-button');//클래스리스트에 'delete-button'으로 쓰여짐

    // 완료 토글 (클릭 시 줄 긋기) 클릭하면 스펜이 클래식 리스트에 있는 입략값에 밑줄이 생겼다 클릭하면 밑줄 없어짐
    span.addEventListener('click', function () {
        span.classList.toggle('completed');
    });//토글은 켰다껏다하는 completed 밑줄긋기

    // 삭제 기능, 삭제버튼 누르면 입력리스트에서 li항목 삭제됨
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
    });

    // 요소 합치기, li appendCild에 스팬(글자쓰기 입력값"공부하기")저장하고,삭제버튼 저장하고 li 리스트 목록 저장한다
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    //->점(li) 공부하기(span)삭제버튼(deleteBtn)출력
    // 입력창 초기화 입력창에 입력 후 입력창 안에 내용이 없어진다
    taskInput.value = "";
}

// 전체 삭제 함수. 쓴거 전부 없어지는 함수.ul안에 내용 전부 삭제
function clearAllTasks() {
    taskList.innerHTML = "";
}

// 버튼 클릭 이벤트, addButto(추가) 클릭하면 리스트에 추가된다
addButton.addEventListener('click', addTask);

// Enter 키 이벤트 (keypdow 키누를 때 사용 - 요구사항 맞춤) 추가 입력을 쓰고 키보드 엔터누르면 입력추가된다
taskInput.addEventListener('keypdown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 전체 삭제 버튼 이벤트, 삭제 버튼 클릭해 누르면 추가한 리스트(입력값)다 삭제된다
clearButton.addEventListener('click', clearAllTasks);
