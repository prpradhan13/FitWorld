import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`, {email, password}
        );
    
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate('/');
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
    }
  };

  return (
    <>
    <div className="w-full h-[90vh] md:h-[80vh] flex justify-center items-center p-3">
        <div className="w-[400px] bg-gray-900 rounded-lg py-2 px-5">
            <h2 className="text-center text-white font-bold text-xl md:text-2xl">Login</h2>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Email:</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <button type="submit" className="bg-blue-500 rounded-lg my-2 p-2 font-semibold">
                    Login
                </button>
            </form>
            <p className="text-white mt-5">Have no account? <Link to={'/signup'} className="text-blue-500 underline">Create</Link></p>
            <h5 className="text-blue-500 mt-3 underline"><Link to={'/forgotpassword'}>Forgot password?</Link></h5>
        </div>
    </div> 
    </>
  )
}

export default Login

