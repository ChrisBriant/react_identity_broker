import signInIcon from "../assets/sign_in_icon_wht.png";
import signOutIcon from "../assets/sign_out_icon_wht.png";
import { signOut } from "../auth/auth";

const Banner = ({profile, onSignOut}) => {
    console.log("BANNER MOUNTED", profile);

    const handleSignOut = async () => {
        console.log("CLICKED");
        try {
            const signOutResponse = await signOut();
            console.log("SIGN OUT RESPONSE", signOutResponse);
            onSignOut();
        } catch(err) {
            console.error("An error occurred during the sign out process.", err);
        }
    }

    return(
        <div id="banner">
            {
                profile
                ? <div className="signInOutArea" onClick={() => handleSignOut() }>
                    <p>{profile.alias}</p>
                    <div className="iconContainer">
                        <img src={signOutIcon} alt="sign out" />
                    </div>
                
                </div>
                : <div className="signInOutArea" >
                    {/* <p>Sign In</p>
                    <div className="iconContainer">
                        <img src={signInIcon} alt="sign in" />
                    </div> */}
                    
                </div>
            }
        </div>
    );
}

export default Banner;