import userImage from './userImage.jpg';
export const userData = {
  name: 'Saksham Johri',
  email: 'saksham@gmail.com',
  phone: '1234567890',
  ova_id: '123456',
  username: 'saksham_johri',
  location: 'Delhi',
  profile_picture: 'https://www.webxcreation.com/event-recruitment/images/profile-1.jpg',
  isKycVerified: false,
  notification: true,
  language: 'en',
  ifsc:'1234',
  virtualId:'123123123'
};

export const cardDetails = [
  {
    cardNumber: 1234453285630562,
    cardHolder: 'Saksham Johri',
    expiryMonth: 9,
    expiryYear: 2026,
    cvv: 889,
    type: 'rupay',
    cardBalance: 780.52,
    maxLimit: 100000,
    utilizedLimit: 80000,
    isFreeze: false,
  },
  {
    cardNumber: 8439653826642547,
    cardHolder: 'Anoop',
    expiryMonth: 7,
    expiryYear: 2023,
    cvv: 664,
    type: 'rupay',
    cardBalance: 120.05,
    maxLimit: 10000,
    utilizedLimit: 3000,
    isFreeze: true,
  },
];

export const notifications = [
  {
    text:
      'Please Complete your KYC. Please clck here to complete it. Please Complete your KYC. Please clck here to complete it.',
    date: 1614334570507,
  },
  {
    text: 'Thanks for  registeration. We will update you always.',
    date: 1614334756505,
  },
  {
    text: 'Thanks for  registeration. We will update you always.',
    date: 1614334775203,
  },
];
export const boxDebit = [

  {
    label: 'Debit Card',
    value: 'debit',
    note:
      'A transaction fee of 1% will be charged with Debit Card. Try UPI for free',
  },
  {
    label: 'Credit Card',
    value: 'credit',
    note:
      'A transaction fee of 1% will be charged with Credit Card. Try UPI for free',
  },
  {
    label: 'Net Banking',
    value: 'net',
    note:
      'A transaction fee of 1% will be charged with Net Banking. Try UPI for free',
  },
  {
    label: 'UPI BHIM',
    value: 'upi',
    note:
      'A transaction fee of 1% will be charged with this mode. Try UPI for free',
  },
];

export const recentData = [
  {
    categoryimg: 'https://www.fintechfutures.com/files/2018/01/amazon-2.png',
    categorytitle: 'Amazon',
    categorysubtitle: 'Grocery',
    categoryamt: -20,
    date: 1614334570507,
    totaltransaction:'5',
  },
  {
    categoryimg: 'https://www.fintechfutures.com/files/2018/01/amazon-2.png',
    categorytitle: 'Amazon',
    categorysubtitle: 'Grocery',
    categoryamt: 20,
    date: Date.now(),
    totaltransaction:'5',
  },
  {
    categoryimg: 'https://www.fintechfutures.com/files/2018/01/amazon-2.png',
    categorytitle: 'Amazon',
    categorysubtitle: 'Grocery',
    categoryamt: -20,
    date: 1614334775203,
    totaltransaction:'5',
  },
  {
    categoryimg: 'https://www.fintechfutures.com/files/2018/01/amazon-2.png',
    categorytitle: 'Amazon',
    categorysubtitle: 'Grocery',
    categoryamt: -20,
    date: 1614334775203,
    totaltransaction:'5',
  },
  {
    categoryimg: 'https://www.fintechfutures.com/files/2018/01/amazon-2.png',
    categorytitle: 'Amazon',
    categorysubtitle: 'Grocery',
    categoryamt: -20,
    date: Date.now(),
    totaltransaction:'5',
  },
];
export const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Today'],
  datasets: [
    {
      label: 'Chart for sales',
      borderColor: '#29529F',
      backgroundColor: '#29529F',
      pointBorderColor: '#29529F',
      data: [5, 6, 7, 9, 8, 7, 9],
      pointBackgroundColor: '#29529F',
    }
  ]
}
