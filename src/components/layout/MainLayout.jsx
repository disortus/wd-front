import { Outlet } from "react-router-dom"

import Header from "./Header"
import MobileNav from "./MobileNav"

export default function MainLayout() {

  return (
    <div>

      <Header />

      <main className="
        min-h-screen
        pb-20
      ">

        <Outlet />

      </main>

      <MobileNav />

    </div>
  )

}