import React from "react";
import { useRouter } from "next/navigation";
import writepost from "../../image/write.png";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function () {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const handleLoginClick = (e) => {
    e.preventDefault();
    const checkBtn = e.target.value;
    checkBtn === "login"
      ? router.push("/auth/signIn")
      : router.push("/auth/signUp");
  };

  const uploadPost = () => {
    router.push(`admin-dashboard/${user._id}`);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setShowProfile(user ? true : false);
  }, []);

  return (
    <div className="flex justify-between items-center w-full py-4 px-10 border-b border-gray-300">
      <div className="flex">
        <span className="text-3xl font-bold mr-10">My Blog</span>
        <div className="container-input">
          <input
            type="text"
            placeholder="Search"
            name="text"
            className="input"
          />
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      {showProfile ? (
        <div className="px-6 mt-3 text-center flex items-center">
          <span onClick={uploadPost} className="flex">
            <Image
              src={writepost}
              className="w-5 h-5 mr-2"
              width={0}
              height={0}
              alt="write post"
            ></Image>
            Write Post
          </span>
          {/* Noti */}
          <span className="ml-5">
            <label class="container">
              <input type="checkbox" checked="checked" />
              <svg
                class="bell-regular"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
              </svg>
              <svg
                class="bell-solid"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
              </svg>
            </label>
          </span>
        </div>
      ) : (
        <div className="px-6 mt-3 text-center">
          <button
            className="bg-gray-600 px-6 py-1 text-white rounded-md"
            value="login"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="bg-gray-600 px-6 py-1 text-white rounded-md ml-3"
            value="signup"
            onClick={handleLoginClick}
          >
            SignUp
          </button>
        </div>
      )}
    </div>
  );
}
