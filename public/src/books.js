function findAuthorById(authors, id) {
  return authors.find((matchingAuth) => matchingAuth.id === id);
}

function findBookById(books, id) {
  return books.find((matchingID) => matchingID.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => !book.borrows[0].returned);
  const returned = books.filter(book => book.borrows[0].returned);
  return [borrowed,returned];
}

function getBorrowersForBook(book, accounts) {
  //declare variable for the book object
  const loaned = book.borrows
//get id and returned status 
  const borrowers = loaned.map(({ id, returned })=> {
    // find the account that matches the borrower's id
    const account = accounts.find(account => account.id === id);

    // return the matching account info
    return {
      //using the spread operator
      ...account,
      //also include the returned information from above
      returned,
    };
  });
  //return only 10 entries
  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
