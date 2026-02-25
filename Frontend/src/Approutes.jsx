import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Login from './features/auth/pages/Login_Form'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
               
                <Route path='/' element={<Feed/>}/>

            
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/createpost' element={<CreatePost/>}/>
            
                <Route path='/welcome' element={<h1>Welcome to my Page</h1>}/>
            
                </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;