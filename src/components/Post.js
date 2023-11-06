import React from 'react'
import {
    
    Typography,
    
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Paper,
    Button,
    TextField,
    Grid,
    Stack,
    Box
}
from '@mui/material'
import CommentSection from './CommentSection'
import PostButtons from './PostButtons'
import {useState, useContext} from 'react'
import { UserCredentials } from '../App'
import baseUrl from '../utils/baseUrl'
export default function Post(props) {
    //credentials context
    const credentials = useContext(UserCredentials)
    //get token from context
    const token = credentials.authToken.token
    //destructure props
    const { postData, index, reDisplay, post_id} = props
    //state to track if user is editing the post or not
    const [isEditing, setIsEditing ] = useState(false)

    //piece of state for new content of post
    const [newContent, setNewContent] = useState("")

    //funciton to toggle editing state
    const edit = () => {
        console.log(post_id)
        setIsEditing(!isEditing)
    }

    //handle editing a post
    const handleEdit = async () => {
        console.log(newContent)
        try{
            //make a fetch request with post_id(from mongodb) that was passed as props as a query parameter
            const response = await fetch(`${baseUrl}/posts/${post_id}`, {
                method: 'PUT',
                headers: {
                    //use token from login as bearer token in auth headers
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
                //stringify an object with content propery and newContent piece of state as value
                body: JSON.stringify({content: newContent})
                
            })
            
            if(!response.ok){
                throw new Error('Response status was not okay')
            }
            //get data from response
            const data = response.json()
            console.log(data.message)
            //reDisplay feed, reset states
            reDisplay()
            setIsEditing(!isEditing)
            setNewContent("")
        } catch(error) {
            console.log(error)
        }
            
    }

  return (
    <div key={index}>
        <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{p: 2, my: 2, width: 400}} >
                {/* PostButtons component */}
            <PostButtons  
             postUsername={postData.username} 
             post_id={post_id} 
             reDisplay={reDisplay} 
             edit={edit}
             isEditing={isEditing}
             setIsEditing={setIsEditing}
             />
             {/*If isEditing piece of state is truthy, render the textfield allowing the user to edit the post, else render the content of the post */}
                {!isEditing ? (
                    <ListItemText
                    primary={postData.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body2"
                            >
                                {postData.content}
                            </Typography>
                        </React.Fragment>
                    }
                />
                ) : (
                    <Box
                     component="form"
                     sx={{
                        display: 'flex',
                        flexDirection: 'column'
                     }}
                     
                    >
                        <TextField
                        variant="standard"
                        multiline
                        size="small"
                        value={newContent}
                        onChange={(e)=> setNewContent(e.target.value)}
                        />
                        <Button 
                        size="small"
                        onClick={handleEdit}
                        >
                            Update
                        </Button>
                    </Box>
                )}
                {/*CommentSection component */}
                <CommentSection postData = {postData} reDisplay={reDisplay} post_id={post_id}/>
            </Paper>
        
        </Grid>
    </div>
  )
}
