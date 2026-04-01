import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import MobileNav from "../components/MobileNav"

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