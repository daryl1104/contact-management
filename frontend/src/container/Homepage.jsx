import { Form, Link, Navigate, Outlet, redirect, useLoaderData } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { contactList } from "../util/httpTemplate";

export async function action({ request }) {
    return redirect("/contact/add"); 
}

export async function listLoader({ request }) {
    const user = window.localStorage.getItem("user")

    // q
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const resData = await contactList();
    console.log(resData);
    if (resData.code == 200) {
        // success
        const rawData = resData.data;
        // handle q
        if (rawData && q) {
            return rawData.filter((contact) => {
                if (contact.name.includes(q)) {
                    return true;
                }
                return false;
            })
        }
        return rawData;
        
    } else {
        // error. no data.
        return null;
    }
}
export default function Homepage() {
    const {user,logout} = useAuth();
    const contactListData = useLoaderData();
    if (!user) {
        return <Navigate to="/" />;
    }
    return (
        <div className="w-full h-full">
            <div className='flex flex-row justify-end border-b-2 mx-8 mt-2'>
                <p>欢迎,<span className="font-bold text-xl"> {user.username}! </span></p>
                <a className="flex flex-row justify-center items-center ml-2 no-underline hover:underline" href='#' onClick={logout}>退出</a>
            </div>
            <div className="flex flex-row h-full">
            {/* // 侧边栏，展示联系人列表 */}
            <div className="flex flex-col w-[22rem] bg-[#f7f7f7] border-r border-[#e3e3e3] h-full">
                <div className="flex flex-row justify-center items-start mx-auto h-10 mt-4">
                    <Form className="h-full basis-1/3" method="get">
                        <input className="h-full" type="search" placeholder="搜索" name="q"></input>
                    </Form>
                    <Form className="h-full basis-2/3 ml-4" method="POST">
                        <input className="h-full px-2 cursor-pointer" type="submit" value="新增"></input>
                    </Form>
                </div>
                <div className="h-full w-full grow mx-auto text-4xl overflow-auto">
                    {
                        
                        contactListData?.length? (
                            <ul className="h-full">
                                {
                                    contactListData.map((contact) => {
                                        return (<li key={contact.id}>
                                            <Link className="flex flex-row justify-center items-center" to={`detail/${contact.id}`} >
                                            <div className="flex-1">{contact.name}</div>
                                            <div className="flex-1">{contact.phone_number}</div>
                                            </Link>
                                            </li>)
                                    })
                                }
                            </ul>
                        ) : (
                            <p>没有联系人</p>
                        )

                    }
                    
                </div>
                
            </div>
            <div className="pt-4 pl-10 h-full w-full flex-1">
                <Outlet />
            </div>
            </div>
        </div>
    );

}