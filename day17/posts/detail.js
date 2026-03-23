/// detail.js (포스트 상세 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";//서버를 저장한다apiUrl 변수에 JSONPlaceholder API의 기본 URL 저장. 이 URL은 포스트 데이터를 가져오는 데 사용됨.

// 포스트 상세 정보 표시
async function displayPostDetail() {// displayPostDetail 함수는 포스트 상세 정보를 표시하는 비동기 함수입니다. 
// 이 함수는 URL에서 postId를 가져와 해당 포스트의 상세 정보를 API에서 가져와 화면에 렌더링합니다. 상세데이터를 가져오는 동안 발생할 수 있는 오류를 처리하기 위해 try-catch 블록을 사용
    // URL에서 postId 가져오기
    try {
        const urlParams = new URLSearchParams(window.location.search);// 현재 브라우저화면에서 현제페이지주소정보 중에 뒤에를 서치,
        // 예) http://localhost:5500/day17/post/detail.html?postId=1에서 ?postId=1 부분을 가져와서 urlParams 변수에 저장
        const postId = urlParams.get("postId");// urlParams에서 postId 값을 가져와서 postId 변수에 저장. 예) postId 변수에는 "1"이 저장됨. URL에서 postId가 없으면 null이 됨
        if (!postId) throw new Error("No post ID provided");// postId가 URL에 없으면 에러 발생. 
        let post = {};// post 변수를 빈 객체로 초기화. 이 변수는 API에서 가져온 포스트 데이터를 저장하는 데 사용됨.
        
        const cacheKey = `post_${postId}`;// 백틱을 사용하여 캐시 키 생성. 예) post_1, post_2 등. localStorage에서 포스트 데이터를 저장하고 가져올 때 사용되는 키입
        // 각 포스트마다 고유한 키를 만들어서 가져올 때도 고유한 키로 가져올 수 있도록 함. 캐시 키는 post_ 접두사와 postId를 조합하여 생성됨. 예) postId가 1이면 cacheKey는 post_1이 됨.

        // localStorage에서 캐시 확인
        const cached = localStorage.getItem(cacheKey);// localStorage(브라우저 저장소)에서 cacheKey에 해당하는 데이터를 가져와서(getItem) cached 변수에 저장. 
        // 예) post_1 키에 해당하는 데이터가 있으면 cached 변수에는 그 데이터가 저장됨. 캐시가 없으면 null이 됨.

        // 캐시가 있으면 사용하고, 5분이 지나면 무시
        if (cached) {
            const data = JSON.parse(cached);// cached 데이터는 문자열로 저장되어 있으므로 JSON.parse를 사용하여 자바스크립트 객체로 변환하여 data 변수에 저장.
            const now = Date.now();// 현재시간 가져오기,현재 시간을 밀리초 단위로 가져와서 now 변수에 저장. 이 값은 캐시된 데이터의 유효성을 검사하는 데 사용됨.
            const FIVE_MIN = 5 * 60 * 1000;// 5분을 밀리초로 환산한 값. 캐시된 데이터가 5분 이내에 생성된 경우에만 사용하도록 하기 위해 정의됨. 
            // 5분은 300초이고, 1초는 1000밀리초이므로 5 * 60 * 1000으로 계산됨.

            // 5분 이내면 캐시 사용
            if (now - data.time < FIVE_MIN) {//현재 데이터 생성 시간이 5분보다 작으면 데이터 저장
            //  캐시된 데이터의 생성 시간과 현재 시간의 차이가 5분보다 작은 경우에만 캐시된 데이터를 사용하도록 함.
                console.log("Post loaded from localStorage");// 캐시된 데이터를 사용한다는 메시지를 콘솔에 출력. 이 메시지는 캐시에서 데이터를 가져왔음을 나타냄.
                post = data.post;// 캐시된 데이터에서 post 객체를 가져와서 post 변수에 저장. 이렇게 하면 API를 호출하지 않고도 포스트 데이터를 사용할 수 있음.
            }
        }

        // 캐시 없으면 fetch
        if (!post.id) {
            const response = await fetch(`${apiUrl}/posts/${postId}`);//서버요청(fetch) 기다림.데아터 요청. 
            // API에서 postId에 해당하는 포스트 데이터를 가져오기 위해 apiUrl/posts/postId로 요청을 보냄. 
            // 예) apiUrl이 https://jsonplaceholder.typicode.com이고 postId가 1이면 https://jsonplaceholder.typicode.com/posts/1로 요청이 보내짐.
            if (!response.ok) throw new Error("Failed to fetch post");// 서버 응답이 성공적이지 않으면 에러 발생"Failed to fetch post"는 요청 실패 시 표시되는 에러 메시지
            // response.ok는 요청 성공 여부를 확인하는 속성

            post = await response.json();// 서버에서 응답받은 데이터를 JSON으로 파싱하여 자바스크립트 객체로 변환하여 post 변수에 저장.
            //  이렇게 하면 API에서 가져온 포스트 데이터를 사용할 수 있음.

            // 캐시 저장
            localStorage.setItem(cacheKey, JSON.stringify({//  localStorage에 캐시 저장. setItem 메서드를 사용하여 cacheKey에 해당하는 데이터를 저장.
            //  데이터는 문자열로 저장되어야 하므로 JSON.stringify를 사용하여 객체를 문자열로 변환하여 저장.
                post: post,// 저장할 데이터는 post 객체를 포함하는 객체로 구성됨. 이렇게 하면 나중에 캐시에서 데이터를 가져올 때 post 객체를 쉽게 사용할 수 있음.
                time: Date.now()//시간 저장 
            }));

            console.log("Post fetched from API");// API에서 데이터를 가져왔다는 메시지를 콘솔에 출력. 이 메시지는 API를 통해 데이터를 가져왔음을 나타냄.
        }

        renderPost(post);// post 데이터를 화면에 렌더링하는 renderPost 함수를 호출하여 포스트 상세 정보를 화면에 표시.화면 출력 함수 실행
    } catch (error) {// 오류가 발생하면 콘솔에 에러 메시지를 출력하고 사용자에게 에러 메시지"Error loading post details"를 표시
        console.error("Error:", error.message);
        document.getElementById("post-detail").innerHTML = "<p>Error loading post details</p>";// 현재 html 안에서 "post-detail"인 요소를 찾아
        // 그 요소의 innerHTML을 "<p>Error loading post details</p>"로 설정하여 사용자에게 에러 메시지를 표시. 이 메시지는 포스트 상세 정보를 로드하는 데 실패했음을 나타냄.
        // .innerHTML은 html에 "p>Error loading post details</p>"를 삽입하여 화면에 표시
        //<div id="post-detail"> html구조
   // <p>Error loading post details</p>
    //</div>
    }
}

// 포스트 렌더링 함수
function renderPost(post) {// renderPost라는이름으로 함수를 만들어 post 객체를 매개변수로 받아서 화면에 포스트 상세 정보를 랜더링,보여줌, post 객체는 API에서 가져온 포스트 데이터를 포함하는 객체입니다. 
// 이 함수는 post 객체의 title과 body를 사용하여 HTML을 생성하고, 이를 화면에 표시합니다.post데이터를 가져와 화면에 출력하는 함수
    const postDetail = document.getElementById("post-detail");// 현재 html 안에서 "post-detail"인 요소를 찾아서 postDetail 변수에 저장. 이 요소는 포스트 상세 정보를 표시하는 데 사용됨.
    postDetail.innerHTML = `// html에 post 객체의 title과 body를 사용하여 포스트 상세 정보를 표시하는 HTML을 생성하여 postDetail 요소의 innerHTML로 설정.
        <h3>${post.title}</h3>// post 객체의 title을 h3 요소로 표시. 예) <h3>Post Title</h3>
        <p>${post.body}</p>// post 객체의 body.내용을 p 요소로 표시. 예) <p>Post body content...</p>
    `;
}

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail(); 
