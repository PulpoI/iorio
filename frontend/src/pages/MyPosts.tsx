import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostsContext";
import { useEffect } from "react";

const MyPosts = () => {
  const { getPostsUser, posts } = usePosts();

  useEffect(() => {
    getPostsUser();
  }, []);

  if (posts.length === 0) {
    return <h1>No hay posts</h1>;
  }

  return (
    <div>
      <h1>Mis posts</h1>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
