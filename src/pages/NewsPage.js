import News from 'components/News';
import { useEffect } from 'react';

const NewsPage = () => {
  useEffect(() => {
    document.title = 'YourPet | News';
  });

  return <News />;
};

export default NewsPage;
