import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../auth/authSlice'
import { deleteCartItemsAsync, fetchCartItemsAsync, selectItems, updateCartItemsAsync } from './cartSlice'
``

function Cart() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(selectUsers)
    const items = useSelector(selectItems)
    const price = items.reduce((amount, item) => item.price * item.quantity + amount, 0)
    const totalPrice = Math.ceil(price)
    const totalItems = items.reduce((count, item) => item.quantity + count, 0)

    const handleQuantity=(e,product)=>{
        e.preventDefault()   
        dispatch(updateCartItemsAsync({...product,quantity:+e.target.value}))
    }
    const handleDeleteItem=(e,id)=>{
        dispatch(deleteCartItemsAsync(id))
    }

    useEffect(() => {
        dispatch(fetchCartItemsAsync(user.id))
    }, [dispatch, user])
    return (
        <>
        {!items.length && <Navigate to='/' replace={true}></Navigate>}
            <h2 className='text-3xl mb-10 text-center underline'>My Cart</h2>
            <div className="mx-auto m-5 max-w-7xl p-8 sm:px-6 lg:px-8 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flow-root ">
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
                                                <select value={product.quantity} onChange={(e)=>handleQuantity(e,product)}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>

                                            <div className="flex">
                                                <button onClick={(e)=>handleDeleteItem(e,product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                    <div className="mt-6  flex justify-center text-center text-sm text-gray-500">
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
        </>
    )
}

export default Cart