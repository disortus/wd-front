import Container from "../components/Container"
import Input from "../components/Input"

import { useForm } from "react-hook-form"

export default function RegisterPage() {

  const {

    register,

    handleSubmit,

    formState: { errors }

  } = useForm()


  function onSubmit(data) {

    console.log(data)

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

          Create account

        </h1>



        <form

          onSubmit={handleSubmit(onSubmit)}

          className="
            mt-6

            space-y-4
          "
        >


          <Input

            label="Name"

            placeholder="Your name"

            {...register("name", {

              required: "Введите имя"

            })}

            error={errors.name?.message}

          />


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

              required: "Введите пароль",

              minLength: {

                value: 6,

                message: "Минимум 6 символов"

              }

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

            Register

          </button>

        <p className="text-sm text-gray-500 text-center">

        Already have account?

        <a
            href="/login"
            className="ml-1 underline"
        >
            Login
        </a>

        </p>

        </form>


      </div>

    </Container>

  )

}