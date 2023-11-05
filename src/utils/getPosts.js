import React from 'react'

const getPosts = async (token) => {
        
    try {
        //response for api fetch request 
        const response = await fetch('/users/getPosts', {
            //get request
            method: "GET",
            //use token as auth headers
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        //if response status is not ok
        if(!response.ok){
            throw new Error ("Error fetching data")
        }
        //await response status from api call and put in posts variable
        const postsData = await response.json()
        //set posts state to response from api call
        console.log(postsData)
        return postsData
    } catch (error) {
        console.log(error)
    }
}

export default getPosts;