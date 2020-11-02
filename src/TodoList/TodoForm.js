import React, {Component} from "react"

class TodoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      api_url: props.api_url,
      title: "",
      description: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.formSubmit(event.target);
  }

  async formSubmit(formData) {
    var data = new FormData(formData);
    await fetch(this.state.api_url, {
      method: "POST",
      mode: "cors",
      body: data
    }).then(response => response.json())
    .then(response => this.props.updateTodoList(response))
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleReset(){
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      title: "",
      description: ""
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          id="todo_form"
          autoComplete="off">
          <div className="form-group d-flex flex-column">
            <label htmlFor="task_title">Title: </label>
            <input 
              id="task_title"
              type="text"
              name="todo[title]"
              onChange={this.handleTitleChange} 
            />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="task_description">Description: </label>
            <input 
              id="task_description"
              type="text"
              name="todo[description]"
              onChange={this.handleDescriptionChange} 
            /> 
          </div>
            <input type="submit" value="Submit" className="btn btn-primary mb-4" />
            <input type="button" value="Reset" onClick={this.handleReset} className="btn btn-info mx-2 mb-4" />
        </form>

      </div>
    )
  }
}

export default TodoForm;