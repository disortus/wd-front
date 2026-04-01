export default function ProductCard({ product }) {

  return (

    <div className="
      border
      rounded-2xl

      p-4

      hover:shadow-sm
      transition
    ">

      {/* изображение */}

      <div className="
        bg-gray-100

        h-40

        rounded-xl
      " />



      {/* название */}

      <h3 className="
        mt-4

        text-sm
      ">

        {product.title}

      </h3>



      {/* цена */}

      <p className="
        mt-1

        text-sm
        font-medium
      ">

        {product.price} ₸

      </p>



      {/* кнопка */}

      <button className="
        mt-3

        w-full

        h-9

        rounded-xl

        bg-black
        text-white

        text-sm

        hover:bg-neutral-800
        transition
      ">

        В корзину

      </button>


    </div>

  )

}