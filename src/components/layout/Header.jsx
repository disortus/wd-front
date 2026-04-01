import { Link } from "react-router-dom"

export default function Header() {

  return (
    <header className="
      border-b
      bg-white
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-4
        h-14
        flex
        items-center
        justify-between
      ">

        <Link
          to="/"
          className="
            text-lg
            font-semibold
          "
        >
          REPLICA
        </Link>

        <div className="
          hidden
          md:flex
          gap-8
          text-sm
        ">

          <Link to="/">Каталог</Link>
          <Link to="/">Доставка</Link>
          <Link to="/">Контакты</Link>

        </div>

      </div>

    </header>
  )

}