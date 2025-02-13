import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../assets/salessavvy-logo.png';
import "../../assets/styles.css";

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState("Guest")
    const [username, setUsername] = useState("guest")
    const [email, setEmail] = useState("user@user")
    const navigate = useNavigate()
    
    useEffect(() => {
        if (props.user) {
            setName(props.user.name);
            setUsername(props.user.username);
            setEmail(props.user.email);
        }
    }, [props.user]);


    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:9090/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
          });
    
          if (response.ok) {
            navigate('/');
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    
    const handleMouseLeave = () => {
        if (!isHovered) {
            setAnchorEl(null);
        }
    };

    
    const handleMenuMouseEnter = () => {
        setIsHovered(true);
    };


    const handleMenuMouseLeave = () => {
        setIsHovered(false);
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleHomeClick = () => {
        navigate('/customerHome') 
    };

    const handleCartClick = () => {
        navigate('/cart')
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorEl && !anchorEl.contains(event.target)) {
                setAnchorEl(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [anchorEl]);

    return (
        <AppBar className="navbar" position="fixed">
            <Toolbar>
                <Typography className="nav-title" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    SalesSavvy
                </Typography>
                <Button 
                    onClick={handleHomeClick}
                    color="inherit">Home</Button>
                <Button color="inherit">Orders</Button>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="cart of current user"
                    onClick={handleCartClick}
                    color="inherit"
                >
                    <Badge badgeContent={props.count} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onMouseEnter={handleMouseEnter}  
                    onMouseLeave={handleMouseLeave}  
                    color="inherit"
                >
                    <AccountCircle />
                    {name}
                </IconButton>

                {/* Menu for dropdown */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} 
                    onClose={handleCloseMenu} 
                    anchorOrigin={{
                        vertical: 'bottom', 
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',  
                        horizontal: 'center',
                    }}
                    onMouseEnter={handleMenuMouseEnter}  
                    onMouseLeave={handleMenuMouseLeave}  
                >
                    <MenuItem disabled>
                        <div>
                            <strong>{username}</strong>
                            <br />
                            <small>{email}</small>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Change Password</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
