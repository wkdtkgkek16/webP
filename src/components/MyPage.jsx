import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import emty_image from '../images/a11.png'
import Loading from './Loading';


const MyPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [form, setForm] = useState({
        uid:'',
        upass:'',
        uname:'',
        address:'',
        phone:'',
        photo:''
    });
    const {uid, upass, uname, address, phone, photo} = form;
    const getUser = async() => {
        setLoading(true);
        const result= await axios(`/users/${sessionStorage.getItem('uid')}`);
        setForm(result.data);
        setImage(photo);
        setLoading(false);
    }

    useEffect(()=>{
        getUser();
    },[])

    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const [file, setFile] = useState(null);
    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
            if(!window.confirm('회원 정보를 수정합니까?')) return;
            const formData = new FormData();
            formData.append('uid',uid);
            formData.append('uname',uname);
            formData.append('upass',upass);
            formData.append('address',address);
            formData.append('phone',phone);
            formData.append('file',file);
            formData.append('photo',photo);
            const config={
                Headers: {'content-type':'multipart/form-data'}
            }
            await axios.post('/users/update',formData, config);
            history.push('/')
        }

    if(loading) return <Loading/>
    return (
        <Row className='justify-content-center my-5' xl={3}>
        <Col md={8}>
            <Card className='text-center'>
                <Card.Title className='py-3'>
                    <h3>회원정보</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Control placeholder='아이디'
                        value={uid} name="uid" onChange={onChange}
                        className='mb-3'/>
                        <Form.Control
                        type='password'
                        value={upass} name="upass" onChange={onChange}
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
                        <Form.Control onChange={onChangeFile}
                        accept='image/*'
                        type='file' 
                        placeholder='이미지' className='mb-5'/>
                        <hr/>
                        <Button type='submit'>정보수정</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}

export default MyPage