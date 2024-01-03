import gifLoader from "../assets/img/loader/loader-4.gif";

const Loader = () => {
  return (
    <>
      <div className="h-screen fixed flex justify-center items-center w-full bg-slate-900 bg-opacity-90">
        <img
          className="rounded-full h-48 w-48 object-cover rotated-element"
          src={gifLoader}
          alt="Rotating Element"
        />
      </div>
    </>
  );
};

export default Loader;
