import { Box } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
const Header = () => {
    const {role} = useSelector(state => state.user)
  return (
    <Box>
        {role && (
          <div className='AppGlass'>
           <Sidebar/>
            <Outlet/>
            </div>
           
        )
        }
    </Box>
  )
}

export default Header