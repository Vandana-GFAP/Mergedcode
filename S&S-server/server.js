'use strict';

var axios = require('axios');
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const apiKeys = require("./index");

const { PROTOCOL, DNS_NAME, PORT, AUTH_KEY, DEVICE_ID, MOBILE } = JSON.parse(apiKeys);

// ----LOGGER SETUP----------
const winston = require('winston');

const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = {
    apiLog: winston.createLogger({
        transports: [
            new winston.transports.Console({
                format: myformat
            }),
            new (winston.transports.File)({ filename: 'app.log' })
        ]
    })
};

// ---------------

// // Add middleware to parse the POST data of the body
app.use(bodyParser.json({ limit: '9000mb', extended: true }));
app.use(bodyParser.urlencoded({
    limit: '9000mb',
    extended: true
}));
app.use(express.urlencoded());

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Request-Headers', 'authorization, content-type');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,access-control-request-headers,accept,access-control-request-method,origin,tokenid,authorization,x-requested-with');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.listen(8081);
logger.apiLog.info('Server running on port 8081..');

app.get('/', function (req, res) {
    res.send("Send and Spend Server is running");
});

function checkForStatus({ data }) {
    const { status } = data;
    switch (status) {
        case "00": return 200;
        case "01": return 500;
        default: return 500;
    }
}
/*
   -------------  Login API's --------------
*/

app.post('/getOTPForUser', function ({ body }, res) {
    logger.apiLog.info(`Request to get OTP for mobile -> ${JSON.stringify(body)} `);
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/sendOtp`, body, config)
        .then(data => {
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
    console.log(config);
});

app.post('/confirmOTPForUser', function ({ body }, res) {
    logger.apiLog.info(`Request to confirm OTP for mobile -> ${JSON.stringify(body)} `);
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/confirmOTP`, body, config)
        .then(data => {
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/loginWithMobileAndPassword', function ({ body }, res) {
    logger.apiLog.info(`Request to login for mobile -> ${JSON.stringify(body)} `);
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/checkAppPasswd`, body, config)
        .then(data => {
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

/*
   -------------  Util API's --------------
*/

app.post('/getMiniStatement', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get mini statement for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getMiniStatment`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data.data } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/updateEmailID', function ({ body, query }, res) {
    logger.apiLog.info(`Request to update customer emailID for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/updateCustomerEmailId`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/updateAppLanguage', function ({ body, query }, res) {
    logger.apiLog.info(`Request to update app language for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/updateAppLanguage`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/updateNotificationAllowed', function ({ body, query }, res) {
    logger.apiLog.info(`Request to update notification allowed for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/updateNotificationFlag`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/updateUserKYC', function ({ body, query }, res) {
    logger.apiLog.info(`Request to update user KYC for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/performUserKYC`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

/*
   -------------  User Data API's --------------
*/

app.post('/setUserPassword', function ({ body, query }, res) {
    logger.apiLog.info(`Request to set password for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/setuserPasswd`, body, config)
        .then(data => {
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/changeUserPassword', function ({ body, query }, res) {
    logger.apiLog.info(`Request to change user password for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/changePasswd`, body, config)
        .then(data => {
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/resetMPIN', function ({ body, query }, res) {
    logger.apiLog.info(`Request to set MPIN for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/setNewMpin`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/changeMPIN', function ({ body, query }, res) {
    logger.apiLog.info(`Request to update MPIN for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/changeMPIN`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCurrentUserDetails', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get user details for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getCardUserDetByMobile`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ ...data.data.data });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCardsList', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get cards list for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getAllcardListbyMobile`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send([...data.data.data.cardList]);
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCardsBalance', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get all cards balance for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getAllcardbalncebyMobile`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCardDetails', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get card details for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getCardDetbyCardNoMobile`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCardBalance', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get card balance for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/cardbalnceDetbyCardNoMobile`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/setCardHotlist', function ({ body, query }, res) {
    logger.apiLog.info(`Request to set card hotlist for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/cardHotlist`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ data: { ...data.data }, headers: { ...data.headers } });
        })
        .catch(err => res.status(500).send(err));
});

app.post('/getCardBalanceAndLimitDetails', function ({ body, query }, res) {
    logger.apiLog.info(`Request to get details for balance and limit details for mobile -> ${JSON.stringify(body)} `);
    const token = query.token;
    let config = {
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Authorization': AUTH_KEY,
            'mobile': parseInt(body.mobile),
            'deviceId': DEVICE_ID,
            'token': token
        }
    };
    axios.post(`${PROTOCOL}/${DNS_NAME}:${PORT}/SnsAdaptor/app/getCardBalLimitsDet`, body, config)
        .then(data => {
            console.log(data);
            res.status(checkForStatus({ data: { ...data.data } })).send({ ...data.data.data.cardLimitsModel });
        })
        .catch(err => res.status(500).send(err));
});

/*
   ------------- API's ends ---------------
*/