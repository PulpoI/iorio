import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";

const CategoryPosts = () => {
  const { category, category_id } = useParams();
  const { getPostsCategory, posts } = usePosts();

  useEffect(() => {
    getPostsCategory(category_id);
  }, []);

  console.log(posts);

  return (
    <div>
      <h2>{category} Posts</h2>
      {/* Resto del código */}
    </div>
  );
};

export default CategoryPosts;
