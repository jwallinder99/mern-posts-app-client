import React from 'react'
//import link from react-router
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserCredentials } from '../App'
import Feed from '../components/Feed'
import Header from '../components/Header'


//import mui components
import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    Grid
} from '@mui/material'
export default function Welcome() {
    //get credentials of user from context
    const { credentials } = useContext(UserCredentials)
    //get  authToken from context
    const { authToken } = useContext(UserCredentials)
    //if the authToken context is truthy then the todos component is rendered, and the authToken is passed as props
    //credentials context is passed as a prop to Header components
    //link components used to link to signup or login pages 
  return (
    <div>
        <Container >
            <Grid container spacing={2} justifyContent="center" sx={{
                display: 'flex',
                flexDirection: 'column',
                
            }}> 
            {credentials.username ? (
                <Header credentials={credentials}/>
                
            ):(
                <div>
                    
                    <Box sx={{
                        display: 'flex',
                        my: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column'
                    }}>
                    <Typography variant="h4">Welcome</Typography>
                    <Stack direction="row">
                        <Link to='/signup'>
                            <Button>Sign Up</Button>
                        </Link>
                        <Link to='/login'>
                            <Button>Log In</Button>
                        </Link>
                    </Stack>
                    </Box>
                </div>
                    
            )}

                {/*if authtoken is truthy then render the feed component */}
            <Grid item>
            {authToken && <Feed token={authToken} />}
            </Grid>
            
                
            
            </Grid>
        </Container>
    </div>

  )
}
