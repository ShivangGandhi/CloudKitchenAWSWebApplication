import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import { styled } from "@mui/material/styles";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import { addMenuItem } from '../service/api';


export default function AddMenuItem() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme();
    const navigate = useNavigate();

    const [file, setFile] = useState();
    const [fileUploaded, setFileToBeDisplayed] = useState();

    useEffect(() => {
        const token = localStorage.getItem('AdminSessionToken')
        if (!token) {
            navigate('/adminlogin')
        }
    }, []);

    function handleChange(e) {
        setFile(e.target.files[0]);
        setFileToBeDisplayed(URL.createObjectURL(e.target.files[0]))
    }

    const Img = styled("img")({
        display: "block",
        width: "50%",
        height: "50%",
    });

    const onSubmit = async (data) => {
        data = Object.assign(data, { image: file })
        await addMenuItem(data)
        navigate('/menuitems')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DashboardNavbar />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Add Menu Item
                    </Typography>
                    <br />
                    <hr />
                    <br />
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Item Name"
                                        name="itemName"
                                        id="itemName"
                                        {...register("itemName", {
                                            required: "Item Name is Required",
                                        })}
                                        error={Boolean(errors.itemName)}
                                        helperText={errors.itemName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Item Price"
                                        type='number'
                                        name="itemPrice"
                                        id="itemPrice"
                                        {...register("itemPrice", {
                                            required: "Item Price is Required",
                                        })}
                                        error={Boolean(errors.itemPrice)}
                                        helperText={errors.itemPrice?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    sx={{
                                        margin: "auto",
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload Item Image
                                        <input name="itemImage" id="itemImage" type="file" onChange={handleChange} hidden />
                                    </Button>
                                </Grid>
                                {fileUploaded && <Grid item xs={12}
                                    sx={{
                                        margin: "auto",
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Img src={fileUploaded} alt='complex' />
                                </Grid>}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Ingredients"
                                        inputProps={{
                                            style: {
                                                height: "50px",
                                            },
                                        }}
                                        name="ingredients"
                                        id="ingredients"
                                        {...register("ingredients", {
                                            required: "Ingredients is Required",
                                        })}
                                        error={Boolean(errors.ingredients)}
                                        helperText={errors.ingredients?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        inputProps={{
                                            style: {
                                                height: "60px",
                                            },
                                        }}
                                        name="description"
                                        id="description"
                                        {...register("description", {
                                            required: "Description is Required",
                                        })}
                                        error={Boolean(errors.description)}
                                        helperText={errors.description?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        name="category"
                                        id="category"
                                        defaultValue="Main Course"
                                        {...register("category", {
                                            required: "Category is Required",
                                        })}
                                        error={Boolean(errors.category)}
                                        helperText={errors.category?.message}
                                    >
                                        <MenuItem value={"Starter"}>Starter</MenuItem>
                                        <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                        <MenuItem value={"Main Course"}>Main Course</MenuItem>
                                        <MenuItem value={"Dessert"}>Dessert</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        sx={{
                                            justifyContent: 'center'
                                        }}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="large"
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider >
    )
}
