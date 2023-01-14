import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavHeader from './components/layout/NavHeader';
import LoginForm from './components/Login/LoginForm';
import Student from './components/Students/Student';
import Students from './components/Students/Students';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return <Fragment>
    {authCtx.isLoggedIn && <NavHeader />}
    <Routes>
      {authCtx.isLoggedIn && <Route path='/' element={<Students />} />}
      {authCtx.isLoggedIn && <Route path='/students/:student' element={<Student />} />}
      {!authCtx.isLoggedIn && <Route path='/login' element={<LoginForm />} />}
      <Route path='*' element={
        authCtx.isLoggedIn ?
          <Students /> : <LoginForm />
      }></Route>
    </Routes>
  </Fragment>
}

export default App;
