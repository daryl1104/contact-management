// import { Cookie } from './cookie.js';
// var baseUrl = "http://localhost.com:8800/";
var baseUrl = "http://localhost:8800/";

let form = document.querySelector("form");

function loginRegister(event) {

    let username = form.elements.username.value;
    let password = form.elements.password.value;
    if (event.value === "login") {
        // send request.

        fetch(baseUrl + "user/login?" + new URLSearchParams({
            username,
            password,
        }), {
            credentials: "include",
        }).then(async response => {
            console.log(response.status);
            console.log(response.headers);
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }
        ).then(json => {

            console.log(json);
            var cookie = new Cookie("!");
            var coo = cookie.getCookie("user");
            console.log(coo);
            location.href = "index.html";
            // window.open("index.html");

            // todo: 登录的话，记得id存到local storage.
            // localStorage.clear();
            console.log(json.id);
            localStorage.setItem("userId", json.id);
            localStorage.setItem("userName", json.username);

        }).catch(err => {
            console.log(err);
            let errmsgNode = document.getElementById("errmsg");
            errmsgNode.style.display = "block";
        });

        // 
    } else if (event.value === "register") {
        // send request.
        let requestEntity = {};
        requestEntity.method = method;
        requestEntity.headers = { "Content-Type": "application/json" };
        requestEntity.body = JSON.stringify({
            username: `${username}`,
            password: `${password}`,
        });
        fetch(url, requestEntity).then(response => {
            console.log(response.status);
            console.log(response.headers);
            return response.json();
        }
        ).then(json => {
            console.log(json);
        });
        // sendRequest(baseUrl + "user/register", "POST", { username, password });
        window.location.href = "index.html";
    }
}



function sendRequest(url, method, data) {
    let username = data.username;
    let password = data.password;
    let requestEntity = {};
    requestEntity.method = method;
    requestEntity.headers = { "Content-Type": "application/json" };
    requestEntity.body = JSON.stringify({
        username: `${username}`,
        password: `${password}`,
    });
    fetch(url, requestEntity).then(
        response => {
            console.log(response.status);
            console.log(response.headers);
            return response.json();
        }
    ).then(json => {
        console.log(json);
        // todo: 登录的话，记得id存到local storage.
    });
}

