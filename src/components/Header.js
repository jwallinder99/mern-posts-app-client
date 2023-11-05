import React, { useContext} from 'react'
import {
    Box,
    Typography,
    Button
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { UserCredentials } from '../App';

//Header component
export default function Header({ credentials }) {
    //context states
    const { setCredentials } = useContext(UserCredentials)

    const { setAuthToken } = useContext(UserCredentials)
    //theme from mui
    const theme = useTheme();

    const primaryColor = theme.palette.primary.main

    //handle logout function
    const handleLogout = () => {
        //resets credentials and authToken states, changing the condition of the feed component being rendered
        setCredentials("")
        setAuthToken("")
    }

    //credentials are displayed in component
    //logout button handles logout on click
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `solid 1px ${primaryColor}`

    }}>
        <Typography
        variant="h2"
        fontWeight={400}
        color="primary.main"

        >
            Posts
        </Typography>
        <Typography
         variant="h5" 
         sx={{my: 5,
            

        }}
         >Welcome {credentials.username}</Typography>
        <Link to='/'>
        <Button onClick={handleLogout}>Log Out</Button>
        </Link>
        
    </Box>
  )
}
