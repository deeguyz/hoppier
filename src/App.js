import styled from '@emotion/styled';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';

const Content = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;

function App() {
  return (
    <Content>App goes here!</Content>
  );
}

export default App;
