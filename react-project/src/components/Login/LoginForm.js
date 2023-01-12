import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const userInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = userInputRef.current.value;
        const password = passwordInputRef.current.value;


        // const { data, error } = await supabase.auth.signUp({
        //     email: email, password: password
        // })


        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) throw alert('Invalid username or password.')

        localStorage.setItem('token', data.session.access_token)

        setIsLogin({
            islogin: true,
            token: data.session.access_token
        });

    };

    // const logoutHandler = async (event) => {
    //     event.preventDefault();
    //     if (isLogin) {
    //         const { error } = await supabase.auth.signOut()
    //     }
    // }

    useEffect(() => {
        if (isLogin.islogin) {
            localStorage.setItem('token', isLogin.token)
            navigate('/');
        }
    }, [isLogin, navigate]);

    return (
        <section className="m-auto my-16 max-w-sm rounded-md bg-blue-500 p-4 text-center text-white items-center">
            <h1 className="text-center text-white">Login</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-2">
                    <label htmlFor='username' className="block font-bold mb-2">Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder="Username..."
                        className="text-black rounded w-full p-1"
                        required
                        ref={userInputRef}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block font-bold mb-2">Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder="Password..."
                        className="text-black rounded w-full p-1"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className="mt-6 flex flex-col items-center">
                    <button className="cursor-pointer bg-blue-800 rounded px-10 py-3 hover:bg-blue-900">Log In</button>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;