import { useForm } from "react-hook-form";
import { usePosts } from "../context/PostsContext";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { register, handleSubmit } = useForm();
  const { posts, createPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    data.token = Cookies.get("user");
    data.usuario_id = user.id;
    data.categoria_id = "3";
    data.tipo_contenido = "texto";
    data.estado = "pendiente";
    data.contenido = "";

    console.log(data);

    createPost(data);
    navigate("/mis-posts");
  });

  useForm();
  return (
    <div className="bg-zinc-800 my-20 py-20 w-full flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Título"
          {...register("titulo")}
          autoFocus
          className="w-full mb-4 h-10 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <textarea
          rows={3}
          placeholder="Descripción"
          {...register("descripcion")}
          className="w-full mb-4 h-60 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        ></textarea>
        <button>Guardar</button>
      </form>
    </div>
  );
};

export default NewPost;
