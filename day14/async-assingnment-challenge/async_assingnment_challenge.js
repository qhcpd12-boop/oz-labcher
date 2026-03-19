//화면에서 보여줄 공간 선언,입력값을 담는 변수output->결과값담는 상자/document-브라우저화면에 보는,출력되는곳
//웹페이지(document)에서id가 output인 요소를 찾아서(querySelector)output 변수에 저장한다(const)
//"output이라는 이름의 상자를 만들고,화면에서 'output'이라고 적힌 공간을 찾아서그 상자에 넣어둔다"
const output = document.querySelector("#output");
const btnFetchPosts = document.querySelector("#fetchPosts");
const inputPostIds = document.querySelector("#postIds");

//()=>{}이 안에 함수를 실행해라 (arrow funtion)
const clearOutput = () => {//화면지우는 함수,지우기 버튼
  output.innerHTML = "";//html에서 보여지는outpit 갓은"" 없다
}
//게시글1개 가져오는 함수
const fetchPost = async (postId) => {
  try {
    let response = await fetch(//인터넷에 데이터 달라하고 기다려
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    let post = await response.json();//반응기다려 post변수에 저장해라
  } catch (error) {//문제생기면 여기로 와서
    document.getElementById("output").innerHTML =//화면에 에러출력하고 끝
      `<p>에러: ${error.message}</p>`;
    return null;
  }
};

const fetchMultiplePosts = async (postIds) => {//인터넷에서 여러개 가져오기
  const posts = [];///배열만들기
  for (const postId of postIds) {//postid g하나씩꺼내기
    const post = await fetchPost(postId);//포스트 인터넷에서 1개갖오고 기다리기
    posts.push(post);//posts[]배열에 저장
  }
  // posts 배열을 순회하며 post 정보 출력[글1,글2,글3]
};

const handleClickSearch = async () => {//버튼 클릭하면 실행되는 함ㅅ
  // inputPostIds에서 postIds 가져오기
  await fetchMultiplePosts(postIds);
};

btnFetchPosts.addEventListener("click", handleClickSearch);//버튼 클릭하먄함수실행