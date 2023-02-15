import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';

const GroupIconButtons = (props) => {
    return <ButtonGroup>
        {props.buttons.map((button, index) => {
            return <Tooltip key={index} title={button.title}>
                <IconButton key={index} onClick={button.onClick}>
                    {button.icon}
                </IconButton>
            </Tooltip>
        })}
    </ButtonGroup>
}
export default GroupIconButtons;