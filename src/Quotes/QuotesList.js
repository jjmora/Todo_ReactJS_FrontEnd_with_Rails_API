import React, {Component} from "react"
import QuotesItem from "./QuotesItem"

const api_url = 'http://localhost:3001/api/v1/todos'

class QuotesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quotes: []
    }
    this.deleteQuote = this.deleteQuote.bind(this)
  }

  componentDidMount() {
    this.getQuotes()
  }

  getQuotes() {
    fetch(api_url)
    .then(response => response.json())
    .then(response_items => {
      this.setState({
        quotes: response_items
      })
    })
  }

  deleteQuote(quote) {
    // delete the quote on data base
    var deleteURL = api_url + `/${quote.id}`
    fetch(deleteURL, {
      method: "DELETE"
    }).then(() => {
      var _quotes = this.state.quotes
      var index = _quotes.indexOf(quote)
      _quotes.splice(index, 1)
      this.setState({
        quotes: _quotes
      })
    })
  }

  render() {
    return(
      <div>
        <ul>
          {this.state.quotes.map((quote) => (
            <QuotesItem 
              key={quote.id}
              quote={quote}
              deleteQuote={this.deleteQuote} 
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default QuotesList;