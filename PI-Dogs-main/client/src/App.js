import './App.css';
import {BrowserRouter, Route ,Switch} from "react-router-dom"
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import Detail from './componentes/Detail';
import DogCreated from './componentes/DogCreated';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/" component ={LandingPage}/>
        <Route exact path ="/home" component ={Home}/>
        <Route path = "/home/:id" component ={Detail}/>
        <Route exact path ="/dog" component = {DogCreated}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
