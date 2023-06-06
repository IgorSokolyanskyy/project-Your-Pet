import cat_sm_1x from '../img/sm/cat-sm-1x.webp';
import cat_sm_2x from '../img/sm/cat-sm-2x.webp';
import cat_md_1x from '../img/md/cat-md-1x.webp';
import cat_md_2x from '../img/md/cat-md-2x.webp';

import dog_sm_1x from '../img/sm/dog-sm-1x.webp';
import dog_sm_2x from '../img/sm/dog-sm-2x.webp';
import dog_md_1x from '../img/md/dog-md-1x.webp';
import dog_md_2x from '../img/md/dog-md-2x.webp';

import dog2_sm_1x from '../img/sm/doggy-sm-1x.webp';
import dog2_sm_2x from '../img/sm/doffy-sm-2x.webp';
import dog2_md_1x from '../img/md/doggy-md-1x.webp';
import dog2_md_2x from '../img/md/doggy-md-2x.webp';

import { CatImg, DogImg, DoggyImg, ImageWrapper } from './HomeImg.styled';

const HomeImg = () => {
  return (
    <ImageWrapper>
      <CatImg
        srcSet={`${cat_sm_1x} 219w, ${cat_sm_2x} 437w , ${cat_md_1x} 454w,${cat_md_2x} 907w`}
        src={cat_sm_1x}
        sizes="(max-width: 767px) 219px, (max-width: 767px) 437px, (min-width: 768px) 454px, (min-width: 768px) 907px, 100vw"
        alt="cat"
        loading="lazy"
      />

      <DogImg
        srcSet={`${dog_sm_1x} 299w, ${dog_sm_2x} 597w , ${dog_md_1x} 729w,${dog_md_2x} 1457w`}
        src={dog_sm_1x}
        sizes="(max-width: 767px) 299px, (max-width: 767px) 597px, (min-width: 768px) 729px, (min-width: 768px) 1457px, 100vw"
        alt="dog"
        loading="lazy"
      />

      <DoggyImg
        srcSet={`${dog2_sm_1x} 289w, ${dog2_sm_2x} 576w , ${dog2_md_1x} 597w,${dog2_md_2x} 1194w`}
        src={dog2_sm_1x}
        sizes="(max-width: 767px) 289px, (max-width: 767px) 576px, (min-width: 768px) 597px, (min-width: 768px) 1194px, 100vw"
        alt="dog"
        loading="lazy"
      />
    </ImageWrapper>
  );
};

export default HomeImg;
