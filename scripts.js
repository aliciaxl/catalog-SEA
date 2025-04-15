/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

import chairDataset from './data.js';

// This function adds cards the page to display the data in the array
function showCards(chairCatalog) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (let i = 0; i < chairCatalog.length; i++) {
        let chair = chairCatalog[i]

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, chair); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
    };
};

function editCardContent(card, chair) {
    card.style.display = "flex";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = chair.product;

    const cardImage = card.querySelector("img");
    cardImage.src = chair.image;
    cardImage.alt = chair.product + " Card";

    const infoValues = card.querySelectorAll(".info-value");

    const cardProperties = ["designer", "year", "manufacturer", "details"]
    // const cardInfo = cardProperties.map(prop => chair[prop]);

    cardProperties.forEach((prop, index) => {
        infoValues[index].textContent = chair[prop];
    });

    //Attach event listener to remove button as card is edited
    const removeCardBtn = card.querySelector(".remove-card");

    removeCardBtn.addEventListener("click", () => {
        removeCard(chair);
        showCards(chairDataset);
    })
}

function removeCard(chair) {
    for (let i=0; i<chairDataset.length; i++) {
        if (chair.product == chairDataset[i].product) {
            chairDataset.splice(i, 1);
        }
    }
    
}

// function quoteAlert() {
//     console.log("Button Clicked!");
//     alert(
//         "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
//     );
// }

// function removeLastCard() {
//     titles.pop(); // Remove last item in titles array
//     showCards(); // Call showCards again to refresh
// }

//Handle form input checking when submitted
function handleForm(event) {
    const dialog = document.querySelector("dialog");
    const dialogBg = document.querySelector("#dialog-bg");

    //Set max year to current year
    const yearInput = document.querySelector("#year");
    const currentYear = new Date().getFullYear();
    yearInput.max = currentYear;

    const addForm = document.querySelector("#add-form");

    event.preventDefault();

    if (!addForm.checkValidity()) {
        return;
    }

    addToDataset();
    dialog.close(); //Close form
    addForm.reset(); //Reset form fields to empty
    dialogBg.style.display = "none";
}

//Add new form input to dataset
function addToDataset() {
    let image = document.querySelector("#image").value;
    let product = document.querySelector("#product").value;
    let designer = document.querySelector("#designer").value;
    let year = parseInt(document.querySelector("#year").value);
    let manufacturer = document.querySelector("#manufacturer").value;
    let details = document.querySelector("#details").value;

    if (!product) {
        product = "Unknown";
    }

    if (!designer) {
        designer = "Unknown";
    }

    if (!year) {
        year = "Unknown";
    }

    if (!manufacturer) {
        manufacturer = "Unknown";
    }

    if (!details) {
        details = "Unknown";
    }

    if (!image){
        image = "assets/images/default.png";
    }

    chairDataset.push({
        image: `${image}`,
        product: `${product}`,
        designer: `${designer}`,
        year: `${year}`,
        manufacturer: `${manufacturer}`,
        details: `${details}`
    });    

    showCards(chairDataset);
}

//Display search results in real time
function displaySearchResults() {
    const search = document.querySelector("#search");
    const searchValue = search.value.toLowerCase();

    if (!search.value) {
        showCards(chairDataset);
    } else {
        //Search for match in any word of card
        const searchResult = chairDataset.filter(item => 
            item.product.toLowerCase().includes(searchValue) ||
            item.designer.toLowerCase().includes(searchValue) ||
            item.year.toString().includes(searchValue) ||
            item.manufacturer.toLowerCase().includes(searchValue) ||
            item.details.toLowerCase().includes(searchValue) 
        );
        showCards(searchResult);
    };
}

//Call sort function based on sort selection
function handleSort() {
    const sort = document.querySelector("#sort")
    const sortSelection = sort.value;

    if (sortSelection == "productSort") {
        sortByProductName();
    } else if (sortSelection == "designerSortAZ") {
        sortByDesignerAZ();
    } else if (sortSelection == "designerSortZA") {
        sortByDesignerZA();
    } else if (sortSelection == "yearSortNO") {
        sortByYearNO();
    } else if (sortSelection == "yearSortON") {
        sortByYearON();
    }

};

function sortByProductName() {
    chairDataset.sort((a, b) => {
        return a.product.toLowerCase().localeCompare(b.product.toLowerCase());
    });
    showCards(chairDataset);
};

function sortByDesignerAZ() {
    chairDataset.sort((a, b) => {
        return a.designer.toLowerCase().localeCompare(b.designer.toLowerCase());
    });
    showCards(chairDataset);
};

function sortByDesignerZA() {
    chairDataset.sort((a, b) => {
        return b.designer.toLowerCase().localeCompare(a.designer.toLowerCase());
    });
    showCards(chairDataset);
};

function sortByYearNO() {
    chairDataset.sort((a, b) => {
        return b.year - a.year;
    });
    showCards(chairDataset);
};

function sortByYearON() {
    chairDataset.sort((a, b) => {
        return a.year - b.year;
    });
    showCards(chairDataset);
};

//Scroll faster than window default behavior: "smooth"
function scrollToTop() {
    const scroll = setInterval(() => {
        const current = window.scrollY;
        if (current == 0) {
            clearInterval(scroll);
        } else {
            window.scrollBy(0, -80);
        }
    }, 2)
};

//Display caret in invisible search input bar 
function showSearchInput() {
    document.getElementById('search').focus();
}
//Set up all event listeners
function addEventListeners() {
    const dialog = document.querySelector("dialog");
    const dialogBg = document.querySelector("#dialog-bg");
    const addBtn = document.querySelector("#add-btn");
    const cancelBtn = document.querySelector(".cancel-btn")
    const search = document.querySelector("#search");
    const addForm = document.querySelector("#add-form");
    const sort = document.querySelector("#sort")
    const scrollTopBtn = document.querySelector("#back-to-top");
    const searchBtn = document.querySelector("#search-btn");

    addBtn.addEventListener("click", () => {
        dialog.showModal();
        dialogBg.style.display = 'block';
    });
    cancelBtn.addEventListener("click", () => {
        dialog.close();
        dialogBg.style.display = 'none';
    })
    search.addEventListener("keyup", displaySearchResults);
    addForm.addEventListener("submit", handleForm);
    sort.addEventListener("change", handleSort);
    scrollTopBtn.addEventListener("click", scrollToTop);
    searchBtn.addEventListener("click", showSearchInput);
}

document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    showCards(chairDataset);
});