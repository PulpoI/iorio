interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonAuth = ({ children, ...props }: Props) => {
  return (
    <button
      className="my-4 px-4 py-2 flex w-full justify-center rounded-md bg-yellow-500  text-sm font-semibold leading-6  text-sky-900 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900"
      {...props}
    >
      {children}
    </button>
  );
};
