import idBrokerImg from "../assets/id_broker_wh.svg";
import { signOut } from "../auth/auth";

const Banner = ({profile, onSignOut}) => {
    return(
        <div id="banner">
            <img src={idBrokerImg} alt="ID Card Icon" />
            <h1>Identity Broker</h1>
        </div>
    );
}

export default Banner;