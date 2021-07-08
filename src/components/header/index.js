import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  backArrow,
  help,
  logout,
  profileIcon,
  refer,
  setting,
} from '../../assets/images';
import { useSelector } from 'react-redux';
import './style.css';
import { FaBell } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import { getLanguageText } from '../../language';

const useStyles = makeStyles({
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },
});

const Header = props => {
  const { history, location: { pathname = '/' } = {} } = props;
  const [onHome, setOnHome] = useState(false);
  const [title, setTitle] = useState('');
  const [showNone, setShowNone] = useState(false);

  const UserData = useSelector(state => state.UserData) || {};
  const { language } = UserData || {};

  useEffect(() => {
    switch (pathname) {
      case '/':
        setShowNone(true);
        break;

      case '/home':
        setShowNone(false);
        setOnHome(true);
        break;

      case '/notification':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'notification' }));
        break;

      case '/addmoney':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'addMoney' }));
        break;

      case '/setLimit':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'setLimits' }));
        break;

      case '/menu':
        setShowNone(true);
        break;

      case '/profile':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'profile' }));
        break;

      case '/edit':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'editProfile' }));
        break;

      case '/setting':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'settings' }));
        break;

      case '/transaction':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'transaction' }));
        break;

      case '/transactionDetail':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'transactionDetail' }));
        break;

      case '/referEarn':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'referEarn' }));
        break;

      case '/payments':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'payments' }));
        break;

      case '/requestVAccount':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'requestVirtual' }));
        break;

      case '/requestUPI':
        setShowNone(false);
        setOnHome(false);
        setTitle(getLanguageText({ language, key: 'requestUpi' }));
        break;
        
        case '/sendMoneyCard':
          setShowNone(false);
          setOnHome(false);
          setTitle(getLanguageText({ language, key: 'sendMoneyCard' }));
          break;

          case '/sendMoneyAccount':
          setShowNone(false);
          setOnHome(false);
          setTitle(getLanguageText({ language, key: 'sendMoneyAccount' }));
          break;
    }
  }, [props]);

  const [tabs, setTabs] = useState([
    {
      icon: profileIcon,
      title: getLanguageText({ language, key: 'profile' }),
      onClick: () => {
        history.push('profile');
      },
      visible: true,
    },
    {
      icon: setting,
      title: getLanguageText({ language, key: 'settings' }),
      onClick: () => {
        history.push('setting');
      },
      visible: true,
    },
    {
      icon: refer,
      title: getLanguageText({ language, key: 'referEarn' }),
      onClick: () => {
        history.push('referEarn');
      },
      visible: true,
    },
    {
      icon: help,
      title: getLanguageText({ language, key: 'help' }),
      onClick: () => {},
      visible: true,
    },
    {
      icon: logout,
      title: getLanguageText({ language, key: 'logout' }),
      onClick: () => {
        //TODO: API call to logout the session
        try {
          store.dispatch(actions.setUserData({}));
          localStorage.clear();
          history.push('/');
        } catch (err) {
          console.log('<<< Error in Logged out>>>\n', err);
        }
      },
      visible: true,
    },
  ]);

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const { profile_picture = null, name = '' } = UserData || {};

  const list = anchor => (
    <div
      className={clsx(classes.list, classes.fullList)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='menu_body'>
        <img src={profile_picture} alt="Profile Image" className='menu_profile_img' />
        <p className='menu_username'>Hello {name?.split(' ')[0]}</p>
      </div>
      <List>
        {tabs.map((item, index) => {
          const { icon = '', title = '', onClick = () => {} } = item || {};
          return (
            <ListItem button key={index} onClick={onClick}>
              <div className='render-tab'>
                <img src={icon} alt="Menu Item Image"/>
                <p>{getLanguageText({ language, key: title })}</p>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return !showNone ? (
    <>
      {onHome ? (
        <div className='home-header' style={{ maxHeight: '100vh' }}>
          {['left'].map(anchor => (
            <React.Fragment key={anchor}>
              <div onClick={toggleDrawer(anchor, true)}>
                <img src={profile_picture} alt="Profile Image Button" className='profile-image' />
              </div>

              <div>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}

                  <div
                    className='footer_menu with-text'
                    style={{ marginTop: 'auto' }}
                    onClick={() => {
                      //TODO: redirect to the website...
                      try {
                        console.log('<<< Redirecting to website >>>');
                        history.goBack();
                      } catch (err) {
                        console.log(
                          '<<< Error in redirecting to website >>>\n',
                          err
                        );
                      }
                    }}
                  >
                    <p className='footer_txt'>{getLanguageText({ language, key: 'visitURL' })}</p>
                    <a
                      className='footer_link'
                      target='_blank'
                      href='http://www.sendnspend.com'
                    >
                      {getLanguageText({ language, key: 'clickHere' })}
                    </a>
                  </div>
                </Drawer>
              </div>
              <div onClick={() => history.push('notification')}>
                <FaBell className='bell_icon'></FaBell>
                  <span className="num"></span>
                  
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className='header'>
          <div className='header_icon' onClick={() => history.goBack()}>
            <img src={backArrow} alt="Back Arrow" />
          </div>
          {title ? (
            <div className='header_title'>
              <p className='title'>
                {getLanguageText({ language, key: title })}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </>
  ) : null;
};

export default withRouter(Header);
