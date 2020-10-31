import React from "react"

export default function QuotesItem(props) {
  function handleDelete() {
    props.deleteQuote(props.quote)
  }
  return(
    <div>
      <li className="shadow-sm d-flex justify-content-between">
        <span>{props.quote.id} : {props.quote.title}</span>
        <button 
          className="btn btn-info"
          onClick={handleDelete}
          >
          Delete
        </button>
      </li>
    </div>
  )
}
