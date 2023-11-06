import React, { useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack
} from '@mui/material'

import baseUrl from '../utils/baseUrl';
export default function SignUp() {
    //piece of state for remembering username
    const [ username, setUsername ] = useState("")
    //piece of state for remembering password
    const [ password, setPassword ] = useState("")
    const [ responseMsg, setResponseMsg ] = useState("")
    const [ error, setError ] = useState("")
    const [isRedirecting, setIsRedirecting] = useState(false)

    //put useNavigate module from react-router-dom to a variable so it can be used in a function
    const navigate = useNavigate()

    //variable declared at higher scope to determine if page should go back to home page once registered
    let responseStatus;

    //function to handle clicking the register button
    const handleRegister = async (e) => {
        e.preventDefault()
        
        try {
            //make a request to an api endpoint defined in express server
            const response = await fetch(`${baseUrl}/users/register`, {
                //post request
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //username and password for body of request
                body: JSON.stringify({
                    username,
                    password,
                })
            })

            //get responseStatus
            responseStatus = response.status
            //if response is not okay
            if(!response.ok) {
                console.log("Network response was not ok(200)")
            }
            //await response from api call and place in variable
            const data = await response.json()
            console.log(data)
            setResponseMsg(data)
            
        } catch (error) {
            console.log(error)
            setError(error)
        }
        //if response status is ok (200)
        if(responseStatus === 200) {
            setIsRedirecting(true)
            //navigate back to homepage after 2 seconds
            setTimeout(()=>{
            navigate('/')
            }, 2000)
        }
    }
  return (
    <Container>
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
            <Typography 
            variant="h4"
            >
                Sign Up
            </Typography>
            <Box
            component="form"
            noValidate
            sx={{my: 5}}
            >   <Stack spacing={5}>
                {/*On change set the username piece of state to the event target's value */}
                <TextField
                    required
                    variant="standard"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    variant="standard"
                    label="Password"
                    onChange={((e) => setPassword(e.target.value))}
                />
                <Button onClick={handleRegister}>
                    Sign up
                </Button>
                </Stack>
                {responseMsg && <Typography sx={{textAlign: 'center', my: 5}}>{responseMsg.message}</Typography>}
                {isRedirecting && <Typography>Redirecting to welcome page</Typography>}
            </Box>
        </Box>
    </Container>
  )
}
