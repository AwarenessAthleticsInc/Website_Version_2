import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const DataCard = (props) => {
   return <Paper elevation={5} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 1rem', p: '0 1rem', minWidth: '300px', maxWidth: '350px'}}>
       {props.icon} 
       <Box>
           <Typography sx={{textAlign: 'right'}} variant="p" component="div" gutterBottom>{props.title}</Typography>
           <Typography sx={{textAlign: 'right'}} variant="h3" component="div" gutterBottom>{props.count}</Typography>
           <Typography sx={{ textAlign: 'right' }} variant="p" component="div" gutterBottom>{props.differance}</Typography>
       </Box>
   </Paper>
}
export default DataCard;