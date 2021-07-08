import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLocalStorageItemValue } from '../redux/actions';

const useUserMobileNumber = () => {
    const { userMobileNumber } = useSelector(state => ({
        userMobileNumber: state.utilReducer.userMobileNumber
    }));

    const [mobileNumber, setMobileNumber] = useState();

    useEffect(() => {
        const mobileNo = getLocalStorageItemValue({ itemName: 'mobile' }) || userMobileNumber;
        setMobileNumber(mobileNo);
    });

    return [mobileNumber || ""];
}
export default useUserMobileNumber;