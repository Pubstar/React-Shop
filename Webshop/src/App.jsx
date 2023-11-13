import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          return <Card border='primary' className='w-50 m-5'>
            <Card.Body>
            <div key={item.id} className='item-frame'>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>${item.price}</Card.Text>
              <Button className='mt-5' variant='primary' onClick={() => {addToCart(item)}}>Add to Cart</Button>
            </div>
          </Card.Body>
          </Card>
        })}
        </div>
        <div className='col-sm-4 mt-5 border border-primary p-4 position-relative'>
            <h2>Shopping Cart</h2>
            {shoppingCart.map((item,idx) => {
              return <Card border='primary' className='mt-5' key={idx}>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price}/per item</Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between align-items-center px-5'>
                  <Button variant='danger w-25' onClick={() => {removeFromCart(item)}}>-</Button>
                  {item.quantity}
                  <Button variant='success w-25' onClick={() => {addToCart(item)}}>+</Button>
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
