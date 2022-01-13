import SignIn from './Component/SignIn';
import Storage from './Component/Storage';
import Shared from './Component/Shared';
import Recieve from './Component/Recieve';
import Login from './Component/Login';
import GroupChat from './Component/GroupChat';
import {Switch, Route, Redirect} from 'react-router-dom';
function App() {
  return (
    <Switch>
        <Route path="/home"  component={() => <SignIn />}/>
        <Route exact path="/shared" component={() => <Shared />} />
        <Route exact path="/recieved" component={() => <Recieve />} />
        <Route exact path="/grpcht" component={() => <GroupChat />} />
        <Route exact path="/storage" component={() => <Storage />} />
        <Route exact path="/login" component={() => <Login />} />
        <Redirect to="/login" />
    </Switch>
  );
}

export default App;
