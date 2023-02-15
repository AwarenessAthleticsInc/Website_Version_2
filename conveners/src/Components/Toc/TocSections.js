import AddIcon from '@mui/icons-material/Add';
import { IconButton, Paper, Typography, TextField, Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import UploadImages from '../data/uploadImages';
import ImgNextGen from '../UI/NextGenImages';

const NewTocSections = (props) => {
    const [section, setSection] = useState(props.section);
    const [edit, setEdit] = useState(false);
    const [newSectionDetials, setNewSctionDetails] = useState({
        title: section ? section.title : '',
        description: section ? section.description : '',
        files: section ? section.files : []
    });
    const ImageHandler = (array) => {
        setNewSctionDetails((prevs) => {
            return {
                title: prevs.title,
                description: prevs.description,
                files: array
            }
        });
    }
    const SectionDetailHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setNewSctionDetails((prevs) => {
            return {
                title: id === 'title' ? value : prevs.title,
                description: id === 'description' ? value : prevs.description,
                files: prevs.files
            }
        });
    }
    const save = (index) => {
        props.onSave(newSectionDetials, index);
        setEdit(false);
        setNewSctionDetails((prevs) => {
            return {
                title: !section ? '' : prevs.title,
                description: !section ? '' : prevs.description,
                files: !section ? [] : prevs.files
            }
        });
    }
    const deleteSection = (index) => {
        var result = window.confirm("You are about to delete this TOC section. Are you sure?");
        if (result) {
            props.onDelete(index);
        }
    }

    return <Box sx={{mt: '1rem'}}>
        {!section && !edit &&
            <Paper elevation={5} sx={{ width: '100%', height: { xs: 100, md: 150 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton color='secondary' onClick={() => { setEdit(true) }}>
                    <AddIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <Typography variant="p" component="p" gutterBottom>New Section</Typography>
            </Paper>
        }
        {!section && edit &&
            <Paper sx={{ flexDirection: 'column', p: '1rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={() => { setEdit(false) }} color='error'>
                        <CloseIcon />
                    </IconButton>
                    <Button onClick={() => { save(false) }} sx={{ marginLeft: 'auto', borderRadius: '50rem', minWidth: 150 }} color='success' variant='contained'>Save</Button>
                </Box>
                <TextField onChange={SectionDetailHandler} sx={{ width: '98%', m: '1%' }} id="title" label="Section Title" variant="standard" value={newSectionDetials.title} />
                <TextField
                    onChange={SectionDetailHandler}
                    sx={{ width: '98%', m: '1%' }}
                    id="description"
                    value={newSectionDetials.description}
                    label="Section Description"
                    multiline
                    rows={5}
                    variant="standard"
                />
                <UploadImages key='section' keyID='section' development={props.development} location='toc' images={newSectionDetials.files} onUpload={ImageHandler} />
            </Paper>
        }
        {section && !edit &&
            <Paper sx={{ flexDirection: 'column', p: '1rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={() => {deleteSection(props.index)}} color='error'>
                        <CloseIcon />
                    </IconButton>
                    <Button onClick={() => { setEdit(true) }} sx={{ marginLeft: 'auto', borderRadius: '50rem', minWidth: 150 }} color='primary' variant='contained'>Edit</Button>
                </Box>
                <TextField disabled onChange={SectionDetailHandler} sx={{ width: '98%', m: '1%' }} id="title" label="Section Title" variant="standard" value={newSectionDetials.title} />
                <TextField
                    disabled
                    onChange={SectionDetailHandler}
                    sx={{ width: '98%', m: '1%' }}
                    id="description"
                    value={newSectionDetials.description}
                    label="Section Description"
                    multiline
                    rows={5}
                    variant="standard"
                />
                <Grid container spacing={2} sx={{ width: '100%', maxHeight: { xs: 450, sm: 350 }, p: '1rem', overflowY: 'scroll' }}>
                    {newSectionDetials.files.map((image, index) => {
                        const array = image.split('/');
                        const name = array[1];
                        const location = array[0];
                        return <Grid item xs={12} md={6} xl={3}>
                            <ImgNextGen
                                development={props.development}
                                srcWebp={`/${location}/${name}/500/${name}.webp`}
                                srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
                                fallback={`/${location}/${name}/500/${name}.png`}
                                alt={`Tournament of champians poster number ${index}`}
                                style={{ width: '100%', aspectRatio: '1/1', objectFill: 'contain', borderRadius: '0.25rem' }}
                            />
                        </Grid>
                    })}
                </Grid>
            </Paper>
        }
        {section && edit &&
            <Paper sx={{ flexDirection: 'column', p: '1rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={() => { setEdit(false) }} color='error'>
                        <CloseIcon />
                    </IconButton>
                    <Button onClick={() => {save(props.index)}} sx={{ marginLeft: 'auto', borderRadius: '50rem', minWidth: 150 }} color='success' variant='contained'>Save</Button>
                </Box>
                <TextField onChange={SectionDetailHandler} sx={{ width: '98%', m: '1%' }} id="title" label="Section Title" variant="standard" value={newSectionDetials.title} />
                <TextField
                    onChange={SectionDetailHandler}
                    sx={{ width: '98%', m: '1%' }}
                    id="description"
                    value={newSectionDetials.description}
                    label="Section Description"
                    multiline
                    rows={5}
                    variant="standard"
                />
                <UploadImages key='section' keyID='section' development={props.development} location='toc' images={newSectionDetials.files} onUpload={ImageHandler} />
            </Paper>}

    </Box>


}
export default NewTocSections;