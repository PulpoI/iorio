import { usePosts } from "../context/PostsContext";
import { useEffect } from "react";

const MyPosts = () => {
  const { getPostsUser, posts } = usePosts();
  console.log(posts);

  useEffect(() => {
    getPostsUser();
  }, []);

  if (posts.length === 0) {
    return <h1>No hay posts</h1>;
  }

  return (
    <div>
      <h1>Mis posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.titulo}</h2>
          <p>{post.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
