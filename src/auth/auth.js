import { conn } from "../network/network";

function getSession() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/session";

        conn.get(url, {withCredentials: true})
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
} 

function refresh() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/refresh";

        //It sends null in the body because in this case we are using the cookie for authentication
        conn.post(url,{token:null}, {withCredentials: true})
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}

function signOut() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/logout";

        conn.post(url, {}, {withCredentials: true})
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}

function getIdpList() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/providers";

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}


function signInFake() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/issuejwtredirect?id=1&idp=discord&alias=chinx";

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}

function sendFeedback(feedbackData) {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/postfeedback";

        conn.post(url,feedbackData, {withCredentials: true})
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}

function acceptTerms() {
    return new Promise( async (resolve,reject) => {
        const url = "/auth/acceptterms";
        conn.post(url,{}, {withCredentials: true})
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
}

export { getSession, refresh, signInFake, signOut, getIdpList, sendFeedback, acceptTerms};