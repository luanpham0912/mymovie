
import './App.css'
import {createBrowserHistory} from "history"
import {Redirect, Route, Router} from "react-router-dom"
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';
import Home from './Pages/Home/Home';
import Contacts from './Pages/Contact/Contacts';
import News from './Pages/New/News';
import Detail from './Pages/Detail/Detail';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Login from './Pages/Login/Login';
import { UserTemplate } from './Templates/UserTemplate/UserTemplate';
import { CheckoutTemplate } from './Templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './Pages/Checkout/Checkout';
import Loading from './Components/Loading/Loading';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import {AdminTemplate} from './Templates/AdminTemplate/AdminTemplate';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminAddMovie from './Pages/AdminAddMovie/AdminAddMovie';
import AdminEditMovie from './Pages/AdminEditMovie/AdminEditMovie';
import AdminShowtime from './Pages/AdminShowtime/AdminShowtime';
import AdminUsers from './Pages/AdminUsers/AdminUsers';
import AdminUsersEdit from './Pages/AdminUsersEdit/AdminUsersEdit';
import AdminAddUser from './Pages/AdminAddUser/AdminAddUser';



export const history = createBrowserHistory();

 function App (){
  return (
    <Router  history={history}>
       <Loading/>
      <ScrollToTop >
      <HomeTemplate path='/home' exact Component={Home}/>
      <HomeTemplate path='/contact' exact Component={Contacts}/>
      <HomeTemplate path='/news' exact Component={News}/>
      <HomeTemplate path='/profile' exact Component={Profile}/>
      <UserTemplate path='/login' exact Component={Login}/>
      <UserTemplate path='/register' exact Component={Register}/>
      <HomeTemplate path='/Detail/:id' exact Component={Detail}/>
      <CheckoutTemplate path='/checkout/:id' exact Component={Checkout}/>
      <AdminTemplate path='/admin' exact Component={AdminDashboard}/>
      <AdminTemplate path='/users'  exact Component={AdminUsers}/>
      <AdminTemplate path='/users/adduser'  exact Component={AdminAddUser}/>

      <AdminTemplate path='/users/edit/:id' exact Component={AdminUsersEdit}/>
      <AdminTemplate path='/admin/addnew' exact Component={AdminAddMovie}/>
      <AdminTemplate path='/admin/edit/:id' exact Component={AdminEditMovie}/>
      <AdminTemplate path='/admin/showtimes/:id' exact Component={AdminShowtime}/>

      

      <HomeTemplate path='/' exact Component={Home}/>
      </ScrollToTop>
    </Router>
    
  );
}



export default App;