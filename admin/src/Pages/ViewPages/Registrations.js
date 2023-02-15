import { Box } from "@mui/system";
import { Tooltip, IconButton } from "@mui/material";
import RegistrationsList from "../../Components/Registrations/RegistrationList";
import { useState } from "react";
import GeneralSearch from '../../Components/Search/GeneralSearch';
import GroupIconButtons from '../../Components/UI/Buttons/GroupIconButtons';
import PaymentsIcon from '@mui/icons-material/Payments';
import Edit from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import $ from 'jquery';
import PaymentForm from "../../Components/Forms/MakePaymentForm";
import RegistrationDetails from "../../Components/Registrations/RegistrationDetails";
import RegistrationInvoice from "../../Components/Reports/RegistrationInvoice";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const Registrations = (props) => {
    const [registrations, setRegistrations] = useState(props.registrations);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [makePayment, setMakePayment] = useState(false);
    const [edit, setEdit] = useState(false);
    const [printRegistration, setPrintRegistration] = useState(false);

    const handleMakePayment = () => {
        setMakePayment(true);
    }
    const handleClosePaymentForm = () => {
        setMakePayment(false);
    }
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete a registration. Are you sure you want to proceed?");
        if (results) {
            $.ajax({
                type: "delete",
                url: "/dashboard/registrations",
                data: { registrations: selected },
                success: () => {
                    window.location.reload();
                },
                error: (error) => {
                    alert(error.responseText);
                    window.location.reload();
                }
            });
        }
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setRegistrations(array);
    }
    const editClick = () => {
        if (edit) {
            setEdit(false);
            return;
        }
        setEdit(true);
    }
    const headCells = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'tournament',
            numeric: false,
            disablePadding: true,
            label: 'Tournament',
        },
        {
            id: 'team',
            numeric: false,
            disablePadding: true,
            label: 'Team',
        },
        {
            id: 'division',
            numeric: false,
            disablePadding: true,
            label: 'Division',
        },
        {
            id: 'balance',
            numeric: false,
            disablePadding: true,
            label: 'Balance',
        }
    ];
    const selectionButtons = [
        {
            title: 'Payment',
            icon: <PaymentsIcon color='success' />,
            onClick: handleMakePayment
        },
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        },
        {
            title: 'Print',
            icon: <LocalPrintshopIcon color='secondary' />,
            onClick: () => { setPrintRegistration(!printRegistration) }
        }
    ]
    return <Box sx={{ width: '100%' }} >

        <RegistrationsList tournaments={props.tournaments} payments={props.payments} title='Registrations' data={registrations.length > 0 ? registrations : props.registrations} headers={headCells} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            <br />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <GeneralSearch onSearch={handleSearch} title='Registrations' url='/dashboard/registrations' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <GroupIconButtons buttons={selectionButtons} />
                    {selected.length < 2 && <Tooltip key='editRegButton_tooltip' title='Edit'>
                        <IconButton key='editRegButton_iconButton' onClick={editClick}>
                            <Edit color='secondary' />
                        </IconButton>
                    </Tooltip>}
                </Box>}
            </Box>
            {edit && <RegistrationDetails selected={selectedRow} onClick={editClick} />}
        </RegistrationsList>
        {printRegistration && <RegistrationInvoice payments={props.payments} close={() => { setPrintRegistration(!printRegistration) }} registrations={selectedRow} />}
        {makePayment && <PaymentForm selected={selected} handleClose={handleClosePaymentForm} makePayment={makePayment} />}
    </Box>
}
export default Registrations;
