import React, { useContext, useState } from "react";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import aimic from "../assets/aimic.mp3";
const Ai = () => {
  let { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  let openingSound = new Audio(aimic);

  const [activeAi, setActiveAi] = useState(false);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!speechRecognition) {
    alert("Your browser does not support Speech Recognition");
    return;
  }

  const recognition = new speechRecognition();

  if (!recognition) {
    console.log("not supported");
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();

    if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("open") &&
      !showSearch
    ) {
      speak("Opening Search");
      setShowSearch(true);
      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("close") &&
      showSearch
    ) {
      speak("Closing Search");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("collection") ||
      transcript.toLowerCase().includes("collections") ||
      transcript.toLowerCase().includes("product") ||
      transcript.toLowerCase().includes("products")
    ) {
      speak("Opening collection Page");

      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("about") ||
      transcript.toLowerCase().includes("aboutpage")
    ) {
      speak("Opening about Page");

      navigate("/about");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("home") ||
      transcript.toLowerCase().includes("homepage")
    ) {
      speak("Opening home Page");

      navigate("/");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("cart") ||
      transcript.toLowerCase().includes("kart") ||
      transcript.toLowerCase().includes("caat")
    ) {
      speak("Opening cart Page");

      navigate("/cart");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("contact") ||
      transcript.toLowerCase().includes("contactpage")
    ) {
      speak("Opening contact Page");

      navigate("/contact");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("order") ||
      transcript.toLowerCase().includes("myorders") ||
      transcript.toLowerCase().includes("orders") ||
      transcript.toLowerCase().includes("my order")
    ) {
      speak("Opening Your Order Page");

      navigate("/order");
      setShowSearch(false);
    } else {
      toast.error("try Again");
    }
  };
  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]  z-[9999]  "
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      <img
        src={ai}
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125 "
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: `${
            activeAi
              ? "drop-shadow(0px 0px 30px #00d2fc)"
              : "drop-shadow(0px 0px 20px black"
          }`,
        }}
      />
    </div>
  );
};

export default Ai;
