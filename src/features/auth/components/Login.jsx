import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { checkUserAsync, selectError, selectUsers } from '../authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
    const dispatch = useDispatch()
    const user = useSelector(selectUsers)
    const error = useSelector(selectError)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    console.log(errors);
    return (
        <div>
            {user && <Navigate to='/home' replace></Navigate>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Loin to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate onSubmit={handleSubmit((data) => {
                        dispatch(checkUserAsync({ email: data.email, password: data.password }))
                        console.log(data);
                    })} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('email', {
                                        required: 'email is required!', pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                            message: 'Not a valid email!'
                                        }
                                    })}
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    {...register('password', {
                                        required: 'password is required!'
                                    })}
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                        {error && <p className='text-red-500'>{error.message}</p>}
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start creating one!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login