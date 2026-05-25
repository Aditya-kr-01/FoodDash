import './App.css';
import { Routes, Route } from 'react-router-dom';

import AddFood from './component/admin/AddFood';
import FoodList from './component/admin/FoodList';
import DeleteFood from './component/admin/DeleteFood';
import UpdateFood from './component/admin/UpdateFood';
import SearchFood from './component/admin/SearchFood';
import Contact from './component/common/Contact';

import FoodListClient from './component/client/FoodListClient';
import SearchFoodClient from './component/client/SearchFoodClient';
import Billing from './component/client/Billing';
import DashboardClient from './component/client/DashboardClient';

import Register from './component/common/Register';
import Login from './component/common/Login';
import Home from './component/common/Home';
import Nav from './component/admin/Nav';

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div>

      {/* ❌ REMOVED GLOBAL HEADING */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nav' element={<Nav />} />
        <Route path='/navclient' element={<DashboardClient />} />

        <Route path='/addfood' element={<AddFood />} />
        <Route path='/foodlist' element={<FoodList />} />
        <Route path='/delfood' element={<DeleteFood />} />
        <Route path='/updfood' element={<UpdateFood />} />
        <Route path='/sfood' element={<SearchFood />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/foodlistclient' element={<FoodListClient />} />
        <Route path='/sfoodclient' element={<SearchFoodClient />} />
        <Route path='/billing' element={<Billing />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;