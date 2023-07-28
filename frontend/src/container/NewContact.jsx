import axios from "axios";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { contactAdd, contactGet, contactUpdate } from "../util/httpTemplate";
import { validateName, validateEmail, validatePhoneNumber } from "../util/validate";

export async function action({ request,params }) {
    const errors = {};
    const data = Object.fromEntries(await request.formData());

    // validate
    if (!validateName(data.name)) {
        errors.msg = "用户名格式不正确，请重试";
        return errors;
    }
    if (!validatePhoneNumber(data.phone_number)) {
        errors.msg = "手机号码格式不正确，请重试";
        return errors;
    }
    if (data.email && !validateEmail(data.email)) {
        errors.msg = "emai格式不正确，请重试";
        return errors;
    }
    
    if (params.contactId) {
        // update
        data.id = params.contactId;
        const jData = JSON.stringify(data);

        const resData = await contactUpdate(jData);
        if (resData.code == 200) {
            
        } else {
            errors.msg = "更新错误，请重试";
        }
    } else {
        // add
        const jData = JSON.stringify(data);
        const resData = await contactAdd(jData);
        if (resData.code == 200) {
            
        } else {
            errors.msg = "添加错误，请重试";
        }    
    }    

    if (Object.keys(errors).length){
        return errors;
    }

    return redirect("/contact/index");
}

export async function loader({ request,params }) {
    const contactId = params.contactId
    if (!contactId) {
        return null;
    }
   
    const resData = await contactGet(params);
    if (resData.code == 200) {
        return resData.data;
    } else {
        return "";
    }
}

export default function NewContact() {
    const error = useActionData();
    const detailData = useLoaderData();

    return (
        <>
            <Form className="" method="post">
                <div className="pt-5">
                    <label className="w-20 inline-block required">姓名:</label>
                    <input type="text" placeholder="请输入姓名" name="name" required defaultValue={detailData? detailData.name : "" }></input>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block required">手机号:</label>
                    <input type="text" placeholder="请输入手机号" name="phone_number" required defaultValue={detailData? detailData.phone_number : ""}/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">微信号:</label>
                    <input type="text" placeholder="请输入微信号" name="wechat" defaultValue={detailData? detailData.wechat : ""}/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">地址:</label>
                    <input type="text" placeholder="请输入地址" name="address" defaultValue={detailData? detailData.address : ""}/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block required">性别:</label>
                    <label className="w-6 inline-block ml-4">男:</label>
                    <input className="mr-2" type="radio" value="0" name="gender" defaultChecked={detailData? detailData.gender=="0" : false}/>
                    <label className="w-6 inline-block">女:</label>
                    <input type="radio" value="1" name="gender" defaultChecked={detailData? detailData.gender == "1" : false}/>
                </div>
                <div className="pt-5">
                    <label className="w-20 inline-block">email:</label>
                    <input type="text" placeholder="请输入email" name="email" defaultValue={detailData? detailData.email : ""}/>
                </div>
                <div className={error?.msg ? "font-semibold text-red-500 pt-5" : "hidden"}>
                    <p>{error?.msg}</p>
                </div>

                <div className="h-10 mt-5">
                    <input className="h-full px-2 cursor-pointer" type="submit" value="提交"></input>
                </div>
            
            </Form>
        </>
    );
}