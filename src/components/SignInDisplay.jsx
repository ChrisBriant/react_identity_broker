const SignInDisplay = ({handleSignIn, idps}) => {
    return (
        <div className="signInBox">
            <h2>Sign In</h2>
            <div className="idp-selection">
                {
                idps.map((idp) => (
                    <div key={idp.id} className="idpTile" onClick={() => handleSignIn(idp.login)}>
                    <div className="imageContainer">
                        <img src={idp.logo} alt={idp.name} />
                    </div>
                    <p>Continue with {idp.name}</p>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default SignInDisplay;