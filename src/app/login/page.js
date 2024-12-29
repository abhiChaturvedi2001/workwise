"use client";
import React, { useState } from "react";
import axios from "axios";
import { base_api_url } from "../utils/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

const page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${base_api_url}login`,
                { email, password },
                { withCredentials: true }
            );
            const result = response?.data;
            if (result?.status) {
                toast.success(`welcome back ${result?.user?.name}`);
                dispatch(login(result?.user));
                router.push("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Login
                </h2>
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

                {loading ? (
                    <button className="btn w-full bg-blue-500 text-white py-2 rounded-lg transition duration-300">
                        <span className="loading loading-spinner"></span>
                        loading
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                )}
                <p className="text-center my-5 font-bold">
                    Not a member ?{" "}
                    <Link href={"/signup"}>
                        <span className="hover:underline">Register</span>
                    </Link>{" "}
                </p>
            </form>
        </div>
    );
};

export default page;
