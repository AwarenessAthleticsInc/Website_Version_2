import { useEffect, useState } from 'react';
import {
    Paper,
    Box,
    FormControl,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import $ from 'jquery';
import { Line } from "react-chartjs-2";

const RegistrationGrowthChart = (props) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const year = new Date().getFullYear();
    const handleYearChange = (event) => {
        setCurrentYear(event.target.value);
    };
    const [years, setYears] = useState([{
        0: [], //Jan
        1: [], // Feb
        2: [], //Mar
        3: [], //Apr
        4: [], //May
        5: [], //June
        6: [], //July
        7: [], //Aug
        8: [], //Sept
        9: [], //Oct
        10: [], //Nov
        11: [], //Dev
        12: [] //Other
    }, {
        0: [], //Jan
        1: [], // Feb
        2: [], //Mar
        3: [], //Apr
        4: [], //May
        5: [], //June
        6: [], //July
        7: [], //Aug
        8: [], //Sept
        9: [], //Oct
        10: [], //Nov
        11: [], //Dev
        12: [] //Other
    }, {
        0: [], //Jan
        1: [], // Feb
        2: [], //Mar
        3: [], //Apr
        4: [], //May
        5: [], //June
        6: [], //July
        7: [], //Aug
        8: [], //Sept
        9: [], //Oct
        10: [], //Nov
        11: [], //Dev
        12: [] //Other
    }, {
        0: [], //Jan
        1: [], // Feb
        2: [], //Mar
        3: [], //Apr
        4: [], //May
        5: [], //June
        6: [], //July
        7: [], //Aug
        8: [], //Sept
        9: [], //Oct
        10: [], //Nov
        11: [], //Dev
        12: [] //Other
    }, {
        0: [], //Jan
        1: [], // Feb
        2: [], //Mar
        3: [], //Apr
        4: [], //May
        5: [], //June
        6: [], //July
        7: [], //Aug
        8: [], //Sept
        9: [], //Oct
        10: [], //Nov
        11: [], //Dev
        12: [] //Other
    }]);
    const [chartData, setChartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Registration Growth',
            data: [
                years[year - currentYear][0].length,
                years[year - currentYear][1].length,
                years[year - currentYear][2].length,
                years[year - currentYear][3].length,
                years[year - currentYear][4].length,
                years[year - currentYear][5].length,
                years[year - currentYear][6].length,
                years[year - currentYear][7].length,
                years[year - currentYear][8].length,
                years[year - currentYear][9].length,
                years[year - currentYear][10].length,
                years[year - currentYear][11].length
            ],
            backgroundColor: [
                "#87beeb",
                "#00A1Cf",
                "#008000"
            ],
            fill: false,
            tension: 0.1
        }]
    });

    useEffect(() => {
        $.ajax({
            type: 'get',
            url: '/dashboard/metrics/registrationGrowth',
        }).then((responseYears) => {
            setYears([...responseYears]);
        });
    }, []);
    useEffect(() => {
        setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Registration Growth',
                data: [
                    years[year - currentYear][0].length,
                    years[year - currentYear][1].length,
                    years[year - currentYear][2].length,
                    years[year - currentYear][3].length,
                    years[year - currentYear][4].length,
                    years[year - currentYear][5].length,
                    years[year - currentYear][6].length,
                    years[year - currentYear][7].length,
                    years[year - currentYear][8].length,
                    years[year - currentYear][9].length,
                    years[year - currentYear][10].length,
                    years[year - currentYear][11].length
                ],
                backgroundColor: [
                    "#87beeb",
                    "#00A1Cf",
                    "#008000"
                ],
                borderColor: "#00A1Cf",
                fill: false,
                tension: 0.1
            }]
        });
    }, [years, currentYear]);

    const options = {
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                loop: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Paper sx={{ p: '0.8rem', display: 'flex', flexDirection: 'column', height: 'auto', aspectRatio: '8/5.15' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>{`Registration for ${currentYear}`}</Typography>
            <FormControl sx={{ marginLeft: 'auto' }} variant="standard">
                <Select
                    id="RegYear"
                    value={currentYear}
                    onChange={handleYearChange}
                    label="Year"
                >
                    {[0, 1, 2, 3, 4].map((i) => {
                        return <MenuItem key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
       
        {/* <canvas style={{ width: '100%', aspectRatio: '1/1' }} id={`myCharts-${props.index}`} aria-label='Team Growth Chart' role="img">Your browser does not support this feature. Please enable javascript and reload the page.</canvas> */}
        <Line data={chartData} options={options} />
        {currentYear === 2022 && <Typography variant="p" gutterBottom>{`${years[0][12].length} registrations aren't tracked on the chart above`}</Typography>}
    </Paper>
}
export default RegistrationGrowthChart;