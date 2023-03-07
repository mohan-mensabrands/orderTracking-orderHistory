import React from 'react'

export default function AddressCard({address}) {
    let add = ''
    try {
     add = JSON.parse(address.customerAddress);
    } catch (error) {
        return(<></>)
    }

    const nullCheck = (element) => {
        return element === null ? '' : element
    }
   
  return (
    <div className="mensaCard">
        <div className="mensaTitle mensa16800">ACCOUNT DETAILS</div>
        <div className="mensaAddressContent mensa14400">
            <div className='mensaName-email'>
                <div className='mensaCustomerName'>{address.customerName}</div>
                <div className="mensaCustomerEmail">{address.customerEmail}</div>
            </div>
            <div className='mensaDefaultAddress'>
                <div className="mensaDefaultAddressName">
                    {add.name}
                </div>
                <div className="mensaDefaultAddress1">
                    {`${nullCheck(add.address1)} ${add.address1 ? ',' : ''} ${nullCheck(add.address2)}`}
                </div>
                <div className="mensaDefaultAddress2">
                    {`${nullCheck(add.zip)} ${nullCheck(add.city)} ${nullCheck(add.province)}`}
                </div>
                <div className="mensaDefaultCountry">
                    {`${nullCheck(add.country_name)}`}
                </div>
            </div>
        </div>
    </div>
  )
}
