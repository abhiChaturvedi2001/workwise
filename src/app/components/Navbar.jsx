"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { base_api_url } from "../utils/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../utils/userSlice";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${base_api_url}profile`, {
        withCredentials: true,
      });
      dispatch(login(response?.data?.user));
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${base_api_url}logout`,
        {},
        { withCredentials: true }
      );
      if (response?.data?.status) {
        toast.success(response?.data?.message);

        router.push("/login");
        dispatch(logout());
      }
    } catch (error) {}
  };
  return (
    <div className="navbar bg-base-100 px-5">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Reservation System </a>
      </div>
      {!user && (
        <Link href={"/signup"}>
          <button className="btn btn-neutral">Register</button>
        </Link>
      )}
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
