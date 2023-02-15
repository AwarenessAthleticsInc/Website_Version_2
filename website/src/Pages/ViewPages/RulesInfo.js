import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import DocCard from '../../Components/DocCard';
import Accordion from '../../Components/UI/Accordion';

const RulesInfo = (props) => {
    return <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' }, textAlign: 'left' }}>
        <Grid container spacing={2}>
            {props.docs.map((doc) => {
                  return <Grid item xs={12} md={2}>
                      <DocCard doc={doc} />
                   </Grid>
               })}
        </Grid>
        <hr />
        <h4>Frequently Asked Questions</h4>
        {props.faq.map((faq) => {
            return <Accordion key={faq.question} title={faq.question}>
                <p>{faq.answer}</p>
            </Accordion>
        })}
    </Box>
}
export default RulesInfo;