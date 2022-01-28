const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");
  if (isCompleted) {
    actionContainer.append(createUndoneButton(), createDeleteButton());
  } else {
    actionContainer.append(createDoneButton(), createDeleteButton());
  }

  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book_item");
  bookContainer.append(bookTitle, bookAuthor, bookYear, actionContainer);

  return bookContainer;
}

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookIsCompleted = document.getElementById(
    "inputBookIsComplete"
  ).checked;
  let book = makeBook(bookTitle, bookAuthor, bookYear, bookIsCompleted);
  let bookObject = composedBookObject(
    bookTitle,
    bookAuthor,
    bookYear,
    bookIsCompleted
  );
  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (bookIsCompleted) {
    completedBookList.append(book);
  } else {
    uncompletedBookList.append(book);
  }
  updateDataToStorage();
}

function addBookCompleted(bookElement) {
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor =
    bookElement.querySelectorAll(".book_item > p")[0].innerText;
  const bookYear = bookElement.querySelectorAll(".book_item > p")[1].innerText;
  const bookIsCompleted = true;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, bookIsCompleted);
  const book = findBook(bookElement[BOOK_ITEMID]);

  book.isCompleted = bookIsCompleted;
  newBook[BOOK_ITEMID] = book.id;

  listCompleted.append(newBook);
  bookElement.remove();
  updateDataToStorage();
}

function moveBookToUncompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor =
    bookElement.querySelectorAll(".book_item > p")[0].innerText;
  const bookYear = bookElement.querySelectorAll(".book_item > p")[1].innerText;
  const bookIsCompleted = false;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, bookIsCompleted);
  const book = findBook(bookElement[BOOK_ITEMID]);

  book.isCompleted = bookIsCompleted;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function createButton(buttonText, buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });

  return button;
}

function createDoneButton() {
  return createButton("Selesai Dibaca", "green", function (event) {
    addBookCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoneButton() {
  return createButton("Belum Selesai Dibaca", "green", function (event) {
    moveBookToUncompleted(event.target.parentElement.parentElement);
  });
}

function createDeleteButton() {
  return createButton("Hapus Buku", "red", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function refreshDataFromBooks() {
  let listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  listUncompleted.innerHTML = "";
  listCompleted.innerHTML = "";
  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}
