import axios from "axios";
import { config } from "../config/config";

const returnStatement = {
    code: 200,
    msg: "success",
    data: {}
}

export const userLogin = async (data) => {
    const returnStatement = {}
    await axios(config.api.user.login.url, {
        method: config.api.user.login.method,
        withCredentials: true,
        params: {
            username: data.username,
            password: data.password
        }
    }).then((response) => {
        returnStatement.data = response.data;
        returnStatement.code = 200;
        returnStatement.msg = "success";
        return response.data;
    })
    .catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
};

export const userRegister = () => {

};

export const contactList = async () => {
    const returnStatement = {}
    await axios(config.api.contact.lists.url, {
        method: config.api.contact.lists.method,
        withCredentials: true,
        headers: {
            "Content-Type" : "application/json"
        },
        params: {
            offset: 0,
            limit: 50
        }
    }).then((response) => {
        returnStatement.code = 200;
        returnStatement.msg = "success";
        returnStatement.data = response.data;
        return response.data;
    }).catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
}

export const contactGet = async (data) => {
    const returnStatement = {};
    await axios(config.api.contact.get.url, {
        method: config.api.contact.get.method,
        withCredentials: true,
        params: {
            contact_id : data.contactId
        }
    }).then((response) => {
        returnStatement.code = 200;
        returnStatement.msg = "success";
        returnStatement.data = response.data;
        return response.data;
    }).catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
};

export const contactUpdate = async (data) => {
    const returnStatement = {};
    await axios(config.api.contact.update.url, {
        method: config.api.contact.update.method,
        withCredentials: true,
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        returnStatement.code = 200;
        returnStatement.msg = "success";
        returnStatement.data = response.data;
        return response.data;
    }).catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
};

export const contactDelete = async (data) => {
    const returnStatement = {};
    await axios(config.api.contact.delete.url, {
        method: config.api.contact.delete.method,
        withCredentials: true,
        params: {
            contactId: data.contactId
        }
    }).then((response) => {
        returnStatement.code = 200;
        returnStatement.msg = "success";
        returnStatement.data = response.data;
        return response.data;
    }).catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
};

export const contactAdd = async (data) => {
    const returnStatement = {};
    await axios(config.api.contact.add.url, {
        method: config.api.contact.add.method,
        withCredentials: true,
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        returnStatement.code = 200;
        returnStatement.msg = "success";
        returnStatement.data = response.data;
        return response.data;
    }).catch((error) => {
        returnStatement.code = 500;
        returnStatement.msg = error;
        returnStatement.data = {};
    });
    return returnStatement;
};