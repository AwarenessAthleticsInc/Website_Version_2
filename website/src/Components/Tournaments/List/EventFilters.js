import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from "../../UI/Drawer";
import { Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Accordion from '../../UI/Accordion';
import Chip from '@mui/material/Chip';
import { bubbleSort } from '../../../Logic';
const EventFilters = (props) => {
    const [monthFilter, setMonthFilter] = React.useState();
    const [cityFilter, setCityFilter] = React.useState();
    const [diamondFilter, setDiamondFilter] = React.useState();
    const [List, addList] = React.useState({
        cities: [],
        diamonds: []
    });
    React.useEffect(() => {
        const cities = [];
        const diamonds = [];
        props.tournaments.map((event) => {
            const cityCheck = cities.includes(event.location.city);
            if (!cityCheck) {
                cities.push(event.location.city);
            }
            const daimondCheck = diamonds.includes(event.location.diamond);
            if (!daimondCheck) {
                diamonds.push(event.location.diamond);
            }
        });
        addList(() => {
            return {
                cities: bubbleSort(cities),
                diamonds: bubbleSort(diamonds)
            }
        });
    }, [props]);

    const filter = () => {
        const filters = {
            month: monthFilter,
            diamond: diamondFilter,
            city: cityFilter
        }
        props.onFilter(filters);
    }
    const onDelete = async (func) => {
        props.onClear();
        setMonthFilter();
        setCityFilter();
        setDiamondFilter();
    }
    const list = () => (
        <Box sx={{ width: 350 }} role="presentation">
            <h6 style={{ margin: '1rem' }}>Filters</h6>
            <Box sx={{ display: 'flex', m: '1rem' }}>
                {monthFilter && <Chip sx={{ m: '1%' }} color='success' label={monthFilter} onDelete={() => { onDelete(); }} />}
                {cityFilter && <Chip sx={{ m: '1%' }} color='success' label={cityFilter} onDelete={() => { onDelete(); }} />}
                {diamondFilter && <Chip sx={{ m: '1%' }} color='success' label={diamondFilter} onDelete={() => { onDelete(); }} />}
            </Box>
            <Button onClick={filter} color='primary' variant='outlined' sx={{ m: '2%', width: '96%', borderRadius: '50rem' }}>Apply</Button>
            <Accordion key='Months' title='Months'>
                    {["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => {
                        return <Button onClick={() => { monthFilter === month ? setMonthFilter() : setMonthFilter(month) }} sx={{ m: '1%', width: '48%' }} variant={monthFilter === month ? 'contained' : 'outlined'} color={monthFilter === month ? 'success' : 'secondary'}>{month}</Button>
                    })}
            </Accordion>
            <Accordion title="City">
                        {List.cities.map((city) => {
                            return <Button onClick={() => { cityFilter === city ? setCityFilter() : setCityFilter(city) }} sx={{ m: '1%', width: '48%' }} variant={cityFilter === city ? 'contained' : 'outlined'} color={cityFilter === city ? 'success' : 'secondary'}>{city}</Button>
                        })}
            </Accordion>
        </Box>
    );
    return (<React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Drawer anchor="right" text="Filters" icon={<FilterAltIcon />}>{list()}</Drawer>
            {monthFilter && <Chip sx={{ m: '1%' }} color='success' label={monthFilter} onDelete={() => { onDelete(); }} />}
            {cityFilter && <Chip sx={{ m: '1%' }} color='success' label={cityFilter} onDelete={() => { onDelete(); }} />}
            {diamondFilter && <Chip sx={{ m: '1%' }} color='success' label={diamondFilter} onDelete={() => { onDelete(); }} />}
        </Box>

    </React.Fragment>

    );
}
export default EventFilters;