import './App.css';
import { useState } from "react";
import Question from "./components/Question";

const QUESTIONS = [
  {
    questionText: "Covid-19 xuất hiện lần đầu tiên ở nước nào ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Viet Nam" },
      { id: 2, isCorrect: false, answerText: "USA" },
      { id: 3, isCorrect: true, answerText: "China" },
      { id: 4, isCorrect: false, answerText: "India" }
    ]
  },
  {
    questionText: "Khẩu hiệu 5K là gì ? ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Không đeo khẩu trang" },
      { id: 2, isCorrect: false, answerText: "Không tụ tập nơi đông người " },
      { id: 3, isCorrect: false, answerText: "Không ra đường" },
      {
        id: 4,
        isCorrect: true,
        answerText:
          "Khoảng cách - Khẩu trang - Khử khuẩn - Khai báo y tế - Khử khuẩn"
      }
    ]
  },
  {
    questionText: "Thực hiện giãn cách xã hội tối thiểu trong bao nhiêu ngày ?",
    answerOptions: [
      { id: 1, isCorrect: true, answerText: "15 ngày" },
      { id: 2, isCorrect: false, answerText: "7 ngày" },
      { id: 3, isCorrect: false, answerText: "21 ngày" },
      { id: 4, isCorrect: false, answerText: "1 tháng" }
    ]
  },
  {
    questionText:
      "Hiện tại tỉnh thành nào ở Việt Nam có số ca mắc nhiều nhất ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Hà Nội" },
      { id: 2, isCorrect: true, answerText: "Hồ Chí Minh" },
      { id: 3, isCorrect: false, answerText: "Bắc Giang" },
      { id: 4, isCorrect: false, answerText: "Bắc Ninh " }
    ]
  }
];

let TIME_LIMIT = 10;

function shuffeQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function play() {
  let audio = document.getElementById("audio");
  audio.play();
}

function pause() {
  let audio = document.getElementById("audio");
  audio.pause();
}

let newArr = shuffeQuestions(QUESTIONS);

function Quizz() {
  const [questions, setQuestions] = useState(newArr);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [userAnswers, setUserAnswers] = useState([]);

  function startQuizz() {
    play();
    setCurrentQuestion(0);
    setTimer(TIME_LIMIT);
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setCurrentQuestion((prevQuestion) => {
            if (prevQuestion < questions.length - 1) {
              return prevQuestion + 1;
            } else {
              clearInterval(interval);
              return setShowScore(true);
            }
          });
        }
        return timer;
      });
    }, 1000);
  }

  function handleAnswerClick(e, answer) {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, answer];
    });

    let checkEle = questions[currentQuestion].answerOptions.find(
      (answer) => answer.isCorrect
    );

    let listBtn = Array.from(document.querySelectorAll(".answer-ctn"));

    listBtn.forEach((item) => {
      item.disabled = true;
      if (item.id == checkEle.id) {
        item.classList.add("correct");
      } else {
        item.classList.add("incorrect");
      }
    });

    if (answer.isCorrect) {
      setScore(score + 1);
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setTimer(TIME_LIMIT);
        e.target.classList.remove("correct");
        e.target.classList.remove("incorrect");

        listBtn.forEach((item) => {
          item.disabled = false;
          item.classList.remove("correct");
          item.classList.remove("incorrect");
        });
      } else {
        setShowScore(true);
      }
    }, 2000);
  }

  function handleReset() {
    setShowScore(false);
    setQuestions(newArr);
    setCurrentQuestion(null);
    setUserAnswers([]);
    pause();
  }

  return (
    <div className="App">
      <div className="container">
        {currentQuestion === null && (
          <div>
            <h1>Quizz Covid-19</h1>
            <button className="btn start-btn" onClick={() => startQuizz()}>
              Start Game
            </button>
          </div>
        )}

        {currentQuestion !== null && (
          <Question
            questions={QUESTIONS}
            currentQuestion={currentQuestion}
            click={handleAnswerClick}
            reset={handleReset}
            showScore={showScore}
            score={score}
            timer={timer}
            userAnswers={userAnswers}
            condition={TIME_LIMIT}
          />
        )}
      </div>
    </div>
  );
}

export default Quizz;
