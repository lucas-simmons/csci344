async function getBusinesses(location, search_term, num_results) {
  const rootURL = "https://www.apitutor.org/yelp/simple/v3/businesses/search";
  const endpoint = `${rootURL}?q=${search_term}&location=${location}&limit=${num_results}`;
  response = await fetch(endpoint);

  jsonData = await response.json();

  return jsonData;
}

const businessToHTML = (data) => {
  return `
      <section class="business">
          <h2>${data.name}</h2>
          <h1>${data.rating} stars</h1>
          <img src="${data.image_url}" alt="image of business">
          <div>
          <p>Address: ${data.display_address}</p>
          <p>Price: ${data.price}</p>
          <p>Reviews: ${data.review_count}</p>
    
      `;
};

// your code here:
async function search() {
  console.log();
  const term = document.querySelector("#term").value;
  const location = document.querySelector("#location").value;
  console.log(term, location);

  let businesses = await getBusinesses(location, term, 10);

  const container = document.querySelector("#results");

  console.log(businesses);

  businesses.forEach((business) => {
    const snippet = businessToHTML(business);
    console.log(snippet);
    container.insertAdjacentHTML("beforeend", snippet);
  });

  // complete this function by invoking your getBusinesses function,
  // iterating through the results, and adding an HTML representation
  // of each business to the DOM.
}
