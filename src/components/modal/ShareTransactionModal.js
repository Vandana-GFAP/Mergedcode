import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { whatsapp, mail, sms } from '../../assets/images';
import './style.css';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';
const ShareTransactionModal = props => {
    const { modalToggle, setModalToggle } = props;
    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    const categoryIcon = [
        {
            title: getLanguageText({ language, key: 'whatsapp' }),
            hrefLink: 'https://wa.me/917898000000?text=Here%20is%20your%20link',
            icon: whatsapp,
            linkAction: 'share/whatsapp/share',
        },
        {
            title: getLanguageText({ language, key: 'mail' }),
            hrefLink:
                'mailto:abc@gmail.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email',
            icon: mail,
        },
        {
            title: getLanguageText({ language, key: 'sms' }),
            hrefLink: 'sms:+917898000000;?&body=Hello%20World',
            icon: sms,
        },
    ];

    const modalToggleFunc = () => {
        setModalToggle(!modalToggle);
    };

    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //   // true for mobile device
    //   document.write("mobile device");
    // }else{
    //   // false for not mobile device
    //   document.write("not mobile device");
    // }

    return (
        <>
            <Modal
                isOpen={modalToggle}
                centered={true}
                toggle={modalToggleFunc}
                contentClassName='customStyle'
            >
                <ModalBody>
                    <div className='d-flex flex-wrap justify-content-around align-items-center'>
                        {categoryIcon?.map((item, index) => {
                            const { title, icon, hrefLink, linkAction } = item;
                            return (
                                <div
                                    key={index}
                                    className='d-flex text-center flex-column justify-content-around align-items-center'
                                    onClick={() => setModalToggle(false)}
                                >
                                    <a
                                        href={hrefLink}
                                        data-action={linkAction}
                                        rel='noreferrer'
                                        target='_blank'
                                    >
                                        <img
                                            src={icon}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                            }}
                                            alt='Share Icon'
                                        />
                                        <p
                                            style={{
                                                fontSize: '15px',
                                                color: '#3677A3',
                                                padding: '5px 0',
                                            }}
                                        >
                                            {title}
                                        </p>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};
export default ShareTransactionModal;
