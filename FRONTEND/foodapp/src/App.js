import './App.css';
import AddFood from './component/AddFood';
import FoodList from './component/FoodList';
import DeleteFood from './component/DeleteFood';
import UpdateFood from './component/UpdateFood';
import SearchFood from './component/SearchFood';
import Contact from './component/Contact';  
import "bootstrap/dist/css/bootstrap.css";
import { Routes,Route } from 'react-router-dom';
import NavClient from './component/NavClient';
import FoodListClient from './component/FoodListClient';
import SearchFoodClient from './component/SearchFoodClient';
import Billing from './component/Billing';  
import Register from './component/Register';
import Login  from './component/Login';
import Home from './component/Home';
import Nav from './component/Nav';

function App() {
  return (
    <div className="App">
      <h2>FOOD APP</h2>
      <br />

      <Routes>
        {/* Home Route */}
        <Route path='/' element={<Home/>}/>
        <Route path='/nav' element={<Nav/>}/>
        <Route path='/navclient' element={<NavClient/>}/>

        <Route path='/addfood' element={<AddFood/>}/>
        <Route path='/foodlist' element={<FoodList/>}/>
        <Route path='/delfood' element={<DeleteFood/>}/>
        <Route path='/updfood' element={<UpdateFood/>}/>
        <Route path='/sfood' element={<SearchFood/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/navclient' element={<NavClient/>}/>
        <Route path='/foodlistclient' element={<FoodListClient/>}/>
        <Route path='/sfoodclient' element={<SearchFoodClient/>}/>
       
        <Route path='/billing' element={<Billing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
