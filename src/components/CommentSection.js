import React from 'react'
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  TextField,
  
} from '@mui/material'
import CommentForm from './CommentForm'
export default function CommentSection(props) {
  //destructure props
  const { postData } = props

  const { reDisplay } = props

  const { post_id } = props
  //get comments from postData passed as props
  let comments = postData.comments
  //check if comments array from postData has length, if it does render comments
  return (
    <div>
      {comments.length > 0 && <Typography variant="body2">Comments</Typography>}
      <List>
        {/*map comments and display data in list */}
      {comments ? (
        comments.map((comment, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemText 
              primary={comment.username}
              secondary={comment.content}
            />
          </ListItem>
        ))
      ):(
        null
      )}
      </List>
      {/*CommentForm component */}
      <CommentForm reDisplay={reDisplay} post_id={post_id} comments={comments}/>
      
    </div>

  )
}
