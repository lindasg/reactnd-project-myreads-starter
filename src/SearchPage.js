import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    state = {
    query: '',
    newBooks: [],
    searchErr: false

  }

  getBooks = (event) => {

    const query = event.target.value
    this.setState({ query: query })

  if(query){
      BooksAPI.search(query).then((books) => {
          // if the BookAPI.search worked properly, this would be unnecessary
          if(books.length){

          books.forEach((book, index) => {
            books[index].shelf = "none";
            this.props.booksOnShelf.forEach((bookOnShelf) => {
              if (book.id === bookOnShelf.id) {
                books[index].shelf = bookOnShelf.shelf;
          }
            })
          });

              this.setState({
                  newBooks: books
              });

          }else {
            this.setState({
              newBooks: [],
              searchErr: true
            })
          }

      });
      } else {
      this.setState({
          newBooks: [],
          searchErr: true
      });
  }
};


  render() {

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ this.state.query }
                onChange={ this.getBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { this.state.newBooks.length > 0 && (
              <div>
                  <h3>Search returned { this.state.newBooks.length } books </h3>
                  <ol className="books-grid">
                    {this.state.newBooks.map(book =>
                      <li key={book.id} className="book">

                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: book.imageLinks? "url(" + book.imageLinks.thumbnail + ")" : "grey"
                            }}
                          />

                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={e => {
                              this.props.onChangeShelf(book, e.target.value);
                              book.shelf = e.target.value;
                              }
                            }>
                              <option value="null" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">
                          {book.title}
                        </div>
                        <div className="book-authors">
                          {book.authors &&
                            <div className="book-authors">
                              {book.authors[0]}
                            </div>}
                        </div>
                      </li>
                    )}
                  </ol>
              </div>
            )}
            { this.state.searchErr  && (
              <div>
                <div className=''>
                  <h3>Search returned 0 books.  Please try again!</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
}
export default SearchPage
