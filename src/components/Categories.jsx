import Container from "./Container"

export default function Categories() {

  const categories = [
    "Все",
    "Наушники",
    "Часы",
    "Чехлы",
    "Зарядки",
  ]

  return (

    <section className="pb-6">

      <Container>

        <div className="
          flex
          gap-2

          overflow-x-auto

          pb-2
        ">

          {categories.map(cat => (

            <button

              key={cat}

              className="
                h-9

                px-4

                border

                rounded-full

                text-sm

                whitespace-nowrap

                hover:bg-gray-100

                transition
              "
            >

              {cat}

            </button>

          ))}

        </div>

      </Container>

    </section>

  )

}