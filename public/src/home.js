function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
 return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((checkedOut,book)=>{
    if (!book.borrows[0].returned){
      checkedOut++; } return checkedOut;
    }, 0);
}
function getMostCommonGenres(books) {
  //reducing the books array by genre into an object
  let genreCounts = books.reduce((acc, book) => {
    //looks to see if the genre exists in the first iteration
    if(acc[book.genre]){
      //if it does, the count is raised by 1
        acc[book.genre].count++
    } else{
      //if the genre didn't exist then create the object with the genre and starting count of 1
        acc[book.genre]={name: book.genre, count: 1}
    }
    return acc;
},{});
//now that the object has been filled
//create an array with the information in the genreCounts object using map()
//else it can't be sorted
let genres = Object.keys(genreCounts).map((name) =>
genreCounts[name]
)
//sort the array by highest number of count to lowest
let sortedGenres = genres.sort((genA, genB) =>
  genA.count < genB.count ? 1: -1)
  //slice the sorted array to only return the top 5
  return _slicer(sortedGenres);
}


function getMostPopularBooks(books) {
  let reduBooks = books.reduce((acc, book) => {
    if(acc[book.borrows]){
        acc[book.borrows].count++
    } else{
        acc[book.borrows]={name: book.title, count: book.borrows.length}
    }
    return acc;
},{});
const mappedBooks = Object.keys(reduBooks).map((title) =>
reduBooks[title]
)
const popBooks = mappedBooks.sort((genA, genB) =>
  genA.count < genB.count ? 1: -1);
  return _slicer(popBooks);

}
//this is my helper function which takes in an array and
//returns only the first 5 values
function _slicer(incoming){
  return incoming.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  return books.map(book => {
    const author = authors.find(author => author.id === book.authorId)
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length
    }
  }).sort((a,b) => b.count - a.count).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
