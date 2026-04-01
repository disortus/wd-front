import { Link } from "react-router-dom"

import Container from "./Container"

export default function Header() {

  return (

    <header className="

      border-b

      bg-white/80

      backdrop-blur

      sticky

      top-0

      z-40

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

              tracking-tight

            "

          >

            REPLICA

          </Link>



          <nav className="

            hidden

            md:flex

            gap-8

            text-sm

            text-secondary

          ">

            <Link to="/">Каталог</Link>

            <Link to="/">Доставка</Link>

            <Link to="/">Контакты</Link>

          </nav>



          <Link

            to="/profile"

            className="

              hidden

              md:block

              text-sm

            "

          >

            Профиль

          </Link>



        </div>

      </Container>

    </header>

  )

}