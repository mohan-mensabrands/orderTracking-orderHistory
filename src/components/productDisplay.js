import React from 'react'

export default function productDisplay({ product, ifCancelled, orderStatus, promiseDate }) {
    console.log('content--> product', product, promiseDate)
    let status = orderStatus ? orderStatus:"PLACED"
    return (
        <div className='mensaProductCard'>
            <img className='mensaProductImageThumb' src={product.image} alt={product.title} />
            <div className="mensaProductCardBody">
                <DeliveryStatus
                    ifCancelled={ifCancelled}
                    promiseDate={promiseDate}
                    status={status}
                />
                <div className="mensaProductNameandQty">
                    <div className='mensaProdctTitle mensa14400 mensaDrakGreyFont'>{product.title}</div>
                    <div className="mensaProductSize-qty">
                        {product.attributes.map(item =>
                            <div className='mensaProductSize mensa12400 mensaDrakGreyFont'>{item}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


const DeliveryStatus = ({ ifCancelled, promiseDate, status }) => {
    var dateFormat = { weekday: "short", month: 'short', day: 'numeric' };

    let date = promiseDate ?
        new Date(promiseDate.split("+")[0].trim().replace(" ", "T"))
            .toLocaleDateString("en-US", dateFormat) :
        ''

    let statusMap = {
        CREATED: 'Placed on',

    }
    if (ifCancelled) {
        return (
            <div className="mensaDelStatus mensaCancelledOrder">
                <div className="mensaStatusValue mensa14700 mensaCancelledStatus">
                    Cancelled
                </div>
            </div>
        )
    }

    // if (!promiseDate) {
    //     return (
    //         <div className="mensaDelStatus">
    //             <div className="mensaStatusValue mensa14700 mensaOrderConfirmed">
    //              Confirmed
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="mensaDelStatus">
            <div className={`mensaStatusValue mensa14700 mensa${status}`}>
                {statusMap[status] ? statusMap[status] : status}
            </div>
            <div className="mensaStatusDate mensa14400 mensaGreyFont mensaPromiseDate">
                {date}
                {/* {typeof(date)!== 'string' ? date.toLocaleDateString("en-US", dateFormat) : ''} */}
            </div>
        </div>
    )

}