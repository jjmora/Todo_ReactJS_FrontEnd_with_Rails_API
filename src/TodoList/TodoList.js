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

  editItem(item){
    console.log('FROM TODO LIST:')
    console.log(item)
    console.log(item.title)
    console.log(item.description)
    this.setState({
      input_title: item.title,
      input_description: item.description
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
        <ul>
          {this.state.items.map((item) => (
            <div key={item.id}>
              <TodoItem 
                item={item}
                deleteItem={this.deleteItem} 
                editItem={this.editItem} 
              />
            </div>

          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList;