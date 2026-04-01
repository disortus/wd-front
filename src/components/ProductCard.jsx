export default function ProductCard({ product }) {

  return (

    <div className="

      border

      border-border

      rounded-2xl

      p-4

      bg-white

      shadow-card

      hover:shadow-md

      transition

    ">

      <div className="

        bg-surface

        h-40

        rounded-xl

      " />



      <h3 className="

        mt-4

        text-sm

        font-medium

      ">

        {product.title}

      </h3>



      <p className="

        mt-1

        text-sm

        text-secondary

      ">

        {product.price} ₸

      </p>



      <button className="

        mt-3

        w-full

        h-9

        rounded-xl

        border

        text-sm

        hover:bg-surface

        transition

      ">

        В корзину

      </button>

    </div>

  )

}