import styled from '@emotion/styled';
import {useState} from 'react';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';

const Content = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;


function App() {

  const [merchants, setMerchants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);

  getMerchants().then((value) => {
    setMerchants(value);
  });

  getTransactions().then((value) => {
    setTransactions(value);
  });

  getUsers().then((value) => {
    setUsers(value);
  });

  
  const merch = merchants;  
  const transac = transactions;
  const user = users;

  for(var i in merch){
    console.log(merch[i]);
    // if(merch[i].currency === 'CAD'){
    //   console.log(merch[i])
    // }
  }

  for(var i in transac){
    console.log(transac[i]);
  }

  for(var i in user) {
    console.log(user[i]);
  }
 

  return (
    // <Content>App goes here!</Content>
    <div>
      <p>
        SOMETHING GOES HERE
      </p>
    </div>
  );
}

export default App;
