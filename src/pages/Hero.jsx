import Container from "./Container"

export default function Hero() {

  return (

    <section className="

      py-12

      md:py-20

    ">

      <Container>

        <div className="

          grid

          gap-10

          md:grid-cols-2

          md:items-center

        ">

          <div>

            <h1 className="

              text-3xl

              md:text-5xl

              font-semibold

              leading-tight

              tracking-tight

            ">

              Абсолютная точность.

              Безупречный звук.

            </h1>



            <p className="

              mt-4

              text-secondary

              max-w-md

            ">

              AirPods Pro обеспечивают

              чистое звучание и комфорт

              на протяжении всего дня.

            </p>



            <button className="

              mt-6

              h-11

              px-6

              bg-primary

              text-white

              rounded-xl

              text-sm

              font-medium

              hover:opacity-90

              transition

            ">

              Смотреть

            </button>



          </div>



          <div className="

            bg-surface

            rounded-2xl

            h-56

            md:h-80

            shadow-card

          " />

        </div>

      </Container>

    </section>

  )

}