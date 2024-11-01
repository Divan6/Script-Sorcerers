// form submission
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const emailInput = document.getElementById('email-input').value;
    
    if (emailInput) {
      
        localStorage.setItem('subscribedEmail', emailInput);
        
        alert('Successfully subscribed!');
        window.location.href = '#';
        
        document.getElementById('email-input').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});


// searching and scrolling 
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase(); // Get and normalize search query
    const headings = document.querySelectorAll('h5'); 
    let found = false;

    // Loop through each h5 element to find a match
    headings.forEach((heading) => {
        if (heading.textContent.toLowerCase().includes(searchQuery)) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
            heading.style.backgroundColor = '#ffff99'; 
            found = true;

            
            setTimeout(() => {
                heading.style.backgroundColor = '';
            }, 10);
        }
    });

    if (!found) {
        alert('No matching results found');
    }
});

// API TEST
console.log("Linked")

const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

!async function name(params) {
    
}

!async function ()
{
    let data = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=Naruto", requestOptions)
        .then((response) => response.text())
        .then((result) => 
        { 
            return result;
        }
    )
    .catch((error) => console.error(error));

    DisplayMovies(data);
}();


function DisplayMovies(dataToDisplay)
{
    let animeObject = JSON.parse(dataToDisplay);
    console.log(animeObject.data);

}
