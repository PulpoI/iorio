import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <nav className="bg-zinc-700 flex justify-between py-5 px-10 rounded-lg">
        <Link to="/">
          <h1 className="text-2xl font-bold">Iorio</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>Bienvenido {user.nombre}</li>
              <li>
                <Link
                  to="/mis-posts"
                  className="bg-indigo-500 px-4 py-1 rounder-sm"
                >
                  Mis Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/agregar-post"
                  className="bg-indigo-500 px-4 py-1 rounder-sm"
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
                  className="bg-indigo-500 px-4 py-1 rounder-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/registro"
                  className="bg-indigo-500 px-4 py-1 rounder-sm"
                >
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <section className="overflow-hidden ">
        <div className="w-screen opacity-80 h-0">
          <video className="w-screen absolute" loop autoPlay muted>
            <source src={videoHero} type="video/mp4"></source>
          </video>
          <button
            className="in z-10 fixed right-0 bottom-0  text-white bg-gray-900 px-6 py-2"
            onClick={() => handleSoundVideo()}
          >
            Activar/Desactivar sonido
          </button>
        </div>
      </section>
    </>
  );
};

export default Navbar;
