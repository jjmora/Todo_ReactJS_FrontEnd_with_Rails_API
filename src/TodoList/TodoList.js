import React, {Component} from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

const api_url = 'http://localhost:3001/api/v1/todos'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
    this.updateTodoList = this.updateTodoList.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
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

  render() {
    return(
      <div>
        <TodoForm 
          api_url={api_url} 
          updateTodoList={this.updateTodoList} />
        <ul>
          {this.state.items.map((item) => (
            <TodoItem 
              key={item.id}
              item={item}
              deleteItem={this.deleteItem} 
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList;