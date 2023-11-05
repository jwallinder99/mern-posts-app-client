import { dividerClasses } from '@mui/material';
import React, {useState, useEffect} from 'react'
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Paper,
    Button,
    TextField,
    Grid
}
from '@mui/material'
import getPosts from '../utils/getPosts';
import Post from './Post'
import AddPost from '../components/AddPost'

const Feed = (props) => {
    //piece of state for posts from database
    const [posts, setPosts] = useState([]);

    //function to fetch posts from api
    const fetchPosts = async () => {
        //if props.token is truthy (exists)
        if(props.token) {
            //try make a request using getPosts util function, and pass token as argument
            try {
                const postsData = await getPosts(props.token.token)
                //set posts state to data received from call
                setPosts(postsData)
            } catch (error) {
                console.log(error)
            }
        }
    }
    //useEffect used to make the function triggger once when the component mounts
    useEffect(()=> {
        fetchPosts()
    }, [])

    //mui grid component renders the addPost component and the Post component
    return(
        <Box>   
            <Grid container  sx={{display: 'flex' }}>
                    <Grid item xs={4}>
                     <AddPost token={props.token.token} reFetch={fetchPosts}/>
                    </Grid>
                    <Grid item xs={8} >
                        {/*posts are rendered in reverse so that the most recent post is at the top of the list */}
                        <List sx={{ bgcolor: 'background.paper', maxWidth: 540 }}>
                            {posts.slice().reverse().map((post, index)=>(
                                <Post postData={post} key={index} index={index} post_id={post._id} reDisplay={fetchPosts}/>
                            ))}
                        </List>
                    </Grid>
                
            </Grid>
        </Box>
        
    )
}

export default Feed;