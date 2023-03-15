import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { IAuthContext, useAuthContext } from '../context/AuthContext';
import PrivateRoute from '../components/routes/PrivateRoute';
import Incomes from './incomes';
import Outcomes from './outcomes';
import Login from './login';
import About from './about';
import UsersPage from './users';

const GeneralRoute = (_props: RouteProps, auth: IAuthContext) => (
  <Route exact key='default' path='*'>
    {
      auth.isAuthenticated
        ? <Redirect to='/users' />
        : <Redirect to='/login' />
    }
  </Route>
);

const Router = (props: RouteProps) => {
  const auth = useAuthContext();

  return (<Switch>
    <PrivateRoute exact key='users' path='/users' component={UsersPage} />
    <PrivateRoute exact key='outcomes' path='/outcomes' component={Outcomes} />
    <PrivateRoute exact key='incomes' path='/incomes' component={Incomes} />
    <Route exact key='login' path='/login' component={Login} />
    <Route exact key='about' path='/about' component={About} />
    {GeneralRoute(props, auth)}
  </Switch>);
};

export default Router;