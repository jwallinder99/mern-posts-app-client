import React, { useContext, useState, useEffect } from 'react'
import { UserCredentials } from '../App';
import {
    Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteButton from './DeleteButton';

export default function PostButtons({ postUsername, post_id, reDisplay, edit, isEditing, setIsEditing }) {
    //get credentials context
    const credentials = useContext(UserCredentials)
    //handle onClick function to trigger function call to function passed as props
    const handleClick = () => {
        console.log(post_id)
        edit()
    }
    //render edit Edit button and Delete button for post if the context redentials username is the same as the post's username, or if the 
    //isAdmin property of the credentials context is truthy, render the buttons
    if(credentials.credentials.username === postUsername || credentials.isAdmin ){
    return (
        <div>
            <DeleteButton post_id={post_id} reDisplay={reDisplay}/>
            
            <Button sx={{
                float: 'right'
            }}
            onClick={handleClick}
            >
                {/*isEditing state passed as a prop here to make this button change to edit or cancel based on the state */}
            {!isEditing?(
                "Edit"
            ): (
                "Cancel"
            )}  
            </Button>      
        </div>
    )
    } else {
        return (
            null
        )
    }
 
}
