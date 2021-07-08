import { useEffect, useState } from 'react';
import { getLocalStorageItemValue } from '../redux/actions';

const useCheckTokensNotExists = () => {

    const [tokenNotExist, setNotTokenExist] = useState(false);

    useEffect(() => {
        if (!getLocalStorageItemValue({ itemName: 'token' }) || !getLocalStorageItemValue({ itemName: 'mobile' }))
            setNotTokenExist(true);
        else
            setNotTokenExist(false);
    });

    return [tokenNotExist];
}
export default useCheckTokensNotExists;