import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    food,
    education,
    travel,
    fuel,
    grocery,
    electronics,
} from '../../assets/images';
import './style.css';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';
const CategoryModal = props => {
    const { modalToggle, setModalToggle, category, setCategory } = props;

    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    const categoryIcon = [
        {
            title: getLanguageText({ language, key: 'food' }),
            icon: food,
        },
        {
            title: getLanguageText({ language, key: 'travel' }),
            icon: travel,
        },
        {
            title: getLanguageText({ language, key: 'education' }),
            icon: education,
        },
        {
            title: getLanguageText({ language, key: 'grocery' }),
            icon: grocery,
        },
        {
            title: getLanguageText({ language, key: 'fuel' }),
            icon: fuel,
        },
        {
            title: getLanguageText({ language, key: 'electronics' }),
            icon: electronics,
        },
    ];

    const modalToggleFunc = () => {
        setModalToggle(!modalToggle);
    };

    const onSelectCategory = ({ title, icon }) => {
        //* API call to update Category

        setCategory({
            title,
            image: icon,
        });
        setModalToggle(false);
    };

    return (
        <>
            <Modal
                isOpen={modalToggle}
                centered={true}
                toggle={modalToggleFunc}
                contentClassName='customStyle'
            >
                <ModalHeader>
                    <p className='change_text'>
                        {getLanguageText({ language, key: 'chooseCategory' })}
                    </p>
                </ModalHeader>

                <ModalBody>
                    <div style={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr'}}>
                        {categoryIcon?.map((item, index) => {
                            const { title, icon } = item;
                            return (
                                <div
                                    key={index}
                                    className='d-flex flex-column justify-content-between px-3 py-2 align-items-center'
                                    onClick={() =>
                                        onSelectCategory({ title, icon })
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={icon}
                                        alt='Category'
                                        width={50}
                                        height={50}
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
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};
export default CategoryModal;
