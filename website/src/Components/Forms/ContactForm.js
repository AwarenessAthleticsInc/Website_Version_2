import { Button, Paper } from "@mui/material";
import { useState } from "react"
import Logo from "../Logo";
import FloatingInput from "../UI/Buttons/FloatingInput";
import ReCAPTCHA from "react-google-recaptcha";
import { createRef } from "react";
import Alert from '@mui/material/Alert';
import $ from 'jquery';

const recaptchaRef = createRef();

const ContactForm = () => {
    const [recaptcha, setRecaptcha] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const contactFormHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setContactForm((prevs) => {
            return {
                name: id === 'fullName' ? value : prevs.name,
                email: id === 'email' ? value : prevs.email,
                subject: id === 'subject' ? value : prevs.subject,
                message: id === 'message' ? value : prevs.message,
            }
        })
    }
    function recaptchaCallBack(value) {
        setRecaptcha(true);
    };
    const contact = () => {
        if (contactForm.name === "" || contactForm.email === "" || contactForm.subject === "" || contactForm.message === "") {
            setRecaptcha(false);
            recaptchaRef.current.reset()
            setError(true);
            return;
        }
        $.ajax({
            type: "POST",
            url: '/contact-us',
            data: contactForm,
            success: function (data) {
                setResponse({ type: 'success', message: data })
                recaptchaRef.current.reset()
                setError(false);
            },
            error: function (error) {
                setResponse({type: 'error', message: error.responseText});
            }
        });
    }
    return <Paper sx={{ textAlign: 'center', p: '1rem' }}>
        <Logo height='75px' margin='1rem auto' />
        <FloatingInput onChange={contactFormHandler} type="text" id="fullName" label="Full Name *" />
        <br />
        <FloatingInput onChange={contactFormHandler} type="text" id="email" label="Email Address *" />
        <br />
        <FloatingInput onChange={contactFormHandler} type="text" id="subject" label="Subject *" />
        <br />
        <FloatingInput onChange={contactFormHandler} type="text" id="message" label="Message *" />
        <br />
        <ReCAPTCHA ref={recaptchaRef} sitekey="6LcbFPgeAAAAAAEWrHNzJ-JpXhnQzGGFsP92pxkA" onChange={recaptchaCallBack} />
        {error && <Alert severity="error">Please fill in ALL parts of the contact form</Alert>}
        {response && <Alert severity={response.type === 'error' ? "error": 'success'}>{response.message}</Alert>}
        <br />
        {!recaptcha ? <Button disabled onClick={contact} sx={{ borderRadius: '50rem', width: '100%' }} variant="outlined" color='primary'>Submit Now</Button>:
                      <Button onClick={contact} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color='primary'>Submit Now</Button> }
        
    </Paper>
}
export default ContactForm