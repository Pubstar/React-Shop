import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

function App() {

  const items = [{
    id: 0,
    price: 20,
    name: 'Chair',
    quantity: 0
  },
  {
    id: 1,
    price: 50,
    name: 'Couch',
    quantity: 0
  },
  {
    id: 2,
    price: 200,
    name: 'Desk',
    quantity: 0
  }]

  const [shoppingCart, setShoppingCart] = useState([]);

  function addToCart(item) {
    let itemUpdated = false;
    shoppingCart.forEach(cartItem => {
      if (item.id == cartItem.id && !itemUpdated) {
        cartItem.quantity += 1;
        setShoppingCart([...shoppingCart]);
        itemUpdated = true;
        return;
      }
    })

    if(!itemUpdated) setShoppingCart([...shoppingCart, {id: item.id, name: item.name, price: item.price, quantity: 1}]);
  }

  function updateTotalPrice() {
    let totalPrice = 0;

    shoppingCart.forEach(item => {
      totalPrice += (item.price * item.quantity)
    })

    return totalPrice
  }

  function removeFromCart(item) {
    let newCart = [...shoppingCart];
    let itemFound = false;
    shoppingCart.forEach((x,idx) => {
      if(x.id == item.id && !itemFound) {
        if(item.quantity > 1) {
          newCart[idx].quantity -= 1;
          return;
        } else {
          newCart.splice(idx, 1);
          itemFound = true;
          return;
        }
      }
    })
    setShoppingCart(newCart);
  }

  return (
    <div className='container'>
      <Row>
        <div className='col-sm-8'>
        {items.map(item => {
          return <Card className='m-5'>
            <Card.Body>
            <div key={item.id} className='item-frame'>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione culpa, dolores dicta vel perspiciatis unde nesciunt saepe vitae rerum doloremque veritatis, sapiente sit? Laboriosam quam et expedita velit, quidem vero! </Card.Text>
              <Card.Footer className='d-flex justify-content-between align-items-center px-5 py-3 p-sm-3'>
                <span className='font-weight-bold itemCardFooterPrice'>${item.price}</span>
                
                <Button variant='primary' onClick={() => {addToCart(item)}}>Add to Cart</Button>
                </Card.Footer>
            </div>
          </Card.Body>
          </Card>
        })}
        </div>
        <div className='col-sm-4 mt-5 mb-5 border p-4 position-relative shopping-cart'>
            <h2>Shopping Cart</h2>
            {shoppingCart.map((item,idx) => {
              return <Card className='mb-5 mt-1' key={idx}>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price}/per item</Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between align-items-center px-5 p-sm-2'>
                  <Button variant='danger w-20' onClick={() => {removeFromCart(item)}}>-</Button>
                  {item.quantity}
                  <Button variant='success w-20' onClick={() => {addToCart(item)}}>+</Button>
                </Card.Footer>
                </Card>
            })}
            <p className='position-absolute bottom-0'>Total Price: ${updateTotalPrice()}</p>
        </div>
      </Row>
    </div>
  )
}

export default App
