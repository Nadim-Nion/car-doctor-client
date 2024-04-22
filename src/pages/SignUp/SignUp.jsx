import React from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/images/login/login.svg";
import useAuth from '../../hooks/useAuth';
// import { AuthContext } from '../../providers/AuthProvider';

const SignUp = () => {
    // const { createUser } = useContext(AuthContext);
    const { createUser } = useAuth();

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const newUser = { name, email, password };
        console.log(newUser);

        createUser(email, password)
            .then(result => {
                const newUser = result.user;
                console.log(newUser);
            })
            .catch(error => {
                console.log(error.message);
            })


    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-3xl font-bold text-center">SignUp</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-warning" type="submit" value="SignUp" />
                        </div>
                    </form>
                    <p className='text-center mb-4'>Already have an account? <Link className='text-yellow-600 font-bold' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;