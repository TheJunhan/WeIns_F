import axios from "axios";

let postRequest = (url, data, callback) => {


        axios.defaults.baseURL='http://127.0.0.1:8000/'
        axios.post(url,data, {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res=>{
                console.log(res)
                console.log(res.data)
                callback(res.data)
            }).catch(err=>{
            console.log(err)
        })


};

export {postRequest}



