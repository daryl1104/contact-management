import axios from "axios";
import { redirect, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

export async function action({ request,params }) {
    const formData = await request.formData();
    const operate = formData.get("operate");
    console.log(operate);
    if (operate === "edit") {
        console.log("edit");
        return redirect(`/contact/add/${params.contactId}`);
    }
    if (operate === "delete") {
        console.log("delete");
        const resData = await axios.get("http://localhost:8800/contact/delete",
        {
            params: {
                contactId: params.contactId,
            },
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            return response;
        }).catch((error) => {
            console.error(error);

        });
    }

    return redirect("/contact/index");
}
export async function loader({ request,params }) {

    const resData = await axios.get("http://localhost:8800/contact/get",
        {
            params: {
                contact_id: params.contactId
            },
            withCredentials: true,
        }
    ).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        console.error(error);
        return error;
    }) ;
    return resData ? resData : "";
}
export default function Detail() {
    const detailData = useLoaderData();

    return (
        <>
            {detailData? (
                <>
                <div className="flex flex-row text-4xl my-3">
                    <div>姓名：</div>
                    <div>{detailData.name}</div>
                </div>
                <div className="flex flex-row text-4xl my-3">
                    <div>性别：</div>
                    <div>{detailData.gender == "0" ? "男" : "女"}</div>
                </div>
                <div className="flex flex-row text-4xl my-3">
                    <div>电话：</div>
                    <div>{detailData.phone_number}</div>
                </div>
                <div className="flex flex-row text-4xl my-3">
                    <div>地址：</div>
                    <div>{detailData.address}</div>
                </div>
                <div className="flex flex-row text-4xl my-3">
                    <div>邮箱：</div>
                    <div>{detailData.email}</div>
                </div>
                <div className="flex flex-row text-4xl my-3">
                    <div>微信号：</div>
                    <div>{detailData.wechat}</div>
                </div>
                <Form className="h-10 mt-10" method="post">
                    <button className="w-1/5 h-full px-2 cursor-pointer border-black border-[0.5px] rounded-2xl mr-20 ml-20" type="submit" name="operate" value="edit">修改</button>
                    <button className="w-1/5 h-full px-2 cursor-pointer border-black border-[0.5px] rounded-2xl" type="submit" name="operate" value="delete">删除</button>
                </Form>
                
                </>
            ) : (
                <p>没有此联系人详情</p>
            )}          
        </>
    );
}