import React, {Component} from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

// Development
//const api_url = 'http://localhost:3001/api/v1/todos'

// Production
const api_url = 'https://jjm-api-rails5.herokuapp.com/api/v1/todos'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      selected_item: null,
      input_title: '',
      input_description: '',
      toggle: true,
    }
    this.updateTodoList = this.updateTodoList.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.getTodos()
  }
  
  getTodos() {
    fetch(api_url)
    .then(response => response.json())
    .then(response_items => {
      this.setState({
        items: response_items.sort()
      })
    })
  }

  updateTodoList(item) {
    let _items = this.state.items
    _items.unshift(item)  //unshift add new element at the begining of the array
    _items.sort()
    this.setState({
      items: _items,
    })
  }

  deleteItem(item) {
    // delete the item on data base
    var deleteURL = api_url + `/${item.id}`
    fetch(deleteURL, {
      method: "DELETE"
    }).then(() => {
      // Client side delete
      var _items = this.state.items
      var index = _items.indexOf(item)
      _items.splice(index, 1)
      this.setState({
        items: _items
      })
    })
  }

  selectItem(item){
    this.setState({
      input_title: item.title,
      input_description: item.description,
      toggle: false,
      selected_item: item
    })
    //console.log(item)
  }

  updateTitle(e){
    this.setState({
      input_title: e.target.value
    })
  }

  updateDescription(e){
    this.setState({
      input_description: e.target.value
    })
  }

  handleEditSubmit(event) {
    event.preventDefault();
    let item = this.state.selected_item
    if(item !== null){
      this.editItem(item)
    } else {
      alert('Please select an item to edit')
    }
  }

  editItem(item) {
    var editURL = api_url + `/${item.id}`
    var new_title = this.state.input_title
    var new_description = this.state.input_description
    const items = this.state.items.sort()
    const id = item.id

    items.map(item => {
      if(item.id === id){
        item.title = new_title
        item.description = new_description
      }
      return item
    })
    
    // delete the item on data base
    fetch(editURL, {
      method: "PUT",
      body: JSON.stringify({
        title: new_title,
        description: new_description,
      }),
      headers: {'Content-Type': 'application/json'},
    }).then(() => {
      // Client side EDIT
      this.setState({
        items: items,
        input_title: '',
        input_description: '',
        toggle: true
      })
    }).catch(error => console.error('Error:', error))
  }

  handleReset(){
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      input_title: "",
      input_description: ""
    })
  }

  handleClose(){
    this.setState({
      toggle: true
    })
  }

  render() {
    const toggle = this.state.toggle
    return(
      <div>
        <h3 className={toggle ? "hide-text" : "show-text"}>Edit the data here:</h3>
        <TodoForm 
          api_url={api_url} 
          updateTodoList={this.updateTodoList} 
          input_title={this.state.input_title}
          input_description={this.state.input_description} 
          toggle={toggle ? "show-text" : "hide-text"}
        />
        {/* EDIT FORM */}
        <form
          onSubmit={this.handleEditSubmit}
          id="todo_form"
          autoComplete="off"
          className={toggle ? "hide-text" : "show-text"}
        >
          <div className="form-group d-flex flex-column" >
            <label className="font-weight-bold">Edit Title:</label>
            <input value={this.state.input_title} onChange={this.updateTitle}/>
            <label className="mt-2 font-weight-bold">Edit Description:</label>
            <input
              value={this.state.input_description} 
              onChange={this.updateDescription}
            />
          </div>
          <button type="submit" className="btn btn-warning font-weight-bold" onClick={this.updateData}>SAVE</button>
          <input type="button" value="Reset" onClick={this.handleReset} className="btn btn-info mx-2" />
          <input type="button" value="Close" onClick={this.handleClose} className="btn btn-danger" />
        </form>
        {/* ## EDIT FORM */}

        <p>{this.state.warning}</p>
        <ul className={toggle ? "show-text" : "hide-text"}>
          {this.state.items.map((item) => (
            <div key={item.id}>
              <TodoItem 
                item={item}
                deleteItem={this.deleteItem} 
                editItem={this.editItem}
                selectItem={this.selectItem}
              />
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList;