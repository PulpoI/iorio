import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";

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

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    // event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="flex bg-slate-950 bg-opacity-70 items-center justify-center h-screen">
      <div className="bg-slate-950 bg-opacity-80 max-w-md w-full p-10 rounded-md">
        {registerErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white">{registerErrors}</div>
        )}
        <h1>Registrarse</h1>
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
          Ya tenés una cuenta? <Link to={"/login"}>Inicia sesión</Link>
        </p>
      </div>
      {/* <YouTube
        videoId="8lwbkkSgteg"
        opts={opts}
        onReady={onPlayerReady}
        loading="lazy"
      /> */}
    </div>
  );
};

export default RegisterPage;
