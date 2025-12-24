import Container from "@/components/container"

import ProductCarousel from "./components/product-carousel"

const page = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20">
      <Container>
        <ProductCarousel />
      </Container>
    </div>
  )
}

export default page
