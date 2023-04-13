import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import { useNavigate } from 'react-router-dom';


export default function MenuItemDetails() {

    const theme = createTheme();
    const loc = useLocation();
    const navigate = useNavigate();

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width: '50%',
        height: '50%'
    });

    useEffect(() => {
        const token = localStorage.getItem('AdminSessionToken')
        if (!token) {
            navigate('/adminlogin')
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DashboardNavbar />
            <Paper sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                        <Img alt="complex" src={loc.state.imageURL} sx={{ border: '3px solid black' }} />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                        <Paper sx={{ p: { xs: 2 } }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <Typography variant="h4" sx={{ fontSize: { xs: 32, md: 50 } }}>
                                        {loc.state.itemName}
                                    </Typography>
                                    <Typography variant="body2">
                                        Item Price: ${loc.state.itemPrice}
                                    </Typography>
                                    <Typography variant="body2">
                                        Category: {loc.state.category}
                                    </Typography>
                                    <Typography variant="body2">
                                        Ingredients: {loc.state.ingredients}
                                    </Typography>
                                    <Typography variant="body2">
                                        Description: {loc.state.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid >
            </Paper>
        </ThemeProvider >
    )
}
