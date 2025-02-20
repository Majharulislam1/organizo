
import { Link, useNavigate } from 'react-router-dom';
import hero from '../assets/hero.png';
import logo from '../assets/logo.svg';
import { useContext, useState } from 'react';
import { AuthContext } from './Authentication';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { updateProfile } from 'firebase/auth';
import auth from './firebase.config';

const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { handleRegister, handleGoogle_Login } = useContext(AuthContext);


    const axiosPublic = useAxiosPublic();


    const handleGoogleLogin = () => {
        handleGoogle_Login()
            .then((result) => {
                const user = { name: result.user?.displayName, email: result.user?.email, photo_url: result.user?.photoURL };

                axiosPublic.post('/user',user)
                .then(res => {
                     if(res.data.insertedId){

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Successfully Register",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/');
                     }
                })
                 

            }).catch((error) => {


                const errorMessage = error.message;
                toast.error(errorMessage);
            });

    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
       

        

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }


        if (!checkbox) {
            toast.error("You must accept the terms and conditions.");
            return;
        }




        handleRegister(email, password)
            .then(() => {

                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: '',
                }).then(() => {

                    const user={name,email,photo_url:''};
                   
                    
                    axiosPublic.post('/user',user)
                    .then(res => {
                         if(res.data.insertedId){
                            e.target.reset();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Successfully Register",
                                showConfirmButton: false,
                                timer: 2000
                            });
                            navigate('/');
                         }
                    })





                    


                }).catch((error) => {
                    toast.error(error.errorMessage);
                });


            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);

            });

    }





    return (
        <div className='bg-secondary'>
            <div className='lg:max-w-7xl md:w-4/5 mx-auto flex justify-between items-center h-screen'>

                <div className='sm:hidden lg:block md:hidden '>


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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center ">Sign Up</h2>

                         <div className='bg-white rounded-xl shadow-lg p-10'>

                        

                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    name='name'
                                    type="text"
                                    className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="Name"
                                />
                            </div>
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
                                    <input type="checkbox" name='checkbox' className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="ml-2 text-sm text-gray-600">Trams and Condition</span>
                                </label>

                            </div>

                            <button type='submit' className="w-full bg-primary cursor-pointer hover:bg-[#fae050a6] text-black font-medium py-2.5 rounded-lg transition-colors">
                                Sign Up
                            </button>



                        </form>
                        <button onClick={handleGoogleLogin} className=" bg-primary w-full my-3 cursor-pointer hover:bg-[#fae050a6] text-black font-medium py-2.5 rounded-lg transition-colors">
                            Google
                        </button>

                        </div>


                        <div className="mt-6 text-center text-sm text-gray-600">
                            All ready have an account?
                            <Link to={'/login'} className="text-black hover:text-paragraph font-medium">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;