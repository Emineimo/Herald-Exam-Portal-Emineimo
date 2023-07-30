import React, { useState,useEffect } from 'react';
import Display from "./components/Display";
import Examinationpage from './components/Examinationpage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Donepage from './components/Donepage';
import Instructionpage from './components/Instructionpage';

function App() {
  const [Questions, setQuestions] = useState(null)
  const [ShuffledQuestion, setShuffledQuestion] = useState(null)
  const [subject, setSubject] = useState(null)
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [TermAccessible, setTermAccessible] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [TotalMinutes, setTotalMinutes] = useState(0)
  const [Shuffle, setShuffle] = useState(true)
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Display
          setTotalMinutes={setTotalMinutes}
            Questions={Questions}
            setQuestions={setQuestions}
            setSubject={setSubject}
            setPassword={setPassword}
            Password={Password}
            setShuffle={setShuffle}
            Shuffle={Shuffle}
            setUsername={setUsername}
            Username={Username}
            TotalMinutes={TotalMinutes}
            studentData ={studentData}
             setStudentData = {setStudentData}
            TermAccessible={TermAccessible}
            setTermAccessible={setTermAccessible}
            subject={subject} />} />
         <Route path='/Examinationpage' element={<Examinationpage
            Questions={Questions}
            setSubject={setSubject}
            subject={subject}
            setShuffle={setShuffle}
            Shuffle={Shuffle}
            TotalMinutes={TotalMinutes}
            setPassword={setPassword}
            Password={Password}
            setUsername={setUsername}
            studentData ={studentData}
             setStudentData = {setStudentData}
            TermAccessible={TermAccessible}
            setTermAccessible={setTermAccessible}
            Username={Username} />} />
          <Route path='/Donepage' element={<Donepage />} />
          <Route path='/instructionpage' element={<Instructionpage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;