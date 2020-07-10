
let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    console.log("begin fetch");

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
    console.log("end fetch ");

};

export {postRequest}