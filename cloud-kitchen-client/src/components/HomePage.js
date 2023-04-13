import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getMenuItems } from '../service/api.js'



export default function HomePage() {

    const theme = createTheme();

    const [menuItems, setMenuItems] = useState([]);

    var addedCartItems = []

    useEffect(() => {
        getAllMenuItems();
    }, []);

    const getAllMenuItems = async () => {
        const response = await getMenuItems();
        setMenuItems(response.data.Items)
    }

    const addToCart = (data) => {
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('Cart Items'))
        if (cartItemsFromLocalStorage !== null) {
            addedCartItems = cartItemsFromLocalStorage
        }

        const index = addedCartItems.findIndex(item => item.id === data.id);
        if (index > -1) {
            data.quantity = addedCartItems[index].quantity + 1
            addedCartItems[index] = data
        }
        else {
            data["quantity"] = 1
            addedCartItems.push(data)
        }
        localStorage.setItem('Cart Items', JSON.stringify(addedCartItems))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} sx={{ margin: 'auto' }}>
                            <Typography component="h1" variant="h4" align="center">
                                Our Menu Items
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        {menuItems.map(function (record, index) {
                            return (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={record.imageURL}
                                            alt="menu item"
                                        />
                                        <CardContent>
                                            <Grid container justify="space-between">
                                                <Grid item xs={12} sm={10}>
                                                    <Typography gutterBottom
                                                        variant="h5"
                                                        sx={{ textAlign: 'left' }}
                                                        inline>
                                                        {record.itemName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography gutterBottom
                                                        variant="h6"
                                                        inline
                                                        sx={{ textAlign: { md: 'right' } }}
                                                        color='red'>
                                                        $ {record.itemPrice}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="text.secondary">
                                                {record.category}
                                            </Typography>
                                            <br />
                                            <Typography variant="body2" color='black'>
                                                {record.ingredients}
                                            </Typography>
                                            <br />
                                            <Typography variant="body2" sx={{ fontStyle: 'italic' }} color="text.secondary">
                                                {record.description}
                                            </Typography>
                                            <hr />
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <Button
                                                            onClick={() => addToCart(record)}
                                                            size="medium"
                                                            variant="outlined"
                                                            color="inherit"
                                                            sx={{
                                                                mt: 1,
                                                                color: 'green'
                                                            }}
                                                        >
                                                            Order
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider >
    )
}
