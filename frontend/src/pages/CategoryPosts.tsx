import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

const CategoryPosts = () => {
  const { category, category_id } = useParams();
  const { getPostsCategory, posts } = usePosts();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (category_id) {
      getPostsCategory(category_id);
      setLoader(false);
    }
  }, [category_id, getPostsCategory]);

  return (
    <>
      {loader ? <Loader /> : null}
      <div>
        <h1>Category: {category}</h1>
        <ul>
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryPosts;
