import { Link } from "react-router-dom"
import Container from "./Container"

export default function Header() {

  return (

    <header className="
      border-b
      bg-white
    ">

      <Container>

        <div className="
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


          <nav className="
            hidden
            md:flex

            gap-8

            text-sm
          ">

            <Link to="/">Каталог</Link>

            <Link to="/">Доставка</Link>

            <Link to="/">Контакты</Link>

          </nav>


          <div className="
            hidden
            md:flex
            gap-4
          ">

            <Link to="/profile">
              Профиль
            </Link>

          </div>

        </div>

      </Container>

    </header>

  )

}