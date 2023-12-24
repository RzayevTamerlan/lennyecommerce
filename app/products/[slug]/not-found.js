'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Создаем стили для контейнера страницы
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
`;

// Создаем стили для заголовка
const Title = styled.h1`
  font-size: 4rem;
  color: #1E4C2F;
  margin-bottom: 20px;
`;

// Создаем стили для описания
const Description = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 40px;
`;

// Создаем стили для ссылки
const StyledLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  text-decoration: none;
  color: #fff;
  background-color: #1E4C2F;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1D9E34;
  }
`;

// Компонент страницы 404
const NotFoundPage = () => (
  <NotFoundContainer>
    <Title>404</Title>
    <Description>Page not found</Description>
    <Link href="/">
      <StyledLink>Go Home</StyledLink>
    </Link>
  </NotFoundContainer>
);

export default NotFoundPage;
