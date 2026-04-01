import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import Header from "../components/Header"
import MobileNav from "../components/MobileNav"

export default function MainLayout() {

    const fetchMe = useAuthStore(state => state.fetchMe)

        useEffect(() => {

        fetchMe()

        }, [])

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