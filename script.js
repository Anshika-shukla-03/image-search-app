const accessKey = 'O84rvsFsYVH3l92_nFrec1FkWdJ313DYLBx2IW5YNyA';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imageContainer = document.querySelector('.images-container');
const loadMorebtn = document.querySelector('.loadMorebtn');

let page = 1;

// function to fetch images using unsplash api
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imageContainer.innerHTML = '';
        }

        const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach(photo => {
                // creating img div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description || "Image"}"/>`;

                // creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                // Creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = photo.alt_description || "No description";

                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);

                imageContainer.appendChild(imageElement);
            });

            // show or hide load more button
            if (data.total_pages === pageNo) {
                loadMorebtn.style.display = "none";
            } else {
                loadMorebtn.style.display = "block";
            }
        } else {
            imageContainer.innerHTML = `<h2>No image found.</h2>`;
            loadMorebtn.style.display = "none";
        }
    } catch (error) {
        imageContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
        loadMorebtn.style.display = "none";
        console.error(error);
    }
};

// adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        loadMorebtn.style.display = "none";
    }
});

// adding event listener to load more button to fetch more images
loadMorebtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});
