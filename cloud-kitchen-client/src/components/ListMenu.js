import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem'
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import { getMenuItems, deleteMenuItem } from '../service/api.js'

export default function ListMenu() {

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

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('AdminSessionToken')
        if (!token) {
            navigate('/adminlogin')
        }
        getAllMenuItems();
    }, []);

    const getAllMenuItems = async () => {
        const response = await getMenuItems();
        setMenuItems(response.data.Items)
    }

    const handleAdditionClick = () => {
        navigate('/addmenuitem')
    }

    const handleDetailsClick = (element) => {
        const id = element.record.id
        navigate(`/menuitemdetails/${id}`, { state: element.record })
    }

    const handleDeleteClick = async (element) => {
        await deleteMenuItem(element.record.id);
        getAllMenuItems();
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DashboardNavbar />
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                            <Typography component="h1" variant="h4" align="center">
                                Menu Items
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={() => handleAdditionClick()}
                                size="medium"
                                variant="outlined"
                                sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                            >
                                Add new item
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <Box sx={{ mt: 3 }}>
                        <React.Fragment>
                            <Stack container spacing={2}>
                                {menuItems.map(function (record, index) {
                                    return (
                                        <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                                            <Paper style={style.paperStyle}>
                                                <Grid container spacing={3} key={record.id}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Item >Item Name: {record.itemName}</Item>
                                                        <Item >Item Price: CAD {record.itemPrice}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Item >Item Category: {record.category}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                        <Button
                                                            onClick={() => handleDetailsClick({ record })}
                                                            style={style.blueButton}
                                                            size="medium"
                                                            variant="outlined"
                                                            sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                                        >
                                                            Details
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDeleteClick({ record })}
                                                            size="medium"
                                                            variant="outlined"
                                                            color="inherit"
                                                            sx={{ mt: 1, mb: 1, mr: 1, ml: 1, color: 'red' }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </React.Fragment>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
