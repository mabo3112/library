const books = document.querySelector(".books");
const newBook = document.querySelector(".newBookBtn");
const newBookAuthor = document.querySelector(".newBookAuthor");
const newBookTitle = document.querySelector(".newBookTitle");
const newBookPages = document.querySelector(".newBookPages");
const read = document.querySelector(".read");

const myLibrary = [];
const displayedBooks = [];

const Harry = new Book("Autherine", "Harry Potter", 342, false);
const Potter = new Book("Autherine", "Harry Potter", 342, false);
const Lotter = new Book("Autherine", "Harry Potter", 342, false);

myLibrary.push(Harry, Potter, Lotter);
console.log(myLibrary.length);
displayBooks();



newBook.addEventListener("click", () => {
    addBookToLibrary(newBookAuthor.value , newBookTitle.value, newBookPages.value, read.checked)
    displayBooks();
    newBookAuthor.value = "";
    newBookTitle.value = "";
    newBookPages.value = "";
    read.checked = false;
});

function Book(author, title, pages, beenRead) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.beenRead = beenRead;
    this.id = crypto.randomUUID();

}

function addBookToLibrary(author, title, pages, beenRead) {
    const newBook = new Book(author, title, pages, beenRead);
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        const displayedBookIndex = displayedBooks.findIndex(displayedId => displayedId === id);
        if (displayedBookIndex !== -1) {
            displayedBooks.splice(displayedBookIndex, 1);
        }
    }
}

function displayBooks() {
    myLibrary.forEach(element => {
        if (displayedBooks.includes(element.id)) {
            return;
        }
        const book = document.createElement("div");
        book.classList.add("book");
        const author = document.createElement("p");
        const title = document.createElement("p");
        const pages = document.createElement("p");
        const beenRead = document.createElement("input");
        beenRead.type = "checkbox";
        beenRead.checked = element.beenRead;
        const removeBtn = document.createElement("button");
        const BtnIcon = document.createElement("i");
        BtnIcon.classList.add("fa", "fa-trash");
        removeBtn.appendChild(BtnIcon);
        removeBtn.classList.add("removeBtn");
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(element.id);
            books.removeChild(book);
        });
        author.textContent = element.author;
        title.textContent = element.title;
        pages.textContent = element.pages;
        beenRead.textContent = element.beenRead;


        book.appendChild(author);
        book.appendChild(title);
        book.appendChild(pages);
        book.appendChild(beenRead);
        book.appendChild(removeBtn);

        books.appendChild(book);
        displayedBooks.push(element.id);


    });
    


}