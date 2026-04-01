export default function Hero() {

  return (

    <section className="
      py-12
      md:py-20
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-4

        grid
        gap-8

        md:grid-cols-2
        md:items-center
      ">

        <div>

          <h1 className="
            text-3xl
            md:text-5xl

            font-semibold
            leading-tight
          ">

            Абсолютная
            точность.
            Безупречный звук.

          </h1>


          <p className="
            mt-4
            text-gray-500
          ">

            AirPods Pro обеспечивают
            кристально чистое звучание
            и комфорт в течение дня.

          </p>


          <button className="
            mt-6

            bg-black
            text-white

            px-6
            h-11

            rounded-xl

            text-sm
          ">

            Смотреть

          </button>

        </div>


        <div className="
          bg-gray-100

          rounded-2xl

          h-64
          md:h-80
        " />

      </div>

    </section>

  )

}