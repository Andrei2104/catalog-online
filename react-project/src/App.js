import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavHeader from './components/layout/NavHeader';
import LoginForm from './components/Login/LoginForm';
import Student from './components/Students/Student';
import Students from './components/Students/Students';

function App() {
  return <Fragment>
    <NavHeader />
    <Routes>
      <Route path='/' element={<Students />} />
      <Route path='/students/:student' element={<Student />} />
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  </Fragment>
}

export default App;
