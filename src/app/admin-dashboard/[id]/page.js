"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import imagePicker from "../../../image/noun-image-1066765.png";
import { createPost } from "../../../../api/api";

const Page = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: user.userName,
    authorId: user._id,
    authorImage : user.image,
    date: new Date(),
    image: image
  });

  const [showButton, setShowButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevPostData) => ({
      ...prevPostData,
      [name]: value,
      image : image,
      author: user.userName,
      authorId: user._id,
      authorImage : user.image,
    }));
  };

  const postUpload = async () => {
    await createPost(postData);
    alert("Post Uploaded");
  };

  const handleInputClick = () => {
    setShowButton((prevShowButton) => !prevShowButton);
    if (showText) {
      setShowText((prevShowText) => !prevShowText);
      setIsRotated(!isRotated);
    }
  };

  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const buttonStyles = {
    transform: isRotated ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.5s ease",
  };

  const showImage = () => {
    setShowText((prevShowText) => !prevShowText);
    setIsRotated(!isRotated);
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center mt-10">
        <div className="w-full flex flex-col max-w-7xl justify-center items-center">
          <div className="w-full flex justify-between">
            <span className="font-bold text-5xl">My Blog</span>
            <div>
              <button
                className="bg-green-600 text-white rounded-full px-3 py-1 mr-3"
                onClick={postUpload}
              >
                Publish
              </button>
            </div>
          </div>
          <div className="max-w-4xl w-full mt-16 flex flex-col font-serif">
            <input
              className="hover:border-transparent focus:border-transparent outline-none px-4 text-5xl"
              placeholder="Title"
              name="title"
              onChange={handleInputChange}
            />
            <div className="flex flex-row mt-4">
              <div>
                {showButton && (
                  <button
                    className="rounded-full px-2 text-2xl border border-black"
                    style={buttonStyles}
                    onClick={showImage}
                  >
                    +
                  </button>
                )}
                {showText && (
                  <>
                    <span className="text-lg absolute bg-white ml-4 -mt-2 w-full">
                      <Image
                        src={imagePicker}
                        alt="picture"
                        className="w-14 h-12"
                        onClick={openFilePicker}
                        name="image"
                      />
                    </span>
                    <input
                      ref={fileInputRef}
                      name="image"
                      type="file"
                      style={{ display: "none" }}
                      onChange={convertToBase64}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col">
                    {image?
                    <div className="w-full flex justify-center my-5">
                        <Image width={500} height={400} src={image} alt="preview"></Image>    
                    </div> : ""              
                    }
                
                <textarea
                  className="hover:border-transparent focus:border-transparent outline-none px-4 text-xl"
                  placeholder="Tell Your Story"
                  name="content"
                  onClick={handleInputClick}
                  onChange={handleInputChange}
                  rows={100}
                  cols={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
