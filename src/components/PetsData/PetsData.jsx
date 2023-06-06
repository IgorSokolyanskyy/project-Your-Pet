import { useSelector } from 'react-redux';
import { selectPetsInfo, selectIsLoading } from 'redux/pets/selectors';

import AddIcon from '@mui/icons-material/Add';
import { Container, Title, AddButton, TitleContainer } from './PetsData.styled';

import PetsList from '../PetsList';
import {
  Notification,
  Text,
} from 'components/Notification/Notification.styled';

const PetsData = () => {
  const petsInfo = useSelector(selectPetsInfo);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Container>
      <TitleContainer>
        <Title>My pets:</Title>
        <AddButton to="/add-pet">
          Add pet <AddIcon />
        </AddButton>
      </TitleContainer>

      {!isLoading && !petsInfo.length > 0 ? (
        <Notification>
          <Text>You have not added any pets </Text>
        </Notification>
      ) : (
        <PetsList pets={petsInfo} />
      )}
    </Container>
  );
};

export default PetsData;
