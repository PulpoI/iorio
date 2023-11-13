import { useVideoHeight } from "../context/VideoHeightContext";

const HomePage = () => {
  const { videoHeight } = useVideoHeight();

  console.log(videoHeight);

  return (
    <>
      <section
        className="flex flex-col items-center justify-center"
        style={{ marginTop: `${videoHeight + 72}px` }}
      >
        <h1>Ricardo Iorio</h1>
        <h2>
          Son todos aparatos que median entre la realidad del hombre y la vida
          real
        </h2>
      </section>
    </>
  );
};

export default HomePage;
