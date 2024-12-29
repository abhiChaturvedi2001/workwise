"use client";
import React, { useState } from "react";
import axios from "axios";
import { base_api_url } from "../utils/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${base_api_url}register`,
                { name, email, password },
                { withCredentials: true }
            );
            if (response?.data?.status) {
                return router.push("/login")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Register
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {loading ? <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                </button> : <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Register
                </button>}
                <p className="text-center my-5 font-bold">Have an account ? <Link href={"/login"}><span className="hover:underline">Login</span></Link> </p>
            </form>
        </div>
    );
};

export default page;
