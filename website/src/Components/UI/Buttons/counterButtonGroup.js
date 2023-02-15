import { Button, IconButton } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

const CounterButtonGroup = (props) => {
    const [qty, setQty] = useState(props.start);
    const add = () => {
        setQty((prev) => {
            return Number(prev + 1);
        });
    }
    const remove = () => {
        if (qty !== 1) {
            setQty((prev) => {
                return Number(prev - 1);
            });
        }
    }
    return <ButtonGroup>
        <IconButton onClick={remove}>
            <RemoveIcon />
        </IconButton>
        <Button onChange={props.onChange} color="action" variant='text'>{qty}</Button>
        <IconButton onClick={add}>
            <AddIcon />
        </IconButton>
    </ButtonGroup>
}
export default CounterButtonGroup;