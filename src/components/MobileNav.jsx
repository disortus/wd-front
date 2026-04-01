import { Home, Search, ShoppingCart, User } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function MobileNav() {

  return (

    <nav className="
      fixed
      bottom-0
      left-0
      right-0

      h-16

      bg-white

      border-t

      flex
      items-center
      justify-around

      md:hidden

      z-50
      bg-white/90 backdrop-blur
    ">

      <Item
        to="/"
        icon={<Home size={20}/>}
      >
        Главная
      </Item>


      <Item
        to="/catalog"
        icon={<Search size={20}/>}
      >
        Каталог
      </Item>


      <Item
        to="/cart"
        icon={<ShoppingCart size={20}/>}
      >
        Корзина
      </Item>


      <Item
        to="/profile"
        icon={<User size={20}/>}
      >
        Профиль
      </Item>


    </nav>

  )

}


function Item({ to, icon, children }) {

  return (

    <NavLink
      to={to}

      className={({ isActive }) => `

        flex
        flex-col

        items-center

        gap-1

        text-xs

        ${
          isActive
            ? "text-black"
            : "text-gray-400"
        }

      `}
    >

      {icon}

      {children}

    </NavLink>

  )

}