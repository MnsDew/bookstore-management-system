const prompt = require("prompt-sync")({ sigint: true });

let books = [
  // BOOK ID , BOOK TITLE , AUTHOR , PRICE , QUANTITY
  [1, "Start with Why", "Simon Sinek", 80.0, 13],
  [2, "But How Do It Know", "J. Clark Scott", 59.9, 22],
  [3, "Clean Code", "Robert Cecil Martin", 50.0, 5],
  [4, "Zero to One", "Peter Thiel", 45.0, 12],
  [5, "You Don't Know JS", "Kyle Simpson", 39.9, 9],
];

function addBooks(book_id, book_title, author, price, quantity) {
  for (let i = 0; i < books.length; i++) {
    if (books[i][0] === book_id) {
      console.log("Error: A book with this ID already exists. Cannot add.");
      return;
    }
  }
  books.push([book_id, book_title, author, price, quantity]);
  console.log("Book added successfully!");
}

function updateBooks(book_id, new_title, new_author, new_price, new_quantity) {
  const bookIndex = books.findIndex((book) => book[0] === book_id);

  if (bookIndex !== -1) {
    books[bookIndex][1] = new_title;
    books[bookIndex][2] = new_author;
    books[bookIndex][3] = new_price;
    books[bookIndex][4] = new_quantity;

    console.log(`Book with ID ${book_id} updated successfully!`);
  } else {
    console.log("Invalid ID: No book found with this ID to update.");
  }
}

function deleteBooks(book_id) {
  const bookIndex = books.findIndex((book) => book[0] === book_id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    console.log(`Book with ID ${book_id} deleted successfully!`);
  } else {
    console.log("Invalid ID: No book found with this ID to delete.");
  }
}

function displayBooks(query = null) {
  if (books.length === 0) {
    console.log("No books to display.");
    return;
  }

  let found = false;

  if (query === null) {
    const password = prompt("Please enter the password to see all books: ");
    const correctPassword = "1234";

    if (password === correctPassword) {
      console.log("\n--- All Available Books ---");
      books.forEach((book) => displayBookDetails(book));
    } else {
      console.log("Incorrect password. Access denied.");
    }
  } else {
    if (Array.isArray(query)) {
      query.forEach((id) => {
        const book = books.find((book) => book[0] === id);
        if (book) {
          displayBookDetails(book);
          found = true;
        }
      });
    } else {
      books.forEach((book) => {
        if (
          book[0] === parseInt(query) || 
          book[1].toLowerCase().includes(query.toLowerCase()) ||
          book[2].toLowerCase().includes(query.toLowerCase())
        ) {
          displayBookDetails(book);
          found = true;
        }
      });
    }

    if (!found) {
      console.log(`No book found matching the query: ${query}`);
    }
  }
}

function displayBookDetails(book) {
  console.log(`ID      : ${book[0]}`);
  console.log(`Title   : ${book[1]}`);
  console.log(`Author  : ${book[2]}`);
  console.log(`Price   : $${book[3].toFixed(2)}`);
  console.log(`Quantity: ${book[4]}`);
  console.log("----------------------------");
}

function SellandBill() {
  let wantedQuantity;
  let searchedBook;
  let balance;
  let isFound = false;
  let bookIndex;

  searchedBook = prompt("Enter the title of the book you want: ");
  for (let i = 0; i < books.length; i++) {
    if (books[i][1].toLowerCase().includes(searchedBook.toLowerCase())) {
      console.log("We found the book!");
      isFound = true;
      bookIndex = i;
      break;
    }
  }
  if (!isFound) {
    console.log("No book found with this title.");
    return;
  }

  wantedQuantity = parseInt(prompt("Enter the quantity you want: "));

  if (wantedQuantity <= books[bookIndex][4]) {
    balance = parseFloat(
      prompt("To buy the book and receive a receipt, enter your balance: ")
    );

    let totalPrice = books[bookIndex][3] * wantedQuantity;

    if (balance >= totalPrice) {
      books[bookIndex][4] -= wantedQuantity;
      console.log("\nPurchase Successful! Here is your receipt:");
      console.log("----------------------------------------");
      console.log(`Title   : ${books[bookIndex][1]}`);
      console.log(`Author  : ${books[bookIndex][2]}`);
      console.log(`Price   : $${books[bookIndex][3].toFixed(2)}`);
      console.log(`Quantity: ${wantedQuantity}`);
      console.log(`Total   : $${totalPrice.toFixed(2)}`);
      console.log("----------------------------------------");
      console.log(
        `Remaining Balance: $${(balance - totalPrice).toFixed(2)}\n`
      );
    } else {
      console.log("Sorry, you don't have enough funds to buy this book.");
    }
  } else {
    console.log(
      `\nInsufficient stock. Available quantity: ${books[bookIndex][4]}`
    );
  }
}

function menu() {
  while (true) {
    console.log("\n--- Book Store Management Menu ---");
    console.log("1. Add a book");
    console.log("2. Update a book");
    console.log("3. Delete a book");
    console.log("4. Display all books");
    console.log("5. Display specific books");
    console.log("6. Search for books");
    console.log("7. Buy a book and print a receipt");
    console.log("8. Exit");

    const choice = prompt("Choose an option from 1-8: ");

    switch (choice) {
      case "1":
        const addID = parseInt(prompt("Enter the ID for the book: "));
        const addTITLE = prompt("Enter the title: ");
        const addAUTHOR = prompt("Enter the author name: ");
        const addPRICE = parseFloat(prompt("Enter the price of the book: "));
        const addQUANTITY = parseInt(prompt("Enter the quantity of the book: "));

        addBooks(addID, addTITLE, addAUTHOR, addPRICE, addQUANTITY);
        break;

      case "2":
        const updateID = parseInt(prompt("Enter the ID to update the book: "));

        const bookToUpdate = books.find((book) => book[0] === updateID);

        if (bookToUpdate) {
          const updateTITLE = prompt("Enter the new title: ");
          const updateAUTHOR = prompt("Enter the new author name: ");
          const updatePRICE = parseFloat(prompt("Enter the new price: "));
          const updateQUANTITY = parseInt(prompt("Enter the new quantity: "));

          updateBooks(updateID, updateTITLE, updateAUTHOR, updatePRICE, updateQUANTITY);
        } else {
          console.log("Invalid ID: Cannot update.");
        }
        break;

      case "3":
        const deleteID = parseInt(prompt("Enter the ID to delete the book: "));
        deleteBooks(deleteID);
        break;

      case "4":
        displayBooks();
        break;

      case "5":
        const queryIDs = prompt("Enter the IDs to display (comma-separated):")
          .split(",")
          .map(Number);
        displayBooks(queryIDs);
        break;

      case "6":
        const searchQuery = prompt("Enter ID, title, or author to search: ");
        displayBooks(searchQuery);
        break;

      case "7":
        SellandBill();
        break;

      case "8":
        console.log("Exiting the program... Goodbye!");
        return;

      default:
        console.log("Invalid option: Please choose a valid option.");
    }
  }
}

menu();
