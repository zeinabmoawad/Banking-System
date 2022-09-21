import './App.css';
import Home from './Home.jsx';
import VeiwAllCustomers from './VeiwAllCustomers';
import SelectAndView from './SelectAndView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/AllCustomers/*' element={<VeiwAllCustomers></VeiwAllCustomers>}></Route>
                {/* <Route path='/AllCustomers/SelectAndView/*' element={<SelectAndView/>}></Route> */}
                <Route path='/SelectAndView/*' element={<SelectAndView></SelectAndView>}></Route>
            </Routes>
            </Router>
    </div>
  );
}

export default App;
