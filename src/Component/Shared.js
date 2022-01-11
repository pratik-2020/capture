import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardImg, CardTitle, CardFooter, CardText, Button, CardHeader, Nav, Navbar, NavbarBrand, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
// import { FaShareAlt, FaHeart, FaShare } from 'react-icons/fa';
import {useState, useEffect} from 'react';
import {Link, Redirect} from  'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import FormData from 'form-data';
import { BsFillArchiveFill } from "react-icons/bs";
import { FaShareAlt, FaHeart, FaSnapchat } from 'react-icons/fa';
function Shared(props){
    var f = [
        {
            comment : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            caption: "Awesome image",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
        },
        {
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        }
    ]
    const [frnd, setFrnd] = useState([]);
    const [chat, setChat] = useState([]);
    const [fl, setFl] = useState(null);
    const [fnd, setFnd] = useState("");
    const retrievefrnd = () => {
        let d = [];
        axios.post('https://capture-img-server.herokuapp.com/getfrnd', {
            user: localStorage.getItem('usercap')
        }).then((response) => {
            response.data.map((e,key) => {
                d.push(e);
            })
            setFrnd(d);
        });
    }
    useEffect(() => {
        retrievefrnd();
        console.log(frnd);
    }, []);
    const [toggle, setToggle] = useState(false);
    const [fle, setFle] = useState("");
    const [cap, setCap] = useState("");
    return(
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
                    <BreadcrumbItem active><a href="/storage">Storage</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/recieved">Friends</a></BreadcrumbItem>
                    <BreadcrumbItem><Button className="btn btn-danger " onClick={() => {
                            localStorage.removeItem('usercap');
                            window.location = 'https://capture-img.herokuapp.com/login';
                    }} >Logout</Button></BreadcrumbItem>
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
                                                    let f = fle;
                                                    let g = cap;
                                                    axios.post('https://capture-img-server.herokuapp.com/shareimg', {
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
                <div className='row'>
                    <div className='col-10 col-md-3'>
                        <ListGroup>
                            <h2>Friends</h2>
                            {
                                frnd.map((e, key) => {
                                    return(
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading><Button style={{backgroundColor:'white', border:'0px', color:"black"}} onClick={() => {
                                                setFnd(e.name);
                                                console.log(fnd);
                                                axios.post('https://capture-img-server.herokuapp.com/retrieveshared', {
                                                    sender: localStorage.getItem('usercap'),
                                                    reciever: e.name
                                                }).then((response) => {
                                                    let g = [];
                                                    response.data.map((e, key) => {
                                                        g.push(e);
                                                    })
                                                    axios.post('https://capture-img-server.herokuapp.com/retrieveshared', {
                                                        sender: e.name,
                                                        reciever: localStorage.getItem('usercap')
                                                    }).then((rep) => {
                                                        rep.data.map((j, key) => {
                                                            g.push(j);
                                                        })
                                                        setChat(g);
                                                    })
                                                    axios.post('https://capture-img-server.herokuapp.com/msg/seen', {
                                                        reciever: localStorage.getItem('usercap'),
                                                        sender: e.name
                                                    }).then((response) => {
                                                        alert(response.data);
                                                    })
                                                    console.log(chat);
                                                })
                                            }}><strong>{e.name}</strong></Button></ListGroupItemHeading>
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                    </div>
                    <div className='col-md-8 d-none d-sm-block'>
                    <br></br>
                        <div className='contianer'>
                            <div className='row'>
                                <div className='col-10 col-md-4'>
                                    {
                                        chat.map((e,key) => {
                                            return(
                                                <Card key={key} style={{backgroundColor: `${ () => {
                                                    if(e.sender === localStorage.getItem('usercap')){
                                                        return 'green';
                                                    }
                                                    else{
                                                        return 'white';
                                                    }
                                                }}`, color: 'black' }}>
                                                    <CardHeader>
                                                        <CardImg src={'https://capture-img-server.herokuapp.com/uploads/'+e.img} />
                                                    </CardHeader>
                                                    <CardBody>
                                                        <h4 className='h4'>
                                                            {e.caption}
                                                        </h4>
                                                    </CardBody>
                                                    <CardFooter>
                                                        <div className = 'row justify-content-center'>
                                                            <div className='col-4'>
                                                            <FaShareAlt onClick={() => {
                                                                axios.post('https://capture-img-server.herokuapp.com/getfrnd', {
                                                                    user: localStorage.getItem('usercap')
                                                                }).then((response) => {
                                                                    let f = []
                                                                    response.data.map((g,key) => {
                                                                        f.push(g);
                                                                    });
                                                                    setFrnd(f);
                                                                });
                                                                setFle(e.img);
                                                                console.log(fle);
                                                                setToggle(!toggle);
                                                            }}  />
                                                            </div>
                                                            <div className='col-4'>
                                                                <BsFillArchiveFill onClick={() => {
                                                                    axios.post('https://capture-img-server.herokuapp.com/delete/cht', {
                                                                        chtid: e.chtid
                                                                    }).then((response) => {
                                                                        alert(response.data);
                                                                    });
                                                                }}  />
                                                            </div>
                                                            <div className='col-4' style={{marginRight:'0px'}}>
                                                            <h5>Seen : </h5>{e.seen}
                                                        </div>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shared;