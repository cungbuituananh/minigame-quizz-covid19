import Score from "./Score";

export default function Question({
  questions,
  currentQuestion,
  click,
  showScore,
  score,
  timer,
  userAnswers,
  reset,
  condition,
}) {
  return (
    <div>
      {showScore ? (
        <Score
          score={score}
          userAnswers={userAnswers}
          reset={reset}
          timer={timer}
          condition={condition}
        />
      ) : (
        <div>
          <div className="d-flex justify-content-around">
            <h5>
              <i className="bi bi-clock-history"></i> Time: {timer}s
            </h5>
            <h5>
              <i className="bi bi-question-circle"></i> Question:{" "}
              <span>{currentQuestion + 1}</span> / {questions.length}
            </h5>
          </div>

          <h4 className="my-4">{questions[currentQuestion].questionText}</h4>

          <div className="row justify-content-center gap-3">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                className="answer-ctn col-md-5 col-lg-2"
                id={answerOption.id}
                key={answerOption.id}
                onClick={(e) => click(e, answerOption)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
