const myLibrary = [];

const bookDialog = document.getElementById("bookDialog")
const bookform = bookDialog.querySelector("#bookform");
const booktable = document.getElementById("bookTable");
let bookList = document.getElementById("bookList");

const title = bookDialog.querySelector("#title");
const author = bookDialog.querySelector("#author");
const pages = bookDialog.querySelector("#pages");
const read = bookDialog.querySelector("#read");

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}, ${this.id}`
    }  
}

function addBookToLibrary(title,author,pages,read) {
  // take params, create a book then store it in the array
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
    displayBook(myLibrary);
}

function displayBook (myLibrary){
    bookList.innerHTML = ""
    myLibrary.forEach(book => {
        const tr = document.createElement("tr")
        const _title = document.createElement("td")
        const _author = document.createElement("td")
        const _pages = document.createElement("td")
        const _read = document.createElement("td")
        const _id = document.createElement("td")
        const _delete = document.createElement("td")
        
        _title.appendChild(document.createTextNode(book.title))
        _author.appendChild(document.createTextNode(book.author))
        _pages.appendChild(document.createTextNode(book.pages))
        _read.appendChild(document.createTextNode(book.read))
        _id.appendChild(document.createTextNode(book.id))

        const elems = [_title, _author, _pages, _read, _id, _delete]
        elems.forEach((ele) => tr.appendChild(ele))


        bookList.appendChild(tr);

        const deleteBook = document.createElement("button")
        deleteBook.textContent = "Delete"
        deleteBook.addEventListener('click', () => {
            bookList.removeChild(tr);
        });
        _delete.appendChild(deleteBook);
    });
}


const addBook = document.getElementById("addBook");
addBook.addEventListener('click',function(){
    if(title.value != "" && author.value !="" && pages.value != "" && read.value !=""){
        bookDialog.close()
    }
    
});

const newBook = document.getElementById("newBook");
newBook.addEventListener('click',function(){
    bookDialog.showModal()
    bookform.reset();
});

bookform.addEventListener('submit', function (event){
    event.preventDefault();
    addBookToLibrary(title.value,author.value,pages.value,(read.checked ? "Yes": "No"));
});


