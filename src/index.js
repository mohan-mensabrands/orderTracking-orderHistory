import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let item = [];

class address { 
  constructor(customerName, customerEmail, customerAddress) {
    this.customerName = customerName
    this.customerEmail = customerEmail
    this.customerAddress = customerAddress
  }
}

class sku {
  constructor(image, title, size, attributes, itemId) {
    this.image = image
    this.title = title
    this.size = size
    this.attributes = attributes
    this.itemId = itemId
  }
}

class itemType {
  orderId
  orderDate
  sku
  constructor(orderId, orderName, orderDate, ifCancelled, ifDelivered, sku) {
    this.orderId = orderId
    this.orderName = orderName
    this.orderDate = orderDate
    this.ifCancelled = ifCancelled
    this.ifDelivered = ifDelivered
    this.sku = sku
  }
  print() {
    console.log(this.orderId, this.image)
  }
}
let orders = document.getElementsByName("orderId")

for (let i = 0; i < orders.length; i++) {
  let order = document.getElementsByName("order " + orders[i].innerText)[0]
  let elements = order.children
  let skus = [];
  for (let ele of elements) {
    if (ele.tagName === "DIV") {
      let imageUrl = ele.children[0].children[0].src;
      let title = ele.children[1].innerText
      let qty = ele.children[2].innerText
      let att = ele.children[3]
      let attributes = []
      attributes.push(qty)
      if(att && att.children){
        for(let attr of att.children){
          attributes.push(attr.innerText)
        }
      }
      let itemId = ele.children.itemId.innerText
      //L does nothing 
      let tempSku = new sku(imageUrl, title, "L", attributes, itemId)
      skus.push(tempSku);
    }
  }
  let temp = new itemType(
    orders[i].innerText,
    order.children.orderName.innerText,
    order.children.orderDate.innerText,
    order.children.ifCancelled.innerText === 'true',
    order.children.ifDelivered.innerText === 'fulfilled',
    skus
  )
  item.push(temp)
}

const getNameElements = (name) => {
  try {
    let element =  document.getElementsByName(name)[0].innerText
    return element;
  } catch (error) {
    return ""
  }
}
let addressObj = new address(getNameElements('customerName'),getNameElements('customerEmail'),getNameElements('customerAddress'))
// let toPrint = item.map((i) => {
//   let items = i.sku.map(item => item.itemId) 
//   return {orderId: i.orderId, items: items}
// } )

// console.log(toPrint);

root.render(
  // <React.StrictMode>
    <App item={item} address={addressObj} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
