let myLibrary = [];

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
    displayBook();
}

function displayBook (){
    bookList.innerHTML = ""
    myLibrary.forEach(book => {
        const tr = document.createElement("tr")
        const _delete = document.createElement("td")
        const _status = document.createElement("td")
        
        document.querySelectorAll("th[data-book]").forEach(ele => {
            const td = document.createElement("td");
            td.id = `${book.id}-${ele.getAttribute("data-book")}`
            td.textContent = book[ele.getAttribute("data-book")];
            tr.appendChild(td);
        })

        tr.appendChild(_delete);

        const deleteBook = document.createElement("button")
        deleteBook.textContent = "Delete"
        deleteBook.addEventListener('click', () => {
            bookList.removeChild(tr);
            myLibrary = myLibrary.filter(_book => _book.id != book.id)
        });
        _delete.appendChild(deleteBook);

        const status = document.createElement("button")
        status.textContent = "Status"
        status.addEventListener('click', () => {
            book.read = (book.read == "Yes") ? "No": "Yes"
            const td = document.getElementById(`${book.id}-read`)
            td.textContent = book.read
        })
        _status.appendChild(status)
        tr.appendChild(_status);

        
        bookList.appendChild(tr);
        
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


