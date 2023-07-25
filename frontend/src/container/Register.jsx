
export default function Register() {
    const handleSubmit = () => {
        
    };

    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center flex-wrap">
                <form className="border-2" onSubmit={handleSubmit}>
                    <div className="mx-4 my-2 border-b-2 text-center text-3xl">注册</div>
                    <div className="mx-2">
                        <label className="block">用户名：</label>
                        <input className="border-2" type="text" placeholder="请输入用户名"></input>
                    </div>
                    <div className="mx-2">
                        <label className="block">密码：</label>
                        <input className="border-2" type="password" placeholder="请输入密码"></input>
                    </div>
                    <div className="mx-2 mt-4 mb-2 flex space-x-2">
                        <input className="h-10 w-1/2 bg-[#50d71e] text-[#ffffff] rounded block" type="button" value="注 册"></input> 
                    </div>
                </form>
            </div>
        </div>

    );
}