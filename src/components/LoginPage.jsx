import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';


const LoginPage = ({history}) => {

    const [form, setForm] = useState({
        uid:'',
        upass:''
    });
    const {uid, upass} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        const result = await axios.post('/users/login',form);
        if(result.data.result===0){
        alert('아이디가 존재하지 않습니다');
        }else if(result.data.result===2){
            alert('비밀번호가 존재하지 않습니다');
        }else if(result.data.result===1){
            sessionStorage.setItem("uid",uid)
            history.push('/')
        }
    }

  return (
    <Row className='justify-content-center m-5 login'>
        <Col md={6}>
            <Card className='text-center p-3'>
                <Card.Title>
                    <h3>로그인</h3>
                </Card.Title>
                <Card.Body>
                    <Form
                        onSubmit={onSubmit}>
                        <Form.Control placeholder='아이디'
                        value={uid} name="uid" onChange={onChange}
                        />
                        <Form.Control placeholder='비밀번호' type='password'
                        value={upass} name="upass" onChange={onChange}
                        />
                        <Button variant='success' className='mt-3' type='submit' style={{width:"100%"}}>로그인</Button>
                        <Link to='/users/insert'>회원가입</Link>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage