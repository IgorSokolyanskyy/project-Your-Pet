import styled from '@emotion/styled';

export const ImageWrapper = styled.div`
  position: relative;
  height: 100%;  
  margin-top: 24px;

  @media (min-width: 1280px) {
    margin-top: 0;
    width: 500px;
  }  
`;

export const DogImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`;

export const CatImg = styled.img`
  position: absolute;
  top: 150px;
  right: -30px;

  @media (min-width: 768px) {
    top: 400px;
    right: 0px;
  }  
`;

export const DoggyImg = styled.img`
  position: absolute;
  top: 80px;
  right: 210px;

  @media (min-width: 768px) {
    top: 240px;
    right: 510px;
  }
`;
