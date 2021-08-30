export default function Score({ score, userAnswers, reset, timer, condition }) {

    return (
      <div className="score-ctn">
        <h3 className="text-dark">Your Score: {score}</h3>
        {userAnswers.map((user, index) => (
          <p className="text-dark" key={index}>
            {index + 1}.{" "}
            <span className={user.isCorrect ? "text-success" : "text-danger"}>
              {user.answerText}{" "}
            </span>
          </p>
        ))}
        <button
          className="mt-3 btn btn-primary"
          onClick={reset}
          disabled={timer != condition}
        >
          {timer != condition ? <div className='loader'></div> : 'Reset Quizz' }
        </button>
      </div>
    );
  }
  