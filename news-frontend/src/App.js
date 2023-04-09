import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListBoardComponent from "./components/ListBoardComponent";
import CreateBoardComponent from './components/CreateBoardComponent';
import Title from './cards/SummernoteEditor';
import GroupComponent from "./components/GroupComponent";
import GroupmanaComponent from "./components/GroupmanaComponent";

function App() {
    return (
      <div>
        <Router>             
          <HeaderComponent/>
            <div className="container5">
            <div className="container1" >
              <Switch>       
                <Route path = "/" exact component = {ListBoardComponent}></Route>
                <Route path = "/board" component = {ListBoardComponent}></Route>
                <Route path="/create-board" component={CreateBoardComponent}></Route>
                <Route path="/group" component={GroupComponent}></Route>
                  <Route path="/groupmana" component={GroupmanaComponent}></Route>
                <Route path = "/Title" component = {Title}></Route>
              </Switch>
            </div>
            <div className="container2"><FooterComponent/></div>
            </div>
        </Router>
      </div>
    );
  }
  
  export default App;