import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import Input from "../components/ui/Input";
import { ButtonAuth } from "../components/ui/ButtonAuth";

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
          <Input
            type="text"
            name="nombre"
            register={register}
            placeholder="Nombre de usuario"
            errors={errors}
            validationSchema={{
              required: "El nombre es requerido",
            }}
            required
            label={""}
          />

          <Input
            type="email"
            name="correo"
            register={register}
            placeholder="Correo electrónico"
            errors={errors}
            validationSchema={{
              required: "El correo es requerido",
            }}
            required
            label={""}
          />

          <Input
            type="password"
            name="contraseña"
            register={register}
            placeholder="Contraseña"
            errors={errors}
            validationSchema={{
              required: "La contraseña es requerida",
            }}
            required
            label={""}
          />
          <ButtonAuth type="submit">Registrarme</ButtonAuth>
          {/* <button type="submit">Registrarme</button> */}
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
