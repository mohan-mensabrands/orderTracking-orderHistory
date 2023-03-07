import React from 'react'
import { ProductDisplayCard } from '.'

export default function card({ onClick, content }) {
    var dateFormate = { weekday: "short", month: 'short', day: 'numeric' };
    let date = new Date(content.orderDate.split("+")[0].trim().replace(" ", "T"))
    let orderDate = date.toLocaleDateString("en-US", dateFormate)
    console.log('content', content);
    return (
        <div className="mensaCard">
            <div className="mensaTitle">
                <div className="mensaOrderId mensa14400">Order Id: {content.orderName}</div>
                <div className="mensaOrderDate mensa14400 mensaGreyFont">{orderDate}</div>

            </div>
            <div className="mensaCardContent" onClick={onClick}>
                {
                    content.sku.map(
                        (item) => <ProductDisplayCard
                            product={item}
                            orderStatus={item.status}
                            statusDate={item.statusDate}
                            ifCancelled={content.ifCancelled}
                            promiseDate={item.statusDate}
                        />
                    )
                }
            </div>
        </div>
    )
}
