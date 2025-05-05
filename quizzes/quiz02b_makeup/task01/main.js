// 1. Define getBusinesses here:
//      Sample endpoint:
//      https://www.apitutor.org/yelp/simple/v3/businesses/search?q=tacos&location=Asheville+NC&limit=6

async function getBusinesses(location, search_term, num_results) {
  const rootURL = "https://www.apitutor.org/yelp/simple/v3/businesses/search";
  const endpoint = `${rootURL}?q=${search_term}&location=${location}&limit=${num_results}`;
  response = await fetch(endpoint);

  jsonData = await response.json();

  return jsonData.forEach((n) => console.log(n.name));
}

/****************/
/* Testing Code */
/****************/
// uncomment these lines of code when you've finished with Q1, and
// preview index.html in the browser using Live Server.

console.log(
  "Should display 3 pizza restaurants in Asheville:",
  getBusinesses("Asheville, +NC", "pizza", 3)
);

console.log(
  "Should display 10 thai restaurants in San Francisco:",
  getBusinesses("San Francisco, +CS", "thai", 10)
);
