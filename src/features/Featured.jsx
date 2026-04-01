import ProductCard from "../../components/product/ProductCard"

export default function Featured() {

  return (

    <section className="
      py-12
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-4
      ">

        <h2 className="
          text-lg
          font-medium
        ">

          Популярные товары

        </h2>


        <div className="
          mt-6

          grid

          grid-cols-2
          md:grid-cols-4

          gap-4
        ">

          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

        </div>

      </div>

    </section>

  )

}