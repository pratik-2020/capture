import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavbarBrand, Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Label, Input, CardImg, CardText, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import  { useState, useEffect, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { BsFillArchiveFill } from "react-icons/bs";
import { FaShareAlt, FaHeart, FaSnapchat } from 'react-icons/fa';
import { scryRenderedComponentsWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { AiOutlineDownload, AiOutlineSend } from 'react-icons/ai';
import { Link } from 'react-router-dom';
function GroupChat() {
    const inmount = useRef(true);
    const [grp, setGrp] = useState("");
    const [img, setImg] = useState(null);
    const [caption, setCaption] = useState("");
    const [cht, setChat] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [pr, setPr] = useState("");
    const handleRetrievecht = () => {
        if(grp !== ""){
        axios.post("https://capture-img-server.herokuapp.com/retrievestorage", {
            user: grp
        }).then((response) => {
            setChat(response.data);
        })
    }
    }
    const handleUpload = () => {
        if(grp === ""){
            alert("Please Enter a valid group name or create one for yourself")
        }
        else{
            const form = new FormData();
            form.append('img', img);
            form.append('user', grp);
            form.append('caption',caption);
            axios({
                url: "https://capture-img-server.herokuapp.com/updimg",
                method: "POST",
                data: form
            }).then((response) => {
                setToggle(!toggle);
                alert(response.data+" the data shared is not permanently save it if needed!!!!");
                handleRetrievecht();
                // window.location = "https://capture-img.herokuapp.com/grpcht"
            })
        }
    }
    useEffect(() => {
        handleRetrievecht();
    }, [cht]);
    return (
        <div>
            <Nav className="bg-secondary">
                <div className="contianer ">
                    <div className = "row justify-content-center">
                        <div className="col-10 col-sm-6">
                            <br></br>
                        <NavbarBrand className="justify-content-center" style={{color:"white", fontFamily:"cursive"}}><h2>Capture</h2></NavbarBrand>
                        </div>
                    </div>
                </div>
            </Nav>
            <div className='container'>
                <br></br>
                <Breadcrumb>
                    <BreadcrumbItem><a href="/shared">Shared</a></BreadcrumbItem>
                    <BreadcrumbItem active><a href="/grpcht">Group Chat</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/recieved">Friends</a></BreadcrumbItem>
                    <BreadcrumbItem><Button className="btn btn-danger " onClick={() => {
                            localStorage.removeItem('usercap');
                            window.location = 'https://capture-img.herokuapp.com/login';
                    }} >Logout</Button></BreadcrumbItem>
                </Breadcrumb>
                <br></br>
                <div className='row justify-content-center'>
                    <div className='col-8'>
                        <Card className='shadow p-3 mb-5  rounded'>
                            <CardHeader>
                                <h4 className='h4'>Group Chat</h4>
                            </CardHeader>
                            <CardBody>
                                <div className='row'>
                                    <div className='col-10 col-md-4'>
                                        <Label><h4>Group name : </h4></Label>
                                    </div>
                                    <div className='col-10 col-md-7'>
                                        <Input type='text' placeholder='Group name' onChange={(e) => setGrp(e.target.value)} />
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                    <div className='col-8 col-md-4'>
                                        <Button id='join' onClick={() => {
                                            if(grp === ""){
                                                alert("Please enter a group name");
                                            }
                                            else{
                                                axios.post("https://capture-img-server.herokuapp.com/retrievestorage", {
                                                    user: localStorage.getItem('grpcap')
                                                }).then((response) => {
                                                    if(response.data.length !== 0 && grp !== ""){
                                                        let y = [];
                                                        console.log(response);
                                                        response.data.map((e,key) => {
                                                            y.push(e);
                                                        })
                                                        setChat(y);
                                                    }
                                                })
                                            }
                                            localStorage.setItem('grpcap', grp);
                                            setToggle(!toggle);
                                        }}>Join Group</Button>
                                    </div>
                                    <br></br>
                                    <div className='col-8 col-md-4'>
                                        <Button onClick={() => {
                                            axios.post("https://capture-img-server.herokuapp.com/crtgrp",{
                                                adm : localStorage.getItem('usercap')
                                            }).then((response) => {
                                                setGrp(response.data);
                                                alert("The name of group created is : "+response.data+" please join this group in order to share messages!!!");
                                            });
                                            localStorage.setItem('grpcap', grp);
                                        }}>Create Group</Button>
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col-10 col-md-4'>
                        <Card className='shadow p-3 mb-5  rounded'>
                            <CardHeader>
                                <div className='row'>
                                <div className='col-10 col-4'>
                                    <Label><h4>Select your file</h4></Label>
                                </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className='row'>
                                    <div className='col-10 col-md-7'>
                                        <Input type='file' onChange={(e) => setImg(e.target.files[0])} />
                                    </div>
                                </div>
                                <br></br>
                                <div className='row justify-content-center'>
                                    <div className='col-10 col-md-4'>
                                        <Label><h4>Caption</h4></Label>
                                    </div>
                                    <div className='col-10 col-md-7'>
                                        <Input type='text' placeholder='Caption' onChange={(e) => setCaption(e.target.value)} />
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                    <div className='col-8'>
                                        <Button onClick={handleUpload}>Upload image</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <Label><h3>Group name :  {grp}</h3></Label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-10 col-md-4'>
                        {
                            cht.map((e, key) => {
                                return(
                                    <Card key={key}  className='shadow p-3 mb-5  rounded'>
                                        <CardHeader>
                                            <CardImg src={'https://capture-img-server.herokuapp.com/uploads/'+e.filename} />
                                        </CardHeader>
                                        <CardBody>
                                            <CardText>
                                                <div className='row'>
                                                    <div className='col-10 col-md-4'>
                                                        <Label>Caption</Label>
                                                    </div>
                                                    <div className='col-10 col-md-7'>
                                                        <Label>{e.caption}</Label>
                                                    </div>
                                                </div>
                                                <br></br>
                                            </CardText>
                                            <CardFooter>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <BsFillArchiveFill onClick={()=> {
                                                    axios.post('https://capture-img-server.herokuapp.com/delete/img', {
                                                        imgid : e.imgid
                                                    }).then((response) => {
                                                        alert(response.data);
                                                        // window.location = "https://capture-img.herokuapp.com/grpcht"
                                                    }) //AiOutlineDownload Thanos121641980956400
                                                }}  />
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </CardBody>
                                    </Card>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupChat
