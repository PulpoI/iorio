import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mis-posts");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {registerErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white">{registerErrors}</div>
        )}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.nombre && (
            <p className="text-red-500">El nombre es requerido</p>
          )}
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
          <button type="submit">Registrarme</button>
        </form>
        <p>
          Ya tenés una cuenta? <Link to={"/login"}>Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
