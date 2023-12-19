import { useEffect } from "react";
import { useVideoHeight } from "../context/VideoHeightContext";
import { usePosts } from "../context/PostsContext";

import imgHero from "../assets/img/hero-7.jpg";

const HomePage = () => {
  const { videoHeight } = useVideoHeight();

  const { getPosts, allPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {/* <section
        className="h-screen bg-cover bg-top bg-fixed"
        // style={{ marginTop: `${videoHeight + 72}px` }}
        style={{ backgroundImage: `url(${imgHero})` }}
      >
        <div className="flex justify-center bg-slate-950 bg-opacity-80 h-screen">
          <div className="flex flex-col items-center justify-center container mx-5 gap-5">
            <h1>Ricardo Iorio</h1>
            <h2 className="italic max-w-2xl text-center ">
              "Son todos aparatos que median entre la realidad del hombre y la
              vida real"
            </h2>
          </div>
        </div>
      </section> */}
      <section className="flex justify-center items-center flex-col bg-slate-950 bg-opacity-80">
        <div className="h-screen w-full  flex flex-col items-center justify-center container mx-5 gap-5">
          <h1>Ricardo Iorio</h1>
          <h2 className="italic max-w-2xl text-center ">
            "Son todos aparatos que median entre la realidad del hombre y la
            vida real"
          </h2>
        </div>
      </section>
      <div className="flex max-w-5xl gap-4 flex-wrap">
        <h2>Posts</h2>
        {allPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
            <img
              src={post.contenido.replace(
                "I:/DW FRONTEND/",
                "http://localhost/"
              )}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
