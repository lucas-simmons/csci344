// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
  ev.preventDefault(); // overrides default button action

  // Set user's preferences (global variables) from the DOM:
  searchTerm = document.querySelector("#search_term").value;
  openOnly = document.querySelector("#is_open").checked;
  console.log(searchTerm, openOnly);
  // Invoke the show matching courses function
  showMatchingCourses();
};

// Part 1.1a
const isClassFull = (course) => {
  // modify this to accurately apply the filter:
  return course.EnrollmentMax <= course.EnrollmentCurrent;
};

// Part 1.1b
const doesTermMatch = (course) => {
  let match = false;
  if (course.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
    match = true;
  }

  return match;
};
const termBool = (check) => (check ? "Open" : "Closed");
const seats = (course) => {
  if (course.Classification.Open === false) {
    return (
      '<i class="fa-solid fa-circle-xmark"></i>' +
      "Closed, " +
      course.WaitlistAvailable +
      "/" +
      course.WaitlistMax +
      " Wailist Seats Available"
    );
  }
  return (
    '<i class="fa-solid fa-circle-check"></i>' +
    "Open, " +
    course.EnrollmentCurrent +
    "/" +
    course.EnrollmentMax +
    " Seats Available"
  );
};
// Part 1.2
const dataToHTML = (course) => {
  // modify this to be more detailed
  return `
        <section class="course">
        <h2>
            ${course.Code}: ${course.Title}
        </h2>
            <p>${seats(course)} &bull; ${course.CRN} </p>
            <p>${course.Days} &bull; ${course.Location.FullLocation} &bull; ${
    course.Hours
  } Credit Hours</p>
        <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
  console.log(`Search term: ${searchTerm}`);
  console.log(`Only show open classes: ${openOnly}`);
  console.log(`Course data:`, courseList);

  // output all of the matching courses to the screen:
  const container = document.querySelector(".courses");
  container.innerHTML = null;
  let matches = courseList.filter(doesTermMatch);

  matches.forEach((course) => {
    const snippet = dataToHTML(course);
    container.insertAdjacentHTML("beforeend", snippet);
  });
};
