import { Link, useNavigate } from 'react-router-dom';
import hero from '../assets/hero.png';
import logo from '../assets/logo.svg';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from './Authentication';

const Login = () => {


    const navigate = useNavigate();
     


    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, handleGoogle_Login  } = useContext(AuthContext);



    if (error) {
        return toast.error(error);
    }






    const handleGoogleLogin = () => {
        handleGoogle_Login()
            .then(() => {



                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');



            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });

    }


   



    const handleSignIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;


        

        if (!checkbox) {
            toast.error("You must accept the terms and conditions.");
            return;
        }

        handleLogin(email, password)
            .then(() => {


                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location?.state ? location.state : "/");

            })
            .catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage);
                navigate('/login');
            });




    }






    return (
        <div className='bg-secondary'>
            <div className='max-w-7xl mx-auto flex justify-between items-center h-screen'>

                <div className='sm:hidden  lg:block md:hidden '>


                    <div className="relative w-full flex justify-center  items-center">

                        <div className="absolute bg-white w-[500px] h-full left-0  rounded-4xl  z-0"></div>


                        <div className="relative z-10">
                            <img src={hero} className="w-4/5 px-6 py-10" alt="Hero" />
                        </div>
                    </div>

                </div>




                <div className="lg:w-2/4 md:w-2/4 sm:w-4/5 mx-auto">
                    <div className="max-w-md w-full ">
                        <div className='flex justify-center'>
                            <img src={logo} className='w-[80px] py-8' alt="" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center ">Sign In</h2>
                        
                        <div className='bg-white rounded-xl shadow-lg p-10'>

                       

                        <form onSubmit={handleSignIn} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    name='email'
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className='relative'>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>

                                <input name='password' type={showPassword ? "text" : "password"} id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Enter your password" required />
                                <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye className="absolute top-[41px] right-[13px]" /> : <FaEyeSlash className="absolute top-[41px] right-[13px]" />
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input name='checkbox' type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="ml-2 text-sm text-gray-600">Trams and Condition</span>
                                </label>

                            </div>

                            <button type='submit' className="w-full bg-primary cursor-pointer hover:bg-[#fae050a6] text-black font-medium py-2.5 rounded-lg transition-colors">
                                Sign In
                            </button>

                            

                        </form>
                        <button  onClick={handleGoogleLogin} className=" bg-primary w-full my-4 cursor-pointer hover:bg-[#fae050a6] text-black font-medium py-2.5 rounded-lg transition-colors">
                                Google
                        </button>
                        </div>


                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don&apos;t have an account?
                            <Link to='/' className="text-black hover:text-paragraph font-medium">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;