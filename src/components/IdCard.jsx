import idBadgeImg from '../assets/id_badge.png';

const IdCard = ({profile}) => {
    return (
        <div className="idCard">
            <img id="idBadgeImg" src={idBadgeImg} alt="ID Badge Image" />
            <div className="userProfile">
                <h3>{profile.alias}</h3>
                <button>Sign Out</button>
            </div>
        </div>
    );
}

export default IdCard;