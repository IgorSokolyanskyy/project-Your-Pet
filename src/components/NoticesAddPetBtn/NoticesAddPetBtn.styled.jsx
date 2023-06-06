import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const AddPetStyledLink = styled(NavLink)`
  color: #fef9f9;
  background: #54adff;
  display: flex;
  justify-content: center;  
  align-items: center;
  padding: 8px 16px;
  border-radius: 40px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  gap: 15px;
  cursor: pointer;
  border: none;

  &:hover {
    background: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
  }
`;

export const AddPetStyledBtn = styled.button`
  color: #fef9f9;
  background: #54adff;
  display: flex;
  justify-content: center;  
  align-items: center;
  padding: 8px 16px;
  border-radius: 40px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  gap: 15px;
  cursor: pointer;
  border: none;

  &:hover {
    background: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
  }
`;

export const AddPetStyledLinkMobile = styled(NavLink)`
  position: fixed;
  top: 460px;
  right: 20px;
  width: 80px;
  height: 80px;
  color: #fef9f9;
  background: #54adff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 50%;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  border: none;
  gap: 8px;
  z-index: 99;

  &:hover {
    background: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
  }
`;

export const AddPetStyledBtnMobile = styled.button`
  position: fixed;
  top: 460px;
  right: 20px;
  width: 80px;
  height: 80px;
  color: #fef9f9;
  background: #54adff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 50%;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  border: none;
  gap: 8px;
  z-index: 99;
  
  &:hover {
    background: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
  }
`;
