import { Fragment, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import supabase from "../../supabaseClient";

const LoginForm = () => {
    const userInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = userInputRef.current.value;
        const password = passwordInputRef.current.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw alert('Invalid username or password.');

        if (data.session.access_token !== null) {
            const expirationTime = new Date((new Date().getTime() + (+data.session.expires_in * 1000)));
            authCtx.login(data.session.access_token, expirationTime.toISOString());
            navigate('/', { replace: true });
        }
    };
    
    return (
        <Fragment>
            <div className="m-auto my-16 max-w-sm rounded-md bg-blue-500 p-4 text-center text-white items-center">
                <h1 className="text-center text-white mb-8 text-2xl font-bold">Login</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label htmlFor='username' className="block mb-2 text-left">Username:</label>
                        <input
                            type='text'
                            id='username'
                            placeholder="Username..."
                            className="text-black rounded w-full p-1 bg-white"
                            required
                            ref={userInputRef}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block mb-2 text-left">Password:</label>
                        <input
                            type='password'
                            id='password'
                            placeholder="Password..."
                            className="text-black rounded w-full p-1 bg-white"
                            required
                            ref={passwordInputRef}
                        />
                    </div>
                    <div className="mt-6 flex flex-col items-center">
                        <button className="cursor-pointer bg-blue-700 rounded px-10 py-3 hover:bg-blue-800">Log In</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default LoginForm;