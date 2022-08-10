import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signOut} from '../../features/UserSlice'
import AlignRightOutlined from '@ant-design/icons/AlignRightOutlined';
import './Navbar.css';


const LeftMenu=()=>{
    return (
        <Menu mode="horizontal">
            <Menu.Item key="Home">
                <Link to="/">
                    <p>Home</p>
                </Link>
             </Menu.Item>
             <Menu.Item key="history">
                <Link to="/history">
                    <p>History</p>
                </Link>
             </Menu.Item>
        </Menu>
    );
}
const RightMenu=({loggedIn,setLogin})=>{
  const dispatch = useDispatch()

  const handleSignout=()=>{
      setLogin(false)
      dispatch(signOut())
  }

   return (
        <Menu mode="horizontal">
          {loggedIn ?
          <Menu.Item key="signout">
            <Link to="/signout" onClick={handleSignout}>
                <p>Signout</p>
            </Link>
          </Menu.Item>
          : 
            <>
            <Menu.Item key="signin">
              <Link to="/signin">
                  <p>Signin</p>
              </Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">
                  <p>Signup</p>
              </Link>
            </Menu.Item>
            </>}
        </Menu>
      );
}

const NavBar=({loggedIn,setLogin})=>{
    const [visible,setVisible] = useState(false)

    const onClose=()=>{
        setVisible(false)
    }

    const showDrawer=()=>{
        setVisible(true)
    }

    return (
        <nav className="menu">
        <div className="menu__logo">
            <a href="/">Bolbs</a>
        </div>
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_rigth">
            <RightMenu mode="horizontal" loggedIn={loggedIn} setLogin={setLogin}/>
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            color='white'
            onClick={showDrawer}
          >
            <AlignRightOutlined />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    );
}

export default NavBar