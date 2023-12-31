import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useLocalStorage } from "../hook/useLocalStorage";

export default function Login({saveToken, saveCurrent}) {
    const [user, setUser] = useLocalStorage("user", null);
    const {login} = useAuth();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [correct, setCorrect] = useState(true);
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {username: usernameRef.current.value, password: passwordRef.current.value};
        
        const responseData = await login(data).then((response) => {
            return response;
        });
        
        if (responseData.code == 200) {
            // success
            setCorrect(true);
            const rawData = responseData.data;
            data.id = rawData.id;
            
            setUser(data);
            navigate("/contact/index");
        } else {
            // error
            setCorrect(false);
            navigate("/login");
        }
    };
    
    return (
        <div className="h-screen flex flex-col justify-center items-center flex-wrap">
            <form className="border-2" onSubmit={handleSubmit}>
                <div className="mx-4 my-2 border-b-2 text-center text-3xl">登录</div>
                <div className="mx-2">
                    <label className="block">用户名：</label>
                    <input ref={usernameRef} className="border-2" type="text" placeholder="请输入用户名" onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="mx-2">
                    <label className="block">密码：</label>
                    <input ref={passwordRef} className="border-2" type="password" placeholder="请输入密码" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className={correct ? "hidden" : ""}>
                    <label>账号或者密码错误！请重新输入</label>
                </div>
                <div className="mx-2 mt-4 mb-2 flex space-x-2">
                    <input className="h-10 w-1/2 bg-[#50d71e] text-[#ffffff] rounded block" type="submit" value="登 录"></input> 
                    <input onClick={handleRegister} className="h-10 w-1/2 bg-[#50d71e] text-[#ffffff] rounded block" type="button" value="注 册"></input> 
                </div>
            </form>
        </div>

    );
}