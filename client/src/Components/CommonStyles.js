import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
  justify-content: center; 
  align-items: center;   
  height: auto;
`;

export const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(to right, #7765DA, #4F0DCE);
  color: white;
  height: 31px;
  width: 134px;
  align-content: center;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0 9px 0 7px;
  border-radius: 20px;
`;


export const Header = styled.div`
    color:black;
    place-self: center;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 8px;
  font-weight: 400;
  padding: 0 10px 0 10px;
  strong {
    font-weight: 650;
  }
`;

export const Subtitle = styled.p`
  color: #6E6E6E;
  max-width: 100vh;
  margin: 0px 20px 32px 20px;
`;

export const RoleSelection = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const RoleCard = styled.div`
  flex: 1 1 220px;
  height: 130px;
  width: 300px;
  border: 2px solid ${({ selected }) => (selected ? '#5767d0' : '#ddd')};
  border-radius: 10px;
  text-align: left;
  padding: 10px 17px 10px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: '#f2f2f2';

  &:hover {
    border-color: #6a5acd;
  }

`;

export const RoleTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

export const RoleDescription = styled.p`
  font-size: 0.9rem;
  color: #6e6e6e;
`;

export const  Button = styled.button`
  background: linear-gradient(to right, #7765DA, #5767D0);
  color: #f2f2f2;
  border: none;
  width: 233px;
  padding: 12px 32px;
  font-size: 1rem;
  border-radius: 34px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #5941d9;
  }
`;
