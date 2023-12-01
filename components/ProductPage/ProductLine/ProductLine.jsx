'use client';
import styled from 'styled-components';

const StyledProductLine = styled.div`
  margin-top: 52px;
  margin-bottom: 32px;
  width: 100%;
  background: #E4E9EE;
  height: 1px;
`;

const StyledBasketLine = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 100%;
  background: #E4E9EE;
  height: 1px;
`;

const ProductLine = ({isBasket = false}) => {
  return (
    <>
      {isBasket ? <StyledBasketLine/> : <StyledProductLine/>}
    </>
  );
};

export default ProductLine;
