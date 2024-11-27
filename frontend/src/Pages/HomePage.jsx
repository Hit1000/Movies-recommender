import React from "react";
import heroImage1 from "../assets/hero.png";
import heroImage2 from "../assets/hero2.jpg";

const HomePage = () => {
  const images = [heroImage1, heroImage2];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <>
      <div
        className="h-bg h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${randomImage})`,
        }}
      >
        hh
      </div>
    </>
  );
};

export default HomePage;
