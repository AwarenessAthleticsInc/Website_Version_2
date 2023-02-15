/**
 * React Imports
 */
import {
    useEffect,
    useState
} from "react";
/**
 * Material UI Import
 */
import {
    Typography,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@mui/material";


const StockCard = (props) => {
    const [stock, setStock] = useState(props.stock ? props.stock : []);
    useEffect(() => {
        if (props.colors && props.sizes) {
            props.colors.map((color, indexColor) => {
                props.sizes.map((size, indexSize) => {
                    const value = {
                        name: props.name,
                        size: size,
                        color: color,
                        stock: 0
                    }
                    if(indexColor === 0 && indexSize === 0) {
                        setStock([value]);
                    } else {
                        setStock(prevs => [...prevs, value]);
                    }
                });
            });
        }
    }, []);
    const setStockHandler = (event) => {
        const index = Number(event.target.id);
        const value = Number(event.target.value);
        stock[index].stock = value;
        setStock([...stock]);
        props.onChange(stock);
    }
    return stock.length < 1 ?
        <Typography sx={{ textAlign: 'center' }} variant="h6" component="h6" gutterBottom> No stock rendered yet </Typography> :
        <TableContainer sx={{maxHeight: '450px', overflowY: 'scroll', width: '100%'}}>
            <Table sx={{ minWidth: 650 }} aria-label="stock value table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Stock Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stock.map((stockItem, index) => {
                        return <TableRow
                            key={stockItem.name}
                        >
                            <TableCell component="th" scope="row">
                                {stockItem.name}
                            </TableCell>
                            <TableCell>{stockItem.size}</TableCell>
                            <TableCell>{stockItem.color}</TableCell>
                            <TableCell>
                                <TextField sx={{ width: '100%' }} required type="number" id={index} label="Stock Value" variant="standard" onChange={setStockHandler} value={stockItem.stock} />
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>



}
export default StockCard;