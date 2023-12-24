import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import PostCard from "../components/PostCard";

const CategoryPosts = () => {
  const { category, category_id } = useParams();
  const { getPostsCategory, posts } = usePosts();

  useEffect(() => {
    if (category_id) {
      getPostsCategory(category_id);
    }
  }, [category_id, getPostsCategory]);

  return (
    <div>
      <h1>Category: {category}</h1>
      <ul>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryPosts;
