import { useState } from "react";

export const useLocalStorage = (key, initValue) => {
    const [stored, setStored] = useState(() => {
        try {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            window.localStorage.setItem(key, JSON.stringify(initValue));
            return initValue;
        }} catch (err) {
            return initValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            setStored(newValue);
        } catch (err) {
            setStored(newValue);
        }
    };
    return [stored, setValue];
};