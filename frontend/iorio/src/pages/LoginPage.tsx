import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white text-center">
            {signinErrors}
          </div>
        )}
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("correo", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {errors.correo && (
            <p className="text-red-500">El correo es requerido</p>
          )}

          <input
            type="password"
            {...register("contraseña", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.contraseña && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          No tenés una cuenta aun? <Link to={"/registro"}>Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
