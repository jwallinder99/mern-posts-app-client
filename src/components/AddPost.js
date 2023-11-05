import React, { useState, useContext} from 'react'
import {
    Box,
    TextField,
    Button,
    Paper
} from '@mui/material'
import getPosts from '../utils/getPosts'
import { UserCredentials } from '../App'
export default function AddPost({ token, reFetch }) {
    //piece of state for form input
    const [ postInput, setPostInput ] = useState("")
    //credentials context
    const { credentials } = useContext(UserCredentials)   

    //function to add post to db
    const addPostToDb = async () => {
        
        try {
            //make a request to api
            const response = await fetch('/posts/addPost', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                //get username from credentials context 
                body: JSON.stringify({
                    username: credentials.username,
                    content: postInput
                })
            })
            //if response status is not okay
            if(!response.ok){
                throw new Error("Error fetching data ,response status was not okay")
            }
            //await response from api call and put in posts variable
            const posts = await response.json()
            console.log(posts)
            //reset postInput state and redisplay the data by calling function passed as props
            setPostInput("")
            reFetch()
        } catch(error) {
            console.log(error)
        }
    }

    //onChange textfield sets its input value to postInput state
  return (
    <Box>
        <Paper
         elevation={3}
         sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            postition: 'absolute',
            margin: 3,
            
            
        }}>
        <TextField 
         variant="standard"
         multiline
         onChange={(e) => setPostInput(e.target.value)}
         sx={{py: 1}}
         value={postInput}
         />
        <Button onClick={addPostToDb}>Add Post</Button>
        </Paper>
    </Box>
  )
}
