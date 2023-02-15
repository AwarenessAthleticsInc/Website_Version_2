import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordions = (props) => {
   return <Accordion elevation={0}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {props.children}
        </AccordionDetails>
    </Accordion>
}
export default Accordions;