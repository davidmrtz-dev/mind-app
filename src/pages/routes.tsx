import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { IAuthContext, useAuthContext } from '../context/AuthContext';
import PrivateRoute from '../components/routes/PrivateRoute';
import Incomes from './incomes';
import Outcomes from './outcomes';
import Login from './login';
import About from './about';
import UsersPage from './users';
import Profile from './profile';

const GeneralRoute = (_props: RouteProps, auth: IAuthContext) => (
  <Route exact key='default' path='*'>
    {
      auth.isAuthenticated
        ? <Redirect to={auth.user?.user_type !== 'standard' ? '/users' : '/profile'} />
        : <Redirect to='/login' />
    }
  </Route>
);

const Router = (props: RouteProps) => {
  const auth = useAuthContext();

  return (<Switch>
    {auth.user?.user_type !== 'standard' ?
      <PrivateRoute exact key='users' path='/users' component={UsersPage} /> :
      <PrivateRoute exact key='profile' path='/profile' component={Profile} />
    }
    <PrivateRoute exact key='outcomes' path='/outcomes' component={Outcomes} />
    <PrivateRoute exact key='incomes' path='/incomes' component={Incomes} />
    <Route exact key='login' path='/login' component={Login} />
    <Route exact key='about' path='/about' component={About} />
    {GeneralRoute(props, auth)}
  </Switch>);
};

export default Router;