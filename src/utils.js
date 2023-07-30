import { getDatabase, ref, get, child, set } from "firebase/database";
function ProceedToLogin(Password) {
    // setProcessingLogin(true)
    try {
        const dbRef = ref(getDatabase());
        //   setProcessingStudentVerification(true)
        get(child(dbRef, 'ListOfStudents/' + `${Password}`)).then((snapshot) => {
            // setProcessingStudentVerification(false)
            if (snapshot.exists()) {
                const data = snapshot.val()
                // setProcessingLogin(false);
            //    if (data.Surname === Username) {
            //              setClass(data.Class),
            //             // alert(data.Class),
            //             // setSurname(data.Surname),
            //             // setFirstName(data.FirstName),
            //             // setMiddleName(data.MiddleName),
            //             // setImage(data.profile_picture),
            //             // setRegistrationNumber(data.RegNumber),

            //             //getting available term
            //             get(child(dbRef, 'TermAccessible/')).then((snapshot) => {
            //                 // setProcessingStudentVerification(false)
            //                 if (snapshot.exists()) {
            //                     const value = snapshot.val()
            //                     setProcessingLogin(true);
            //                     setTermAccessible(value.TermAccessible)
            //                     if (value.TermAccessible) {
            //                         get(child(dbRef, 'Examination/' + `${value.TermAccessible}/` + `${data.Class}/`))
            //                         .then((snapshot) => {
            //                             if (snapshot.exists()) {
            //                                 ListOfExaminationSubject.push(snapshot.val().OpenedSubject.OpenedSubject),
            //                                     setListOfExaminationSubjectAvailable(true),
            //                                     setProcessingLogin(false),
            //                                     alert('Done')
            //                                 // setStage(2)
            //                             }
            //                             else {
            //                                 alert("Examination has not been fixed for your class yet!"),
            //                                     setListOfExaminationSubject(null)
            //                                 setProcessingLogin(false)
            //                             }
            //                         }
            //                         )
            //                     } else {
            //                         alert("Term closed")
            //                     }
                                
            //                 }
            //                 else {alert("Not able to retrieve available term")}
            //             }
            //             )}
                   
               }  
            else{
                alert("Invalid credentials");
               }
       
        }
        )
    } catch (error) {
        
    }
           
    }
        // )
            // .then(
            //   get(child(dbRef, 'TermAccessible/')).then((snapshot) => {
            //     // setProcessingStudentVerification(false)
            //     if (snapshot.exists()) {
            //       const data = snapshot.val()
            //       setProcessingLogin(true);
            //       setTermAccessible(data.TermAccessible)
            //     }

            //   }).then(
            //     TermAccessible != null ? (
            //       GetListOfAvailableSubjects()
            //       // Alert.alert("TermAccessible",TermAccessible)
            //     )
            //       : Alert.alert("No term accessible", TermAccessible)

            //   )
            // )
            // .then(
            //   alert(Class),
            //   get(child(dbRef, 'Examination/' + `${TermAccessible}/` + `JSS1/`)).then((snapshot) => {
            //     if (snapshot.exists()) {
            //       console.log(snapshot.val())
            //       ListOfExaminationSubject.push(snapshot.val().OpenedSubject.OpenedSubject),
            //         setListOfExaminationSubjectAvailable(true)
            //       // console.log(snapshot.val())
            //     }
            //     else { alert("Examination has not been fixed for your class yet!"), setListOfExaminationSubject(null) }
            //   }))
            // .catch((error) => {
            //     // setProcessingStudentVerification(false)
            //     console.error(error);
            // })
        // get(child(dbRef, 'OpenedSubject/')).then((snapshot) => {
        //   // setProcessingStudentVerification(false)
        //   if (snapshot.exists()) {
        //     const data = snapshot.val()
        //     setListOfSubjects(data);

        //     //   setFirstName(data.FirstName)
        //     //   setSurname(data.Surname)
        //     //   setStep(2)
        //   } else {
        //     //   setProcessingStudentVerification(false)
        //     alert("Invalid credentials");
        //   }
        // }).catch((error) => {
        //   // setProcessingStudentVerification(false)
        //   console.error(error);
        // })
    // }
     
// }


function Login(params) {
    // NetInfo.fetch().then((data) => setConnectionStatus(data.isInternetReachable))
    // ProceedToLogin()

        // Password.length < 1 ? alert("Invalid password") 
        // :
    //     //   connectionStatus == false ? Alert.alert("Connection problem", "You're not connected to the internet") :
            ProceedToLogin()
    // console.log("tduy", Password)

}
export default ProceedToLogin