import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = (props) => {
    return <IconButton onClick={props.onClick}>
       <SearchIcon color="action" />
    </IconButton>
}
export default SearchButton;