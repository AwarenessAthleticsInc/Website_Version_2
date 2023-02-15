import { Grid } from "@mui/material";
import FloatingInput from '../UI/Buttons/FloatingInput';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

const Provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory'];
const ProvinceCodes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
const States = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const StatesCode = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

const AddressForm = (props) => {
    const [selectedCountry, setSelectedCountry] = useState('Canada');

    const countries = [
        {
            value: 'United States',
            label: 'United States',
        },
        {
            value: 'Canada',
            label: 'Canada',
        }
    ]
    const countryChange = (event) => {
        setSelectedCountry(event.target.value);
        const eventing = {
            target: {
               id: 'country',
               value: event.target.value,
               code: event.target.value === 'Canada' ? 'CA' : 'US'
            }
        }
        props.onChange(eventing);
    }
    const provinceChange = (event) => {
        var eventing = {};
        if(selectedCountry === "Canada") {
            const index = Provinces.indexOf(event.target.value);
            eventing = {
                target: {
                    id: 'province',
                    value: event.target.value,
                    code: ProvinceCodes[index]
                }
            }
        }
        if(selectedCountry === "United States") {
            const index = States.indexOf(event.target.value);
            eventing = {
                target: {
                    id: 'province',
                    value: event.target.value,
                    code: StatesCode[index]
                }
            }
            
        }
        props.onChange(eventing);
    }
    return <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FloatingInput onChange={props.onChange} type="text" id='firstName' label='First Name *' />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FloatingInput onChange={props.onChange} type="text" id='lastName' label='Last Name' />
        </Grid>
        <Grid item xs={12} sm={12}>
            <FloatingInput onChange={props.onChange} type="email" id='email' label='Email Address *' />
        </Grid>
        <Grid item xs={12} sm={8}>
            <FloatingInput onChange={props.onChange} type="text" id='street' label='Street *' />
        </Grid>
        <Grid item xs={12} sm={4}>
            <FloatingInput onChange={props.onChange} type="text" id='unit' label='Unit' />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FloatingInput onChange={props.onChange} type="text" id='city' label='City *' />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                sx={{ width: '100%' }}
                id="province"
                select
                label="Province/State *"
                onChange={provinceChange}
                helperText="Please select your province/state"
            >
                {selectedCountry === 'Canada' && Provinces.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
                {selectedCountry === 'United States' && States.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item xs={12} sm={7}>
            <TextField
                sx={{ width: '100%' }}
                id="country"
                select
                label="Country"
                onChange={countryChange}
                helperText="Please select your country"
            >
                {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item xs={12} sm={5}>
            <FloatingInput onChange={props.onChange} type="text" id='postal' label='Postal *' />
        </Grid>
    </Grid>

}
export default AddressForm;