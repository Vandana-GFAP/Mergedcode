import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAppLanguage = () => {
    const { currentUserDetails } = useSelector(state => ({
        currentUserDetails: state.userDataReducer.currentUserDetails,
    }));

    const [language, setLanguage] = useState("en");
    const [isNotificationAllowed, setIsNotificationAllowed] = useState(false);

    useEffect(() => {
        const userLanguage = currentUserDetails?.languageId || 1;
        const appNotification = currentUserDetails?.isNotificationAllowd || 0;
        console.log("useAppLanguage", userLanguage, appNotification, currentUserDetails);
        switch (userLanguage) {
            case 2: {
                setLanguage("hi");
                break;
            }
            default: {
                setLanguage("en");
            }
        }
        switch (appNotification) {
            case 1: {
                setIsNotificationAllowed(true);
                break;
            }
            default: {
                setIsNotificationAllowed(false);
            }
        }
    }, [currentUserDetails]);

    return [language, isNotificationAllowed];

}
export default useAppLanguage;