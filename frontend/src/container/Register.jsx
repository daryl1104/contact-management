import axios from "axios";
import { Form, redirect, useActionData } from "react-router-dom";

export async function action ({ request, params}) {
    const errors = {};
    const data = await request.formData();
    // const formData = Object.fromEntries(await request.formData());

    // const jData = JSON.stringify(data);
    const username = data.get("username");
    const password = data.get("password");
    
    const resData = await axios.post("http://localhost:8800/user/register",null,{
        withCredentials: true,
        params: {
            username: username,
            password: password,

        }
    }).then((response) => {
        console.log(request);
        return response.data;
    }).catch((error) => {
        errors.msg = "注册失败，请重试";
        console.error(error);

    });

    if (Object.keys(errors).length) {
        return errors;
    }
    return redirect("/");
}
export default function Register() {
    const errors = useActionData();

    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center flex-wrap">
                <Form className="border-2" method="post">
                    <div className="mx-4 my-2 border-b-2 text-center text-3xl">注册</div>
                    <div className="mx-2">
                        <label className="block">用户名：</label>
                        <input className="border-2" type="text" placeholder="请输入用户名" name="username"></input>
                    </div>
                    <div className="mx-2">
                        <label className="block">密码：</label>
                        <input className="border-2" type="password" placeholder="请输入密码" name="password"></input>
                    </div>
                    <div className={errors?.msg ? "font-semibold text-red-500 pt-3 mx-2" : "hidden"}>
                        <p>{errors?.msg}</p>
                    </div>
                    <div className="mx-2 mt-4 mb-2 flex space-x-2">
                        <input className="h-10 w-1/2 bg-[#50d71e] text-[#ffffff] rounded block" type="submit" value="注 册"></input> 
                    </div>
                </Form>
            </div>
        </div>

    );
}