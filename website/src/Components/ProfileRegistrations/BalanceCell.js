import { Typography } from '@mui/material';
import { useEffect } from 'react';

const BalanceCell = (props) => { 
    var totalPaid = 0;
    if(props.payments.length > 0) {
       props.payments.map((payment) => {
          totalPaid = Number(Number(totalPaid) + Number(payment.amount)).toFixed(2);
       });
    }
   const balance = Number(props.tournament.OrderTotal - totalPaid).toFixed(2);
    useEffect(() => {
       props.setBalance(balance)
    }, [balance])
   
   return <Typography variant='p'>{`$${balance}`}</Typography>
}
export default BalanceCell;