Title: Login System
Summary:

Login Contains 2 Parameters like Phone Number and Password.

Phone Number we have stored with name 'mobile' and password with name 'password'.
onChange function checks the target value entry then using onLogin fields validate like mobile number is not empty, is only 10 digit number.
Password is not empty.

if there is no error then token gets stored locally in setItem and store in userData using dispatch of redux.
Then User can moved to Home Page.
If User Forgot password then it is necessary to enter mobile number in input field and then click to forgot password. if user without entering Mobile number in input field clicks forgot link, a error message will appear that "Please enter valid phone number" then only forgot password can be proceeded.

OnClick of forgot link,"setForgetPasswordModal" will become true and Modal of forgot Password which is in "components/modal/ResetPasswordModal" folder appear.
You enter OTP which is validated for only empty input then after confirming,
onSubmit function checks OTP length, if length is not empty and contains atleast 1 value, response closes OTP modal and opens "NewPasswordModal" using setNewPassword=true.

Resend OTP is also there for users not getting OTP previously. In ResetPasswordModal "resend" function API will be Integration for validating OTP with backend.

Reset Password which is in "components/modal/NewPasswordModal" containing 2 input fields of Enter New password and confirm Password will appear.
Fields is validated for not empty and should enter atleast 1 value only.
Then after successfully reset Password.
You can Integrate Api for update Password under onSubmit function.
/-----------------------------------------------------------------/

Title: Home Screen
Summary:

Once you logged in, all your data is stored in userData under "redux/reducers/setCurrentUserData Folder.
All necessary dummy Data is stored in dummyData file.
The components used in Home page are Header , Notification Card,Recent Activity, footer & modal under components Folder.
Here in useEffect card List Api Integration can be done.
In Header under "components/header" using onHome=true returns Header with profile button and notification icon which redirects to Notification Page.
onClick of profile button will call menu in Menu Page.
It contains, User Profile Image with Name displayed on top.
Then 5 menus are Profile, Setting, Refer and Earn, Help and last is Logout.
In Menu page, onClick of Profile Page located in "Pages/profile."

onClick of Setting Page located in "Pages/setting."

onClick of Refer and Earn Page located in "Pages/referEarn."

and under onClick of Logout API will integrate and push user to login page and the localStorage of userData gets cleared.

Next is Card Usage Balance which is coming from dummyData using redux.

Range Slider showing usage percentile contains initally 10000 max limit which after KYC verification changed to 100000.
These details are coming from redux stored in dummy data.

Below that is card component located in components/card.
In home page, from dummy data, cardDetails is imported containing all card details.
The type object will give card type like rupay, mastercard.
This type will be responsible for Rupay, mastercard Image in downward section of Card.

If there is no type mentioned the Card will show Rupay text as default. Reference is in components/card.
Card showing last 4 digits of A/C Number.
In Tap to view details text on Card, onClick function is placed.
Onclick of tap to view details, MpinModal located in "components/Modal/MpinModal". You can enter mpin of 4 digits alpha numeric digit. Right now we have validated field for empty only.

if you successfully Entered mPin You will see Card details like holder name, cvv, expiry.
If you forgot m-Pin, click on Reset m-pin, it will display Reset m-pin Modal.
You need to enter OTP.
In 'components/modal/MpinModal', under Onsubmit section you can integrate Api for verify of OTP.
if User reset M-pin, setResetNewPin=true, then user Enter New m-pin and confirmation of m_pin. Modal is located in 'components/modal/ResetMPinModal'.
After successfull Validation, under Onsubmit You can implement API.

This will update Mpin.


After that comes Icon Block. It contains 3 Icons of Add Money, freeze, set limit.

If you click on Freeze setFreezeCard=true. A confirmation Modal located in 'components/modal/FreezeModal' will appear. If Yes then using onConfirm function card will be temporarily blocked. Api Call should be implemented Onconfirm function. Api will respond freeze to true.

if Freeze then Icon Block gets replaced by Unfreeze and Hotlist.

Recent Activity components gets data from dummy data (from recentData).
You will implement Api in useEffect section for getting list from backend.


In bottom section, Bottom Navigation is placed getting icons from function tab in home index.
title, icon, onClick function is used in function. 
/----------------------------------------------------------------/

Title : Add Money
Summary:

Add Money contains Card section and Add Money section.

In useEffect you can Integrate Api for card details.

Below that user can select multiple options like Debit, credit, upi, netBanking options.
In dummyData, boxDebit object contains radio type selection title.
In Radiogroup using onChange function, state changes using setSelectedPaymentOption.

If User Select any radio type then using showNote, relative note is displayed.
Then using onclick function of proceed, process redirects as per Api.
In Proceed you can integrate Api for further progress.

/----------------------------------------------------------------/

Title : Edit Profile
Summary:

Edit profile, header onHome=false. This will show arrow with page title.

Under that User can select Image. Onchange of onFileUload event will select Image.

There are 5 input fields of Name, Email, location, Number and OVA Id.
The values of Email and location after change gets proceed to Onsave and stored in updateUserData. Api will be implemented in Onsave function.
after successfull Update user values will be updated. 

/----------------------------------------------------------------/

Title : KYC Profile
Summary:  

After Kyc details properly done. User status in dummy data updates to KYC Verified and  in dummy data, isKycVerified=true. 

/----------------------------------------------------------------/

Title : Set Limit
Summary:

Set limit is having Card section below that is set limit.

It is of two sections like Periodic and Channel.

Using setActiveTab state, activeTab of Periodic and channel data gets toggled.

Boxdata which is located in "components/boxdata", contains 
