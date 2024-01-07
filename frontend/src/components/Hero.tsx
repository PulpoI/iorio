import imgHero from "../assets/img/hero-7.jpg";
import imgHero1 from "../assets/img/hero-1.jpg";
import imgHero2 from "../assets/img/hero-2.jpg";
import imgHero3 from "../assets/img/hero-3.jpg";
import imgHero4 from "../assets/img/hero-4.jpg";
import imgHero5 from "../assets/img/hero-5.jpg";
import imgHero6 from "../assets/img/hero-6.jpg";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [imageHero, setImageHero] = useState(imgHero);
  const images = [imgHero, imgHero1, imgHero2, imgHero3, imgHero4, imgHero5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImageHero = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];
    setImageHero(nextImage);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeImageHero();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <section className="bg-cover bg-top bg-fixed overflow-hidden relative h-screen">
        <div className="flex justify-center bg-slate-950 bg-opacity-80 h-0">
          <div
            className="w-full absolute h-screen bg-cover bg-top bg-fixed"
            style={{ backgroundImage: `url(${imageHero})` }}
          ></div>
          <div className="bg-slate-950 bg-opacity-95 relative w-full h-screen"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col bg-slate-950 bg-opacity-95 relative">
        <div className="h-80 w-full  flex flex-col items-center justify-center container mx-5 gap-5">
          <h1>Homenaje</h1>
          <h2
            className="italic max-w-2xl text-center "
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            "Son todos aparatos que median entre la realidad del hombre y la
            vida real"
          </h2>
        </div>
      </section>
    </>
  );
};
