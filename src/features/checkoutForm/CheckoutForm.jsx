import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

const userData = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        contact: 9832564280,
        street: '5th Main',
        city: 'Asansol',
        zipCode: 130052
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        contact: 7854123696,
        street: '6th Main',
        city: 'Durgapur',
        zipCode: '560089'
    }
]

function CheckoutForm() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className='lg:col-span-3'>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-5">
                        <form>
                            <div className="space-y-12">
                                {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">workcation.com/</div>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="janesmith"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="first-name"
                                                    name="first-name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="last-name"
                                                    name="last-name"
                                                    type="text"
                                                    autoComplete="family-name"
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
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2 grid grid-cols-1">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                >
                                                    <option>India</option>
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                    <option>China</option>
                                                </select>
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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
                                                    name="street-address"
                                                    type="text"
                                                    autoComplete="street-address"
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
                                                    name="city"
                                                    type="text"
                                                    autoComplete="address-level2"
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
                                                    name="region"
                                                    type="text"
                                                    autoComplete="address-level1"
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
                                                    name="postal-code"
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                            <div className="mt-5 flex items-center justify-end gap-x-6 sm:col-span-2">
                                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                                    Reset
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <section className='adressofpeople sm:col-span-2'>
                                            <ul role="list" className="divide-y divide-gray-100">
                                                {userData.map((person) => (
                                                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                                        <div className="flex min-w-0 gap-x-4">
                                                            <input
                                                                id="candidates"
                                                                name="address"
                                                                type="radio"
                                                            />
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
                                                                <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p>
                                                                <p className="mt-1 truncate text-xs/5 text-gray-500">{person.street}</p>
                                                                <p className="mt-1 truncate text-xs/5 text-gray-500">{person.city}</p>
                                                                <p className="mt-1 truncate text-xs/5 text-gray-500">{person.zipCode}</p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm/6 text-gray-900">Contact: {person.contact}</p>
                                                            {/* {person.lastSeen ? (
                                                                <p className="mt-1 text-xs/5 text-gray-500">
                                                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                                </p>
                                                            ) : (
                                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                        <div className="size-1.5 rounded-full bg-emerald-500" />
                                                                    </div>
                                                                    <p className="text-xs/5 text-gray-500">Online</p>
                                                                </div>
                                                            )} */}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    {/* <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear about.
                        </p> */}

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

                                        {/* <fieldset>
                                <legend className="text-sm/6 font-semibold text-gray-900">Push notifications</legend>
                                <p className="mt-1 text-sm/6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            defaultChecked
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset> */}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                {/* <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button> */}
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
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-5'>
                        <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
                            <h2 className='text-3xl text-center underline mb-7'>My Cart</h2>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">{product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">Qty
                                                            <select>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                {/* <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                    >
                                        Checkout
                                    </a>
                                </div> */}

                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        <button
                                            type="button"
                                            className="rounded-md bg-indigo-600 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Place Order and make payment
                                        </button>
                                        or{' '}
                                        <Link to='/home'>
                                            <button
                                                type="button"
                                                className=" font-medium text-indigo-600 hover:text-indigo-500"
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
        </div>
    )
}

export default CheckoutForm