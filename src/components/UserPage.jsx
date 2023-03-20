import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card} from 'react-bootstrap'
import Loading from './Loading';
import emty_image from '../images/a11.png'

const UserPage = () => {
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUsers = async() => {
        setLoading(true)
        const url="/users";
        const result = await axios.get(url)
        setUsers(result.data)
        setLoading(false)
    }
    
    useEffect(()=>{
        getUsers();
    },[])

    if(loading) return <Loading/>
  return (
    <Row className='justify-content-center m-3'>
        <h3 className='text-center'>사용자목록</h3>
        <Col xl={6}>
            {users.map(user=>
                <Card key={user.uid} className='my-2'>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                {user.photo ?
                                 <img src={user.photo} width="100px"/>: <img src={emty_image} width="100px"/>}
                            </Col>
                            <Col>
                                <h4>이름: {user.uname} ({user.uid})</h4>
                                <h4>주소: {user.address}</h4>
                                <h4>전화: {user.phone}</h4>
                                <h5>가입일: {user.fmt_date}</h5>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </Col>
    </Row>
  )
}

export default UserPage