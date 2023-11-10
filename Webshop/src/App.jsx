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

  function updatePrice() {
    let totalPrice = 0;

    shoppingCart.forEach(item => {
      totalPrice += item.price
    })

    return totalPrice
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
    <Container>
      <Row>
        <Col>
        {items.map(item => {
          return <Card border='primary' className='w-50 m-5'>
            <Card.Body>
            <div key={item.id} className='item-frame'>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>${item.price}</Card.Text>
              <Button className='mt-5' variant='primary' onClick={() => updateCart(item)}>Add to Cart</Button>
            </div>
          </Card.Body>
          </Card>
        })}
        </Col>
        <Col className='col-sm-4 mt-5 border border-primary p-4'>
            <h2>Shopping Cart</h2>
            {shoppingCart.map((item,idx) => {
              return <p key={idx} onClick={() => {removeFromCart(item)}}>{item.name} - ${item.price}</p>
            })}
            <p>Total Price: ${updatePrice()}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default App
