import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'redux/auth/operations';
import { logout } from 'redux/auth/operations';

import LogoutModal from 'components/Modal/LogoutModal';
import LogoutBtn from './LogoutBtn';
import UserEditPhoto from './UserEditPhoto';
import UserForm from './UserForm';

import useModal from 'hooks/useModal';

import { Container, Box, Title, LogOutWrapper } from './UserData.styled';

const UserData = ({ formValues }) => {
  const [isOpen, toggleModal] = useModal();

  const dispatch = useDispatch();

  const handleFormSubmit = values => {
    const updatedValues = {
      ...formValues,
      ...values,
    };

    const hasEmptyValues = Object.values(updatedValues).some(
      value => value === undefined || value === ''
    );

    if (hasEmptyValues) {
      return;
    }

    const updatedData = new FormData();
    updatedData.append('name', updatedValues.Name);
    updatedData.append('phone', updatedValues.Phone);
    updatedData.append('birthday', updatedValues.Birthday);
    updatedData.append('city', updatedValues.City);
    dispatch(updateUserInfo(updatedData));
  };

  const handleLogout = () => {
    toggleModal();
    dispatch(logout());
  };

  return (
    <Container>
      <Title>My information:</Title>

      <Box>
        <UserEditPhoto />

        <div>
          <UserForm handleFormSubmit={handleFormSubmit} />

          <LogOutWrapper>
            <LogoutBtn toggleModal={toggleModal} />
            <LogoutModal
              isOpen={isOpen}
              toggleModal={toggleModal}
              onLogout={handleLogout}
            />
          </LogOutWrapper>
        </div>
      </Box>
    </Container>
  );
};

export default UserData;
