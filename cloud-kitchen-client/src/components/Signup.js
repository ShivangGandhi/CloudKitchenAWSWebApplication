import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import SignUpImg from "../assets/signup.jpg";
// https://img.freepik.com/free-vector/lunch-time-concept-illustration_114360-8331.jpg?w=740&t=st=1678908034~exp=1678908634~hmac=2184130f24ce09aeaa03ca4d9cb32e1d14aebfebdcf153c8ed476b99ee1db190

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const theme = createTheme();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const loginData = {
            username: data.username,
            password: data.password
        }

        const response = await axios.post(`https://express-t4.onrender.com/api/login`, loginData)

        if (response.data.message.includes("Login success") === true) {
            navigate('/profileList')
        }
    }

    const Img = styled("img")({
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container alignContent={'center'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100vw',
                    height: '100vh',
                }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, mx: { xs: 3 }, p: { xs: 2, md: 3 }, width: { md: '70%' }, height: { md: '80%' }, boxShadow: 0 }}>
                    <Grid container spacing={1} sx={{ height: '100%' }}>
                        <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
                            <Img alt="complex" src={SignUpImg} />
                        </Grid>
                        <Grid item xs={12} sm={6}
                            sx={{
                                margin: "auto",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                            <Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#1e69ba' }}>
                                Sign Up
                            </Typography>
                            <br />
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: { md: '70%' } }}>
                                <React.Fragment>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="email"
                                                autoComplete="email"
                                                id="email"
                                                fullWidth
                                                label="Full Name"
                                                {...register("email", {
                                                    required: "Please enter your email",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message: "Invalid Email Address"
                                                    }
                                                })}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="email"
                                                autoComplete="email"
                                                id="email"
                                                fullWidth
                                                label="Email"
                                                {...register("email", {
                                                    required: "Please enter your email",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message: "Invalid Email Address"
                                                    }
                                                })}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                fullWidth
                                                label="Password"
                                                {...register("password", {
                                                    required: "Please enter a password",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    }
                                                })}
                                                error={Boolean(errors.password)}
                                                helperText={errors.password?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                size="large"
                                                color="error"
                                                variant="outlined"
                                                sx={{ mt: 1, mb: 2, color: '#c62828', ':hover': { bgcolor: '#c62828', color: 'white' } }}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                size="large"
                                                color="primary"
                                                variant="outlined"
                                                sx={{ mt: 1, mb: 2, color: '#1e69ba', ':hover': { bgcolor: '#1e69ba', color: 'white' } }}
                                            >
                                                Register
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item sx={{
                                            marginLeft: 'auto'
                                        }}>
                                            <NavLink to='/login'
                                                style={({ isActive }) => ({
                                                    color: isActive ? '#1e69ba' : '#1e69ba',
                                                    textDecoration: isActive ? 'none' : 'none',
                                                })}>
                                                {"Already a user? Log In"}
                                            </NavLink>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider >
    )
}
