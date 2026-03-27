import { useState, useEffect } from 'react'
import './App.css'
import { getIdpList, getSession, refresh } from './auth/auth'
import AuthenticatedDisplay from './components/AuthenticatedDisplay';
import SignInDisplay from './components/SignInDisplay';
import TermsAndConditions from './components/TermsAndConditions';
import Banner from './components/Banner';

function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [idps, setIdps] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmittedError, setFeedbackSubmittedError] = useState(false);
  const [sessionRefresh,setSessionRefresh] = useState(0);


  useEffect(() => {
    getSession().then((res) => {
      //Set loaded, profile and authenticated 
      setLoadingSession(false);
      setAuthenticated(true);
      setProfile(res);
    }).catch(err => {
      if(err.response.status === 401) {
        //Try refresh
        refresh().then( async (res) => {
            const profile = await getSession();
            setProfile(profile);
            setLoadingSession(false);
            setAuthenticated(true);
        }).catch(async err => {
          if(err.response.status === 401) {
            //Re-authentication required
            setLoadingSession(false);
            setAuthenticated(false);
            //Authentication has failed so the user needs to sign in
            try {
              const idpList = await getIdpList();
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
    window.location.href = logonUrl;
  }

  const onSignOut = async () => {
    //Set the IDP list
    try {
      const idpList = await getIdpList();
      setIdps(idpList);
    } catch(err) {
      console.error("An error occurred retrieving the IDP list.", err);
    }

    setAuthenticated(false);
    setLoadingSession(false);
    setProfile(null);
  }


  return (
    <div className='page'>
      <Banner />
      <div className="main">
        {
          loadingSession
          ? <p>Loading...</p>
          : <>
            {
              authenticated
              ? <> 
                {
                  profile.accepted_terms
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
                  : <TermsAndConditions setSessionRefresh={setSessionRefresh} />
                }
              
              </>
              : <SignInDisplay handleSignIn={handleSignIn} idps={idps} />
            }
          </> 
        }
      </div>

    </div>
  )
}

export default App
