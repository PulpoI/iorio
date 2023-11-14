import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    setUrlImage(post.contenido.replace("I:/DW FRONTEND/", "http://localhost/"));
  }, [post]);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{post.titulo}</h2>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              navigate(`/mis-posts/${post.id}`);
            }}
          >
            Editar
          </button>
        </div>
      </div>
      <img src={urlImage} alt="imagen" className="rounded-md w-full my-5" />
      <p className="text-slate-300">{post.descripcion}</p>
      <p> {new Date(post.fecha_subida).toLocaleDateString()} </p>
    </div>
  );
};

export default PostCard;
