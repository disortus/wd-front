import Container from "../components/Container"
import ProfileMenuItem from "../components/ProfileMenuItem"
import { useAuthStore } from "../store/authStore"

export default function ProfilePage() {

    const user = useAuthStore(state => state.user)

  return (

    <Container>

      {/* header */}
<div className="

  mt-10

  flex

  items-center

  gap-4

">

  <div className="

    w-16

    h-16

    rounded-full

    bg-surface

  " />


  <div>

    <p className="

      font-medium

      text-base

    ">

      {user?.fullname}

    </p>


    <p className="

      text-sm

      text-secondary

    ">

      {user?.email}

    </p>

  </div>

</div>

        {/* avatar */}

        <div className="
          w-14
          h-14

          bg-gray-200

          rounded-full
        " />


        {/* user info */}

        <div>

          <p className="
            font-medium
          ">

            {user?.fullname}

          </p>


          <p className="
            text-sm

            text-gray-500
          ">

            {user?.email}

          </p>

        </div>




      {/* menu */}

      <div className="
        mt-8
      ">

        <ProfileMenuItem>
          Orders
        </ProfileMenuItem>


        <ProfileMenuItem>
          Returns
        </ProfileMenuItem>


        <ProfileMenuItem>
          Personal data
        </ProfileMenuItem>


        <ProfileMenuItem>
          Address
        </ProfileMenuItem>


        <ProfileMenuItem>
          Payment methods
        </ProfileMenuItem>


        <ProfileMenuItem>
          FAQ
        </ProfileMenuItem>

      </div>

    </Container>

  )

}