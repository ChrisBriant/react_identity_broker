import { useState, useEffect } from 'react'
import './App.css'
import { getIdpList, getSession, refresh } from './auth/auth'
// import idBadgeImg from './assets/id_badge.png';
// import IdCard from './components/IdCard';
import AuthenticatedDisplay from './components/AuthenticatedDisplay';
import SignInDisplay from './components/SignInDisplay';

function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [idps, setIdps] = useState([]);
  //const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmittedError, setFeedbackSubmittedError] = useState(false);
  const [sessionRefresh,setSessionRefresh] = useState(0);

  console.log("MOUNTED");

  useEffect(() => {
    getSession().then((res) => {
      console.log("SESSION RESPONSE", res);
      //Set loaded, profile and authenticated 
      setLoadingSession(false);
      setAuthenticated(true);
      setProfile(res);
    }).catch(err => {
      console.log("An error occurred retrieving the session", err.response.status);
      if(err.response.status === 401) {
        //Try refresh
        //window.location.href = `${process.env.API_BASE_URL}/auth/refresh`;
        refresh().then( async (res) => {
            console.log("REFRESH RESPONSE", res);
            const profile = await getSession();
            setProfile(profile);
            setLoadingSession(false);
            setAuthenticated(true);
        }).catch(async err => {
          console.log("An error occurred refreshing the session", err);
          if(err.response.status === 401) {
            //Re-authentication required
            setLoadingSession(false);
            setAuthenticated(false);
            //Authentication has failed so the user needs to sign in
            try {
              const idpList = await getIdpList();
              console.log("IDP LIST", idpList);
              setIdps(idpList);
            } catch(err) {
              console.error("An error occurred retrieving the IDP list.", err);
            }

          }
        });
      }
    });
  }, [sessionRefresh])



  const handleSignIn = (logonUrl) => {
    console.log("HANDLE SIGNIN");
    //window.location.href = "https://localhost:8000/auth/issuejwtredirect?id=1&idp=discord&alias=chinx";
    console.log("LOGIN", logonUrl);
    window.location.href = logonUrl;
  }

  const onSignOut = async () => {
    //Set the IDP list
    try {
      const idpList = await getIdpList();
      console.log("IDP LIST", idpList);
      setIdps(idpList);
    } catch(err) {
      console.error("An error occurred retrieving the IDP list.", err);
    }

    setAuthenticated(false);
    setLoadingSession(false);
    setProfile(null);
  }

  // const handleSubmitFeedback = async () => {
  //   console.log("SENDING", feedbackValue);
  //   try {
  //     const res = await sendFeedback({ message : feedbackValue });
  //     console.log("FEEDBACK SENT", res);
  //     setFeedbackSubmitted(true);
  //   } catch(err) {
  //     console.error("An error occurred sending the feedback.", err.response.status);
  //     if(err.response.status === 401) {
  //       //Refresh the session
  //       setAuthenticated(false);
  //       setSessionRefresh(prev => prev + 1);
  //       setFeedbackSubmittedError(true);
  //       setFeedbackSubmitted(true);
  //     } else {
  //       //Display an error to the user
  //       setFeedbackSubmittedError(true);
  //       setFeedbackSubmitted(true);
  //     }

  //   }
  // }

  return (
    <div className='page'>
      {/* <Banner profile={profile} onSignOut={onSignOut}/> */}
      <div className="main">
        {
          loadingSession
          ? <p>Loading...</p>
          : <>
            {
              authenticated
              ? <AuthenticatedDisplay
                    setAuthenticated={setAuthenticated}  
                    setSessionRefresh={setSessionRefresh}
                    profile={profile} 
                    onSignOut={onSignOut}
                    setFeedbackSubmitted={setFeedbackSubmitted}
                    feedbackSubmitted={feedbackSubmitted}
                    setFeedbackSubmittedError={setFeedbackSubmittedError}
                    feedbackSubmittedError={feedbackSubmittedError}
                /> 
              // ? <div className="signInBox">
              //     <h2>Welcome</h2>
              //     {/* <img id="idBadgeImg" src={idBadgeImg} alt="ID Badge Image" /> */}
              //     <IdCard profile={profile} onSignOut={onSignOut} />
              //     {
              //       feedbackSubmitted
              //       ? <>
              //         {
              //           feedbackSubmittedError
              //             ? <div className="feedbackError">
              //               <p>Sorry, an error occurred submitting the feedback.</p>
              //             </div>
              //             : <div className="feedbackSuccess">
              //               <p>Thank you! Constructive feedback is appreciated.</p>
              //             </div>
              //         }
              //       </>
              //       : <>
              //         <p>I hope you like this demo.</p>
              //         <label htmlFor='feedbackBox'>Post some feedback below:</label>
              //         <textarea id="feedbackBox" name="feedbackBox" onChange={(evt) => setFeedbackValue(evt.currentTarget.value)}>

              //         </textarea>
              //         <button onClick={() => handleSubmitFeedback()} >Send Feedback</button>
              //       </>
              //     }
              //   </div>
              : <SignInDisplay handleSignIn={handleSignIn} idps={idps} />
              // : <div className="signInBox">
              //   <h2>Sign In</h2>
              //   <div className="idp-selection">
              //     {/* <button onClick={() => handleSignIn()}>
              //       Sign In
              //     </button> */}
              //     {
              //       idps.map((idp) => (
              //         <div key={idp.id} className="idpTile" onClick={() => handleSignIn(idp.login)}>
              //           <div className="imageContainer">
              //             <img src={idp.logo} alt={idp.name} />
              //           </div>
              //           <p>Continue with {idp.name}</p>
              //         </div>
              //       ))
              //     }
              //   </div>
              // </div>
            }
          </> 
        }
      </div>

    </div>
  )
}

export default App
