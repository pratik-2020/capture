import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardImg, CardTitle,Label, CardFooter, CardText, Button, CardHeader, Nav, Navbar, NavbarBrand, Breadcrumb, BreadcrumbItem, Form , FormGroup, Input, Progress, Modal, ModalBody, ModalHeader, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import { FaShareAlt, FaHeart, FaSnapchat } from 'react-icons/fa';
import {useEffect, useState} from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { BsFillArchiveFill } from "react-icons/bs";
import FormData from 'form-data';
function Storage(props){
    const [email, setEmail] = useState("");
    var d = [
        {
            id:1,
            caption: "Awesome image",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
        },
        {
            id:2,
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id:3,
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        }
    ]
    const [imgColl, setImgColl] = useState([]);
    const[toggle, setToggle] = useState(false); 
    const handleLogout = () => {
        localStorage.removeItem('usercap');
        window.location = 'http://localhost:3000/login';
    }
    const [caption, setCaption] = useState("");
    const [img, setImg] = useState(null);
    const[imgUrl, SetUrl] = useState("");

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImg(e.target.files[0]);
        }
    }
    const [progress, setProgress] = useState(0);
    const [fl, setFl] = useState("");
    const handleUpload = () => {
        const form = new FormData();
        form.append('img', img);
        form.append('user', localStorage.getItem('usercap'));
        form.append('caption',caption);
        const user = localStorage.getItem("usercap");
        axios({
            url: "http://localhost:3001/updimg",
            method: "POST",
            data: form
        }).then((response) => {
            alert(response.data);
        })
    }
    const [cap, setCap] = useState("");
    const handleretrieve = () => {
        axios.post('http://localhost:3001/retrievestorage', {
            user: localStorage.getItem('usercap')
        }).then((response) => {
            setImgColl(response.data);
        })
    }
    const [frnd, setFrnd] = useState([]);
    useEffect(() => {
        handleretrieve();
    }, [imgColl, fl]);
    return(
            <div>
                <Nav className="bg-secondary">
                    <NavbarBrand className="justify-content-center" style={{color:"white", fontFamily:"cursive"}}><h2>Capture</h2></NavbarBrand>
                </Nav>
            <div className="container">
                <br></br>
                <Breadcrumb>
                    <BreadcrumbItem><a href="/shared">Shared</a></BreadcrumbItem>
                    <BreadcrumbItem active><a href="/storage">Storage</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/recieved">Friends</a></BreadcrumbItem>
                    <BreadcrumbItem><Button className="btn btn-danger " onClick={handleLogout}>Logout</Button></BreadcrumbItem>
                </Breadcrumb>
                <br></br>
                <Modal isOpen={toggle}>
                    <ModalHeader>
                        <h3>Share the file</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Label><h5>Caption</h5></Label>
                        <Input type='text' onChange={(e) => setCap(e.target.value)} />
                        <br></br>
                        <ListGroup>
                            {
                                frnd.map((e,key) => {
                                    return(
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading>
                                                <Button onClick={() => {
                                                    console.log(fl);
                                                    let f = fl;
                                                    let g = cap;
                                                    axios.post('http://localhost:3001/shareimg', {
                                                        sender: localStorage.getItem('usercap'),
                                                        reciever: e.name,
                                                        caption: g,
                                                        fnm: f
                                                    }).then((response) => {
                                                        alert(response.data);
                                                        if(response.data === 'Image shared successfully!!!'){
                                                            setToggle(!toggle);
                                                        }
                                                    })
                                                }
                                                } style={{background:'white', color:'black', border:'0px'}}>{e.name}</Button>
                                            </ListGroupItemHeading>
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setToggle(!toggle)}>Close</Button>
                    </ModalFooter>
                </Modal>
                <div className="row justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-10 col-sm-8">
                            <h1 className="align-self-center" style={{fontFamily:"cursive"}}>Storage</h1>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-9">
                        <Form className="shadow p-3 mb-5  rounded">
                            <FormGroup>
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-4">
                                        <Label className="h4">Caption : </Label>
                                    </div>
                                    <div className="col-10 col-sm-7">
                                        <Input placeholder="Caption" onChange={(e) => setCaption(e.target.value)} />
                                    </div>
                                </div>
                            </FormGroup>
                            <br></br>
                            <FormGroup>
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-4">
                                        <Label className="h4">Upload File : </Label>
                                    </div>
                                    <div className="col-10 col-sm-7">
                                        <Input className="btn btn-rounded" type="file" onChange={(e) => setImg(e.target.files[0])} />
                                    </div>
                                </div>
                            </FormGroup>
                            <br></br>
                            <FormGroup>
                                <div className="row justify-content-center">
                                    <div className="col-10">
                                        <Progress value={progress} />
                                    </div>
                                </div>
                            </FormGroup>
                            <br></br>
                            <FormGroup>
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-5">
                                        <Button onClick={handleUpload}>Upload</Button>
                                    </div>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <br></br>
                <div className="row justify-content-center">
                    {
                        imgColl.map((e,key) => {
                            return(
                                <div key={key} className="col-10 col-sm-4">
                                    <Card className="shadow p-3 mb-5  rounded">
                                        <CardHeader>
                                        <CardImg src={'http://localhost:3001/uploads/'+e.filename} />
                                        </CardHeader>
                                        <CardBody>
                                        <CardText className="h5">{e.caption}</CardText>
                                        <CardFooter>
                                            <div className="row">
                                                <div className="col-2 col-sm-2">
                                                <i><FaShareAlt onClick={() => {
                                                    axios.post('http://localhost:3001/getfrnd', {
                                                        user: localStorage.getItem('usercap')
                                                    }).then((response) => {
                                                        let f = []
                                                        response.data.map((g,key) => {
                                                            f.push(g);
                                                        });
                                                        setFrnd(f);
                                                    });
                                                    setFl(e.filename);
                                                    console.log(fl);
                                                    setToggle(!toggle);
                                                }}  /></i>
                                                </div>
                                                <div className="col-2 col-sm-2">
                                                <BsFillArchiveFill onClick={()=> {
                                                    axios.post('http://localhost:3001/delete/img', {
                                                        imgid : e.imgid
                                                    }).then((response) => {
                                                        alert(response.data);
                                                    })
                                                }}  />
                                                </div>
                                                <div className="col-8 col-sm-8"></div>
                                            </div>
                                        </CardFooter>
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        })
                    }       
                </div>
            </div>
            </div>
    );
}

export default Storage;