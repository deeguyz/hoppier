import styled from '@emotion/styled';
import {useMemo, useState} from 'react';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';
import Table from './table';
import './table.css';

const Content = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;


function App() {

  const [merchants, setMerchants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState('USD');

  //Retrieves the Merchants array after resolving the promise
  getMerchants().then((value) => {
    setMerchants(value);
  });

  //Retrieves the Transactions array after resolving the promise
  getTransactions().then((value) => {
    setTransactions(value);
  });

  //Retrieves the Users array after resolving the promise
  getUsers().then((value) => {
    setUsers(value);
  });

  //Function to set the currency toggle on button click
  function setCurrency() {
    if(toggle === 'USD'){
      setToggle('CAD');
    }
    else if(toggle === 'CAD'){
      setToggle('USD');
    }
  };

  
  const merch = merchants;  
  const transac = transactions;
  const user = users;

  // //Debug statements to print values of arrays
  // for(let i in merch){
  //   console.log(merch[i]);
  // }

  // for(let i in transac){
  //   console.log(transac[i]);
  // }

  // for(let i in user) {
  //   console.log(user[i]);
  // }
 
  var history = [];
  var summary = [];
  for(let i in user){
    let count = 0;
    for(let j in transac){
      if(user[i].cardId === transac[j].cardId){
        count = count + transac[j].amountInUSDCents;
        
        let res = merch.find(e => {
          return e.networkId === transac[j].merchantNetworkId;
        })
        if(toggle === 'CAD'){
          history.push({"UID": user[i].id,"lastName": user[i].lastName, "firstName": user[i].firstName, "date": transac[j].date.toString(), "merchant": res.name, "currency": res.currency, "totalUSD": '$'+(transac[j].amountInUSDCents/60*1.26).toFixed(2)+ ' ' + toggle  });
        }
        else if (toggle === 'USD'){
          history.push({"UID": user[i].id,"lastName": user[i].lastName, "firstName": user[i].firstName, "date": transac[j].date.toString(), "merchant": res.name, "currency": res.currency, "totalUSD": '$'+(transac[j].amountInUSDCents/60).toFixed(2)+ ' ' +toggle});
        }      
      }
    }
    if(toggle === 'CAD'){
      summary.push({"UID": user[i].id,"lastName": user[i].lastName, "firstName": user[i].firstName, "sum": '$'+(count/60.0*1.26).toFixed(2)+ ' ' +toggle});
    }
    else if (toggle === 'USD'){
      summary.push({"UID": user[i].id,"lastName": user[i].lastName, "firstName": user[i].firstName, "sum": '$'+(count/60.0).toFixed(2)+ ' ' +toggle});
    }   
    
  }

  // //Debug statements to get values of arrays
  // console.log(summary);
  // console.log(history);

  // for(let i in summary){
  //   console.log(summary[i]);
  // }

  // for(let i in history){
  //   console.log(history[i]);
  // }

  //setting summary columns for react-table
  const columnSummary = useMemo (
    () => [
      {
        Header: "Summary",
        columns: [
          {
            Header: "Last Name",
            accessor: "lastName"
          },
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Sum Total",
            accessor: "sum"
          }
        ]
      }
    ],
    []
  )

  //setting transaction list columns for react-table
  const columnList = useMemo (
    () => [
      {
        Header: "Transactions List",
        columns: [
          {
            Header: "Last Name",
            accessor: "lastName"
          },
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Date",
            accessor: "date"
          },
          {
            Header: "Merchant",
            accessor: "merchant"
          },
          {
            Header: "Merchant Currency",
            accessor: "currency"
          },
          {
            Header: "Sum Total",
            accessor: "totalUSD"
          }
        ]
      }
    ],
    []
  )
  

  return (
    <Content>
      <div>
        <button onClick={setCurrency}>
          {toggle}
        </button>
        {/* Calls Table from table.js */}
        <Table columns={columnSummary} data={summary} /> 
        <Table columns={columnList} data={history} /> 
      </div>
    </Content>
  );
}

export default App;
