function getStringLength(str) {
    return [...str].length;
}

export const validateName = (name) => {
    const length = getStringLength(name);
    if (length > 10) {
        return false;
    }
    return true;
};

export const validatePhoneNumber = (number) => {
    const length = getStringLength(number);
    return length == 11;
    // if (length != 11) {
    //     return false;
    // }
    // return true;
}

export const validateEmail = (email) => {
    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }
    return true;
};