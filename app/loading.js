"use client";
import React from 'react';
import styled, {keyframes} from 'styled-components';

// Создаем анимацию вращения для loader
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Создаем стили для контейнера загрузчика
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Создаем стили для самого loader
const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

// Компонент загрузчика
const MyLoader = () => (
  <LoaderContainer>
    <Loader/>
  </LoaderContainer>
);

export default MyLoader;
