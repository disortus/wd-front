export default function Input({
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) {

  return (

    <div>

      <label className="
        text-sm
      ">

        {label}

      </label>


      <input

        type={type}

        placeholder={placeholder}

        className="
          mt-1

          w-full
          h-11

          px-3

          border

          rounded-xl

          text-sm

          focus:outline-none
          focus:ring-1
          focus:ring-black
        "

        {...props}

      />


      {error && (

        <p className="
          mt-1

          text-xs

          text-red-500
        ">

          {error}

        </p>

      )}

    </div>

  )

}