import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardImg, CardFooter, CardText, Button, CardHeader, Nav,  NavbarBrand, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, Input} from 'reactstrap';
import { FaShareAlt, FaHeart } from 'react-icons/fa';
import {useState, useEffect} from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
function Recieve(){
    var d = [
        {
            id: 0,
            comment : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            caption: "Awesome image",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
        }
    ]
    const [email, setEmail] = useState("");
    const [readmore, setReadMore] = useState(false);
    const [imgId, setImgId] = useState(-1);
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [searchfnd, setSearchFrnd] = useState("");
    const handleLogout = () => {
        localStorage.removeItem('usercap');
        window.location = 'https://capture-img.herokuapp.com/login';
    }
    const retrieveusers = () => {
        let d = [];
        axios.get('https://capture-img-server.herokuapp.com/getusers').then((response) => {
            // console.log(response.data);
            response.data.map((e,key) => {
                // d.append(e.user);
                if(e.user !== localStorage.getItem('usercap') && e.status !== 'Delete'){
                    d.push(e);
                }
            })
            setUsers(d);
        });
    }
    const retrievefrnds = () => {
        let f = []
        axios.post('https://capture-img-server.herokuapp.com/getfrnd', {
            user: localStorage.getItem('usercap')
        }).then((response) => {
            console.log(response.data);
            response.data.map((e,key) => {
                // e.append(e.user);
                f.push(e);
            });
            setFriends(f);
        });
    }
    useEffect(() => {
        retrieveusers();
        retrievefrnds();
        localStorage.setItem('fndcap', '');
        localStorage.setItem('grpcap', '');
    }, [friends, users]);
const linkName=readmore?'read less ':'read more '
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
        <div className="container">
            <br></br>
            <Breadcrumb>
                <BreadcrumbItem><a href="/shared">Shared</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/grpcht">Group Chat</a></BreadcrumbItem>
                <BreadcrumbItem active><a href="recieved">Friends</a></BreadcrumbItem>
                <BreadcrumbItem><Button className="btn btn-danger " onClick={handleLogout}>Logout</Button></BreadcrumbItem>
            </Breadcrumb>
            <br></br>
            <div className="row justify-content-center">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8">
                        <h1 className="align-self-center" style={{fontFamily:"cursive"}}>Received</h1>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='row justify-content-center'>
                <h3>Friends</h3>
                <div className='col-9'>
                    <ListGroup>
                        <ListGroupItem className='shadow p-3 mb-5 bg-white rounded'>
                            <Input placeholder='Search Friends' onChange={(e) => setSearchFrnd(e.target.value)} />
                        </ListGroupItem>
                        {
                            friends.filter((val) => {
                                if(searchfnd === ""){
                                    return val;
                                }
                                else if(val.name.toLowerCase().includes(val.name.toLowerCase())){
                                    return val;
                                }
                            }).map((e,key) => {
                                return(
                                    <ListGroupItem key={key} className='shadow p-3 mb-5 bg-white rounded'>
                                        <ListGroupItemHeading>{e.name}</ListGroupItemHeading>
                                        <ListGroupItem>{e.status==='pending'? <div><Button onClick={() => {
                                            axios.post('https://capture-img-server.herokuapp.com/respfrnd', {
                                                sender: localStorage.getItem('usercap'),
                                                reciever: e.name,
                                                resp: 'Confirm'
                                            }).then((response) => {
                                                alert(response.data);
                                            })
                                        }}>Confirm</Button><Button onClick={() => {
                                            axios.post('https://capture-img-server.herokuapp.com/respfrnd', {
                                                sender: localStorage.getItem('usercap'),
                                                reciever: e.name,
                                                resp: 'Delete'
                                            }).then((response) => {
                                                alert(response.data);
                                            })
                                        }}>Delete</Button></div>: <p>Friends</p>}</ListGroupItem>
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='row justify-content-center'>
                <h3>All Users</h3>
                <div className='col-9'>
                    <ListGroup>
                        <ListGroupItem className='shadow p-3 mb-5 bg-white rounded'>
                            <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        </ListGroupItem>
                        {
                            users.filter((val) => {
                                if(val.user.toLowerCase().includes(search.toLowerCase())){
                                    return val;
                                }
                                else if(search === ""){
                                    return val;
                                }
                            }).map((e,key) => {
                                return(
                                    <ListGroupItem key={key} className='shadow p-3 mb-5 bg-white rounded'>
                                        <ListGroupItemHeading>{e.user}</ListGroupItemHeading>
                                        <ListGroupItem><Button onClick={() => {
                                            axios.post('https://capture-img-server.herokuapp.com/sendfrndreq', {
                                                sender: localStorage.getItem('usercap'),
                                                reciever: e.user
                                            }).then((response) => {
                                                console.log(response.data);
                                            });
                                        }}>Add Friend</Button></ListGroupItem>
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Recieve;