import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListCustomer from './ListCustomer';
import AddCustomer from './AddCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListCustomer/>}></Route>
          <Route path='/add-customer' element={<AddCustomer/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
