import React from 'react';
import { useState, useEffect } from 'react';
import {Form, FormGroup, Label, Input, Button, Card, CardImg} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginVectorArt from './Assets/LoginVectorArt.jpg';
import axios, {Axios} from 'axios';
import { Redirect, Route, Link, useHistory } from 'react-router';
import firebase from 'firebase';
function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState("");
    const [user, setUser] = useState("");

    const handlesignin = () => {
        axios.post('https://capture-img-server.herokuapp.com/otpverification', {
            user: user,
            pass: password,
            state: state,
            email: email
        }).then((response) => {
            if(response === 'User already exist'){
                alert("User already exist");
            }
            else{
                alert(response);
                localStorage.setItem("usercap", user);
                localStorage.setItem("passcap",password);
                localStorage.setItem('fndcap', '');
                localStorage.setItem('grpcap', '');
                window.location = 'https://capture-img.herokuapp.com/shared';
                
            }
        })
    }
    return(
        <div className="container">
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row justify-content-center gap-5">
                <div className="col-10 col-sm-3">
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
                    <br></br>
                        <FormGroup className="mb-2">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>User : </h3></Label>
                            </div>
                            <div className="col-10 col-sm-8">
                                <Input placeholder="User" onChange={(e) => setUser(e.target.value)} />
                            </div>
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>Password : </h3></Label>
                            </div>
                            <div className="col-10 col-sm-8">
                                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>State: </h3></Label>
                            </div>
                            <div className="col-10 col-sm-8">
                                <Input placeholder="State" onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-3">
                                <Label><h3>Email: </h3></Label>
                            </div>
                            <div className="col-10 col-sm-8">
                                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-10">
                                <Button onClick={handlesignin}>Sign Up</Button>
                            </div>
                        </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;