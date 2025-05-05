// 2. Define businessToHTML here:

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

/****************/
/* Testing Code */
/****************/

const businessObjPriceDefined = {
  id: "d8Vg0DxRY-s2a8xnZ6ratw",
  name: "Chestnut",
  rating: 4.5,
  image_url:
    "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
  display_address: "48 Biltmore Ave, Asheville, NC 28801",
  coordinates: { latitude: 35.5931657, longitude: -82.550943 },
  price: "$$",
  review_count: 1257,
};

const businessObjPriceNotDefined = {
  id: "d8Vg0DxRY-s2a8xnZ6ratw",
  name: "Chestnut",
  rating: 4.5,
  image_url:
    "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
  display_address: "48 Biltmore Ave, Asheville, NC 28801",
  coordinates: { latitude: 35.5931657, longitude: -82.550943 },
  review_count: 1257,
};

// uncomment this line when you've finished with Q2A:
console.log(
  "HTML representation of a business:",
  businessToHTML(businessObjPriceDefined)
);
console.log(
  "HTML representation of a business (no price):",
  businessToHTML(businessObjPriceNotDefined)
);
