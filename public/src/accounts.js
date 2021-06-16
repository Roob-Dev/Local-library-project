function findAccountById(accounts, id) {
  return accounts.find((matchingID) => matchingID.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) => 
  a.name.last.toLowerCase() > b.name.last.toLowerCase()? 1:-1);
}


function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let counter = 0;
//anonymous function to check the borrows object
  books.forEach(book => 
    book.borrows.forEach(borrowed => {
      //check to see if the account id matches borrows.id, if so add 1 to the counter
    if(accountId === borrowed.id) counter++;}
    ));
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
//
  let checkedOut = books.filter((book) => book.borrows.some(loaned => 
    !loaned.returned && loaned.id === accountId)
  );
  //using the checkedOut array, check to see if the author ID matches in 
  //author.id as well as book.authorId
    checkedOut.forEach(book => 
      book.author = authors.find(author => book.authorId === author.id)
    );
    
    return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
