//get byId
const getById = (id) => {
    return document.getElementById(id)
}

//Function to get search text
const getInputValue = (id) => {
    const inputField = document.getElementById(id);
    const inputText = inputField.value;
    inputField.value = '';
    return inputText;
}

//fetch data
const fetchData = async (url) => {
    const res = await fetch(url);
    return res.json();
}

//After clicking on search button
const searchBooks = async () => {
    const searchText = getInputValue('seach-text');

    // get message section
    const message = getById('message');
    message.classList = 'text-center d-none';
    const messageText = getById('message-text')

    //Get books display section
    const allBooks = getById('allBooks');
    const showTotal = getById('total-count');

    //clear total count and previos loaded data
    showTotal.innerHTML = '';
    allBooks.innerHTML = '';


    if (searchText === '') {
        messageText.innerText = 'Please write something to search !!'
        message.classList = 'text-center d-block'
    } else {
        // visible spinner
        const spinner = getById('spinner');
        spinner.classList = 'd-flex justify-content-center d-block'

        //make url using search text and fetch data
        const bookUrl = `https://openlibrary.org/search.json?q=${searchText}`;
        const books = await fetchData(bookUrl);
        const totalBooks = books.numFound;

        // hide spinner after load
        spinner.classList = 'd-flex justify-content-center d-none';

        if (totalBooks === 0) {
            messageText.innerText = 'No Books Found !!'
            message.classList = 'text-center d-block'
        } else {
            showTotal.innerText = `${totalBooks} Books Found`;
            books.docs.forEach(async book => {
                let imgUrl, publishDate;
                if (!book.cover_i) {
                    imgUrl = 'image/no-image.jpg'
                } else {
                    imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                }
                if (!book.publish_date) {
                    publishDate = 'No date availabe'
                } else {
                    publishDate = book?.publish_date[0]
                }
                const col = document.createElement('div');
                col.classList = 'col';
                col.innerHTML = `
                    <div class="card">
                        <img height="495" width="349"  src="${imgUrl}" class="card-img-top" alt="cover-image">
                        <div class="card-body">
                            <h3 class="card-title">Title: ${book.title.substring(0, 15)}</h3>
                            <h6>Authon: ${book.author_name}</h6>
                            <h6>First Published: ${publishDate}</h6> 
                        </div>
                    </div> 
                `;
                allBooks.append(col);
            })
        }
    }

}