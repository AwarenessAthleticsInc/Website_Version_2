import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
const LinkButton = (props) => {
    return props.type === "external" ? 
        <a href={props.url} target="_blank">
            <Tooltip title={props.title}>
                <IconButton aria-label={`${props.title}`}>
                    {props.children}
                </IconButton>
            </Tooltip>
        </a> :
            <Link href={props.url} >
                <Tooltip title={props.title}>
                    <IconButton aria-label={`${props.title}`}>
                        {props.children}
                    </IconButton>
                </Tooltip>
            </Link> 

}
export default LinkButton;