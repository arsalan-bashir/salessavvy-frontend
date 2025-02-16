import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, Typography, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../../assets/salessavvy-logo.png';
import "../../assets/styles.css";

const AdminNav = (props) => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
          const response = await fetch("http://localhost:9090/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
          if (response.ok) {
            console.log("User successfully logged out");
            navigate("/admin");
          } else {
            console.error("Failed to log out");
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

    return (
        <>
            <AppBar className="navbar" position="fixed">
                <Toolbar>
                    <Typography className="nav-title" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        SalesSavvy
                    </Typography>
                    <Button
                        onClick={() => {handleLogout}}
                        color="inherit">Logout
                    </Button>
                    <IconButton
                        color="inherit"
                        size="large"
                        edge="end"
                        className="admin-profile"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        sx={{borderRadius: '5px',
                            '&:hover': {
                                borderRadius: '50px',
                            }
                        }}
                    >
                        <AccountCircle />
                        <span>{props.username}</span>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AdminNav;
