import CarouselContainer from "../../Layout/Carousel";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const StoreSlider = (props) => {
    return <section id="Products" className="p-2">
        <Link to="/store"><h4 style={{ padding: "1%" }} className="text-start">Featured Products <i class="far fa-hand-pointer" aria-hidden="true"></i></h4></Link>
        <CarouselContainer>
            {props.products.slice(0, 14).map((product) => {
                    const stock = props.stock.filter((stock) => {
                        return stock.ItemID === product._id;
                    });
                    return <ProductCard
                        key={props.products._id}
                        products={product}
                        stock={stock}
                        setCart={props.setCart}
                    />
                })
            }
        </CarouselContainer>
    </section>

}

export default StoreSlider;
