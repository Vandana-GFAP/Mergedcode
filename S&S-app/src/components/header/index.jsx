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
import { useDispatch, useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import { getLanguageText } from '../../language';
import useAppLanguage from "../../hooks/useAppLanguage";
import './style.css';

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
  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [onHome, setOnHome] = useState(false);
  const [title, setTitle] = useState('');
  const [showNone, setShowNone] = useState(false);

  const { currentUserDetails } = useSelector(state => ({
    currentUserDetails: state.userDataReducer.currentUserDetails
  }));

  const {
    profile_picture = "https://www.clipartmax.com/png/small/405-4050774_avatar-icon-flat-icon-shop-download-free-icons-for-avatar-icon-flat.png",
    fName
  } = currentUserDetails

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
        setTitle('notification');
        break;

      case '/addmoney':
        setShowNone(false);
        setOnHome(false);
        setTitle('addMoney');
        break;

      case '/setLimit':
        setShowNone(false);
        setOnHome(false);
        setTitle('setLimits');
        break;

      case '/menu':
        setShowNone(true);
        break;

      case '/profile':
        setShowNone(false);
        setOnHome(false);
        setTitle('profile');
        break;

      case '/edit':
        setShowNone(false);
        setOnHome(false);
        setTitle('editProfile');
        break;

      case '/setting':
        setShowNone(false);
        setOnHome(false);
        setTitle('settings');
        break;

      case '/transaction':
        setShowNone(false);
        setOnHome(false);
        setTitle('transaction');
        break;

      case '/transactionDetail':
        setShowNone(false);
        setOnHome(false);
        setTitle('transactionDetail');
        break;

      case '/referEarn':
        setShowNone(false);
        setOnHome(false);
        setTitle('referEarn');
        break;

      case '/payments':
        setShowNone(false);
        setOnHome(false);
        setTitle('payments');
        break;

      case '/requestVAccount':
        setShowNone(false);
        setOnHome(false);
        setTitle('requestVirtual');
        break;

      case '/requestUPI':
        setShowNone(false);
        setOnHome(false);
        setTitle('requestupI');
        break;
    }
  }, [props]);

  const [tabs, setTabs] = useState([
    {
      icon: profileIcon,
      title: 'profile',
      onClick: () => {
        history.push('profile');
      },
      visible: true,
    },
    {
      icon: setting,
      title: 'setting',
      onClick: () => {
        history.push('setting');
      },
      visible: true,
    },
    {
      icon: refer,
      title: 'referEarn',
      onClick: () => {
        history.push('referEarn');
      },
      visible: true,
    },
    {
      icon: help,
      title: 'help',
      onClick: () => { },
      visible: true,
    },
    {
      icon: logout,
      title: 'logout',
      onClick: () => {
        //TODO: API call to logout the session
        try {
          // dispatch(actions.setUserData({}));
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
  const [drawerState, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...drawerState, [anchor]: open });
  };
  const list = anchor => (
    <div
      className={clsx(classes.list, classes.fullList)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='menu_body'>
        <img src={profile_picture} className='menu_profile_img' />
        <p className='menu_username'>Hello
          {fName ? fName : ""}
        </p>
      </div>
      <List>
        {tabs.map((item, index) => {
          const { icon = '', title = '', onClick = () => { } } = item || {};
          return (
            <ListItem button key={index} onClick={onClick}>
              <div className='render-tab'>
                <img src={icon} />
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
                <img src={profile_picture} className='profile-image' />
              </div>

              <div>
                <Drawer
                  anchor={anchor}
                  open={drawerState[anchor]}
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
                    <p className='footer_txt'>To visit our website</p>
                    <a
                      className='footer_link'
                      target='_blank'
                      href='http://www.sendnspend.com'
                    >
                      Click Here
                    </a>
                  </div>
                </Drawer>
              </div>
              <div onClick={() => history.push('notification')}>
                <FaBell className='bell_icon' />
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className='header'>
          <div className='header_icon' onClick={() => history.goBack()}>
            <img src={backArrow} />
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
