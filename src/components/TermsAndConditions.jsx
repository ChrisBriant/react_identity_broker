
import { acceptTerms } from "../auth/auth";


const TermsAndConditions = ({setSessionRefresh}) => {

    const handleAcceptTerms = async () => {
        //Code to accept terms and conditions
        try {
            await acceptTerms();
            setSessionRefresh(prev => prev + 1);
        } catch(err) {
            setSessionRefresh(prev => prev + 1);
        };
    }   

    return (
        <div className="signInBox">
            <div className="termsContainer">
                <h1>Terms and Conditions</h1>
                <p>
                    This application is a demonstration Identity Broker designed to allow users
                    to authenticate using multiple Identity Providers (IdPs). By using this
                    application you agree to the terms described below.
                </p>

                <h2>Purpose of the Application</h2>
                <p>
                    This service allows users to sign in using supported Identity Providers
                    and then access a demonstration application where feedback can be submitted.
                    Authentication is performed by the selected Identity Provider.
                </p>

                <h2>Identity Providers</h2>
                <p>
                    When you sign in using an Identity Provider, authentication occurs
                    directly with that provider. This application receives limited identity
                    information from the provider in order to establish a session.
                </p>

                <h2>Information Collected</h2>
                <p>
                    When you authenticate, the following information may be stored in the
                    backend database:
                </p>

                <ul>
                    <li>Your email address provided by the Identity Provider</li>
                    <li>The unique identifier assigned to you by the Identity Provider</li>
                    <li>The name of the Identity Provider used</li>
                    <li>The date and time of authentication</li>
                </ul>

                <p>
                    This information is stored solely for the purpose of operating the
                    authentication system and associating submitted feedback with a user
                    account.
                </p>

                <h2>Privacy</h2>
                <p>
                    Identity information stored by this application is not exposed to other
                    users and is not shared with third parties. Access to stored information
                    is restricted to the backend system that manages authentication and
                    session handling.
                </p>

                <h2>Cookies and Sessions</h2>
                <p>
                    This application uses secure session cookies to maintain your login
                    session after authentication. These cookies are required for the
                    application to function correctly.
                </p>

                <h2>Data Usage</h2>
                <p>
                    Any feedback submitted within the application may be stored for
                    demonstration and development purposes. Do not submit sensitive or
                    confidential information.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                    The terms and privacy policy for this demonstration system may be
                    updated at any time. Users may be required to review and accept
                    updated terms before continuing to use the application.
                </p>

                <hr style={{margin: "40px 0"}} />

                <button
                    onClick={() => handleAcceptTerms()} >
                    Accept and Continue
                </button>
            </div>
        </div>

    );
}

export default TermsAndConditions;