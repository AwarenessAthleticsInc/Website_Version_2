import Backdrop from "./UI/backdrop"
import { Paper, Box, Button, Typography, TextField } from "@mui/material"
import { useState } from "react"
import $ from 'jquery';

const FaqDetailsCard = (props) => {
    const [faq, setFaq] = useState({
        question: props.faq ? props.faq.question : '',
        answer: props.faq ? props.faq.answer : '',
    });
    const setFaqHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setFaq((prevs) => {
            return {
                question: id === 'question' ? value : prevs.question,
                answer: id === 'answer' ? value : prevs.answer
            }
        });
    }
    const update = () => {
        $.post({
            type: 'PUT',
            url: '/dashboard/faq',
            data: { id: props.faq._id, faq: faq },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
            }
        });
    }
    const saveNew = () => {
        $.post({
            type: 'POST',
            url: '/dashboard/faq',
            data: { faq },
            success: (response) => {
                alert(response);
                window.location.reload();
            },
            error: (error) => {
                alert(error.responseText);
            }
        });
    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>{props.faq ? 'Update FAQ' : 'New FAQ'}</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.faq ? update : saveNew} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.faq ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            <TextField
                sx={{ width: '98%', m: '1%' }}
                id="question"
                label="Question"
                multiline
                rows={4}
                variant="standard"
                value={faq.question}
                onChange={setFaqHandler}
            />
            <TextField
                sx={{ width: '98%', m: '1%' }}
                id="answer"
                label="Answer"
                multiline
                rows={4}
                variant="standard"
                value={faq.answer}
                onChange={setFaqHandler}
            />
        </Paper>
    </Backdrop>
}
export default FaqDetailsCard