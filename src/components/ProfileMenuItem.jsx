import { ChevronRight } from "lucide-react"

export default function ProfileMenuItem({ children }) {

  return (

    <div className="
      flex
      items-center
      justify-between

      h-12

      border-b

      text-sm
    ">

      <span>

        {children}

      </span>


      <ChevronRight size={16} />

    </div>

  )

}