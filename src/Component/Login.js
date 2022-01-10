import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, FormGroup, Label, Input, Button, Card, CardImg, CardHeader, CardBody} from 'reactstrap';
import LoginVectorArt from './Assets/LoginVectorArt.jpg';
import {useState} from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retpass, setRetpass] = useState("");
    const handleLogin = () => {
        axios.post('https://capture-img-server.herokuapp.com/login', {
            user: email,
            pass: password
        }).then((response) => {
            alert(response.data);
            if(response.data === 'User can proceed!!!'){
                localStorage.setItem('usercap', email);
                window.location = 'http://localhost:3000/storage';
            }
            else{
                window.location = 'http://localhost:3000/err';
            }
        })
    }
    return(
        <div className="container">
            <br></br>
            <br></br>
            <br></br>
            <div className="row justify-content-center gap-5">
                <div className="col-10 col-sm-3 mr-auto">
                <Card className="shadow-lg p-3 mb-5 rounded" style={{width:"300px", height:"300px"}}>
                        <CardImg className="img-fluid" src={LoginVectorArt} style={{objectFit:"contain"}} />
                    </Card>
                </div>
                <div className="col-10 col-sm-8">
                    <Form className="shadow-lg p-3 mb-5 rounded">
                    <FormGroup>
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-10">
                                <h1>Share Drive</h1>
                                <h6>
                                    A platform which allows you to store your 
                                    memories captured in the frame, in a manner such that
                                    you can access it on anywhere irrespective of device you own.

                                </h6>
                            </div>
                        </div>
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>Email: </h3></Label>
                            </div>
                            <div className="col-10 col-sm-7">
                                <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>Password: </h3></Label>
                            </div>
                            <div className="col-10 col-sm-7">
                                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <br></br>               
                    <br></br>
                        <FormGroup>
                        <div className="row justify-content-center">
                            <div className="col-10 mb-2 col-sm-5">
                                <Button className="btn-bloc" onClick={handleLogin}>Login</Button>
                            </div>
                            <br></br>
                            <div className="col-10 col-sm-5">
                                <Button onClick={() => {
                                    window.location = 'http://localhost:3000/home'
                                }}>Sign Up</Button>
                            </div>
                        </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;