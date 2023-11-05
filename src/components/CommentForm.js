import React, { useState, useContext } from 'react'
import { 
    TextField,
    Button,
    Box,
    Stack,
    Divider
 } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { UserCredentials } from '../App';


export default function CommentForm({ post_id , reDisplay, comments}) {
  //state for comment input
  const [comment, setComment] = useState('')
  //credentials context
  const credentials = useContext(UserCredentials)
  //username from credentials context
  const username = credentials.credentials.username
  //token from credentials context
  const token = credentials.authToken.token
  //function to handle making a comment
  const handleComment = async () => {
    try {
      //make a newCOmment object with the username and comment states passed as values
      const newComment = {
        username: username,
        content: comment
      }
      //make a new array of comments by spreading current comments array and adding new object to it
      const updatedComments = [...comments, newComment]
      //make fetch request with post_id passed as props as query parameter
      const response = await fetch(`/posts/${post_id}`, {
        //put method to update, because the comments for a post is an array of items inside a document
        method: 'PUT',
        //use token from context in auth headers
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        //send an object with comments and updatedComments array as value, this will match the mongoose schema for updating the comments propety of a document
        body: JSON.stringify({
          comments: updatedComments
        })
      })
      if(!response.ok){
        throw new Error('Response status was not okay')
      }
      //get response
      const data = response.json()
      console.log(data.message)
      //re display data once fetch has been made
      reDisplay()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <Box
         component="form"
        >
          <Stack 
           direction="row"
           
           spacing={1}
          >
            <TextField
             id="standard-basic" 
             label="Comment" 
             variant="standard"
             size="small"
             value={comment}
             onChange={(e)=> setComment(e.target.value)}
            />
            <Divider orientation="vertical" flexItem sx={{px: 1}} />
            <Button size="small" onClick={handleComment}><AddCommentIcon /></Button>
          </Stack>
        </Box>
    </div>
    
  )
}

