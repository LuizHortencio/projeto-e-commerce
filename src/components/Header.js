import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import Cart from './Cart';

const Header = () => {
    return(
        <Grid style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor:'#2565C0',
            borderEndStartRadius:25,
            borderEndEndRadius:25,
            height: '90px'
        }} container direction="row" justify="space-between" alignItems="center">
            <Typography style={{color:'white'}} variant='h3'>
                Dio Shopping
            </Typography>
            <Link style={{marginLeft:'20%'}} to="/">
                <Button style={{color:"white"}} color="primary">Home</Button>
            </Link>
            <Link style={{marginLeft:'10%',marginRight:'20%'}} to="/contato">
                <Button style={{color:"white"}} color="primary">Contato</Button>
            </Link>
            <Cart />   

            
        </Grid>
    )
}

export default Header;
