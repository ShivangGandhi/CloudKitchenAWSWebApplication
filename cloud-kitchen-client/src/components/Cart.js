import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar'
import { Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../service/api';

export default function Cart() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme();
    const navigate = useNavigate();

    const style = {
        paperStyle: {
            boxShadow:
                "0px 1px 1px -2px #d6d2d2,0px 1px 1px 0px #d6d2d2,0px 1px 1px 1px #d6d2d2"
        },
        blueButton: {
            backgroundColor: '#1e69ba',
            color: 'white'
        }
    }

    const [cartItems, setCartItems] = useState([]);

    var cartTotalWithoutTax = 0
    var tax = 0
    var orderAmount = 0

    if (cartItems.length > 0) {
        cartTotalWithoutTax = cartItems.map(item => parseInt((item.itemPrice) * (item.quantity))).reduce((total, value) => total + value, 0)
        tax = parseFloat((cartTotalWithoutTax * 0.15).toFixed(2));
        orderAmount = cartTotalWithoutTax + tax;
    }

    useEffect(() => {
        getAllCartItems();
    }, []);

    const getAllCartItems = () => {
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('Cart Items'))
        if (cartItemsFromLocalStorage === null) {
            setCartItems([])
        }
        else {
            setCartItems(cartItemsFromLocalStorage)
        }
    }

    const handleClearClick = () => {
        localStorage.removeItem('Cart Items')
        setCartItems([])
    }

    if (cartItems.length > 0) {
        localStorage.setItem('Cart Items', JSON.stringify(cartItems))
    }

    const onSubmit = async (data) => {
        data = Object.assign(data, { orderItems: cartItems, orderTotalWithoutTax: cartTotalWithoutTax, orderTaxAmount: tax, orderTotalAmount: orderAmount })
        await createOrder(data)
        localStorage.removeItem('Cart Items')
        navigate('/')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ margin: 'auto' }}>
                            <Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                                Your Order
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <React.Fragment>
                            <Paper style={style.paperStyle} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            id="firstName"
                                            {...register("firstName", {
                                                required: "First Name is Required",
                                            })}
                                            error={Boolean(errors.firstName)}
                                            helperText={errors.firstName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            id="lastName"
                                            {...register("lastName")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                                    message: "Invalid Email"
                                                }
                                            })}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="contact"
                                            autoComplete="contact"
                                            id="contact"
                                            fullWidth
                                            type="number"
                                            label="Contact Number"
                                            {...register("contact", {
                                                required: "Please enter your Contact Number"
                                            })}
                                            error={Boolean(errors.contact)}
                                            helperText={errors.contact?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            id="address"
                                            {...register("address", {
                                                required: "Address is Required",
                                            })}
                                            error={Boolean(errors.address)}
                                            helperText={errors.address?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br />
                            <Paper style={style.paperStyle}>
                                <Grid container >
                                    <Grid item xs={12} sm={4}
                                        sx={{
                                            margin: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography sx={{ color: '#1e69ba', fontWeight: 'bold' }} >Item Name</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}
                                        sx={{
                                            margin: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography sx={{ color: '#1e69ba', fontWeight: 'bold' }}>Quantity</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}
                                        sx={{
                                            margin: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography sx={{ color: '#1e69ba', fontWeight: 'bold' }}>Price</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br />
                            <Stack container spacing={2}>
                                <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                                    <Paper style={style.paperStyle}>
                                        {cartItems.length === 0 &&
                                            <Grid container >
                                                <Grid item xs={12} sm={12}
                                                    sx={{
                                                        mt: 1,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Typography component="h1" variant="h4" align="center">
                                                        Add Items To Order
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        }
                                        {cartItems.length > 0 && cartItems.map(function (record, index) {
                                            return (
                                                <Grid container key={record.id}>
                                                    <Grid item xs={12} sm={4}
                                                        sx={{
                                                            margin: "auto",
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Typography >{record.itemName}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                                        <Box display="flex" justifyContent="center">
                                                            <Button
                                                                onClick={() => {
                                                                    var updatedItem = cartItems.map((item, qtyIndex) => {
                                                                        return index === qtyIndex ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 } : item
                                                                    })
                                                                    const indexOfZeroQty = updatedItem.findIndex(item => item.quantity === 0)
                                                                    if (indexOfZeroQty > -1) {
                                                                        if (indexOfZeroQty === 0) {
                                                                            updatedItem.splice(indexOfZeroQty, indexOfZeroQty + 1)
                                                                        }
                                                                        updatedItem.splice(indexOfZeroQty, indexOfZeroQty);
                                                                        if (updatedItem.length === 0) {
                                                                            updatedItem = []
                                                                            localStorage.setItem('Cart Items', JSON.stringify(updatedItem))
                                                                        }
                                                                    }
                                                                    setCartItems(updatedItem)
                                                                }}
                                                                size="medium"
                                                                variant="outlined"
                                                                color="inherit"
                                                                sx={{ mt: 1, mb: 1, mr: 1, ml: 1, color: 'red' }}
                                                            >
                                                                -
                                                            </Button>
                                                            <Typography
                                                                sx={{ mt: 2, mb: 1, mr: 1, ml: 1 }}
                                                            >
                                                                {record.quantity}
                                                            </Typography>
                                                            <Button
                                                                onClick={() => {
                                                                    const updatedItem = cartItems.map((item, qtyIndex) => {
                                                                        return index === qtyIndex ? { ...item, quantity: item.quantity + 1 } : item
                                                                    })
                                                                    setCartItems(updatedItem)
                                                                }}
                                                                style={style.blueButton}
                                                                size="medium"
                                                                variant="outlined"
                                                                sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                                            >
                                                                +
                                                            </Button>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2}
                                                        sx={{
                                                            my: 1,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Typography>$ {(record.itemPrice) * (record.quantity)}</Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                        <br />
                                    </Paper>
                                </Stack>
                            </Stack>
                            <br />
                            <Paper style={style.paperStyle}>
                                <Grid container>
                                    <Grid item xs={12} sm={10}
                                        sx={{
                                            mr: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: { xs: 'center', md: 'right' }
                                        }}
                                    >
                                        <Typography >Total: </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}
                                        sx={{
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography >$ {cartTotalWithoutTax}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={10}
                                        sx={{
                                            mr: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: { xs: 'center', md: 'right' }
                                        }}
                                    >
                                        <Typography >Tax (15 %): </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}
                                        sx={{
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography >$ {tax}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container>
                                    <Grid item xs={12} sm={10}
                                        sx={{
                                            mr: "auto",
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: { xs: 'center', md: 'right' }
                                        }}
                                    >
                                        <Typography >Total Amount: </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}
                                        sx={{
                                            my: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography >$ {orderAmount}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid container xs={12} sm={8}>
                                    </Grid>
                                    <Grid container xs={12} sm={4}>
                                        <Grid item xs={12} sm={6}
                                            sx={{
                                                my: 1,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Button
                                                onClick={() => handleClearClick()}
                                                size="medium"
                                                variant="outlined"
                                                color="inherit"
                                                sx={{ mt: 1, mb: 1, color: 'red' }}
                                            >
                                                Clear Cart
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}
                                            sx={{
                                                my: 1,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: 'auto'
                                            }}
                                        >{cartItems.length === 0 &&
                                            <Button
                                                type="submit"
                                                disabled
                                                size="medium"
                                                variant="outlined"
                                                sx={{ mt: 1, mb: 1 }}
                                            >
                                                Checkout
                                            </Button>}
                                            {cartItems.length > 0 &&
                                                <Button
                                                    type="submit"
                                                    style={style.blueButton}
                                                    size="medium"
                                                    variant="outlined"
                                                    sx={{ mt: 1, mb: 1 }}
                                                >
                                                    Checkout
                                                </Button>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </React.Fragment>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
