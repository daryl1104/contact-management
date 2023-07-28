export const config = {
    api: {
        user: {
            register: {
                url: "http://localhost:8800/user/register",
                method: "POST"
            },
            login: {
                url: "http://localhost:8800/user/login",
                method: "GET"
            },
            logout: {
                url: "http://localhost:8800/user/logout",
                method: "GET"
            }
        },
        contact: {
            lists: {
                url: "http://localhost:8800/contact/lists",
                method: "GET"
            },
            get: {
                url: "http://localhost:8800/contact/get",
                method: "GET"
            },
            add: {
                url: "http://localhost:8800/contact/add",
                method: "POST"
            },
            update: {
                url: "http://localhost:8800/contact/update",
                method: "POST"
            },
            delete: {
                url: "http://localhost:8800/contact/delete",
                method: "GET"
            }
        }
    }
}