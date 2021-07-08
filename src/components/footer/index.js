import React, { useState, useEffect } from "react";
import "./style.css";
import { withRouter } from "react-router-dom";
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';

const Footer = (props) => {
  const { location: { pathname = "/" } = {} } = props;
  const [showFooterLineNone, setShowFooterLineNone] = useState(false);
  const [onFooterLineWithWebsite, setOnFooterLineWithWebsite] = useState(false);
  const [showFooterNone, setShowFooterNone] = useState(false);
  const UserData = useSelector(state => state.UserData) || {};
  const { language } = UserData || {};
  useEffect(() => {
    switch (pathname) {
      case "/":
        setShowFooterLineNone(false);
        setShowFooterNone(true);
        break;

      case "/home":
        setShowFooterLineNone(false);
        setShowFooterNone(true);
        break;

      case "/notification":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/addmoney":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/setLimit":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/profile":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/edit":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/setting":
        setShowFooterLineNone(false);
        setOnFooterLineWithWebsite(true);
        setShowFooterNone(false);
        break;

      case "/transaction":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/transactionDetail":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/referEarn":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/payments":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

        case "/requestVAccount":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/requestUPI":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;
    }
  }, [props]);

  return !showFooterNone ? (
    <>
      {showFooterLineNone ? <div className="footer line" /> : null}

      {onFooterLineWithWebsite ? (
        <div
          className="footer with-text"
          onClick={() => {
            //TODO: redirect to the website...
            try {
              console.log("<<< Redirecting to website >>>");
            } catch (err) {
              console.log("<<< Error in redirecting to website >>>\n", err);
            }
          }}
        >
          <p className="footer_txt">{getLanguageText({ language, key: 'visitURL' })}</p>
          <a
            target="_blank"
            href="http://www.sendnspend.com"
            className="footer_link"
          >
           {getLanguageText({ language, key: 'clickHere' })}
          </a>
        </div>
      ) : null}
    </>
  ) : null;
};

export default withRouter(Footer);
