import {
  Box,
  List,
  Typography,
  ListItem,
  Button,
  CircularProgress,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BasicModal from 'components/Modal/BasicModal';
import { useEffect, useState } from 'react';
import {
  CategoryChipStyled,
  ImageBoxStyled,
  InfoBoxStyled,
  PetImageStyled,
  InfoTitleStyled,
  ListItemTextStyled,
  LinkStyled,
  DialogPaperStyled,
} from './ModalNotice.styled';
import { fetchNoticeById } from 'redux/notices/operations';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import {
  selectNoticeItem,
  selectIsNoticeItemLoading,
} from 'redux/notices/selectors';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';

const IMG_PLACEHOLDER = 'https://placehold.co/600x650';

const ModalNotice = ({
  isOpen,
  toggleModal,
  noticeId,
  isFavorite,
  handleToggleFavorite,
}) => {
  const {
    name,
    title,
    imgURL,
    price,
    category,
    dateOfBirth,
    breed,
    place,
    sex,
    comments,
    owner,
  } = useSelector(selectNoticeItem) || {};
  const isLoading = useSelector(selectIsNoticeItemLoading);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const toggleChildModal = () => {
    setIsChildOpen(isChildOpen => !isChildOpen);
  };
  const user = useSelector(selectUser);
  const getPhone = owner => (
    <LinkStyled href={`tel: ${owner?.phone}`}>{owner?.phone}</LinkStyled>
  );
  const getEmail = owner => (
    <LinkStyled href={`mailto: ${owner?.email}`}>{owner?.email}</LinkStyled>
  );
  const dispatch = useDispatch();

  let infoDefinitions = [
    { name: 'Name:', definition: name },
    { name: 'Price:', definition: price },
    { name: 'Birthday:', definition: dateOfBirth },
    { name: 'Breed:', definition: breed },
    { name: 'Place:', definition: place },
    { name: 'The sex:', definition: sex },
    { name: 'Email:', definition: getEmail(owner) },
    { name: 'Phone:', definition: getPhone(owner) },
  ];
  infoDefinitions = infoDefinitions.filter(item => item.definition);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNoticeById(noticeId));
    }
  }, [dispatch, isOpen, noticeId, user?._id]);

  function formatCategory(category) {
    if (category === 'lost-found') {
      return 'lost/found';
    } else if (category === 'for-free') {
      return 'in good hands';
    }

    return category;
  }

  return (
    <>
      <BasicModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        dialogPaper={DialogPaperStyled}
      >
        {isLoading && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && (
          <>
            <Box display="flex" flexWrap="wrap">
              <ImageBoxStyled>
                <PetImageStyled
                  src={imgURL ? imgURL : IMG_PLACEHOLDER}
                  alt={name}
                />
                <CategoryChipStyled label={formatCategory(category)} />
              </ImageBoxStyled>
              <InfoBoxStyled>
                <InfoTitleStyled variant="h2" component="h2">
                  {title}
                  <List>
                    {infoDefinitions.map((item, index) => (
                      <ListItem key={index} sx={{ padding: 0 }}>
                        <ListItemTextStyled
                          primary={
                            <Typography
                              component="div"
                              sx={{
                                display: 'inline-block',
                                fontWeight: '600',
                                width: {
                                  mobile: '80px',
                                  tablet: '120px',
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              component="div"
                              sx={{
                                display: 'inline-block',
                                fontWeight: '500',
                              }}
                            >
                              {item.definition}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </InfoTitleStyled>
              </InfoBoxStyled>
            </Box>
            <Typography
              component="p"
              sx={{ maxWidth: '680px', marginTop: '20px', fontWeight: 500 }}
            >
              Comments: {comments}
            </Typography>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              sx={{ marginTop: '20px' }}
            >
              <Button
                onClick={() => handleToggleFavorite(noticeId)}
                variant={isFavorite ? 'contained' : 'outlined'}
                sx={{ width: '125px' }}
              >
                {isFavorite ? `Remove` : `Add to`} &nbsp;{' '}
                <FavoriteBorderIcon
                  sx={{ verticalAlign: 'top', fontSize: '24px' }}
                />
              </Button>
              <Button
                variant="outlined"
                sx={{ width: '125px', marginLeft: '15px' }}
                onClick={() => setIsChildOpen(true)}
              >
                Contact
              </Button>
              <BasicModal
                isOpen={isChildOpen}
                toggleModal={toggleChildModal}
                dialogPaper={DialogPaperStyled}
              >
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  {owner.email && (
                    <Button
                      startIcon={<MailIcon sx={{ color: '#54adff' }} />}
                      sx={{ marginRight: '20px', padding: '10px' }}
                      size="large"
                      variant="text"
                    >
                      {getEmail(owner)}
                    </Button>
                  )}
                  {owner.phone && (
                    <Button
                      startIcon={<PhoneIcon sx={{ color: '#54adff' }} />}
                      sx={{ padding: '10px' }}
                      size="large"
                      variant="text"
                    >
                      {getPhone(owner)}
                    </Button>
                  )}
                </Box>
              </BasicModal>
            </Box>
          </>
        )}
      </BasicModal>
    </>
  );
};

export default ModalNotice;
