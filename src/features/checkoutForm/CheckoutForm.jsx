import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { deleteCartItemsAsync, fetchCartItemsAsync, selectItems, updateCartItemsAsync } from '../cart/cartSlice'
import { selectUsers, updateUserAsync } from '../auth/authSlice'
import { useForm } from 'react-hook-form'

function CheckoutForm() {
    const dispatch = useDispatch()
    const user = useSelector(selectUsers)
    const items = useSelector(selectItems)
    const price = items.reduce((amount, item) => item.price * item.quantity + amount, 0)
    const totalPrice = Math.ceil(price)
    const totalItems = items.reduce((count, item) => item.quantity + count, 0)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handleQuantity = (e, product) => {
        e.preventDefault()
        dispatch(updateCartItemsAsync({ ...product, quantity: +e.target.value }))
    }
    const handleDeleteItem = (e, id) => {
        dispatch(deleteCartItemsAsync(id))
    }

    useEffect(() => {
        dispatch(fetchCartItemsAsync(user.id))
    }, [dispatch, user])

    return (
        <div>
            {!items.length && <Navigate to='/' replace={true}></Navigate>}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className='lg:col-span-3'>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-5">
                        <form noValidate onSubmit={handleSubmit((data) => {
                            console.log(data);
                            dispatch(updateUserAsync({...user,address:[...user.address,data]}))
                        })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="first-name"
                                                    {...register('name', { required: 'name is required' })}
                                                    type="text"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'email is required' })}
                                                    type="email"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                                Contact
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contact"
                                                    {...register('contact', { required: 'contact is required' })}
                                                    type="tel"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="street-address"
                                                    {...register('street-address', { required: 'street-address is required' })}
                                                    type="text"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="city"
                                                    {...register('city', { required: 'city is required' })}
                                                    type="text"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="region"
                                                    {...register('region', { required: 'region is required' })}
                                                    type="text"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="postal-code"
                                                    {...register('postal-code', { required: 'postal-code is required' })}
                                                    type="text"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                            <div className="mt-5 flex items-center justify-end gap-x-6 sm:col-span-2">
                                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                                    Reset
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <section className='adressofpeople sm:col-span-2'>
                                            <ul role="list" className="divide-y divide-gray-100">
                                                {user.address.map((person) => (
                                                    <li key={person.id} className="flex justify-between gap-x-6 py-5">
                                                        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
                                                            <input
                                                                id="candidates"
                                                                name="address"
                                                                type="radio"
                                                                className="mt-1"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-semibold text-gray-900">{person.name}</p>
                                                                <p className="mt-1 text-xs text-gray-500 break-words">{person.email}</p>
                                                                <p className="mt-1 text-xs text-gray-500 break-words">{person.street}</p>
                                                                <p className="mt-1 text-xs text-gray-500 break-words">{person.city}</p>
                                                                <p className="mt-1 text-xs text-gray-500 break-words">{person.zipCode}</p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm/6 text-gray-900">Contact: {person.contact}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm/6 font-semibold text-gray-900">Make payment via</legend>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex gap-3">
                                                    <div className="flex h-6 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                defaultChecked
                                                                id="comments"
                                                                name="payments"
                                                                type="radio"
                                                                aria-describedby="comments-description"
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm/6">
                                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                                            Cash on delivery
                                                        </label>
                                                        <p id="comments-description" className="text-gray-500">
                                                            recieve parcel and make payment.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="flex h-6 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                id="candidates"
                                                                name="payments"
                                                                type="radio"
                                                                aria-describedby="candidates-description"
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm/6">
                                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                                            Credit/Debit Card
                                                        </label>
                                                        <p id="candidates-description" className="text-gray-500">
                                                            Enjoy upto 25% off with payment cards.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="flex h-6 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                id="offers"
                                                                name="payments"
                                                                type="radio"
                                                                aria-describedby="offers-description"
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm/6">
                                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                                            UPI
                                                        </label>
                                                        <p id="offers-description" className="text-gray-500">
                                                            Opt secure and safe payment methods.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link to='/cart'>
                                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                        Back to Cart
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='lg:col-span-2'>
                    <div className="mx-auto m-5 max-w-7xl p-8 sm:px-6 lg:px-8 bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img alt={product.title} src={product.thumbnail} className="size-full object-cover" />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <div className="cursor-default">{product.title}</div>
                                                        </h3>
                                                        <p className="ml-4">{product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">Qty
                                                        <select value={product.quantity} onChange={(e) => handleQuantity(e, product)}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex">
                                                        <button onClick={(e) => handleDeleteItem(e, product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mx-2 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>$ {totalPrice}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{totalItems}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                >
                                    Checkout
                                </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <Link to='/home'>
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm