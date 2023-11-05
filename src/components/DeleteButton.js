import React, { useState, useContext} from 'react'
import {
    Button
} from '@mui/material'
import { UserCredentials } from '../App'
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({ post_id, reDisplay }) {
    //get credentials from context
    const credentials = useContext(UserCredentials)
    //get token from credentials
    let token = credentials.authToken.token
    //function to handle deleting a post
    const handleDelete = async () => {
        
        try {
            //get response from fetch request, passing post_id from props as query parameter
            const response = await fetch(`/posts/${post_id}`, {
                //pass token from context as auth header
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if(!response.ok){
                throw new Error('Network response was not okay')
            }
            //get data from response
            const data = await response.json()
            console.log(data.message)
            //re display data using function passed as props
            reDisplay()
        } catch (error) {
            console.log('Error deleting post')
        }
    }
  return (
    <Button sx={{
        float: 'right'
    }}
    onClick={handleDelete}
    ><DeleteIcon /></Button>
  )
}
