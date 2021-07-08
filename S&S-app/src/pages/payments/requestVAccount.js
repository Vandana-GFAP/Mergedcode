// import React, { useState, useEffect } from "react";
// import Carousel from "react-elastic-carousel";
// import ProgressCard from "../../components/progressCard";
// import { paymentBanner } from "../../assets/images";
// import { cardDetails, userData } from "../../dummyData";
// import store from "../../redux/store";
// import * as actions from "../../redux/actions";
// import { useSelector } from "react-redux";
// import MainButton from '../../components/mainButton';

// const RequestVAccount = (props) => {
//   const { history = {} } = props || {};
//   const {
//     virtualId,ifsc
//   }=Userdata || {}
//   const [selectedCard, setSelectedCard] = useState({});
//   const [cardList, setCardList] = useState([]);
//   useEffect(() => {
//     setCardList(cardDetails);
//   }, []);
//   const UserData = useSelector((state) => state.UserData) || {};
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       history.push("/");
//     } else if (Object.keys(UserData).length <= 0) {
//       //TODO: API call to get user data...
//       try {
//         store.dispatch(actions.setUserData({ ...userData }));
//       } catch (err) {
//         console.log("<<< Error in fetching user data >>>\n", err);
//       }
//     }
//   }, []);
//   useEffect(()=>{
//     const {virtualId,ifsc}=UserData;
//   },[UserData])
//   const [virtualIds,setVirtualId]=useState(virtualId);
//   const [ifscCode,setIFSCCode]=useState(ifsc)
//   const formData=[
//     {
//       id:'v_id',
//       label:'Virtual Id',
//       value:v_id,
//       onChange:setVirtualId
//     },
//     {
//       id:'ifsc',
//       label:'IFSC Code',
//       value:ifsc,
//       onChange:setIFSC
//     }
//   ]
//   const renderForm=()=>{
//     return(
//       <div>

//       </div>
//     )
//   }
//   return (
//     <div
//       style={{
//         // height: window.innerHeight,
//         height: "92vh",
//       }}
//     >
//       <div className="requester-body">
//         <Carousel
//           preventDefaultTouchmoveEvent={true}
//           enableMouseSwipe={true}
//           enableSwipe={true}
//           showArrows={false}
//           initialFirstItem={0}
//           onChange={({ item, index }) => {
//             const { cardDetails = {} } = item || {};
//             setSelectedCard(cardDetails);
//           }}
//         >
//           {cardList?.map((item, index) => {
//             return <ProgressCard key={index} cardDetails={item} />;
//           })}
//         </Carousel>
//         <div className="requester_box">
//           <p className="requester_title">Request Via Virtual Account</p>
//           <p className="requester_subtitle">
//             Recieve money into card XXXX XXXX XXXX 1234
//           </p>
//          <div>

//          </div>
//          <div style={{ padding: '1rem 1.875rem' }}>
//         <MainButton label='Save' onClick={() => onSave()} />
//       </div>
//           <div className="paymentImage">
//             <img src={paymentBanner} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestVAccount;
