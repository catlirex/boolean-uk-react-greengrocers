function displayInvoiceDetail(id){
    document.getElementById(id+"invoice").style.display === "block"
    ? document.getElementById(id+"invoice").style.display = "none"
    : document.getElementById(id+"invoice").style.display = "block"
  }

function InvoiceCard({invoice}){
    const {id, items, date} = invoice
    let invoiceTotal = 0
    items.map(target=>{invoiceTotal += target.quantity * target.price})
    return(
        <div className="card" >
      <div className="small-card">
        <div>
          <span>Date: {date.slice(0,10)}</span>
          <span>Total:${invoiceTotal.toFixed(2)}</span>
        </div>
        <button className="detail-btn" onClick={()=>displayInvoiceDetail(id)}> details </button>
      </div>
      <ul className="invoice-list" id={id+"invoice"}>
        {items.map((target,index)=>(
            <li className="invoice-item" key={index.toString()}>
            <img className="cart--item-icon" src={target.img!==undefined? target.img:`assets/icons/${target.id}.svg`} alt={target.name}/>
              <span>{target.name} x {target.quantity}</span> <span>£{target.price}/each</span>
            </li>
        ))}

      </ul>
    </div>
    )
}

export default InvoiceCard