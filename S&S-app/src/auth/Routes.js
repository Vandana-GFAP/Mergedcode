import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import Login from '../pages/login';
import Home from '../pages/home';
import Notification from '../pages/notification';
import Profile from '../pages/profile';
import Setting from '../pages/setting';
import EditProfile from '../pages/editProfile';
import AddMoney from '../pages/addmoney';
import SetLimit from '../pages/setLimit';
import TransactionDetail from '../pages/transaction/transactionDetail';
import ReferEarn from '../pages/referEarn';
import Transaction from '../pages/transaction';
import Payments from '../pages/payments';
import RequestUPI from '../pages/payments/requestUPI';
import RequestVAccount from '../pages/payments/requestVAccount';
import useUserMobileNumber from '../hooks/useUserMobileNumber';
import { getCurrentUserDetails } from '../redux/actions/userData.action';
import { useDispatch } from 'react-redux';
import useCheckTokensNotExists from '../hooks/useCheckTokensNotExists';

const Routes = ({ history }) => {
  const dispatch = useDispatch();
  const [mobileNumber] = useUserMobileNumber();
  const [tokenNotExist] = useCheckTokensNotExists();

  useEffect(() => {
    if (tokenNotExist)
      history.push('/');
  }, [tokenNotExist, history]);


  useEffect(() => {
    if (mobileNumber)
      dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }))
        .catch(err => console.log(err));
  }, [dispatch, mobileNumber]);

  return (
    <>
      <Header />
      <Switch >
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/notification' component={Notification} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/edit' component={EditProfile} />
        <Route exact path='/setting' component={Setting} />
        <Route exact path='/addmoney' component={AddMoney} />
        <Route exact path='/setLimit' component={SetLimit} />
        <Route exact path='/transactionDetail' component={TransactionDetail} />
        <Route exact path='/referEarn' component={ReferEarn} />
        <Route exact path='/transaction' component={Transaction} />
        <Route exact path='/payments' component={Payments} />
        <Route exact path='/requestVAccount' component={RequestVAccount} />
        <Route exact path='/requestUPI' component={RequestUPI} />
      </Switch>
      <Footer />
    </>
  );
};

export default withRouter(Routes);
