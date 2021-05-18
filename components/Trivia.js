import Styles from "/styles/Home.module.css";
import { useState, useEffect } from "react";
import useSound from "use-sound";
// import play from "./sounds/play.wav";
function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
  const play = "/play.mp3";
  const corrects = "/correct.mp3";
  const wrongs = "/wrong.mp3";
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(corrects);
  const [wrongAnswer] = useSound(wrongs);
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick = (a, qid) => {
    console.log(qid);
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(1000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(4000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  if (question?.id <= 15) {
    return (
      <div className={Styles.trivia}>
        <div className={Styles.question}>{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a) => (
            <div
              key={a.id}
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleClick(a, question?.id)}
            >
              {a.text}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className={Styles.won}>You won ONE CRORE</div>;
  }
}

export default Trivia;
