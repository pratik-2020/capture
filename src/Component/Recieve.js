import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardImg, CardFooter, CardText, Button, CardHeader, Nav,  NavbarBrand, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
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
        },
        {
            id: 1,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            
            id: 2,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id: 3,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id: 4,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id: 5,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id: 6,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        },
        {
            id: 7,
            comment : "Comment",
            caption: "Awesome image",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdwallpaperim.com%2Fwp-content%2Fuploads%2F2017%2F08%2F25%2F461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background.jpg&f=1&nofb=1"
        }
    ]
    const [email, setEmail] = useState("");
    const [readmore, setReadMore] = useState(false);
    const [imgId, setImgId] = useState(-1);
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem('usercap');
        window.location = 'http://localhost:3000/login';
    }
    const retrieveusers = () => {
        let d = [];
        axios.get('https://capture-img-server.herokuapp.com/getusers').then((response) => {
            // console.log(response.data);
            response.data.map((e,key) => {
                // d.append(e.user);
                if(e.user !== localStorage.getItem('usercap')){
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
            response.data.map((e,key) => {
                // e.append(e.user);
                f.push(e);
            });
            setFriends(f);
        });
    }
    useEffect(() => {
        retrieveusers();
        console.log(users);
    }, []);
    useEffect(() => {
        retrievefrnds();
        console.log(friends);
    }, []);
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
                <BreadcrumbItem><a href="/storage">Storage</a></BreadcrumbItem>
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
                        {
                            friends.map((e,key) => {
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
                        {
                            users.map((e,key) => {
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