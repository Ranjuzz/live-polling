import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh; 
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;     
  background-color: #FFFFFF; 
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
  font-size: 14px;
  padding: 0 9px 0 7px;
  border-radius: 20px;
`;


export const Header = styled.div`
  width: 100%;
  max-width: 981px;   
  text-align: left;   
`

export const Title = styled.div`
  font-size: 40px;
  color: black;
  margin: 0 0 0 0;
  justify-self: center;
  font-weight: 400;
  padding: 16px 8px 16px 8px;
  strong {
    font-weight: 600;
    
  }
`;

export const Subtitle = styled.p`
  color: #6E6E6E;
  justify-self: center;
  text-align: center;
  margin: 0 10vw 5vw 10vw;
  font-size: 19px;
  strong {
    color: black;
  }
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

export const Button = styled.button`
  
  width: 233px;
  padding: 12px 32px;
  font-size: 19px;
  border-radius: 34px;
  background: linear-gradient(to right, #7765DA, #4F0DCE);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  float: right;
  transition: background 0.2s ease;

  &:hover {
    background-color: #5941d9;
  }
`;
