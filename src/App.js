import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/'; /* vaihda task-sanat -> item. ja tasks -> items*/


function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  
function add(e) {
  e.preventDefault();
  const json = JSON.stringify({description:item, amount:amount})
  axios.post(URL + 'add.php',json,{
    headers: {
      'Content-Type': 'application/json'
    }

  })
  .then((response) => {
    setItems(items => [...items,response.data]);
    setItem('');
    setAmount('');
  }).catch (error => {
    alert(error.response.data.error)
  });

}

function remove(id) {
  const json = JSON.stringify({id:id})
  axios.post(URL + 'delete.php',json,{
    headers: {
      'Content-Type' : 'application/json'
    }
  })

.then((response) => {
  const newListWithoutRemoved = items.filter((item) => item.id !== id);
  setItems(newListWithoutRemoved);
}).catch (error => {
  alert(error.response ? error.response.data.error : error);
});

}


useEffect(()=> {
  axios.get(URL)
  .then((response)=> {
    setItems(response.data)
  }).catch(error => {
    alert(error.response ? error.response.data.error : error);
  })
},[])

  return (
  <div className="container">
    <h3>Shoppinglist</h3>
    <form onSubmit={add}>
      <label>New item</label>
      <input value={item} placeholder='item' onChange={e => setItem(e.target.value)}/>
      <input value={amount} placeholder='amount' onChange={e => setAmount(e.target.value)}/>
      <button>Add</button>
    </form>
    <ol>
      {items?.map(item => (
        <li key={item.id}>
          {item.description}&nbsp;
          {item.amount}&nbsp;
          <a href="#" className="delete" onClick={() => remove(item.id)}>
          Delete
          </a>
        </li>
      ))}
    </ol>
    </div>
  );
}

export default App;