import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/logo.jpg";
import imgHero from "../assets/img/hero-7.jpg";

const Navbar = () => {
  const videoHero = "../../public/donde-naci-alta.mp4";
  const { isAuthenticated, logout, user } = useAuth();
  const video = document.querySelector("video");

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
        className="in z-10 fixed right-0 bottom-0  text-white bg-gray-900 px-6 py-2"
        onClick={() => handleSoundVideo()}
      >
        Activar/Desactivar sonido
      </button>
      <nav className="bg-black flex justify-between items-center px-10 absolute top-0 z-10 w-full">
        <Link to="/">
          <img src={logo} alt="" className="w-56" />
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>Bienvenido {user.nombre}</li>
              <li>
                <Link
                  to="/mis-posts"
                  className="bg-yellow-500 px-4 py-1 rounder-sm"
                >
                  Mis Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/agregar-post"
                  className="bg bg-yellow-500 px-4 py-1 rounder-sm"
                >
                  Agregar Post
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Salir
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg bg-yellow-500 flex justify-center w-24 py-1 rounded-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/registro"
                  className="bg bg-yellow-500 flex justify-center w-24 py-1 rounded-md "
                >
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <section
        className="bg-cover bg-top bg-fixed overflow-hidden"
        // style={{ marginTop: `${videoHeight + 72}px` }}
        // style={{ backgroundImage: `url(${imgHero})` }}
      >
        <div className="flex justify-center bg-slate-950 bg-opacity-80 h-0">
          <div
            className="w-full absolute h-screen bg-cover bg-top bg-fixed"
            style={{ backgroundImage: `url(${imgHero})` }}
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
