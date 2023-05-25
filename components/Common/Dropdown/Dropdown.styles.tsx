import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 150px;
`;

export const DropdownButton = styled.div`
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  background: white;
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 125%;
  margin: 0 auto;
  width: 100%;
  border: 1px solid black;
  transform-origin: top;
  background: white;
`;

export const DropdownElement = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease all;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
