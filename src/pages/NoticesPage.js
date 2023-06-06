import NoticesAddPetBtn from 'components/NoticesAddPetBtn/NoticesAddPetBtn';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch';
import PaginationBox from 'components/PaginationBox/PaginationBox';
import { fetchNoticesByCategory } from 'redux/notices/operations';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { PageTitle } from 'components/PageTitle/PageTitle.styled';
import Box from '@mui/material/Box';
import {
  Notification,
  Text,
} from 'components/Notification/Notification.styled';

import {
  selectNotices,
  selectTotalPages,
  selectIsNoticeLoading,
} from 'redux/notices/selectors';

const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const categoriesListRef = useRef(null);
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsNoticeLoading);

  const params = useParams();
  const category = params.category;

  useEffect(() => {
    document.title = 'YourPet | Find pet';

    if (category !== 'favourite' && category !== 'own') {
      dispatch(
        fetchNoticesByCategory({
          category,
          search,
          page,
          limit: 8,
        })
      );
    }
  }, [dispatch, page, category, search]);

  const handleCategoryChange = () => {
    setPage(1);
  };

  const handlePageChange = (e, page) => {
    categoriesListRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    setPage(page);
  };

  const handleNoticeSearch = search => {
    setPage(1);
    setSearch(search);
  };

  return (
    <>
      <PageTitle>Find your favorite pet</PageTitle>

      <NoticesSearch handleSearch={handleNoticeSearch} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <NoticesCategoriesNav onCategoryChange={handleCategoryChange} />
        <NoticesAddPetBtn />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <TailSpin
            height="120"
            width="120"
            color="#54adff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoading}
          />
        </Box>
      ) : (
        <NoticesCategoriesList ref={categoriesListRef} notices={notices} />
      )}

      {!isLoading && notices.length === 0 && (
        <Notification>
          <Text>There are no pets in this category yet</Text>
        </Notification>
      )}

      {totalPages > 1 && (
        <PaginationBox
          page={page}
          onChange={handlePageChange}
          pagesCount={totalPages}
        />
      )}
    </>
  );
};

export default NoticesPage;
