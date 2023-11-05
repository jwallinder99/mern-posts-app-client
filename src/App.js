import './App.css';
//import pages 
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import  CssBaseline  from '@mui/material/CssBaseline';
import theme from './theme'
//import react router modules 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
//main app component will render the welcome page, signup and login page

//create context for userCredentials 
export const UserCredentials = createContext()

function App() {
  //state for remembering user credentials 
  const [credentials, setCredentials] = useState({})
  //state for remembering auth token
  const [ authToken, setAuthToken ] = useState("")
  //state for remembering isAdmin status
  const [isAdmin, setIsAdmin] = useState("")
  
  //state for remembering posts to render

  //function to handle logging in
  const handleLogin = (newCredentials) => {
    //sets credentials to a new copy of current credentials and new credentials passed as parameters
    setCredentials({...credentials, ...newCredentials})
    
  }

  //function to save token and save isAdmin state of user
  const handleSaveAuth = (token) => {
    //set authToken state to token received as argument from function call
    setAuthToken(token)
    //decode token using jwtdecode module to get admin status from token
    const decodedToken = jwtDecode(token.token)
    setIsAdmin(decodedToken.isAdmin)
    
  }

  

  //context provider for various states/ functions
  //routes for login/register
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <UserCredentials.Provider value={{credentials, authToken, handleLogin, handleSaveAuth, isAdmin, setCredentials, setAuthToken}} >
          <Router>
            <Routes>
              <Route path="/" element = {<Welcome/>} />
              <Route path="/signup" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </Router>
        </UserCredentials.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
