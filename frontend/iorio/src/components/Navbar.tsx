import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
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
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounder-sm">
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
  );
};

export default Navbar;
