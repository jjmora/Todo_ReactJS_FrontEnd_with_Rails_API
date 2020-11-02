import React, {Component} from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

// Development
// const api_url = 'http://localhost:3001/api/v1/todos'

// Production
const api_url = 'https://jjm-api-rails5.herokuapp.com/api/v1/todos'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      input_title: '',
      input_description: ''
    }
    this.updateTodoList = this.updateTodoList.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)

  }

  componentDidMount() {
    this.getTodos()
  }

  getTodos() {
    fetch(api_url)
    .then(response => response.json())
    .then(response_items => {
      this.setState({
        items: response_items
      })
    })
  }

  updateTodoList(item) {
    let _items = this.state.items
    _items.unshift(item)
    this.setState({
      items: _items
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
    console.log(item)
    this.setState({
      input_title: item.title,
      input_description: item.description
    })
  }

  updateTitle(e){
    console.log('title updating')
    this.setState({
      input_title: e.target.value
    })
  }

  updateDescription(e){
    console.log('description updating')
    this.setState({
      input_description: e.target.value
    })
  }

  handleEditSubmit(event) {
    event.preventDefault();
  }

  editItem(item) {
    // delete the item on data base
    var deleteURL = api_url + `/${item.id}`
    fetch(deleteURL, {
      method: "PUT",
      body: {
        title: 'TITLE',
        description: 'DESCRIPTIOIN'
      }
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



  render() {
    return(
      <div>
        <TodoForm 
          api_url={api_url} 
          updateTodoList={this.updateTodoList} 
          input_title={this.state.input_title}
          input_description={this.state.input_description} 
        />
        <form
          onSubmit={this.handleEditSubmit}
          id="todo_form"
          autoComplete="off">

          <div className="form-group d-flex flex-column" >
            <label>Title:</label>
            <input value={this.state.input_title} onChange={this.updateTitle}/>
            <label>Description:</label>
            <input className="" value={this.state.input_description} onChange={this.updateDescription}/>
          </div>
          <button type="submit" className="btn btn-warning mb-3" onClick={this.updateData}>Edit</button>
        </form>

        <ul>
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