import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FloatingInput from "../UI/Buttons/FloatingInput";
import { Paper } from "@mui/material";
import $ from "jquery";

const TeamForm = (props) => {
    const [error, setError] = useState(false);
    const [firstName, setFirst] = useState();
    const [lastName, setLast] = useState();
    const [name, setName] = useState();
    const [cell, setCell] = useState();
    const [email, setEmail] = useState();

    const onClick = () => {
       if(!firstName || firstName === '') {
           setError('Please fill the all fields');
           return;
       }
        if (!lastName || lastName === '') {
            setError('Please fill the all fields');
            return;
        }
        // if (!name || name === '') {
        //     setError('Please fill the all fields');
        //     return;
        // }
        if (!cell || cell === '') {
            setError('Please fill the all fields');
            return;
        }
        if (!email || email === '') {
            setError('Please fill the all fields');
            return;
        }
        const team = {
            team: name,
            captain: `${firstName} ${lastName}`,
            cell: cell,
            email: email
        }
        props.onClick(team);
    }
    const onChange = (event) => {
        setError();
        const id = event.target.id;
        const value = event.target.value;
        switch (id) {
            case "teamName":
                setName(value);
                break;
            case "firstName":
                setFirst(value);
                break;
            case "lastName":
                setLast(value);
                break;
            case "cell":
                 setCell(value);
                break;
            case "email":
                 setEmail(value);
                break;
        }
    }

    return <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
        <h5 className="text-start">Captains Information</h5>
        <div className='row'>
            {/* <div className='col-12 p-2'>
                <FloatingInput onChange={onChange} className="w-100" type='text' id="teamName" label="Team Name *" />
            </div> */}
            <div className='col-md-6 col-12 p-2'>
                <FloatingInput onChange={onChange} className="w-100" type='text' id="firstName" label="First Name *" />
            </div>
            <div className='col-md-6 col-12 p-2'>
                <FloatingInput onChange={onChange} className="w-100" type='text' id="lastName" label="Last Name *" />
            </div>
            <div className='col-12 p-2'>
                <FloatingInput onChange={onChange} className="w-100" type='tel' id="cell" label="Cell Number *" />
            </div>
            <div className='col-12'>
                <FloatingInput onChange={onChange} className="w-100" type='email' id="email" label="Email *" />
            </div>
            <Box sx={{display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="outlined" color="error">Close</Button>
                <Button onClick={onClick} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color={error ? "error" : "primary"}>Next</Button>
            </Box>
            {error && <p><strong>{error}</strong></p>}
        </div>
    </Paper>

}
export default TeamForm;