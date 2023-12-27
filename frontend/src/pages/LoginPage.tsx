import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Input from "../components/ui/Input";
import { ButtonAuth } from "../components/ui/ButtonAuth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mis-posts");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="bg-slate-950 bg-opacity-70 flex items-center justify-center h-screen">
      <div className="bg-slate-950 bg-opacity-80 max-w-md w-full p-16 rounded-md mx-auto px-10">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
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

          <ButtonAuth type="submit">Iniciar Sesión</ButtonAuth>
        </form>

        <p>
          No tenés una cuenta aun? <Link to={"/registro"}>Registrate</Link>
        </p>
        {signinErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white text-center absolute">
            {signinErrors}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
