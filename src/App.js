import logo from './logo.svg';
import './App.css';
import HeaderPage from './components/HeaderPage';
import { Route, Switch } from 'react-router-dom';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import InsertPage from './components/InsertPage';
import MyPage from './components/MyPage';
import HomePage from './components/HomePage';

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user,setUser}}>
            <div className="App">
            <HeaderPage/>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/users" component={UserPage} exact={true}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/users/insert" component={InsertPage}/>
                <Route path="/mypage" component={MyPage}/>
            </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;
