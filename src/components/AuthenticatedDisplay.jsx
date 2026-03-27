import IdCard from "./IdCard";
import { useState } from "react";
import { sendFeedback } from "../auth/auth";

const AuthenticatedDisplay = ({
        setAuthenticated,
        setSessionRefresh, 
        profile, 
        onSignOut,
        setFeedbackSubmitted,
        feedbackSubmitted,
        setFeedbackSubmittedError,
        feedbackSubmittedError
    }) => {
    const [feedbackValue, setFeedbackValue] = useState("");

    const handleSubmitFeedback = async () => {
        try {
            await sendFeedback({ message : feedbackValue });
            setFeedbackSubmitted(true);
        } catch(err) {
        console.error("An error occurred sending the feedback.", err.response.status);
        if(err.response.status === 401) {
            //Refresh the session
            setAuthenticated(false);
            setSessionRefresh(prev => prev + 1);
            setFeedbackSubmittedError(true);
            setFeedbackSubmitted(true);
        } else {
            //Display an error to the user
            setFeedbackSubmittedError(true);
            setFeedbackSubmitted(true);
        }

        }
    }

    return (
        <div className="signInBox">
            <h2>Welcome</h2>
            <IdCard profile={profile} onSignOut={onSignOut} />
            {
                feedbackSubmitted
                ? <>
                {
                    feedbackSubmittedError
                    ? <div className="feedbackError">
                        <p>Sorry, an error occurred submitting the feedback.</p>
                    </div>
                    : <div className="feedbackSuccess">
                        <p>Thank you! Constructive feedback is appreciated.</p>
                    </div>
                }
                </>
                : <>
                <p>I hope you like this demo.</p>
                <label htmlFor='feedbackBox'>Post some feedback below:</label>
                <textarea id="feedbackBox" name="feedbackBox" onChange={(evt) => setFeedbackValue(evt.currentTarget.value)}>

                </textarea>
                <button onClick={() => handleSubmitFeedback()} >Send Feedback</button>
                </>
            }
        </div>
    );
}

export default AuthenticatedDisplay;