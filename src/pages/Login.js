import React, { useState, useContext} from 'react'
import { UserCredentials } from "../App"
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import baseUrl from '../utils/baseUrl'
export default function Login() {
    //piece of state for remembering username
    //piece of state for remembering password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //piece of state for response message from /login api call
    const [responseMsg, setResponseMsg ] = useState("")
    const [error, setError] = useState("")

    //handle login and saveAuth functions from context
    const { handleLogin, handleSaveAuth } = useContext(UserCredentials)
    let navigate = useNavigate()
    //function to handle loggin in the user by making a post request to the api
    const login = async (e) => {
        e.preventDefault()
        try {
            //make a request to the api endpoint defined in express server
            const response = await fetch(`${baseUrl}/users/login`, {
                //post headers
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //send username and password as body of request
                body: JSON.stringify({
                    username,
                    password
                })
            })
            //if response status is not okay
            if(!response.ok) {
                console.log("Network response was not okay(200)")
            }
            //await response from api call and put in a variable 
            const data = await response.json()

            //if response status is 200 
            if(response.status === 200) {
                console.log(data)
                setResponseMsg(data)
                //call save auth function from app component and pass response as argument
                handleSaveAuth(data)
                //call handle login function and pass username and password as args
                handleLogin({
                    username, 
                    password
                })
                //use navigate hook to go back to welcome page
                navigate('/')
                
            }
            if(response.status === 401) {
                
                setError("Username or password do not match")
            }
            
        } catch {
            console.log(error)
            setError(error)
        }
        
    }

    //onChange set states to the textbox's values
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
                Log In
            
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box
            component="form"
            noValidate
            sx={{my: 5}}
            >   <Stack spacing={5}>
                <TextField
                    required
                    variant="standard"
                    label="Username"
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    type="password"
                    variant="standard"
                    label="Password"
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={login}>
                    Log In
                </Button>
                </Stack>
            </Box>
        </Box>
    </Container>
  )
}
