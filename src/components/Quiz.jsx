import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../UserContext";

function Quiz() {
  const { updateData } = useData();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [ans, setAns] = useState([]);
  const [userData, setUserdata] = useState(null); // Initialize as null
  const [questions, setQuestions] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const categories = [18, 21, 30, 17, 9, 27, 11];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const res = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy`
        );
        const { data } = res;
        if (data.results) {
          const Result = data.results.map((question) => ({
            question: question.question,
            answers: [...question.incorrect_answers, question.correct_answer],
          }));
          setQuestions(Result);
          setUserdata(data.results);
          setIsLoading(false); // Set loading state to false when data is fetched
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };
    

    const debouncedFetch = debounce(fetchQuestions, 500); // Debounce API call
    debouncedFetch();

    return () => {
      // Cleanup function to clear debounced function
      debouncedFetch.cancel();
    };
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    const debouncedFunction = (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
    debouncedFunction.cancel = () => clearTimeout(timeoutId);
    return debouncedFunction;
  };

  const handleAnswerClick = (selectedOption) => {
    if (!selectedOption) {
      alert("Please select an answer before proceeding.");
      return;
    }

    const questionData = userData[activeQuestion];
    const updatedAns = [
      ...ans,
      { Answer: selectedOption, Question: questionData?.question },
    ];
    setAns(updatedAns);

    if (activeQuestion < (userData?.length || 0) - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else if (activeQuestion === (userData?.length || 0) - 1) {
      const updatedData = {
        userSelected: updatedAns,
        userData: userData,
      };

      updateData(updatedData);
      navigate("/report");
    }
  };

  const handlePreviousClick = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  // Render loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="quizz_top_text text-center pl-[10px] bg-[#183f49b0] ">
        <span style={{ color: "white" }}>Quizzly </span>{" "}
        <span style={{ textTransform: "capitalize" }}>{localStorage.name}</span>
      </div>
      <hr className="mt-[1px] bg-[#def0f3] h-[3px]" />
      <div className="quizz_container">
        <div className="bg-[#0b1f227a] question_container">
          <div className="questioncount">Question {activeQuestion + 1}</div>
          <div className="question_Q">
            <p>{userData?.[activeQuestion]?.question || "Waiting for data..."}</p>
          </div>
          <ul className="ul">
            {questions?.[activeQuestion]?.answers?.map((option, index) => (
              <li
                className="li"
                key={index}
                onClick={() => handleAnswerClick(option)}
              >
                <button className="option_btn">{option || "Waiting for data..."}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#32327b3d] number_Table">
          <div className="card">
            <div
              className="card-body"
              style={{
                display: "flex",
                padding: 10,
                flexWrap: "wrap",
              }}
            >
              {userData?.map((item, index) => (
                <div
                  key={index}
                  className="question_no"
                  style={{
                    backgroundColor:
                      index === activeQuestion
                        ? "#94cfe7"
                        : ans.findIndex(
                            (answer) => answer.Question === item.question
                          ) > -1
                        ? "#FFFF00" // yellow for answered questions
                        : "white", // green for unanswered questions
                  }}
                  onClick={() => setActiveQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pl-[46px] pt-[-15px] pre_next_div">
        <button
          onClick={handlePreviousClick}
          className="rounded-sm font-bold prev_btn bg-[#FDAB00] cursor-pointer active:bg-[#FDAB00 ] text-[white] border-0 py-[15px] px-8"
          disabled={activeQuestion === 0}
        >
          PREV
        </button>
        <button
          onClick={() => handleAnswerClick()}
          className="rounded-sm font-bold bg-[#0179a9] cursor-pointer active:bg-[#c4bbf0] text-[white] border-0 py-[15px] px-8 next_btn"
        >
          NEXT
        </button>
      </div>
    </>
  );
}

export default Quiz;
