document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const bookTitle = document.getElementById("searchBookTitle").value;
    loadDataFromStorage(bookTitle);
  });
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
