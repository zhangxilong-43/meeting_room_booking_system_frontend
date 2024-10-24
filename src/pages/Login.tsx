import { useState } from "react";
import htttpService from '@/service/service';

export function Login() {

    const [loginInfo, setLoginInfo] = useState({
        username: 'admin',
        password: '123456'
    });

    const changeLoginInfo = (e, key) => {
        setLoginInfo({
            ...loginInfo,
            [key]: e.target.value
        })
    };

    const login = async () => {
        const res = await htttpService.post('/user/login', loginInfo)
        console.log(res);
    };

    return (
        <>
            <h2 className="text-[14vh] font-black text-primary ">
                <p>Meeting</p>
                <p>Room</p>
                <p>Booking</p>
                <p>System</p>
            </h2>
            <div className="h-[19vh] w-[20vw] bg-slate-300 rounded-lg absolute right-[15vw] top-[30vh] mx-0 shadow-xl max-w-[300px] min-w-[200px]">
                <div className="my-[2vh] flex flex-col space-y-4 px-[1vw] ">
                    <label className="input input-bordered flex items-center gap-2 shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Username" value={loginInfo.username} onChange={(e) => changeLoginInfo(e, 'username')} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Password" value={loginInfo.password} onChange={(e) => changeLoginInfo(e, 'password')} />
                    </label>
                    <button className="btn btn-primary shadow-2xl" onClick={login}>Login</button>
                </div>
            </div>
        </>
    );
}