import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();


    return (
        <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                position: 'relative',
                borderBottom: (t) => `2px solid ${t.palette.divider}`,
            }}
        >
            <Toolbar sx={{ ml: { xs: 3, md: 7 } }}>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                        color: '#1e69ba',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}
                >
                    <NavLink to='/'
                        style={({ isActive }) => ({
                            color: isActive ? '#1e69ba' : '#1e69ba',
                            fontWeight: isActive ? 'bold' : 'bold',
                            textDecoration: isActive ? 'none' : 'none',
                        })}>
                        Home
                    </NavLink>
                </Typography>
                <Button
                    size="small"
                    aria-label="account of current user"
                    color="inherit"
                    variant="outlined"
                    sx={{
                        color: 'blue',
                        marginLeft: 'auto',
                        mr: { xs: 2, md: 9 }
                    }}
                    onClick={() => { navigate('/cart') }}
                >
                    Cart
                </Button>
            </Toolbar>
        </AppBar>
    )
}
