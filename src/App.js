import React from 'react'
import {HashRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from "./SearchPage"
import ListBooks from "./ListBooks"

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
      showSearchPage: false
     */
    books:[]
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  handleChangeShelf = (book: any, shelf: string) => {
      BooksAPI.update(book, shelf).then(response => {
        this.getBooksOnShelf();
      });
    };

  getBooksOnShelf() {
      BooksAPI.getAll().then(data => {
        this.setState({
          books: data
        });
      });
    }

  render() {
      return (
        <HashRouter>
          <div className="app">
            <Route exact path="/" render={() => <ListBooks booksOnShelf={this.state.books} />} />
            <Route
              path="/search"
              render={
                () => <SearchPage onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />
              }
            />
          </div>
        </HashRouter>
        );
      }
    }

export default App;
