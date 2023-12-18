import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [follow,setFollow] = useState(false)

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <div className="pt-14 flex flex-col pl-10">
        <img
          src={user.image}
          alt="profile"
          className="rounded-full w-32 h-32"
        />
        <span className="text-black font-bold text-xl mt-5 mb-2">
          {user.userName || "Guest"}
        </span>
        <span className="text-gray-500">42K Followers</span>
        <div className="flex mt-5">
            {/* Follow Button */}
        <span className="mr-3">
          <div class="tooltip-container">
            <span class="tooltip">42</span>
            <span class="text" onClick={()=>{setFollow(!follow)}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 95 114"
                class="svgIcon"
              >
                <rect
                  fill="black"
                  rx="28.5"
                  height="57"
                  width="57"
                  x="19"
                ></rect>
                <path
                  fill="black"
                  d="M0 109.5C0 83.2665 21.2665 62 47.5 62V62C73.7335 62 95 83.2665 95 109.5V114H0V109.5Z"
                ></path>
              </svg>
              {follow ? "Following" : "Follow"}
            </span>
          </div>
        </span>
        <span>
          <button class="inbox-btn">
            <svg
              viewBox="0 0 512 512"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
            </svg>
          </button>
        </span>
        </div> 

        {/* Following */}
        <div className="mt-14">
          <span className="text-md font-bold">Following</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
