import { useForm } from "react-hook-form";
import { usePosts } from "../context/PostsContext";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const NewPost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { posts, createPost, getPost, updatePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const post = await getPost(params.id);
        setValue("id", post.id);
        setValue("titulo", post.titulo);
        setValue("descripcion", post.descripcion);
        setValue("usuario_id", post.usuario_id);
        setValue("categoria_id", post.categoria_id);
        setValue("estado", post.estado);
        setValue("contenido", post.contenido);
        setValue("tipo_contenido", post.tipo_contenido);
        setValue("fecha_subida", post.fecha_subida);
      }
    }
    loadPost();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      data.token = Cookies.get("user");
      console.log(data);
      updatePost(data);
    } else {
      data.token = Cookies.get("user");
      data.usuario_id = user.id;
      data.categoria_id = "3";
      data.tipo_contenido = "texto";
      data.estado = "pendiente";
      data.contenido = "";
      data.tipo_contenido = "";
      createPost(data);
    }
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
