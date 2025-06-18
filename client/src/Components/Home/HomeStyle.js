import styled from 'styled-components';

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

