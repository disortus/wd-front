import Container from "../components/Container"
import Input from "../components/Input"

import { useForm } from "react-hook-form"

export default function LoginPage() {

  const {

    register,

    handleSubmit,

    formState: { errors }

  } = useForm()


  function onSubmit(data) {

    console.log("login", data)

  }


  return (

    <Container>

      <div className="
        mt-10

        max-w-md
      ">

        <h1 className="
          text-xl
          font-semibold
        ">

          Login

        </h1>


        <form

          onSubmit={handleSubmit(onSubmit)}

          className="
            mt-6

            space-y-4
          "
        >


          <Input

            label="Email"

            type="email"

            placeholder="email@mail.com"

            {...register("email", {

              required: "Введите email"

            })}

            error={errors.email?.message}

          />


          <Input

            label="Password"

            type="password"

            placeholder="******"

            {...register("password", {

              required: "Введите пароль"

            })}

            error={errors.password?.message}

          />


          <button

            className="
              w-full

              h-11

              bg-black
              text-white

              rounded-xl

              text-sm

              hover:bg-neutral-800

              transition
            "

          >

            Login

          </button>

        <p className="text-sm text-gray-500 text-center">

        No account?

        <a
            href="/register"
            className="ml-1 underline"
        >
            Register
        </a>

        </p>

        </form>

      </div>

    </Container>

  )

}