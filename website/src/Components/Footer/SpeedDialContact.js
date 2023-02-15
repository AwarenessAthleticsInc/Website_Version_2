import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ContactsIcon from '@mui/icons-material/Contacts';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { IconButton } from '@mui/material';


const SpeedDialContact = (props) => {
    const phone = (event) => {
        window.open('tel:6138477964')
    }
    const email = (event) => {
        window.open('mailto:info@spfacanada.ca')
    }
    const form = (event) => {
        window.open('/about-us')
    }

    const actions = [
        { icon: <PhoneIcon />, name: 'Phone', onClick: {phone} },
        { icon: <EmailIcon />, name: 'Email', onClick: {} },
        { icon: <ContactMailIcon />, name: 'Form', onClick: {} },
    ];
    return (
        <SpeedDial
            ariaLabel="Contact us speed dial"
            sx={{ position: 'fixed', bottom: {xs: 100, md: 50}, right: {xs: 16, md: '5rem'}}}
            icon={<ContactsIcon />}
        >
            <SpeedDialAction
                key='Phone'
                icon={<PhoneIcon />}
                tooltipTitle='Phone'
                onClick={phone}
            />
            <SpeedDialAction
                key='Email'
                icon={<EmailIcon />}
                tooltipTitle='Email'
                onClick={email}
            />
            <SpeedDialAction
                key='Form'
                icon={<ContactMailIcon />}
                tooltipTitle='Form'
                onClick={form}
            />
        </SpeedDial>
    );
}
export default SpeedDialContact;