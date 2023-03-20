import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import emty_image from '../images/a11.png';

const InsertPage = ({history}) => {
    const [image, setImage] = useState('');
    const [check, setCheck] = useState(false);
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        uid:'user10',
        upass:'pass',
        uname:'금와',
        address:'부여',
        phone:'010-1234-4321',
        photo:''
    })
    const {uid,upass,uname,address,phone} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
        if(e.target.name === 'uid') setCheck(false);
    }
    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(!check) {
            alert('아이디확인을 해주세요');
            return;
        }else{
            if(!window.confirm('새로운 회원을 등록합니까?')) return;
            const formData = new FormData();
            formData.append('uid',uid);
            formData.append('uname',uname);
            formData.append('upass',upass);
            formData.append('address',address);
            formData.append('phone',phone);
            formData.append('file',file);
            const config={
                Headers: {'content-type':'multipart/form-data'}
            }
            await axios.post('/users/insert',formData, config);
            history.push('/login')
        }
    }
    
    const onCheckID = async() => {
        const result = await axios(`/users/${uid}`);
        if(!result.data){
            alert('사용가능한 아이디 입니다');
            setCheck(true);
        }else {
            alert('이미 사용중인 아이디 입니다')
        }
    }
    return (
        <Row className='justify-content-center my-5' xl={3}>
            <Col md={8}>
                <Card className='text-center'>
                    <Card.Title className='py-3'>
                        <h3>회원가입</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <Col xl={10} md={7} xs={8}>
                            <Form.Control placeholder='아이디'
                            value={uid} name="uid" onChange={onChange}
                            className='mb-3'/>
                            </Col>
                            <Col>
                            <Button onClick={onCheckID}>아이디확인</Button>
                            </Col>
                            </Row>
                            <Form.Control
                            value={upass} name="upass"
                            type='password' onChange={onChange}
                            placeholder='비밀번호' className='mb-3'/>
                            <Form.Control placeholder='성명' className='mb-3'
                            value={uname} name="uname" onChange={onChange}
                            />
                            <Form.Control placeholder='주소' className='mb-3'
                            value={address} name="address" onChange={onChange}
                            />
                            <Form.Control placeholder='전화' 
                            value={phone} name="phone" onChange={onChange}
                            className='mb-3'/>
                            {image ? <img src={image} width="100px" className='image'/> : <img src={emty_image} width="100px" className='image'/>}
                            <Form.Control 
                            accept='image/*'
                            type='file' onChange={onChangeFile}
                            placeholder='이미지' className='mb-5'/>
                            <hr/>
                            <Button type='submit'>가입</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default InsertPage