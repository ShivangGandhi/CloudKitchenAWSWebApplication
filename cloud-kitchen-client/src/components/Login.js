import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import logImg from "../assets/login.jpg";
import { adminLogin } from '../service/api';
// https://img.freepik.com/free-vector/couple-japanese-sushi-restaurant-young-man-woman-sitting-table-eating-romantic-date-cafe-asian-traditional-cuisine-modern-interior-design_575670-1961.jpg?w=360&t=st=1678906536~exp=1678907136~hmac=1086221ccd6fc8cf919127662511807ec6dd5b9b9b8dd8075f7aa2ed6fc170c9

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const loginData = {
            email: data.email,
            password: data.password
        }

        const response = await adminLogin(loginData);
        if (response.status === 200) {
            localStorage.setItem('AdminSessionToken', response.data.token)
            navigate('/menuitems')
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
                            <Img alt="complex" src={logImg} />
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
                                Admin Login
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
                                                onClick={() => {
                                                    navigate('/')
                                                }}
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
                                                Login
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid >
        </ThemeProvider >
    )
}
