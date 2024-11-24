import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDatabase,
  get,
  child,
  ref,
  update,
  onValue,
} from "firebase/database";

import image1 from "../images/Done.gif";
const Examinationpage = ({
  TotalMinutes,
  Questions,
  TermAccessible,
  setTermAccessible,
  studentData,
  setStudentData,
  setSubject,
  subject,
  setStep,
  Username,
  setUsername,
  Password,
  setPassword,
  setCurrentSession,
  currentSession
}) => {
  const [currentNo, setCurrentNo] = useState(0);
  const [checked, setchecked] = useState("first");
  const [minute, setMinute] = useState(TotalMinutes);
  const [seconds, setSeconds] = useState(0);
  const [myanswer, setmyanswer] = useState([]);
  const [StudentAnswers, setStudentAnswers] = useState([]);
  const [start, setStart] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [scenerio, setScenerio] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [uploadingScore, setUploadingScore] = useState(false);
  const [scoreUploadfailed, setScoreUploadfailed] = useState(false);
  const navigate = useNavigate();
  // console.log("Questions",Questions)
  // const startingminute = 120;
  // let time = startingminute * 60;

  // const countdownEl = document.getElementById("countdown");
  // setInterval(updateCountdown, 1000);
  // function updateCountdown(e) {
  //   const minutes = Math.floor(time / 60);
  //   let seconds = time % 60;
  //   seconds = seconds < 10 ? '0' + seconds : seconds;
  //   countdownEl.innerHTML = `${minutes} : ${seconds}`;
  //   time--;
  // }

  setInterval(() => {
    setConnectionStatus(navigator.onLine.valueOf());
    // console.log("Your'enowconneced",navigator.onLine.valueOf());
  }, 3000);
  // console.log("Your'enowconneced",navigator.onLine.valueOf());

  function finish() {
    setUploadingScore(true);
    try {
      const br = [];
      myanswer.filter((data, i, a) => {
        if (data > 0) {
          br.push(data);
        }
      });
      let score = br.length;
      setScore(br.length);
      // alert(score)
      setSubmitted(true);
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      update(
        ref(
          db,
          "ListOfStudents/" + `${Password}/` + `${currentSession}/` +`${TermAccessible}/` + subject
        ),
        {
          subject: score,
          // Subjects_Handled: []
        }
      ).then(
        //   setProcessingStudentVerification(true)
        get(
          child(
            dbRef,
            "ListOfStudents/" +
              `${Password}/` +
              `${currentSession}/` +
              `${TermAccessible}/` +
              `${subject}/`
          )
        ).then((snapshot) => {
          // setProcessingStudentVerification(false)
          if (snapshot.exists()) {
            alert(`Score Uploaded`);
            setUploadingScore(false);
            setScoreUploadfailed(false);
          } else {
            setUploadingScore(false);
            setScoreUploadfailed(true);
            // proceedToGetQuestions();
            // setStep(2);
            // navigate("/Examinationpage");
          }
        })
        // } catch (error) {
        //   console.log("error", error)
        //   alert('Something went wrong');
        //   // setGettingQuestions(false)
        // }
      );
    } catch (error) {
      alert(error);
      setScoreUploadfailed(true);
    }
  }
  function retryScoreUpload() {
    setUploadingScore(true);
    try {
      const br = [];
      myanswer.filter((data, i, a) => {
        if (data > 0) {
          br.push(data);
        }
      });
      let score = br.length;
      setScore(br.length);
      // alert(score)
      setSubmitted(true);
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      update(
        ref(
          db,
          "ListOfStudents/" + 
          `${Password}/` + 
          `${currentSession}/` +
          `${TermAccessible}/` +
           subject
        ),
        {
          subject: score,
          // Subjects_Handled: []
        }
      ).then(
        //   setProcessingStudentVerification(true)
        get(
          child(
            dbRef,
            "ListOfStudents/" +
              `${Password}/` +
              `${currentSession}/` +
              `${TermAccessible}/` +
              `${subject}/`
          )
        ).then((snapshot) => {
          // setProcessingStudentVerification(false)
          if (snapshot.exists()) {
            alert(`Score Uploaded`);
            setUploadingScore(false);
            setScoreUploadfailed(false);
          } else {
            setUploadingScore(false);
            setScoreUploadfailed(true);
            // proceedToGetQuestions();
            // setStep(2);
            // navigate("/Examinationpage");
          }
        })
        // } catch (error) {
        //   console.log("error", error)
        //   alert('Something went wrong');
        //   // setGettingQuestions(false)
        // }
      );
    } catch (error) {
      alert(error);
      setScoreUploadfailed(true);
    }
  }
  // useEffect(() => {

  //  const data = Questions.sort((a,b)=> 0.5 - Math.random())
  //   ShuffleArray(Questions)
  // }, [Questions])

  // For Timer

  useEffect(() => {
    if (start == true) {
      if (minute > -1) {
        const timer = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);

        if (seconds == 0) {
          setMinute(minute - 1);
          setSeconds(59);
        }

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [seconds]);

  useEffect(() => {
    if (minute == -1) {
      setSubmitted(true);
      finish();
      setScenerio("Time Up");
    }

    // return () => {
    //   second
    // }
  }, [seconds]);

  // Marking system
  useEffect(() => {
    if (Questions) {
      StudentAnswers[currentNo - 1] === Questions[currentNo][2]
        ? (myanswer[currentNo] = 1)
        : (myanswer[currentNo] = 0);
    }
  }, [checked]);

  useEffect(() => {
    if (StudentAnswers[currentNo - 1] == "A") {
      setchecked(0);
    } else {
      if (StudentAnswers[currentNo - 1] == "B") {
        setchecked(1);
      } else {
        if (StudentAnswers[currentNo - 1] == "C") {
          setchecked(2);
        } else {
          if (StudentAnswers[currentNo - 1] == "D") {
            setchecked(3);
          } else {
            setchecked("z");
          }
        }
      }
    }
  }, [currentNo]);

  //Shuffling
  const ShuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    // return array
  };
  function refresh() {
    // navigate("/")
    setStep(1);
    setStudentData(null);
    setSubject(null);
    setPassword(null);
    setUsername(null);
  }
  return (
    <>
      {submitted === true && (
        <div>
          {uploadingScore ? (
            <div
              className="ScoreUploadLoaderDiv"
              style={{
                justifycontent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 20,
                width: "100%",
              }}
            >
              <div className="ScoreUploadLoader"></div>
              <h4 className="UploadingResult">Uploading Result.</h4>
              <div className="dones">
                <button
                  type="submit"
                  className="back-btns"
                  onClick={retryScoreUpload}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="done-img">
                <img src={image1} alt="loading..." className="done" />
              </div>
              <div className="info">
                <h3>{scenerio}!</h3>
                <p>
                  You have successfully <br /> completed the examination.
                </p>
              </div>
              <div className="dones">
                <button type="submit" className="back-btns" onClick={refresh}>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {submitted === false && (
        <div className="Examinationpage">
          {Questions !== null && (
            <div className="second">
              <div className="exam-subject">
                <h3>{subject}</h3>
                {!connectionStatus && (
                  <h4
                    style={{
                      backgroundColor: connectionStatus ? null : "red",
                      // position:'absolute',
                      width: "100%",
                      color: "white",
                    }}
                  >
                    No Internet connection
                  </h4>
                )}
              </div>
              <div className="question-num">
                <div className="question-div">
                  {Questions ? (
                    <p>
                      <span className="medium">Question</span>
                      <span className="big">{currentNo + 1}</span>/
                      {Questions.length}
                    </p>
                  ) : null}
                </div>
                <div className="countdown">
                  {seconds ? (
                    <div id="countdown">
                      {minute.toString().length > 1 ? (
                        <h1
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: 20,
                          }}
                        >
                          {minute} :{" "}
                        </h1>
                      ) : (
                        <h1
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: 20,
                          }}
                        >
                          0{minute} :{" "}
                        </h1>
                      )}

                      {seconds.toString().length > 1 ? (
                        <h1
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: 20,
                          }}
                        >
                          {seconds}
                        </h1>
                      ) : (
                        <h1
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: 20,
                          }}
                        >
                          0{seconds}
                        </h1>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="timer">
                  <button onClick={finish} className="submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
              {Questions ? (
                <div className="flexbox">
                  <div className="question-area">
                    <>
                      {Questions[currentNo][0] ? (
                        <div className="Instruction">
                          <p className="instruction-p">Instruction: {Questions[currentNo][0]}</p>
                        </div>
                      ) : null}
                    </>

                    <div className="question">
                      <p>{Questions[currentNo][1]}</p>
                    </div>
                    <div className="flexing">
                      <div className="QuestionImage">
                        <>
                          {Questions[currentNo][3] ? (
                            <img
                              src={Questions[currentNo][3]}
                              alt="alternatetext"
                              className="exam-image"
                            />
                          ) : null}
                        </>
                      </div>
                      {Questions[currentNo][4].Options.map((data, index) => (
                        <div
                          className="exam-div"
                          value={index}
                          onClick={() => {
                            setchecked(index);
                            if (index === 0) {
                              StudentAnswers[currentNo - 1] = "A";
                            } else {
                              if (index === 1) {
                                StudentAnswers[currentNo - 1] = "B";
                              } else if (index === 2) {
                                StudentAnswers[currentNo - 1] = "C";
                              } else if (index === 3) {
                                StudentAnswers[currentNo - 1] = "D";
                              }
                            }
                          }}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <input
                            className="radio-input"
                            id="radios"
                            type="radio"
                            name="Questions"
                            onClick={() => {
                              setchecked(index);
                              if (index === 0) {
                                StudentAnswers[currentNo - 1] = "A";
                              } else {
                                if (index === 1) {
                                  StudentAnswers[currentNo - 1] = "B";
                                } else if (index === 2) {
                                  StudentAnswers[currentNo - 1] = "C";
                                } else if (index === 3) {
                                  StudentAnswers[currentNo - 1] = "D";
                                }
                              }
                            }}
                            value={index}
                            checked={checked === index}
                          />
                          <div className="options">
                            <p>{data}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="back-btn"
                      type="submit"
                      onClick={() =>
                        currentNo > 0
                          ? (setCurrentNo(currentNo - 1),
                            setScenerio("Congratulations"))
                          : null
                      }
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        currentNo < Questions.length - 2 / 2
                          ? setCurrentNo(currentNo + 1)
                          : null
                      }
                      className="back-btn"
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                  <div className="numbers">
                    {Questions.map((data, index) => (
                      <div ref={data}>
                        <button
                          className="btns "
                          onClick={() => setCurrentNo(index)}
                          style={{
                            backgroundColor:
                              StudentAnswers[index - 1] == null
                                ? "lightgrey"
                                : StudentAnswers[index - 1] > 0
                                ? "lightgrey"
                                : "#d6491e",
                            borderWidth: 2,
                            borderColor: index === currentNo ? "green" : "grey",
                          }}
                        >
                          {index + 1}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Examinationpage;
