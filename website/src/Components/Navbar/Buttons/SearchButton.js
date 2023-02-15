import IconButton from "../../UI/Buttons/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import { Fragment } from "react";

const SearchButton = (props) => {
    const search = () => {
        props.search();
    }
    return <IconButton value={props.value} onClick={search} title="Search">
            <SearchIcon color="action" />
        </IconButton>

}
export default SearchButton;