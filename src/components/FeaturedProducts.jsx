import Container from "./Container"
import ProductCard from "./ProductCard"

export default function FeaturedProducts() {

  // временные данные
  const products = [

    {
      id: 1,
      title: "AirPods Pro 2",
      price: 99000,
    },

    {
      id: 2,
      title: "Apple Watch S9",
      price: 199000,
    },

    {
      id: 3,
      title: "MagSafe Charger",
      price: 25000,
    },

    {
      id: 4,
      title: "iPhone Case",
      price: 19000,
    },

  ]


  return (

    <section className="
      py-8
      md:py-12
    ">

      <Container>

        <h2 className="
          text-lg
          font-medium
        ">

          Популярные товары

        </h2>



        <div className="
          mt-4

          grid

          grid-cols-2
          md:grid-cols-4

          gap-4
        ">

          {products.map(product => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </Container>

    </section>

  )

}