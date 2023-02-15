import { Box, Grid } from "@mui/material";
import { useState } from "react";
import ProductFilters from '../../Components/Store/Products/ProductFilters';
import ProductCard from "../../Components/Store/Products/ProductCard";

const Store = (props) => {
    const [currentList, setCurrentList] = useState(false);
    return <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' } }}>
        <ProductFilters
            products={props.products}
            setProducts={props.setProducts}
            categories={props.categories}
            setCategories={props.setCategories}
            currentList={currentList}
            setCurrentList={setCurrentList}
        />
        <Grid container spacing={1}>
            {!currentList ? props.products.map((item) => {
                const stock = props.stock.filter((stock) => {
                    return stock.ItemID === item._id;
                });
                return <Grid item xs={12} sm={4} md={3} xl={2}>
                    <ProductCard
                        key={item._id}
                        products={item}
                        stock={stock}
                        setCart={props.setCart}
                    />
                </Grid>
            }) : currentList.map((item) => {
                const stock = props.stock.filter((stock) => {
                    return stock.ItemID === item._id;
                });
                return <Grid item xs={12} sm={4} lg={3}>
                    <ProductCard
                        key={item._id}
                        products={item}
                        stock={stock}
                        setCart={props.setCart}
                    />
                </Grid>
            })
            }
        </Grid>
    </Box>


}
export default Store;