import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/question.css";

const Question1 = () => {


  const navigate = useNavigate()



  const [index, setindex] = useState(0);
  const [ques, setQues] = useState([]);
  const [givenAnswer, setgivenAnswer] = useState("");
  const [optionsArray, setoptionsArray] = useState([]);
  const [score , setScore] = useState(0);

  const [question, setQuestion] = useState();
  console.log("question...", question);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  // console.log("array: ",ques)
  // console.log("object: ",question)

  const [result, setResult] = useState(false);

  useEffect(() => {
    setQues(JSON.parse(localStorage.getItem("Questions")));
    setQuestion(JSON.parse(localStorage.getItem("Questions"))[index]);
    setoptionsArray(
      shuffleArray([
        ...JSON.parse(localStorage.getItem("Questions"))[index]
          ?.incorrect_answers,
        JSON.parse(localStorage.getItem("Questions"))[index]?.correct_answer,
      ])
    );
  }, []);
  // console.log("Questions===>",ques)

  const checkAnswer = (givenAns) => {
    if (givenAnswer === "") {
      setgivenAnswer(givenAns);
  
      if (givenAns === question.correct_answer) {
        setScore(prev => prev + 1);
      } else {
        setMinus(prev => prev + 1);
      }
    }
  };

  const nextQues = () => {
    if(givenAnswer === "") return
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      item.classList.remove("correct", "wrong");
    });
    setindex(index + 1);
    setQuestion(ques[index + 1]);
    setgivenAnswer("");
    setoptionsArray(
      shuffleArray([
        ...ques[index + 1]?.incorrect_answers,
        ques[index + 1]?.correct_answer,
      ])
    );

  };

  const reset = () => {
    setScore(0);
    setindex(0);
    setgivenAnswer("");
    navigate('/');
  };

  return (
    <>

    {index !== 10?
  <div className="container">
  <h1>Multiple Choice Questions</h1>
  <hr />
  {/* {result?<></>:<h2>{question?.question}</h2>} */}
  {result ? (
    <></>
  ) : (
    <h2>
      {index + 1}. {question?.question}
    </h2>
  )}
 <div key={index}>
<ul>
{question?.incorrect_answers &&
      question?.incorrect_answers.length > 0 &&
      optionsArray.map((answer, index) => (
        <li
          key={index}
          onClick={() => checkAnswer(answer)}  // Pass answer to checkAnswer
          data-answer={answer}
          className={`optionList ${
            givenAnswer !== "" ? (
              answer === question.correct_answer ? "correct" : 
              givenAnswer === answer ? "wrong" : ""
            ) : ""
          }`}
        >
          {answer}
        </li>
      ))}
</ul>
 </div>

  <button className="container_btn" onClick={nextQues} disabled={givenAnswer===""}>{givenAnswer===""?"choose one answer":"Next"}</button>
 <p>{index+1} out of {ques.length}</p>

  
</div>

:

<div className="container">
  <h1 style={{display:"flex", justifyContent:"center"}}>Done!!</h1>
  <hr />
  {/* {result?<></>:<h2>{question?.question}</h2>} */}
 
    <h2>
      Thanks For Completing Your Assesment
    </h2>
  <h2></h2>
  <p style={{display: "flex", justifyContent: "center", fontSize: "20px"}}>
  Total Score&nbsp;
  <span style={{fontWeight: "bold", color: "red"}}>{ques.length}</span>
</p>
  <p style={{display: "flex", justifyContent: "center", fontSize: "20px"}}>
  You Scored&nbsp;
  <span style={{fontWeight: "bold", color: "red"}}>{score}</span>
</p>


  {/* <p style={{display: "flex", justifyContent: "center", fontSize: "20px"}}>
  You Scored&nbsp;
  <span style={{fontWeight: "bold", color: "red"}}>{score}</span>
  &nbsp;out of&nbsp;
  <span style={{fontWeight: "bold", color: "red"}}>{ques.length}</span>
</p> */}
  <button onClick={reset}>Reset</button>
  
  
  
</div>
  }
      
    </>
  );
};

export default Question1;
