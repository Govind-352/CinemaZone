const loadDataBtn = document.getElementById('load-data-btn');
const dataContainer = document.getElementById('data-container');

// unsplash Api
let query = 'nature'; // initial query

loadDataBtn.addEventListener('click', () => {
    const ACCESS_KEY = 'EY68mO9GvW5A0ix2b2-06TVD9AnRmSeHCJ_B2Af8ghc';
    query = getNextQuery(query); // get the next query
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`)
        .then(response => response.json())
        .then(data => {
            dataContainer.innerHTML = ''; // clear previous content
            data.results.forEach(result => {
                const img = document.createElement('img');
                img.src = result.urls.regular;
                img.alt = result.description || result.alt_description;
                dataContainer.appendChild(img);
            });
            console.log(data)

        })
        .catch(error => {
            console.error(error);
            alert("Failed to fetch images");
        });
});

function getNextQuery(currentQuery) {
    // implement your logic here to get the next query
    // for example, you can use an array of queries and cycle through them
    const queries = ['nature', 'mountains', 'shoes', 'animals'];
    const currentIndex = queries.indexOf(currentQuery);
    const nextIndex = (currentIndex + 1) % queries.length;
    return queries[nextIndex];
}

