import { useEffect, useState } from "react";
import "./App.css";
import { AddressCard, Card } from "./components";
import NoOrder from "./components/NoOrder";

function App({ item, address }) {
  const [items, setItems] = useState(item);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let csv = "";
    item.forEach((element) => {
      if (!element.ifCancelled) {
        if (csv !== "") csv = `${csv},${element.orderId}`;
        else csv = element.orderId;
      }
    });
    if (csv === "") {
      setLoading(false);
      return;
    }
    let url = `https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/shopify/item/history?channelOrderIds=${csv}`;
    // let url = `https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/shopify/history?channelOrderIds=${csv}`
    let response = fetch(url, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJ2aXNoYWwuY2hhdHVydmVkaUBtZW5zYWJyYW5kcy5jb20iLCJzdWIiOiIzNCIsImlhdCI6MTY2MjAyOTg1OSwianRpIjoiMGE3M2YxOTQtNzA5OS00MGRmLWFiNGItYWU3YjdjMzZjNGY4IiwiZXhwIjoxNzQ4NDI5ODU5fQ.ocNJhggQi2rlqYlGhM3kQPBukdYO_nvcZGXmG0PiW7I",
      },
    });
    response
      .then((res) => res.json())
      .then((res) => {
        // let orderMap = {};
        let response = res.data;
        // console.log("response", response);
        /* for new api*/
        // let response = [
        //   {
        //     orderId: "4293065080967",
        //     items: [
        //       { itemId: "11110144114823", status: 'DELIVERED', dateTime: "2022-10-18 17:58:09.000" },
        //       { itemId: "11110144147591", status: 'DELIVERED', dateTime: "2022-10-18 17:58:09.000" }
        //     ]
        //   },
        //   {
        //     orderId: "4293063540871",
        //     items: [
        //       { itemId: "11110141296775", status: 'DELIVERED', dateTime: "2022-10-18 17:58:09.000" },
        //       { itemId: "11110141329543", status: 'DELIVERED', dateTime: "2022-10-18 17:58:09.000" }
        //     ]
        //   }
        // ]
        let responseMap = new Map();
        response.forEach((item) => responseMap.set(item.orderId, item.items));
        let ordersWithStatus = item.map((item) => {
          if (item.ifCancelled)
            return { ...item, status: `Cancelled`, statusDate: "" };

          if (responseMap.has(item.orderId)) {
            let newSku = item.sku;
            item.sku.forEach((sku, index) => {
              let skuItemId = sku.itemId;
              let itemsList = responseMap.get(item.orderId);
              itemsList.forEach((item) => {
                if (skuItemId === item.itemId.split("-")[0]) {
                  newSku[index].status = item.status;
                  newSku[index].statusDate = item.dateTime;
                }
              });
            });
            return { ...item, sku: newSku };
          }
          let newSku = item.sku.map((sku) => {
            return { ...sku, status: "PLACED" };
          });

          return { ...item, sku: newSku };
        });

        // res.data.forEach((order) => {
        //   orderMap[order.orderId] =
        //     { date: order.dateTime, status: order.status }
        //   // responseMap.set(order.orderId, order.items ? order.items: '')
        // })

        // console.log('ordermap', orderMap);
        // let ordersWithStatus = item.map((order) => {
        //   let status = order.ifCancelled ? "Cancelled" :
        //     orderMap[order.orderId] ? orderMap[order.orderId].status :
        //       'Placed'

        //   let date = order.ifCancelled ? '' :
        //     orderMap[order.orderId] ? orderMap[order.orderId].date :
        //       ''
        //   return {
        //     ...order, status: status,
        //     statusDate: date
        //   }
        // })
        setItems(ordersWithStatus);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [setItems, item]);

  const handleClick = (id) => {
    document.getElementsByName("orderLink " + id)[0].click();
  };

  if (loading) {
    return <div className="mensaLoading"> Loading... </div>;
  }

  return (
    <div className="mensa-orderHistory">
      <div className="heading_logout">
        <div
          className="mensa16800 mensaPageTitle"
          style={{ textShadow: "0.5px 0", letterSpacing: "1px" }}
        >
          MY ORDERS
        </div>
        <a href="/account/logout" className="logout_link">Logout</a>
      </div>
      {!items || items.length === 0 ? <NoOrder /> : <></>}
      {items.map((item) => (
        <>
          <Card onClick={() => handleClick(item.orderId)} content={item} />
          <hr className="separator" />
        </>
      ))}
      <AddressCard address={address} />
    </div>
  );
}

export default App;
