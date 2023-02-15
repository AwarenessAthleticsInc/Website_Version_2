import { Button, Paper } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import logo from '../../assets/logo.webp';
import { Typography } from '@mui/material';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/system';
import $ from 'jquery';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentForm = (props) => {
    const [amount, setAmount] = useState(0.00);
    const [type, setType] = useState(false);
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    const postPayment = () => {
        $.ajax({
            type: "post",
            url: `/api/payments`,
            data: {
                ids: props.selected,
                amount: amount,
                type: type
            },
            success: () => {
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
                window.location.reload();
            }
        });
    }
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.makePayment}
    >
        <Paper elevation={3} sx={{
            m: { xs: '1%', sm: '10%', md: '25%' },
            p: '1rem',
            width: { xs: '98%', sm: '80%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <img src={logo} alt='SPFA Logo' style={{ width: '35%', minWidth: '275px' }} />
            <Typography sx={{ mt: '1rem' }} variant="h4" component="h4">Record a payment</Typography>
            <Typography sx={{ fontStyle: 'italic' }} variant="p" component="p">Please Note: This is just to record a payment that has already been received</Typography>
            {type ?
                <Typography sx={{ mb: '1rem' }} variant="p" component="p">{`Number of payments: ${props.selected.length}, paid by ${type}`}</Typography> :
                <Typography sx={{ mb: '1rem' }} variant="p" component="p">{`Number of payments: ${props.selected.length}`}</Typography>
            }
            <Box sx={{ display: 'flex', width: '100%' }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        sx={{borderRadius: '50rem'}}
                        id="outlined-adornment-amount"
                        value={amount}
                        onChange={handleAmountChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        endAdornment={<Box sx={{ display: 'flex' }}>
                            {type === 'paypal' ?
                                <Tooltip title="Paypal">
                                    <IconButton id='paypal' onClick={() => { setType(false) }} color="secondary" aria-label="paypal payment button selector" component="span">
                                        <CheckCircleIcon />
                                    </IconButton>
                                </Tooltip> : <Tooltip title="Paypal">
                                    <IconButton id='paypal' onClick={() => { setType('paypal') }} color="secondary" aria-label="paypal payment button selector" component="span">
                                        <i className="fa-brands fa-paypal"></i>
                                    </IconButton>
                                </Tooltip>
                            }
                            {type === 'emt' ?
                                <Tooltip title="EMT">
                                    <IconButton onClick={() => { setType(false) }} color="success" aria-label="e-transfer payment button selector" component="span">
                                        <CheckCircleIcon />
                                    </IconButton>
                                </Tooltip> :
                                <Tooltip title="EMT">
                                    <IconButton id='emt' onClick={() => { setType('emt') }} color="success" aria-label="e-transfer payment button selector" component="span">
                                        <i className="fa-solid fa-money-bill-transfer"></i>
                                    </IconButton>
                                </Tooltip>
                            }
                            {type === 'cash' ?
                                <Tooltip title="Cash">
                                    <IconButton onClick={() => { setType(false) }} color="primary" aria-label="e-transfer payment button selector" component="span">
                                        <CheckCircleIcon />
                                    </IconButton>
                                </Tooltip> :
                                <Tooltip title="Cash">
                                    <IconButton id='emt' onClick={() => { setType('cash') }} color="primary" aria-label="e-transfer payment button selector" component="span">
                                        <i className="fa-solid fa-money-bill-1-wave"></i>
                                    </IconButton>
                                </Tooltip>
                            }
                        </Box>}
                        label="Enter Amount"
                    />
                </FormControl>
            </Box>
            <Box sx={{ width: '100%', dispay: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Button sx={{ width: { xs: '98%', md: '48%' }, m: '1%', borderRadius: '50rem' }} onClick={props.handleClose} variant='outlined' color='error'>Cancel</Button>
                {amount > 0 && type ?
                    <Button sx={{ width: { xs: '98%', md: '48%' }, m: '1%', borderRadius: '50rem' }} onClick={postPayment} variant='contained' color='success'>Record Payment</Button> :
                    <Button disabled sx={{ width: { xs: '98%', md: '48%' }, m: '1%', borderRadius: '50rem' }} variant='contained' color='success'>Record Payment</Button>
                }

            </Box>
        </Paper>
    </Backdrop>
}
export default PaymentForm;



// component notes

// <PaymentForm selected={selected} handleClose={handleClosePaymentForm} makePayment={makePayment}/> EXAMPLE

// selected is an array of invoice ids that are to recieve the payment amount
// handleClose and MakePayment are both variables set outside the component 
// makePayment is a boolean. When true the form will show, when false it wil hide
//handClose should change the boolean makePayment to false