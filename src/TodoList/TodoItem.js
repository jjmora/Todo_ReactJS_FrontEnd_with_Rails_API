import React from "react"

export default function TodoItem(props) {
  function handleDelete() {
    props.deleteItem(props.item)
  }
  function handleEdit(){
    props.editItem(props.item)
  }
  return(
    <div className="todos-items">
      <li className="shadow-sm d-flex justify-content-between">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">
            {props.item.id} : {props.item.title}
          </span>
          <span>
            {props.item.description}
          </span>
        </div>
        <div>
          <button className="btn btn-warning font-weight-bold mx-2" onClick={handleEdit} >
            Edit
          </button>
          <button className="btn btn-info font-weight-bold" onClick={handleDelete} >
            Delete
          </button>
        </div>
      </li>
    </div>
  )
}
