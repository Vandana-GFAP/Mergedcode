import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
import SendMoneyCard from '../pages/payments/sendMoneyCard';
import SendMoneyAccount from '../pages/payments/sendMoneyAccount';

import Error from '../pages/error';


const Routes = () => {
  return (
    <>
      <Header />
      <Switch >
        <Route exact path='/' component={props=><Login{...props}/>} />
        <Route exact path='/home' component={props=><Home{...props}/>} />
        <Route exact path='/notification' component={props=><Notification{...props}/>} />
        <Route exact path='/profile' component={props=><Profile{...props}/>} />
        <Route exact path='/edit' component={props=><EditProfile{...props}/>} />
        <Route exact path='/setting' component={props=><Setting{...props}/>} />
        <Route exact path='/addmoney' component={props=><AddMoney{...props}/>} />
        <Route exact path='/setLimit' component={props=><SetLimit{...props}/>} />
        <Route exact path='/transactionDetail' component={props=><TransactionDetail{...props}/>} />
        <Route exact path='/referEarn' component={props=><ReferEarn{...props}/>} />
        <Route exact path='/transaction' component={props=><Transaction{...props}/>} />
        <Route exact path='/payments' component={props=><Payments{...props}/>} />
        <Route exact path='/requestVAccount' component={props=><RequestVAccount{...props}/>} />
        <Route exact path='/requestUPI' component={props=><RequestUPI{...props}/>} />
        <Route exact path='/sendMoneyCard' component={props=><SendMoneyCard{...props}/>} />
        <Route exact path='/sendMoneyAccount' component={props=><SendMoneyAccount{...props}/>} />
        <Route component={props=><Error{...props}/>} />
      </Switch>
      <Footer/>
    </>
  );
};

export default Routes;
