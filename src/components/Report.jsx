import React, { useState, useEffect } from "react";
import { useData } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Report() {
  const {
    data: { userSelected, userData },
  } = useData();
  const navigate = useNavigate();
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    // Calculate total correct answers
    let correctCount = 0;
    userSelected.forEach((userAnswer, index) => {
      const correctAnswer = userData[index]?.correct_answer;
      if (userAnswer?.Answer === correctAnswer) {
        correctCount++;
      }
    });
    setTotalCorrect(correctCount);
  }, [userSelected, userData]);

  const back = () => {
    navigate("/quiz");
  };

  const printTable = () => {
    window.print();
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center mt-10 print-hidden">
        <button className="login_btn" onClick={back} style={{ width: "auto" }}>
          Back to Quiz
        </button>
        <span className="mt-5">Total Correct Answers: {totalCorrect}</span>
      </div>

      <div className="flex justify-center pt-[30px] table_container">
        <table className="bg-[#f4f7f5ba]">
          <thead>
            <tr>
              <th className="pl-[100px] head">Questions</th>
              <th className="head"> Your Answer</th>
              <th className="head">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {userSelected.map((userAnswer, index) => {
              const correctAnswer = userData[index]?.correct_answer;
              const isCorrect = userAnswer?.Answer === correctAnswer;
              const backgroundColor = isCorrect ? "bg-green-200" : "bg-red-200";

              return (
                <tr key={index}>
                  <td
                    className="h-[20px] "
                    style={{
                      textAlign: "start",
                      backgroundColor: "#33A0FF",
                      color: "white",
                      width: "60%",
                      height:"auto",
                      padding:"5px 5px",
                      marginTop:"20px"
                    }}
                  >
                    {userAnswer?.Question}
                  </td>
                  <td className={backgroundColor}>{userAnswer?.Answer}</td>
                  <td style={{backgroundColor:"#C3BDFF"}}>{correctAnswer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center flex-col items-center mt-10 print-hidden">
        <button
          onClick={printTable}
          className="rounded-sm font-bold bg-[#0179a9] cursor-pointer active:bg-[#c4bbf0] text-[white] border-0 py-[15px] px-8 "
        >
          Print
        </button>
      </div>
    </>
  );
}

export default Report;
