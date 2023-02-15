import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

const Button = (props) => {
    const onClick = () => {
        props.onClick();
    }

    return <Tooltip  onClick={onClick} title={props.title}>
        <IconButton aria-label={`${props.count} ${props.title}`}>
            <Badge badgeContent={props.count} max={props.max} color={props.badgeColor}>
                {props.children}
            </Badge>
        </IconButton>
    </Tooltip>
}
export default Button;