import axios from "axios";
import { redirect, useActionData } from "react-router-dom";
import { Form } from "react-router-dom";

export async function action({ request }) {
    const errors = {};
    const data = Object.fromEntries(await request.formData());

    const jData = JSON.stringify(data);
    const resData = await axios.post("http://localhost:8800/contact/add",jData,{
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) =>{
        return response;
    })
    .catch((error) => {
        errors.msg = "添加错误，请重试";
    })

    if (Object.keys(errors).length){
        return errors;
    }

    return redirect("/contact/index");
}

export default function NewContact() {
    const error = useActionData();

    return (
        <>
            <Form className="" method="post">
                <div className="pt-5">
                    <label className="w-20 inline-block">姓名:</label>
                    <input type="text" placeholder="请输入姓名" name="name" required></input>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">手机号:</label>
                    <input type="text" placeholder="请输入手机号" name="phone_number" required/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">微信号:</label>
                    <input type="text" placeholder="请输入微信号" name="wechat"/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">地址:</label>
                    <input type="text" placeholder="请输入地址" name="address"/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">性别:</label>
                    <label className="w-6 inline-block ml-4">男:</label>
                    <input className="mr-2" type="radio" value="0" name="gender"/>
                    <label className="w-6 inline-block">女:</label>
                    <input type="radio" value="1" name="gender" />
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">email:</label>
                    <input type="text" placeholder="请输入email" name="email"/>
                </div>
                <div className={error?.msg ? "font-semibold text-red-500 pt-5" : "hidden"}>
                    <p>{error?.msg}</p>
                </div>

                <div className="h-10 mt-5">
                    <input className="h-full px-2 cursor-pointer" type="submit" value="提交"></input>
                    {/* <button className="h-full border-2 rounded-2xl px-2" type="submit">提交</button> */}
                </div>
            
            </Form>
        </>
    );
}