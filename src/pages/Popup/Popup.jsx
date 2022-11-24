import React from 'react';
import styled from '@emotion/styled';

const Popup = () => {
  return (
    <Container>
      <Header>Fixed UI</Header>
      <Link
        onClick={() => {
          window.open('https://www.fixedui.com');
        }}
      >
        Check our where this is going at fixedui.com
      </Link>
      <Description>
        Inspired by{' '}
        <span
          onClick={() => {
            window.open(
              'https://twitter.com/realGeorgeHotz/status/1595270867402956801'
            );
          }}
          style={{
            cursor: 'pointer',
            color: 'blue',
            float: 'right',
            marginLeft: '5px',
          }}
        >
          this tweet
        </span>
      </Description>
      <Description>
        Right now this only works on Twitter. But let's see how long I can build
        this out lol.
      </Description>
      <Description
        style={{
          padding: '20px',
        }}
      >
        Usage: When searching in explore, type "from:" and then you can select
        usernames
      </Description>
    </Container>
  );
};

export default Popup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Link = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  text-align: center;
`;
