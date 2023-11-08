import { useState } from 'react'
import './App.css'

function App() {

  const items = [{
    id: 0,
    price: 20,
    name: 'Chair'
  },
  {
    id: 1,
    price: 50,
    name: 'Couch'
  },
  {
    id: 2,
    price: 200,
    name: 'Desk'
  }]

  const [shoppingCart, setShoppingCart] = useState([]);

  function updateCart(item) {
    setShoppingCart([...shoppingCart, {id: item.id, name: item.name, price: item.price}]);
  }

  function removeFromCart(item) {
    let newCart = [...shoppingCart];
    let itemFound = false;
    shoppingCart.forEach((x,idx) => {
      if(x.id == item.id && !itemFound) {
        newCart.splice(idx, 1);
        itemFound = true;
        return;
      }
      idx++;
    })
    setShoppingCart(newCart);
  }

  return (

    <div className='container'>
      <div className='items-container'>
     {items.map(item => {
      return <div key={item.id} className='item-frame'>
        <h4>{item.name}</h4>
        <h3>${item.price}</h3>
        <button onClick={() => updateCart(item)}>Add to Cart</button>
      </div>
     })}
      </div>

     <div className='shopping-cart'>
      <h2>Shopping Cart</h2>
      {shoppingCart.map((item,idx) => {
        return <p key={idx} onClick={() => {removeFromCart(item)}}>{item.name} - ${item.price}</p>
      })}
     </div>
    </div>
  )
}

export default App
