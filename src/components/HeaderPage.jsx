import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import tktk from '../images/tktk.jpg'
import { UserContext } from './UserContext';

const HeaderPage = ({history}) => {
    const {user, setUser} = useContext(UserContext);
    const getUser = async() => {
        const result = await axios(`/users/${sessionStorage.getItem('uid')}`);
        setUser(result.data);
    }
    useEffect(()=>{
        getUser();
    },[sessionStorage.getItem('uid')]);
    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('uid');
        setUser(null);
        history.push('/')
    }
    return (
        <>
            <img src={tktk} width="100%" height="190px"/>
            <Navbar bg="success" variant="dark" className='header'>
                <Container>
                    <Navbar.Brand href="#home">인천일보</Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/">홈</Link>
                            <Link to="/users">사용자목록</Link>
                            {sessionStorage.getItem('uid') ? 
                                <Link to="/logout" onClick={onLogout}>로그아웃</Link>
                                :
                                <Link to="/login">로그인</Link>
                            }
                        </Nav>
                        {(user && user.uname) && <Link to="mypage">{user.uname}</Link>}
                        {(user && user.photo) && <img src={user.photo}
                            style={{width:'100px',borderRadius:'50%'}}/>}
                </Container>
            </Navbar>
        </>
    )
}

export default withRouter(HeaderPage)