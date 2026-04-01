import Container from "../components/Container"
import ProfileMenuItem from "../components/ProfileMenuItem"

export default function ProfilePage() {

  return (

    <Container>

      {/* header */}

      <div className="
        mt-10
        flex
        items-center
        gap-4
      ">

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

            Erbol Zh

          </p>


          <p className="
            text-sm

            text-gray-500
          ">

            erbol@mail.com

          </p>

        </div>

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