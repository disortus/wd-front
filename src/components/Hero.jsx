import Container from "./Container";

export default function Hero() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div
          className="

          grid
          gap-8

          md:grid-cols-2
          md:items-center

        "
        >
          {/* текст */}

          <div>
            <h1
              className="
              text-3xl
              md:text-5xl

              font-semibold

              leading-tight
            "
            >
              Абсолютная точность. Безупречный звук.
            </h1>

            <p
              className="
              mt-4

              text-gray-500
            "
            >
              AirPods Pro обеспечивают чистое звучание и комфорт на протяжении
              всего дня.
            </p>

            <button className="
            mt-6

            h-11
            px-6

            bg-black
            text-white

            rounded-xl

            text-sm
            font-medium

            hover:bg-neutral-800
            transition
            ">
              Смотреть
            </button>
          </div>

          {/* изображение */}

          <div
            className="

            bg-gray-100

            rounded-2xl

            h-56
            md:h-80

          "
          />
        </div>
      </Container>
    </section>
  );
}
