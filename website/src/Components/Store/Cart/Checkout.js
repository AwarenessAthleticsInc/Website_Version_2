import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItemButton, Paper } from '@mui/material';
import AddressForm from '../../Forms/AddressForm';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import $ from 'jquery';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import PaypalButton from '../../Buttons/paypalButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

const steps = ['Address', 'Shipping', 'Payment', 'Confirmation'];

const Checkout = (props) => {
    const [error, setError] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === null;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const [addressDetail, setAddressDetail] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        street: false,
        unit: false,
        city: false,
        province: false,
        provinceCode: false,
        country: false,
        countryCode: false,
        postal: false,
    });
    const addressDetailHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setAddressDetail((prev) => {
            return {
                firstName: id === 'firstName' ? value : prev.firstName,
                lastName: id === 'lastName' ? value : prev.lastName,
                email: id === 'email' ? value : prev.email,
                street: id === 'street' ? value : prev.street,
                unit: id === 'unit' ? value : prev.unit,
                city: id === 'city' ? value : prev.city,
                province: id === 'province' ? value : prev.province,
                provinceCode: id === 'province' ? event.target.code : prev.provinceCode,
                country: id === 'country' ? value : prev.country,
                countryCode: id === 'country' ? event.target.code : prev.countryCode,
                postal: id === 'postal' ? value : prev.postal
            }
        });
    }
    const [billingAddressDetail, setBillingAddressDetail] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        unit: '',
        city: '',
        province: '',
        provinceCode: '',
        country: '',
        countryCode: '',
        postal: ''
    });
    const billingAddressDetailHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setBillingAddressDetail((prev) => {
            return {
                firstName: id === 'firstName' ? value : prev.firstName,
                lastName: id === 'lastName' ? value : prev.lastName,
                email: id === 'email' ? value : prev.email,
                street: id === 'street' ? value : prev.street,
                unit: id === 'unit' ? value : prev.unit,
                city: id === 'city' ? value : prev.city,
                province: id === 'province' ? value : prev.province,
                provinceCode: id === 'province' ? event.target.code : prev.provinceCode,
                country: id === 'country' ? value : prev.country,
                countryCode: id === 'country' ? event.target.code : prev.countryCode,
                postal: id === 'postal' ? value : prev.postal
            }
        });
    }
    const [differentBillingAddress, setDifferentBillingAddress] = React.useState(false);
    const billingAddressHandler = (event) => {
        setDifferentBillingAddress(event.target.checked);
    }
    const [shippingRates, setShippingRates] = React.useState(false);
    const addAddress = () => {
        if (!addressDetail.firstName || !addressDetail.lastName || !addressDetail.email || !addressDetail.street || !addressDetail.city || !addressDetail.province || !addressDetail.country || !addressDetail.postal) {
            setError(true);
            return;
        }
        setError(false);
        handleNext();
        $.ajax({
            type: "POST",
            url: `/api/shipping/rates`,
            data: {
                address: addressDetail
            },
            success: function (rates) {
                console.log(rates);
                setShippingRates(rates);
            },
            error: function (error) {
            }
        });
    }
    const [orderDetails, setOrderDetials] = React.useState({
        cart: props.cart,
        shippingAddress: false,
        billingAddress: false,
        shipping: false
    });
    const selectedShippingRateHandler = (rate) => {
        setOrderDetials((prevs) => {
            return {
                cart: prevs.cart,
                shippingAddress: addressDetail,
                billingAddress: differentBillingAddress ? billingAddressDetail : addressDetail,
                shipping: rate
            }
        });
        handleNext();
    }

    const placeOrder = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: `/api/orders/`,
                data: orderDetails,
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        })

    }
    const [paymentType, setPaymentType] = React.useState('');
    const emt = () => {
        placeOrder().then((id) => {
            setPaymentType({ type: 'emt', id: id });
            handleNext();
        });

    }
    const payment = (paymentDetails) => {
        placeOrder().then((id) => {
            $.ajax({
                type: "POST",
                url: `/api/payment/paypal/123456789`,
                data: {
                    id: id,
                    payment: paymentDetails
                },
                success: function (data) {
                    setPaymentType({ type: 'paypal', order: id, payment: data });
                    handleNext();
                },
                error: function (error) {
                }
            });
        });
    }
    return (
        <Box sx={{ width: '100%', p: { xs: '1rem', md: '3rem' } }}>
            <Stepper sx={{ display: { xs: 'none', sm: 'flex' } }} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Paper sx={{ p: { xs: '1%', sm: '1rem 2rem' }, marginTop: '2rem', textAlign: 'left' }}>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {activeStep === 0 && <React.Fragment>
                            {error && <Alert sx={{ mb: '1rem' }} severity="error">Please Fill in all required fields marked with a *</Alert>}
                            <h5>Shipping Details</h5>
                            <AddressForm onChange={addressDetailHandler} />
                            <FormControlLabel control={<Checkbox value={differentBillingAddress} onChange={billingAddressHandler} />} label="Set a different billing address?" />
                            {differentBillingAddress && <h5>Billing Details</h5>}
                            {differentBillingAddress && <AddressForm onChange={billingAddressDetailHandler} />}
                            <Button sx={{ borderRadius: '50rem', width: '100%', marginTop: '1rem' }} color='primary' variant='contained' onClick={addAddress}>Next</Button>
                        </React.Fragment>}
                        {activeStep === 1 &&
                            <React.Fragment>
                                <Box sx={{ m: { xs: '0rem', sm: '5% 30%' }, minHeight: '300px', p: '1rem', textAlign: 'center' }}>
                                    <h5>Select Shipping Rate</h5>
                                    {!shippingRates ? <Box sx={{ textAlign: 'center', mt: '1rem' }}>
                                        <CircularProgress />
                                        <p>Getting rates from canada post</p>
                                    </Box> : shippingRates === 'free' ? <Paper>
                                        <List>
                                            <ListItemButton onClick={() => { selectedShippingRateHandler({ cost: 0, rate: 'Regular Parcel' }) }}>
                                                <Grid container sx={{ textAlign: 'center' }}>
                                                    <Grid xs={7} item>
                                                        <p>{`Canada Post (Regular Parcel)`}</p>
                                                    </Grid>
                                                    <Grid xs={4} item>
                                                        <p>{`$0.00`}</p>
                                                    </Grid>
                                                </Grid>
                                            </ListItemButton>
                                        </List>
                                    </Paper> : shippingRates.map((rate) => {
                                        var cost = Number(rate.cost).toFixed(2);
                                        var service = rate.service;
                                        return <Box sx={{ textAlign: 'center', mt: '1rem' }}>
                                            <Paper>
                                                <List>
                                                    <ListItemButton onClick={() => { selectedShippingRateHandler({ cost: cost, rate: service }) }}>
                                                        <Grid container sx={{ textAlign: 'center' }}>
                                                            <Grid xs={7} item>
                                                                <p>{`${rate.shipper} (${service})`}</p>
                                                            </Grid>
                                                            <Grid xs={4} item>
                                                                <p>{`$${cost}`}</p>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItemButton>
                                                </List>
                                            </Paper>
                                        </Box>
                                    })}
                                </Box>
                                {/* <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                 </Button> */}
                            </React.Fragment>
                        }
                        {activeStep === 2 && <React.Fragment>
                            <Paper sx={{ m: { xs: '0rem', sm: '5% 30%' }, minHeight: '300px', p: '1rem', textAlign: 'left' }}>
                                <h5 style={{ marginRight: 'auto' }}>Order Details</h5>
                                <Box sx={{ display: 'flex', alignItems: 'start', p: '1rem 0 0 0' }}>
                                    <Button onClick={emt} sx={{ borderRadius: '50rem', width: '50%', m: '0 1%', height: 45 }} variant="contained" color="primary">E.M.T.</Button>
                                    <PaypalButton amount={Number(Number(props.cart.totalPrice) + Number(orderDetails.shipping.cost)).toFixed(2)} onComplete={payment} />
                                </Box>
                                <hr />
                                {props.cart.items.map((item) => {
                                    return <Box>
                                        <h5>{`${item.qty}x ${item.name} ($${Number(item.price).toFixed(2)})`}</h5>
                                        <p style={{ margin: '0' }}>{`- Size: ${item.size}`}</p>
                                        <p style={{ margin: '0' }}>{`- Color: ${item.color}`}</p>
                                    </Box>
                                })}
                                <hr />
                                <Box sx={{ display: 'flex' }}>
                                    <p style={{ marginRight: 'auto' }}>Subtotal:</p>
                                    <p>{`$${Number(props.cart.totalPrice).toFixed(2)}`}</p>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <p style={{ marginRight: 'auto' }}>{`Shipping(${orderDetails.shipping.rate}):`}</p>
                                    <p>{`$${Number(orderDetails.shipping.cost).toFixed(2)}`}</p>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <p style={{ marginRight: 'auto' }}>Order Total:</p>
                                    <p>{`$${Number(Number(props.cart.totalPrice) + Number(orderDetails.shipping.cost)).toFixed(2)}`}</p>
                                </Box>
                            </Paper>
                        </React.Fragment>}
                        {activeStep === 3 && <React.Fragment>
                                {paymentType.type === 'paypal' && <Box sx={{p: '1rem', zIndex: '6000', textAlign: 'center' }}>
                                    <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55 }} />
                                    <h5>Registered & Paid!</h5>
                                    <p>Order #: {paymentType.order}</p>
                                    <p>Payment #: {paymentType.payment}</p>
                                    <hr />
                                    <p>Please keep these for your records</p>
                                    <Button onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Close</Button>
                                </Box>}
                                {paymentType.type === 'emt' && <Box sx={{ p: '1rem', zIndex: '6000', textAlign: 'center' }}>
                                    <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55 }} />
                                    <h5>Order Complete Complete!</h5>
                                    <hr />
                                    <p><strong>E.M.T. Instrucitons</strong></p>
                                    <p>Email: <span style={{ color: 'red', fontWeight: '700' }}>ritch@spfacanada.ca</span></p>
                                    <p>Password: <span style={{ color: 'red', fontWeight: '700' }}>softball</span></p>
                                    <hr />
                                    <Button startIcon={<HomeIcon />} onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Back to Home</Button>
                                </Box>}
                        </React.Fragment>
                        }
                    </React.Fragment>
                )}
            </Paper>
        </Box>
    );
}
export default Checkout;