const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(searchTitle = "") {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    if (searchTitle) {
      books = data.filter((x) => {
        for (let y of x.title.split(" ")) {
          if (y === searchTitle || y.toUpperCase() === searchTitle) {
            return y;
          }
        }
      });
    } else {
      books = data;
    }
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composedBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }

  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}
