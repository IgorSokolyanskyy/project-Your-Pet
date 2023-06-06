import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsUserLogin, selectUser } from 'redux/auth/selectors';
import { selectIsNoticeLoading } from 'redux/notices/selectors';
import { deleteNotice, unMakeNoticeFavourite } from 'redux/notices/operations';

import {
  MdMale,
  MdFemale,
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineAccessTime,
} from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ReactComponent as Claw } from 'images/icons/claw.svg';
import useModal from 'hooks/useModal';
import ModalNotice from 'components/ModalNotice/ModalNotice';

import {
  BottomButtonWrapper,
  CategoryBadge,
  LearnMore,
  RightButtonWrapper,
  StyledCardButtonBottom,
  StyledCardButtonRight,
  StyledCardImgWrapper,
  StyledCardLinkBottom,
  StyledCardWrapper,
  StyledComent,
} from './NoticeCategoryItem.styled';

import {
  makeNoticeFavourite,
  removeNoticeFavourite,
} from 'redux/notices/operations';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import DeleteAdverstimentModal from 'components/Modal/DeleteAdverstimentModal';

const NoticeCategoryItem = ({ petInfo }) => {
  const dispatch = useDispatch();
  const [isOpen, toggleModal] = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(isDeleteModalOpen => !isDeleteModalOpen);
  };
  const params = useParams();
  const categoryParam = params.category;

  const {
    _id: noticeId,
    category,
    dateOfBirth,
    sex,
    imgURL,
    place,
    favorite,
    title,   
    owner,
  } = petInfo;
  const isLoading = useSelector(selectIsNoticeLoading);
  const { _id: userId } = useSelector(selectUser);
  const [isFavorite, setIsFavorite] = useState(favorite.includes(userId));
  
  function calculateTimeElapsedYears(dateString) {
    const startDate = new Date(dateString.split('.').reverse().join('.'));
    const currentDate = new Date();
    const yearsElapsed = currentDate.getFullYear() - startDate.getFullYear();
    return Math.round(yearsElapsed);
  }

  function calculateTimeElapsedMonthses(dateString) {
    const startDate = new Date(dateString.split('.').reverse().join('.'));
    const currentDate = new Date();
    const monthsElapsed =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());
    return Math.floor(monthsElapsed);
  }

  function formatComments(comment) {
    if (comment && comment.length > 32) {
      return comment.slice(0, 32) + '...';
    } else return comment;
  }

  function formatPlace(place) {
    if (place && place.length > 8) {
      return place.slice(0, 7) + '...';
    } else return place;
  }

  const isLoggedIn = useSelector(selectIsUserLogin);

  const isCreatedByMe = userId === owner._id ? true : false;

  const handleToggleFavorite = noticeId => {
    if (isLoggedIn) {
      if (!isFavorite) {
        dispatch(makeNoticeFavourite(noticeId));
        setIsFavorite(!isFavorite);
      } else {
        if (categoryParam === 'favourite') {
          dispatch(removeNoticeFavourite(noticeId));
        } else {
          dispatch(unMakeNoticeFavourite(noticeId));
        }
        setIsFavorite(!isFavorite);
      }
    } else {
      toast.error('You should be authorized.');
    }
  };

  const handleDelete = id => {
    dispatch(deleteNotice(id));
    toggleDeleteModal();
  };

  const years = calculateTimeElapsedYears(dateOfBirth);
  const monthes = calculateTimeElapsedMonthses(dateOfBirth);

  function formatCategory(category) {
    if (category === 'lost-found') {
      return 'lost/found';
    } else if (category === 'for-free') {
      return 'in good hands';
    } else return category;
  }

  return (
    <>
      <StyledCardWrapper>
        <StyledCardImgWrapper>
          <img
            src={
              imgURL.includes('http') ? imgURL : 'https://placehold.co/262x298'
            }
            alt="img"
          />
          <CategoryBadge>{formatCategory(category)}</CategoryBadge>
          <BottomButtonWrapper>
            <StyledCardLinkBottom
              target="_blank"
              href={`https://www.google.com/maps/place/${place}`}
            >
              <HiOutlineLocationMarker size="24" color='#54ADFF' />
              <span>{formatPlace(place)}</span>
            </StyledCardLinkBottom>
            <StyledCardButtonBottom>
              <MdOutlineAccessTime size="24" color='#54ADFF' />
              <span>{years < 1 ? monthes + ' mon' : years + ' year'}</span>
            </StyledCardButtonBottom>
            <StyledCardButtonBottom>
              {sex === 'male' ? <MdMale size="24" color='#54ADFF' /> : <MdFemale size="24" color='#54ADFF' />}
              <span>{sex}</span>
            </StyledCardButtonBottom>
          </BottomButtonWrapper>
          <RightButtonWrapper>
            <StyledCardButtonRight
              onClick={() => handleToggleFavorite(noticeId)}
            >
              {isFavorite ? (
                <MdFavorite size="24" color='#54ADFF' />
              ) : (
                <MdFavoriteBorder size="24" color='#54ADFF' />
              )}
            </StyledCardButtonRight>

            {isCreatedByMe && (
              <StyledCardButtonRight
                onClick={toggleDeleteModal}
                disable={isLoading}
              >
                <RiDeleteBinLine size="24" color='#54ADFF' />
              </StyledCardButtonRight>
            )}
            
            <DeleteAdverstimentModal
              onRemove={() => handleDelete(noticeId)}
              addName={formatComments(title)}
              isOpen={isDeleteModalOpen}
              toggleModal={toggleDeleteModal}
            />
          </RightButtonWrapper>
        </StyledCardImgWrapper>

        <StyledComent>{formatComments(title)}</StyledComent>
        
        <LearnMore onClick={toggleModal}>
          <span>Learn more</span> <Claw />
        </LearnMore>

        <ModalNotice
          isOpen={isOpen}
          toggleModal={toggleModal}
          noticeId={noticeId}
          handleToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      </StyledCardWrapper>
    </>
  );
};

export default NoticeCategoryItem;
