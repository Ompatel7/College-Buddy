import HomePage from './Components/HomePage'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import View_colleges from './Components/View_colleges'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import MySearches from './Components/MySearches'
import Help from './Components/Pages/help'
import Error from './Components/Pages/Error'

function App() {

  return (
    <div>

    <Navbar/>

    <Routes>
      <Route path='/' element={<HomePage/> }/>
      <Route path='/login' element={<LoginSignup/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/error' element ={<Error/>}/>
      <Route path='/view-colleges/:collegeID' element={<View_colleges/>}/>
      <Route path='/my-searches' element={<MySearches/>}/>

    </Routes>      


    </div>
  )
}

export default App
