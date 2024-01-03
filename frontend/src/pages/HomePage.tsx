import { useEffect } from "react";
import { useVideoHeight } from "../context/VideoHeightContext";
import { usePosts } from "../context/PostsContext";
import { useCategories } from "../context/CategoriesContext";

import fotoTatuajes from "../assets/img/tatuajes/1.jpg";
import fotoEntrevistas from "../assets/img/entrevistas/1.jpg";
import fotoAnecdotas from "../assets/img/anecdotas/1.webp";
import fotoRecitales from "../assets/img/recitales/1.webp";
import fotoDibujos from "../assets/img/dibujos/4.jpg";
import fotoBiografias from "../assets/img/biografia/2.jpg";
import fotoEntradas from "../assets/img/entradas/3.jpg";
import fotoCanciones from "../assets/img/canciones/1.jpg";
import fotoHistorias from "../assets/img/historias/1.jpg";
import fotoFrases from "../assets/img/frases/1.jpg";
import fotoReferencias from "../assets/img/referencias/1.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { videoHeight } = useVideoHeight();
  const { getPosts, allPosts } = usePosts();
  const { getCategories, categories } = useCategories();

  useEffect(() => {
    getPosts();
    getCategories();
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
      <section className="flex justify-center items-center flex-col bg-slate-950 bg-opacity-90">
        <div className="h-screen w-full  flex flex-col items-center justify-center container mx-5 gap-5">
          <h1>Homenaje</h1>
          <h2
            className="italic max-w-2xl text-center "
            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
          >
            "Son todos aparatos que median entre la realidad del hombre y la
            vida real"
          </h2>
        </div>
      </section>
      <div
        id="categoryHome"
        className="flex gap-4 flex-wrap flex-col bg-slate-950 bg-opacity-80"
      >
        {/* {allPosts.map((post) => (
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
        ))} */}

        <div className="flex flex-wrap">
          <div id="seccionEspecifica"> </div>
          {categories.map((category) => (
            <Link
              to={`/${category.id}/${category.nombre.toLowerCase()}`}
              key={category.id}
              className="flex justify-center w-1/3 h-80"
            >
              <div
                className="w-full b-full bg-center bg-cover rounded-sm"
                style={{
                  backgroundImage:
                    category.nombre === "Tatuajes"
                      ? `url(${fotoTatuajes})`
                      : category.nombre === "Entrevistas"
                      ? `url(${fotoEntrevistas})`
                      : category.nombre === "Anecdotas"
                      ? `url(${fotoAnecdotas})`
                      : category.nombre === "Recitales"
                      ? `url(${fotoRecitales})`
                      : category.nombre === "Dibujos"
                      ? `url(${fotoDibujos})`
                      : category.nombre === "Biografía"
                      ? `url(${fotoBiografias})`
                      : category.nombre === "Entradas"
                      ? `url(${fotoEntradas})`
                      : category.nombre === "Canciones"
                      ? `url(${fotoCanciones})`
                      : category.nombre === "Historias"
                      ? `url(${fotoHistorias})`
                      : category.nombre === "Frases"
                      ? `url(${fotoFrases})`
                      : category.nombre === "Referencias"
                      ? `url(${fotoReferencias})`
                      : "",
                }}
              >
                <div className="flex justify-center items-center flex-col w-full h-full bg-slate-950 bg-opacity-90">
                  <h3 className="text-5xl">{category.nombre}</h3>
                  <div>
                    {/* <p className="px-10 pt-4 d-none  hover:inline-flex">
                      {category.descripcion}
                    </p> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
