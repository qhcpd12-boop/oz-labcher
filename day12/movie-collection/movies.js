// 영화 배열 선언
let movies = [];

// const 사용 (기본 장르)바뀌지 않는 변수
const defaultGenre = "Unknown";

// var 사용 (반복문 카운트) 숫자세는 변수
var count;

// 영화 객체 생성
let movie1 = {
  title: "Splash",
  director: "Ron Howard",
  year: 1984,
  genre: "Romance/Fantasy"
};
//movie1의 타이틀,감독,,년도,장르를 하나의 정보롤 만든다
let movie2 = {
  title: "The Notebook",
  director: "Nick Cassavetes",
  year: 2004,
  genre: "Romance/Drama"
};

let movie3 = {
  title: "Always",
  director: "Song Il-gon",
  year: 2011,
  genre: "Romance"
};

// 배열에 영화 추가 /배열에 데이터를 추가하는 함수 push()
movies.push(movie1);
movies.push(movie2);
movies.push(movie3);

// 장르 검색 함수->영화배열 중 찾고싶은 장르치면
function searchByGenre(movies, genre) {
  console.log(genre + " Movies:");
let found = false; // 영화 찾았는지 확인 거짓이면 반복 참이면 끝
//반복문 for
for (count = 0; count < movies.length; count++) {
let movie = movies[count];
if (movie.genre === genre) {
console.log(
        (count + 1) +
        ". Title: " + movie.title +
        ", Director: " + movie.director +
        ", Year: " + movie.year +
        ", Genre: " + movie.genre
      );
found = true;
    }
  }//Romance Movies를 치면 1.Tittle,감독,년도,장르가 나옴

  // 결과 없을 때 !는 부정문 찾지 못했을 때
  if (!found) {
    console.log("No movies found for genre: " + genre);
  }
}

// 함수 실행 장르검색 (예: Romance 검색)
searchByGenre(movies, "Romance");

// 영화 목록 출력 함수 function print()
function printMovies(movies, director = "Unknown") {

  console.log("Movie Collection:");

  //반복문 for()
  for (count = 0; count < movies.length; count++) {

    let movie = movies[count];//->0부터 영화개수만큼 하나씩+해서 센다
    //->movies[0]->splash로 출력 각각 출력

    // 빈 값 확인ㄴ
    if (!movie.title) movie.title = "Unknown";
    if (!movie.director) movie.director = director;
    if (!movie.genre) movie.genre = defaultGenre;//->defaultGenre는 장르의 기본값

    console.log(
      (count + 1) +//count는 0부터 시작 +1해서 1,2,3으로 출력
      ". Title: " + movie.title +
      ", Director: " + movie.director +
      ", Year: " + movie.year +
      ", Genre: " + movie.genre
    );
  }
//총 영화개수 lenghth는 배열의 길이
  console.log("Total Movies:", movies.length);
}
//현재 movies는 3개, Total Movies:3으로 콘솔에 출력

// 함수 실행
printMovies(movies);
//->movies 매열에 전달.그래서 영화목록이 콘솔에 출력

// 평균 출판년도 계산 ->영화들의 평균 연도를 계산하는 함수 calculateAverageYear 
//movies의 배열안에 있는 모든 영화 년도를 평균으로 계산한다 0배열부터+1씩모든배열을 더하며 반복
const calculateAverageYear = function(movies) {
let sum = 0;
for (let i = 0; i < movies.length; i++) {
    sum += movies[i].year;//->영화0번재 배열부터 년도를 더한다 sum=sum+year
  }
 return sum / movies.length;//총합년도 나누기 영화 갯수
};
//평균 년도출력
let avgYear = calculateAverageYear(movies);//모든 영화의 평균 년도를 avgYear에 저장
console.log("Average Year:", avgYear);//콘솔에 출력. ""는 출력되는 문자,avgYear은 평균 연도가 계산된값

// 가장 최신 영화 찾기
const findNewestMovie = (movies) => {
let newest = movies[0]; // 첫 번째 영화를 최신영화기준 영화로 시작 ,
//영화목록 0번재목록부터 최신영화기준삼고 반복
for (let i = 1; i < movies.length; i++)//영화배열에 1+씩 끝까지 검사
 {
 if (movies[i].year > newest.year) {//현재 영화 [1열]의 영화의 년도가>현재최신 년도이면
  newest = movies[i];//최신영화는 movies[i]에 있는 영화로 교체, 끝까지 반복
    }
  }
  return newest;//가장 최신영화 객체를 출력
};
//최신영화는 최신영화찾기함수 실행->movies배ㅐ열의 함수전달,함수가 가장 최신 객체 찾음
//결과를 newstMovie에 저장
let newestMovie = findNewestMovie(movies);

console.log(
  "Newest Movie:",
  newestMovie.title + " (" + newestMovie.year + ")"
);//최신영화 제목""은 영화 개봉년도
//Always(2011)로 츨력