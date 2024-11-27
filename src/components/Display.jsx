import React, { useEffect, useState } from "react";
import image3 from "../images/school.png";
import { getDatabase, get, child, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useLocation, useNavigate } from "react-router-dom";
import Examinationpage from "./Examinationpage";
// import loading from '../images/cloud-network.gif'
// import image1 from '../images/social-media.gif'
// import toast from "react-hot-toast";

const Display = ({
  Questions,
  setTotalMinutes,
  TotalMinutes,
  studentData,
  setStudentData,
  setQuestions,
  TermAccessible,
  setTermAccessible,
  setSubject,
  Shuffle,
  setShuffle,
  subject,
  Username,
  setUsername,
  Password,
  setPassword,
  setCurrentSession,
  currentSession
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    const pwShowHide = document.querySelectorAll("#eye-icon");

    pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", () => {
        let pwFields =
          eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach((password) => {
          if (password.type === "password") {
            password.type = "text";
            eyeIcon.classList.replace("bxs-hide", "bxs-show");
            return;
          }
          password.type = "password";
          eyeIcon.classList.replace("bxs-show", "bxs-hide");
        });
      });
    });
    if (studentData !== null) {
      container.classList.add("sign-up-mode");
    }
    if (studentData === null) {
      container.classList.add("sign-in-mode");
    }
    sign_up_btn.addEventListener("click", () => {
      setAuthenticating(true);

      setTimeout(() => {
        if (studentData == null) {
          // alert('slow')
          setAuthenticating(false);
          // container.classList.add("sign-up-mode");
        } else {
          setAuthenticating(false);
          container.classList.add("sign-up-mode");
        }
      }, 25000);
      // if (studentData !== null) {
      //   if (studentData === "error") {
      //     alert("Invalid Credentials")
      //   }
      //   else {

      //   }

      // }
      // else {

      //   alert("Not able to fetch data")
      //   //   // toast.success('Input your surname and password')
      // }
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      setStudentData(null);
      setSubject(null);
      setPassword(null);
      setUsername(null);
    });
  }, [studentData]);

  useEffect(() => {
    if (Password != null) {
      if (Password.length > 0) {
        if (Password.startsWith(0)) {
          const newPassword = Password.slice(1);
          setPassword(newPassword);
          //  alert(newPassword)
        }
      }
    }
  }, [Password]);
  const firebaseConfig = {
    apiKey: "AIzaSyBB82MW9ltnR4-nwVbiBSryoYxEDx_PMSs",

    authDomain: "herald-result-app.firebaseapp.com",

    databaseURL: "https://herald-result-app-default-rtdb.firebaseio.com",

    projectId: "herald-result-app",

    storageBucket: "herald-result-app.appspot.com",

    messagingSenderId: "902637284148",

    appId: "1:902637284148:web:8d451113d7a0a481e01361",

    measurementId: "G-9KYW17K3RS",
  };

  const [step, setStep] = useState(1);

  const [ListOfExaminationSubject, setListOfExaminationSubject] = useState([]);
  const [
    ListOfExaminationSubjectAvailable,
    setListOfExaminationSubjectAvailable,
  ] = useState(false);

  const [Authenticating, setAuthenticating] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const starCountRef = ref(db, "Examination/");
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  // });

  function getTermAccessible(e) {
    const dbRef = ref(getDatabase());

    try {
      var condition = navigator.onLine
        ? get(child(dbRef, "ListOfStudents/" + `${Password}`)).then(
          (snapshot) => {
            // setProcessingStudentVerification(false)
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data.Surname === Username) {
                ;
                setAuthenticating(false);

                get(child(dbRef, "TermAccessible/")).then((snapshot) => {
                  if (snapshot.exists()) {
                    const value = snapshot.val();
                    const currentTerm = value.TermAccessible
                    setTermAccessible(currentTerm);

                    //get the current session we're currently in
                    get(child(dbRef, "CurrentSession/")).then((CurrentSessionRetrieved) => {
                      if (CurrentSessionRetrieved.exists()) {
                        const session = CurrentSessionRetrieved.val();
                        const CurrentSessionData = session.session
                        console.log("data[CurrentSessionData]",data[CurrentSessionData])
                        
                        setCurrentSession(CurrentSessionData)
                        setCurrentSessionHere(CurrentSessionData)
                        const StudentClass = data[CurrentSessionData].Class
                        get(
                          child(
                            dbRef,
                            "Examination/" +
                            `${CurrentSessionData}/` +
                            `${currentTerm}/` +
                            `${StudentClass}/`
                          )
                        ).then((snapshot) => {
                          setStudentData(data)
                          if (snapshot.exists()) {
                            setListOfExaminationSubjectAvailable(true);
                            const hours = snapshot.val()?.OpenedSubject?.hours ?
                              JSON.parse(snapshot.val()?.OpenedSubject?.hours) * 60
                              : 0;
                            const minutes = snapshot.val()?.OpenedSubject?.minutes ?
                              JSON.parse(
                                snapshot.val()?.OpenedSubject.minutes
                              ) : 0;
                            setTotalMinutes(hours + minutes);
                            setShuffle(snapshot.val().OpenedSubject.Shuffle);
                            setSubject(
                              snapshot.val().OpenedSubject.OpenedSubject
                            );
                            ListOfExaminationSubject.push(
                              snapshot.val().OpenedSubject.OpenedSubject
                            );

                          } else {
                            alert(
                              "Examination has not been fixed for your class yet!"
                            );
                            setListOfExaminationSubject(null);
                          }
                        });
                      }
                      else { alert("There's currently no access to any session's data") }
                    })
                      
                  }
                  else{alert("There's no term open for academic activities")}
                });
              } else {
                setAuthenticating(false);
                alert("invalid credentials");
                setStudentData(null);
              }
            }
            else {
              alert("Invalid credentials")
            }
          }
        )
        : (setAuthenticating(false), alert("You're currently offline!"));
    } catch (error) {
      setAuthenticating(false);
      alert("something went wrong!");
      console.log("error", error);
    }
  }
  function GetQuestions(e) {
    studentData.Class == null
      ? alert("Student class not retrieved!")
      : subject == null
        ? alert("Please select subject")
        : ValidateCandidate();
  }
  function ValidateCandidate(e) {
    e.preventDefault();
    if (subject === null) {
      alert("No subect available for examination ");
    } else {
      if (subject === "Closed") {
        alert("No subect available for examination ");
      } else {
        if (subject !== "Closed") {
          try {
            const dbRef = ref(getDatabase());
            //   setProcessingStudentVerification(true)
            get(
              child(
                dbRef,
                "ListOfStudents/" +
                `${studentData.RegNo}/` +
                `${currentSession}/` +
                `${TermAccessible}/` +
                `${subject}/`
              )
            ).then((snapshot) => {
              // setProcessingStudentVerification(false)
              if (snapshot.exists()) {
                // setProcessingLogin(false);
                alert(`You have already sat for ${subject} examination`);
              } else {
                proceedToGetQuestions();
                // setStep(2);
                // navigate("/Examinationpage");
              }
            });
          } catch (error) {
            console.log("error", error);
            alert("Something went wrong");
            // setGettingQuestions(false)
          }
        }
      }
    }
  }
  function proceedToGetQuestions(params) {
    try {
      const dbRef = ref(getDatabase());
      // setGettingQuestions(true)
      get(
        child(
          dbRef,
          "Examination/" +
          `${currentSession}/` +
          `${TermAccessible}/` +
          `${studentData?.[currentSession]?.Class}/` +
          "Questions/" +
          `${subject}/`
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          // setGettingQuestions(false)
          // setStage(3)
          // const data = snapshot.val();
          if (Shuffle == true) {
            const data = snapshot.val().sort((a, b) => 0.5 - Math.random())
            const val = []
            data.map((data, i) => val.push(data));
            setQuestions(val);
            setStep(2)
          } if (Shuffle == false) {
            // alert("NoShuffle",Shuffle)
            const data = snapshot.val()
            const val = []
            data.map((data, i) => val.push(data));
            setQuestions(val);
            setStep(2)
          }
          else {
            const data = snapshot.val().sort((a, b) => 0.5 - Math.random())
            const val = []
            data.map((data, i) => val.push(data));
            setQuestions(val);
            setStep(2)
          }

        } else {
          alert("No examination ready for your class");
          // setGettingQuestions(false)
        }
      });
    } catch (error) {
      alert("something went wrong");
      // setGettingQuestions(false)
    }
  }
  function SignOut(params) {
    setUsername(null);
    setPassword(null);
    setAuthenticating(null);
    setStudentData(null);
  }
  const [currentSessionHere, setCurrentSessionHere] = useState(null);
  console.log("currentSessionHere:", currentSessionHere)
  return (
    <>
      {step == 1 && (
        <div className="sign">
          <div className="container">
            <div className="signin-signup">
              <form
                role="form"
                className="sign-in-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <h2 className="title">LOG IN</h2>
                <div className="input-field">
                  {/* {studentData != null&&
            <i className="fas fa-user">{studentData.imageURL}</i>} */}
                  <i className="fas fa-user"> </i>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={Username}
                    type="text"
                    placeholder="Username"
                    required
                  />
                </div>

                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    // value="password"
                    type="password"
                    placeholder="Reg.no"
                    required
                    className="password"
                  />
                  <i className="bx bxs-hide " id="eye-icon"></i>
                </div>
                {Authenticating && <div className="loader"></div>}
                <input
                  type="submit"
                  value="Login"
                  className="btn"
                  id="sign-up-btn"
                  onClick={getTermAccessible}
                />
              </form>
              <form className="sign-up-form">
                <div className="second-div">
                  <div className="third-div">SELECT SUBJECT</div>
                  {ListOfExaminationSubjectAvailable === true ? (
                    <div className="subject">{subject}</div>
                  ) : (
                    <p className="error">
                      No Subject Available For Examinations
                    </p>
                  )}

                  <input
                    type="submit"
                    onClick={ValidateCandidate}
                    value={"Start"}
                    className="btn1"
                  />
                </div>
              </form>
            </div>
            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  {studentData === null ? (
                    <div className="done-img">
                      {/* <img src={image1} alt="loading..." className="done" /> */}
                    </div>
                  ) : (
                    <div className="circles">
                      <div className="circle">
                        {studentData != null && (
                          <img src={studentData.imageURL} alt="loading..." />
                        )}
                        {/* {studentData != null&&
            <i className="fas fa-user">{studentData.imageURL}</i>} */}
                        {/* {studentData != null&&
        <i className="fas fa-user">{studentData.profile_picture}</i>} */}
                        {/* <i class="bx bx-user user"></i> */}
                      </div>
                      <p style={{ fontSize: 20 }}>
                        {studentData.RegNo.toString().length == 1 ? (
                          <b>00{studentData.RegNo}</b>
                        ) : studentData.RegNo.toString().length == 2 ? (
                          <b> 0{studentData.RegNo}</b>
                        ) : studentData.RegNo.toString().length > 2 ? (
                          <b>{studentData.RegNo}</b>
                        ) : (
                          <b>0{studentData.RegNo}</b>
                        )}
                      </p>
                      <p style={{ fontSize: 21 }}>
                        {studentData != null && (
                          <b>
                            {studentData.Surname}, {studentData.FirstName}{" "}
                            {studentData.MiddleName}
                          </b>
                        )}
                      </p>
                      <p id="smaller">of</p>
                      <p style={{ fontSize: 20 }}>
                        {studentData != null && <b> {studentData?.[currentSessionHere]?.Class} </b>}
                      </p>
                    </div>
                  )}

                  <input
                    type="submit"
                    value={"SIGN OUT"}
                    id="sign-in-btn"
                    className="btn"
                    onClick={SignOut}
                    style={{ marginTop: 60 }}
                  />
                </div>
              </div>
              <div className="panel right-panel">
                <div className="content">
                  <img src={image3} alt="loading" className="logo" />
                  <h1 className="motto">MOTTO: FOR THE BEST</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {step == 2 && (
        <Examinationpage
          Questions={Questions}
          setSubject={setSubject}
          subject={subject}
          TotalMinutes={TotalMinutes}
          setPassword={setPassword}
          Password={Password}
          setUsername={setUsername}
          studentData={studentData}
          setStudentData={setStudentData}
          TermAccessible={TermAccessible}
          setTermAccessible={setTermAccessible}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
          Username={Username}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default Display;
