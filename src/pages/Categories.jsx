export default function Categories() {

  const items = [
    "Все",
    "Наушники",
    "Часы",
    "Чехлы",
    "Зарядки",
  ]

  return (

    <section>

      <div className="
        max-w-6xl
        mx-auto
        px-4

        flex
        gap-2
        overflow-x-auto

        pb-4
      ">

        {items.map(item => (

          <button

            key={item}

            className="
              px-4
              h-9

              border

              rounded-full

              text-sm

              whitespace-nowrap
            "
          >

            {item}

          </button>

        ))}

      </div>

    </section>

  )

}