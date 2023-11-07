import { useAuth } from "../context/AuthContext";

const MyPosts = () => {
  const { user } = useAuth();
  console.log(user);

  return <div>MyPosts</div>;
};

export default MyPosts;
