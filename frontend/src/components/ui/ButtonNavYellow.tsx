interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonNavYellow = ({ children, ...props }: Props) => {
  return (
    <button
      className="bg-yellow-500 flex justify-center w-24 py-1 rounded-md text-sm font-semibold leading-6  text-sky-900 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900"
      {...props}
    >
      {children}
    </button>
  );
};
