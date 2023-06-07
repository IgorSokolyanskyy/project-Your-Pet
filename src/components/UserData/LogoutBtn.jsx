import React from 'react';
import { ButtonLogOut, IconLogOut } from './UserData.styled';

const LogoutButton = ({ toggleModal }) => {
  return (
    <ButtonLogOut type="button" onClick={toggleModal} aria-label="logout">
      <IconLogOut />
      Log Out
    </ButtonLogOut>
  );
};

export default LogoutButton;
