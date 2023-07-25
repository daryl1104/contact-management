import { Form, Navigate, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

export async function action({ request }) {
    return redirect("/contact/add");
    // const data = Object.fromEntries(request.formData());
    // console.log(data);
    // return redirect("/contact/list/add");    
}

export async function listLoader({ request }) {
    const user = window.localStorage.getItem("user")
    // axios

    const resData = await axios("http://localhost:8800/contact/lists",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,

    })
    .then((response) => {
        return response; 
    }).catch((error) => {
        return null;
    });
    return resData;
}
export default function Homepage() {
    const {user,logout} = useAuth();
    const contactListData = useLoaderData();
    if (!user) {
        return <Navigate to="/" />;
    }

    console.log(contactListData);

    return (
        <div className="w-full h-full">
            <div className='flex flex-row justify-end border-b-2 mx-8 mt-2'>
                <p>欢迎,<span className="font-bold text-xl"> {user.username}! </span></p>
                <a className="flex flex-row justify-center items-center ml-2 no-underline hover:underline" href='#' onClick={logout}>退出</a>
            </div>
            <div className="flex flex-row">
            {/* // 侧边栏，展示联系人列表 */}
            <div className="flex flex-col w-[22rem] bg-[#f7f7f7] border-r border-[#e3e3e3] h-full">
                <div className="flex flex-row justify-center items-start mx-auto h-10 mt-4">
                    <form className="h-full basis-1/3" action="" method="">
                        <input className="h-full" type="text" placeholder="搜索"></input>
                    </form>
                    <Form className="h-full basis-2/3 ml-4" method="POST">
                        <input className="h-full px-2 cursor-pointer" type="submit" value="新增"></input>
                    </Form>
                </div>
                <div className="w-full grow mx-auto text-4xl overflow-auto">
                    <ul className="w-full">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                        <li>3</li>
                    </ul>
                </div>
                
            </div>
            <div className="pt-4 pl-10 h-full w-full flex-1">
                <Outlet />
            </div>
            </div>
        </div>
    );

}