import React from 'react';

// import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { HiPlus } from 'react-icons/hi';
import {
  AddPetStyledBtn,
  AddPetStyledBtnMobile,
  AddPetStyledLink,
  AddPetStyledLinkMobile,
} from './NoticesAddPetBtn.styled';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsUserLogin } from 'redux/auth/selectors';
import { toast } from 'react-hot-toast';

export const NoticesAddPetBtn = () => {
  const isMobileScreen = useMediaQuery('(max-width: 767px)');
  const isLoggedIn = useSelector(selectIsUserLogin)
  const handleNavLinkClick = () => {
    toast.error('You should be authorized.');
  };

  return (
    <>      
      {isMobileScreen ? (
        isLoggedIn ? (
          <AddPetStyledLinkMobile to={'/add-pet'}>
            <HiPlus size='24' />
            Add pet
          </AddPetStyledLinkMobile>
        ) : (
          <AddPetStyledBtnMobile onClick={() => handleNavLinkClick()}>
            <HiPlus size='24' />
            Add pet
          </AddPetStyledBtnMobile>
        )
      ) : isLoggedIn ? (
        <AddPetStyledLink to={'/add-pet'}>
          Add pet
          <HiPlus size='24' />
        </AddPetStyledLink>
      ) : (
        <AddPetStyledBtn onClick={() => handleNavLinkClick()}>
          Add pet
          <HiPlus size='24' />
        </AddPetStyledBtn>
      )}
    </>
  );
};

export default NoticesAddPetBtn;
