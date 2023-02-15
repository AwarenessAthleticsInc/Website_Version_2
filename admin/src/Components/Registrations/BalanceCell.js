import TableCell from '@mui/material/TableCell';

const BalanceCell = (props) => { 
    var totalPaid = 0;
    if(props.payments.length > 0) {
       props.payments.map((payment) => {
          totalPaid = Number(Number(totalPaid) + Number(payment.amount)).toFixed(2);
       });
    }
  return <TableCell key={`${props.tournament._id}balanceCell`} align={props.align || 'center'}>{`$${Number(props.tournament.OrderTotal - totalPaid).toFixed(2)}`}</TableCell>
}
export default BalanceCell;