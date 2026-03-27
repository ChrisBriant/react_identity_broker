import idBadgeImg from '../assets/id_badge.png';

const IdCard = ({profile, onSignOut}) => {


    const handleSignOut = async () => {
        try {
            const signOutResponse = await onSignOut();
            onSignOut();
        } catch(err) {
            console.error("An error occurred during the sign out process.", err);
        }
    }

    return (
        <div className="idCard">
            <img id="idBadgeImg" src={idBadgeImg} alt="ID Badge Image" />
            <div className="userProfile">
                <h3>{profile.alias}</h3>
                <button onClick={() => handleSignOut()} >Sign Out</button>
            </div>
        </div>
    );
}

export default IdCard;