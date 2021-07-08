import React, { useState, useEffect } from "react";
import "./style.css";
import { withRouter } from "react-router-dom";
import { getLanguageText } from '../../language';
import useAppLanguage from "../../hooks/useAppLanguage";

const Footer = (props) => {
  const { location: { pathname = "/" } = {} } = props;
  const [showFooterLineNone, setShowFooterLineNone] = useState(false);
  const [onFooterLineWithWebsite, setOnFooterLineWithWebsite] = useState(false);
  const [showFooterNone, setShowFooterNone] = useState(false);
  const [language] = useAppLanguage();
  useEffect(() => {
    switch (pathname) {
      case "/":
      case "/home":
        setShowFooterLineNone(false);
        setShowFooterNone(true);
        break;

      case "/notification":
      case "/addmoney":
      case "/setLimit":
      case "/profile":
      case "/edit":
      case "/transaction":
      case "/transactionDetail":
      case "/referEarn":
      case "/payments":
        setShowFooterLineNone(true);
        setOnFooterLineWithWebsite(false);
        setShowFooterNone(false);
        break;

      case "/setting":
        setShowFooterLineNone(false);
        setOnFooterLineWithWebsite(true);
        setShowFooterNone(false);
        break;
      default: {
        setShowFooterLineNone(false);
      }
    }
  }, [pathname]);

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
            rel="noreferrer"
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