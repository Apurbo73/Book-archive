const searchInputField = document.getElementById('search-input-field');
const displayingShowBooks = document.getElementById('displaying-books');
const spinner = document.getElementById('loading-spinner');
spinner.style.display = 'none';
const totalResult = document.getElementById('total-result');
const errorMessageOne = document.getElementById('first-error-handle');
const errorMessageTwo = document.getElementById('second-error-handle');

//  Book searching

const searchBooks = () => {
    const searchText = searchInputField.value;
    searchInputField.value = '';

    if (searchText === '') {
        //  First Error Handling
        errorMessageOne.style.display = 'block';


        // Clearing Display
        displayingShowBooks.innerText = '';
        totalResult.style.display = 'none';
        errorMessageTwo.style.display = 'none';


    }
    else {
        // Loading Spinner
        spinner.style.display = 'block';


        // Clearing Display
        displayingShowBooks.innerText = '';
        totalResult.style.display = 'none';
        errorMessageOne.style.display = 'none';
        errorMessageTwo.style.display = 'none';


        // Fetching Data
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => showBooks(data))

    }

}

// Show Books Start

const showBooks = (books) => {
    //  Found Result Showing 
    totalResult.style.display = 'none';
    totalResult.innerHTML = `
    <h2 class="text-center fw-bold text"> Showing <span class=" text-warning">${books.docs.length}</span> results out of <span class=" text-count"> ${books.numFound}</span> </h2> 
    `



    // Second Error Handling
    if (books.docs.length === 0) {
        errorMessageTwo.style.display = 'block';
    } else if (books.docs.length > 0) {
        totalResult.style.display = 'block';
        errorMessageTwo.style.display = 'none';
    }

    // Spinner
    spinner.style.display = 'none';


    displayingShowBooks.innerText = '';
    const allBooks = books.docs;
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-5" style="height: 250px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title"><span class="text">Book Name :</span> ${book.title ? book.title : 'N/a'}</h5>
                 <h5><span class="text">Author Name: </span> ${book.author_name ? book.author_name[0] : 'N/a'}</h5>
                <h5><span class="text">Publisher Name: </span> ${book.publisher ? book.publisher[0] : 'N/a'}</h5>
                <h5><span class="text">First Published Date: </span> ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
            </div>
        </div>
        `
        displayingShowBooks.appendChild(div);

    });
}

