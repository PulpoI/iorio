import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";

const PostCard = ({ post }) => {
  const { deletePost } = usePosts();

  const navigate = useNavigate();

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
      <p className="text-slate-300">{post.descripcion}</p>
      <p> {new Date(post.fecha_subida).toLocaleDateString()} </p>
    </div>
  );
};

export default PostCard;
