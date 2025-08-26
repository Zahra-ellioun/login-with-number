"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/services/login";

import Swal from "sweetalert2";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      // console.log(res);
      if (res.status == 200) {
        localStorage.removeItem("token");
        router.push("/login");
        // console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.detail,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.replace("/login");
    }
    setLoading(false);
  }, []);

  return (
    <div className="w-full grid place-content-center min-h-dvh bg-gray-400">
      {loading ? (
        <div>loading ...</div>
      ) : (
        // home page container
        <div className="grid place-content-center w-[320px] h-[568px]  bg-[#ffffff] ">
          {/* log out button */}
          <button
            onClick={(e) => {
              handleLogout(e);
            }}
            className="bg-purple-400 px-16 py-3 rounded-2xl shadow-2xl cursor-pointer"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
