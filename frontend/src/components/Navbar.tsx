import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import fotoIcon from "../assets/img/foto-icon.jpg";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import logo from "../assets/img/logo.png";

import imgHero from "../assets/img/hero-7.jpg";
import imgHero1 from "../assets/img/hero-1.jpg";
import imgHero2 from "../assets/img/hero-2.jpg";
import imgHero3 from "../assets/img/hero-3.jpg";
import imgHero4 from "../assets/img/hero-4.jpg";
import imgHero5 from "../assets/img/hero-5.jpg";
import imgHero6 from "../assets/img/hero-6.jpg";
import { useEffect, useState } from "react";
import { ButtonNavYellow } from "./ui/ButtonNavYellow";

const Navbar = () => {
  const videoHero = "../../public/donde-naci-alta.mp4";
  const video = document.querySelector("video");
  const { isAuthenticated, logout, user } = useAuth();
  const [imageHero, setImageHero] = useState(imgHero);
  const images = [imgHero, imgHero1, imgHero2, imgHero3, imgHero4, imgHero5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImageHero = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];
    setImageHero(nextImage);
    setCurrentIndex(nextIndex);
  };

  const [addBg, setAddBg] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 230) {
      setAddBg(true);
    } else {
      setAddBg(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeImageHero();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSoundVideo = () => {
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  };
  // const video = document.querySelector("video");
  // useEffect(() => {
  //   if (video) {
  //     setVideoHeight(video.clientHeight);
  //   }
  // }, []);
  // window.addEventListener("resize", () => {
  //   setVideoHeight(video?.clientHeight);
  // });

  // get width of window
  // const width = window.innerWidth;

  return (
    <>
      <button
        className="z-10 fixed right-0 bottom-0  text-white bg-gray-900 px-6 py-2"
        onClick={() => handleSoundVideo()}
      >
        Activar/Desactivar sonido
      </button>

      <Disclosure
        as="nav"
        className={` fixed z-20 w-full transition-opacity: background-color ease-in-out duration-300 ${
          addBg ? "opacity-100 bg-gray-800" : ""
        }`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto container px-6">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.foto_perfil ? user.foto_perfil : fotoIcon}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {
                                  logout();
                                }}
                              >
                                Cerrar sesión
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link to="/login">
                        <ButtonNavYellow>Login</ButtonNavYellow>
                      </Link>
                      <Link to="/registro">
                        <ButtonNavYellow>Registro</ButtonNavYellow>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <section
        className="bg-cover bg-top bg-fixed overflow-hidden"
        // style={{ marginTop: `${videoHeight + 72}px` }}
        // style={{ backgroundImage: `url(${imgHero})` }}
      >
        <div className="flex justify-center bg-slate-950 bg-opacity-80 h-0">
          <div
            className="w-full absolute h-screen bg-cover bg-top bg-fixed"
            style={{ backgroundImage: `url(${imageHero})` }}
          ></div>
        </div>
      </section>

      {/* Video */}
      {/* <section className="overflow-hidden ">
        <div className="w-screen opacity-80 h-0">
          <video className="w-screen absolute" loop autoPlay muted>
            <source src={videoHero} type="video/mp4"></source>
          </video>
        </div>
      </section> */}
    </>
  );
};

export default Navbar;
