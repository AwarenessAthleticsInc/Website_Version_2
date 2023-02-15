import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Button = (props) => {
    const onClick = () => {
        props.onClick();
    }

    return <Tooltip onClick={onClick} title={props.title}>
        <IconButton aria-label={`${props.title}`} className={props.className}>
          {props.children}
        </IconButton>
    </Tooltip>
}
export default Button;