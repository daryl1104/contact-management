class Cookie {
    constructor(name) {
        this.name = "cookie";
    }
    setCookie(data) {
        let { key, value, time } = data;
        var date = new Date().getTime() + time * 1000;
        document.cookie = `${key}=${value};expires=${new Date(date).toGMTString()};path=/`;

    }
    getCookie(key) {
        var arrCookie = document.cookie.split(';');
        console.log(arrCookie);
        var result = '';
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split('=');
            if (arr[0].trim() == key.trim()) {
                result = arr[1];
                break;
            }
        }
        if (result) {
            return result;
        } else {
            // window.location.href = "user/login.html";
            console.log("err!");
        }


    }
}