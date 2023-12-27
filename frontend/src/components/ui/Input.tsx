function Input({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  placeholder,
}) {
  return (
    <>
      <input
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationSchema)}
      />
      {errors && errors[name]?.type === "required" && (
        <p className="text-red-500 h-0 relative bottom-3">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
}

export default Input;
