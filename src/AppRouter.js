import React, { lazy, Suspense,useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import {selectToken} from './features/UserSlice'
import PrivateRoute from './helper/PrivateRoute'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import NavBar from './components/navbar/Navbar'
import 'antd/dist/antd.min.css'

const Home = lazy(()=>import("./pages/home/Home"))
const Login = lazy(()=>import("./pages/login/Login"))
const AddCard = lazy(()=>import("./pages/addcards/AddCards"))
const EditCard = lazy(()=>import("./pages/editcard/EditCard"))
const History = lazy(()=>import("./pages/history/History"))
const SignUp = lazy(()=>import("./pages/signup/Signup"))

const AppRouter = () => {
  const token = useSelector(selectToken)
  const [isAuthenticated,setIsAuthenticated] = useState(false)

  useEffect(()=>{
    setIsAuthenticated(token!=="")      
  },[])

  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
      <NavBar loggedIn={isAuthenticated} setLogin={setIsAuthenticated}/>
        <Routes>
          <Route element={
          <PrivateRoute loggedIn={isAuthenticated}>
                    <Home/>
          </PrivateRoute>} path="/"/>
          
          <Route element={
          <PrivateRoute loggedIn={isAuthenticated}>
              <AddCard/>
          </PrivateRoute>} path="/add-cards"/>

          <Route element={
          <PrivateRoute loggedIn={isAuthenticated}>
                    <EditCard/>
          </PrivateRoute>} path="/edit-card"/>

          <Route element={
          <PrivateRoute loggedIn={isAuthenticated}>
                    <History/>
          </PrivateRoute>} path="/history"/>
          <Route element={<Login setLogin={setIsAuthenticated}/>} path="/signin"/>
          <Route element={<SignUp setLogin={setIsAuthenticated}/>} path="/signup"/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter