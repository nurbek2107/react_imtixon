import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";


function Product() {
    let { changeTotal, setChangeTotal } = useGlobalContext();

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plas, setPlas] = useState(true);



    let firstElementRef = useRef(null)
    let secondElementRef = useRef(null)
    let mainElementRef = useRef(null)




    let number = 0

    // functions
    let handlePlus = () => {
        if (firstElementRef.current) {
            mainElementRef.current.textContent = number += 1;
        }
    }

    let handleMinus = () => {
        if (secondElementRef.current) {
            if (number > 0) {
                mainElementRef.current.textContent = number -= 1
            }
        } 
    }

    let varToral;
    let handleAdd = () => {
        varToral = changeTotal += number;

        setChangeTotal(varToral);
        mainElementRef.current.textContent = 0;
        localStorage.setItem('total', varToral);
    }
















    function func() {
        setPlas(!plas);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="rounded-lg pt-4 max-w-8 mx-auto h-lvh">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{ shapeRendering: 'auto', display: 'block' }}>
                    <g>
                        <circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#e15b64" strokeWidth="8" r="32" cy="50" cx="50">
                            <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.1904761904761905s" type="rotate" attributeName="transform"></animateTransform>
                        </circle>
                        <circle strokeLinecap="round" fill="none" strokeDashoffset="36.12831551628262" strokeDasharray="36.12831551628262 36.12831551628262" stroke="#f8b26a" strokeWidth="8" r="23" cy="50" cx="50">
                            <animateTransform values="0 50 50;-360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.1904761904761905s" type="rotate" attributeName="transform"></animateTransform>
                        </circle>
                    </g>
                </svg>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {data && (
                <div className=" py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg  mb-4">
                                    <img className="w-full h-full object-cover" src={data.thumbnail} alt="Product Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-1/2 px-2">
                                        <button className="w-full  py-2 px-4 rounded-full font-bold hover:text-white transition duration-700 ease-in-out  hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <button className="w-full \  py-2 px-4 rounded-full font-bold transition duration-700 ease-in-out  hover:bg-gray-300 hover:text-white  dark:hover:bg-gray-600">Add to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <div className="flex items-center gap-5 flex-wrap">
                                    <h2 className="text-2xl font-bold   mb-2">{data.title}</h2>
                                    <div className="flex flex-row items-center justify-start gap-2 text-2xl mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32"
                                            className="text-green-400 w-5">
                                            <path fill-rule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <p className="font-bold text-xs text-green-600">
                                            <span>8 / 10</span>
                                        </p>
                                    </div>
                                </div>
                                <p className=" text-sm mb-4">
                                    {data.description}
                                </p>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold ">Price: </span>
                                        <span className="">${data.price}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold  ">brand: </span>
                                        <span className="">{data.brand}</span>
                                    </div>
                                </div>
                                <ul className="flex justify-start mt-5 space-x-5 mb-6" >
                                    <li>
                                        <a href="#" className="text-gray-500 hover: dark:hover:text-white dark:text-gray-400">
                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover: dark:hover:text-white dark:text-gray-400">
                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover: dark:hover:text-white dark:text-gray-400">
                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path
                                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover: dark:hover:text-white dark:text-gray-400">
                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-500 hover: dark:hover:text-white dark:text-gray-400">
                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>

                                <div className="flex justify-start gap-4 mb-6">

                                    <ul className="flex gap-2 justify-center">
                                        <li>
                                            <svg className="w-7 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512">
                                                <path fill="currentColor"
                                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg className="w-7 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512">
                                                <path fill="currentColor"
                                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg className="w-7 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512">
                                                <path fill="currentColor"
                                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg className="w-7 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512">
                                                <path fill="currentColor"
                                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg className="w-7 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512">
                                                <path fill="currentColor"
                                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z">
                                                </path>
                                            </svg>
                                        </li>
                                    </ul>


                                </div>

                                <div>
                                    <span className="font-bold  ">Product Description:</span>
                                    <p className=" text-sm mt-2">
                                        {plas ? data.description : "Another description based on plas state"}
                                    </p>
                                    <button onClick={func} className="mt-4 bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600 dark:hover:bg-blue-800">
                                        Toggle Description
                                    </button>
                                </div>















                                <div className="flex gap-10 items-baseline">
                                    <div className="flex items-center gap-8 mt-10">
                                        <button ref={secondElementRef} onClick={handleMinus} className="btn  text-2xl" >-</button>
                                        <span ref={mainElementRef}>0</span>
                                        <button ref={firstElementRef} onClick={handlePlus} className="btn text-2xl" >+</button>

                                    </div>
                                    <button onClick={handleAdd} className="btn">Add to Cart</button>
                                </div>



















                            </div>

                        </div>
                        <section className="py-8 lg:py-16 antialiased">
                            <div className="max-w-2xl mx-auto px-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bold">Discussion ({data.reviews.length})</h2>
                                </div>

                                {/* Comment Form */}
                                <form className="mb-6">
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
                                        <label htmlFor="comment" className="sr-only">
                                            Your comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows="3"
                                            className="px-0 w-full text-sm bg-white  border-0 focus:ring-0 focus:outline-none text-black dark:placeholder-gray-400 "
                                            placeholder="Write a comment..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit"
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Post comment
                                    </button>
                                </form>


                                {/* Individual Comments */}
                                {data.reviews.map((review, index) => (
                                    <article key={index} className="p-6 text-base">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                    <img
                                                        className="mr-2 w-6 h-6 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                        alt="Michael Gough"
                                                    />
                                                    <h1 className="text-gray-600 dark:text-gray-50">{review.reviewerName}</h1>
                                                </p>


                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <time pubdate dateTime={review.date} title={review.dateFormatted}>
                                                        {review.dateFormatted}
                                                    </time>
                                                </p>

                                            </div>

                                            {/* Dropdown menu */}
                                            <div
                                                id={`dropdownComment${index}`}
                                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                            >

                                            </div>
                                        </footer>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {review.comment}
                                        </p>
                                        <br />

                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{review.rating}</p>
                                        </div>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <button
                                                type="button"
                                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                            >
                                                <svg
                                                    className="mr-1.5 w-3.5 h-3.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                    />
                                                </svg>
                                                Reply
                                            </button>
                                        </div>
                                    </article>
                                ))}

                            </div>
                        </section>
                    </div>
                    <div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;