import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostsContext";
import { useEffect } from "react";
import Loader from "../components/Loader";

const MyPosts = () => {
  const { getPostsUser, posts } = usePosts();

  useEffect(() => {
    getPostsUser();
  }, []);

  return (
    <>
      {!posts ? (
        <Loader />
      ) : (
        <div>
          <h1>Mis posts</h1>
          <div className="grid grid-cols-3 gap-2 h-screen">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyPosts;
