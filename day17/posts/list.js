// list.js (포스트 목록 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 목록 표시
async function displayPosts() {
    // 포스트 데이터 가져오기
    try {
        const response = await fetch(`${apiUrl}/posts`);// API에서 포스트 데이터 가져오기
        //서버 응답 결과=게시물에서 apiUrl/posts로 요청 보냄 fetch는 요청,await는 응답 기다림
        if (!response.ok) throw new Error("Failed to fetch posts");//게시물 가져오는데 실패하면 강제로 에러발생
        const posts = await response.json();//서버 데이터를 JSON으로 파싱하여 자바스크립트 객체로 변환하여 posts 변수에 저장(게시물 목록에 저장)

        const postList = document.getElementById("post-list");//html에서 id가 post-list인 요소를 가져와서 postList 변수에 저장
        postList.innerHTML = ""; // html에 기존 목록 초기화
        posts.forEach(post => {//posts 배열에서 하나씩 꺼냄
            const li = document.createElement("li");//li 요소 생성.js에서 li 요소 만들어서 html li 변수에 저장
            li.textContent = post.title;//li 텍스트 콘텐츠에 게시물 제목 설정
            li.dataset.postId = post.id;//li 요소에 data-post-id 속성으로 게시물 ID 저장
            // 포스트 클릭 시 상세 페이지로 이동
            li.addEventListener("click", () => {//li 요소에 클릭 이벤트 리스너 추가. 클릭하면 상세 페이지로 이동
                window.location.href = `detail.html?postId=${post.id}`;//detail.html로 이동하면서 ?postId=1,2,... 형태로 게시물 ID 전달. 
                // detail.html로 이동하면서 URL에 postId 쿼리 매개변수로 게시물 ID 전달
            });
            postList.appendChild(li);// postList 요소에 li 요소 추가하여 게시물 목록에 표시
        });
    } catch (error) {
        console.error("Error:", error.message);// 에러 발생 시 콘솔에 에러 메시지 출력
        document.getElementById("post-list").innerHTML = "<p>Error loading posts</p>";// 게시물 로딩 실패 시 사용자에게 에러 메시지 표시
    }
}

// 페이지 로드 시 포스트 목록 표시
displayPosts();//fetchPosts();로도 쓸 수 있다 //페이지가 로드될 때 displayPosts 함수 호출하여 포스트 목록 표시. 페이지가 로드되면 자동으로 게시물 목록이 표시됨.화면 출력