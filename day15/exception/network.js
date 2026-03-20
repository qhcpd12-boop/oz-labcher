async function createPost() {
        try {
          let response = await fetch(
            "https://jinvalible-url.com/posts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },//url이 잘못되어서 네트워크 오류가 발생할 수 있음.다음 함수 실행 안됨
              body: JSON.stringify({
                title: "새 게시물",
                body: "내용",
                userId: 1,
              }),
            },
          );
          let data = await response.json();
          console.log("게시물 생성 성공:", data);
        } catch (error) {//네트워크 오류가 발생하면 여기로 와서 에러메시지 출력
          console.error("게시물 생성에 실패했습니다. 네트워크 오류:", error);
        }
      }
      createPost();