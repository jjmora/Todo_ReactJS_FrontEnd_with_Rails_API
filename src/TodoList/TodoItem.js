import React from "react"

export default function TodoItem(props) {
  function handleDelete() {
    props.deleteItem(props.item)
  }
  function handleEdit(){
    props.editItem(props.item)
  }
  function handleSelection(){
    props.selectItem(props.item)
  }
  return(
    <div className="todos-items" onClick={handleSelection}>
      <li className="shadow-sm d-flex justify-content-between">
        <div className="d-flex flex-column">
          <span className="font-weight-bold">
            {props.item.id} : {props.item.title}
          </span>
          <span>
            {props.item.description}
          </span>
          {/* <span>
            <p><i><small>Title: {props.item.id} </small></i></p>
            <p><i><small>Description:</small></i></p>
          </span> */}
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
