const searchInput = document.querySelector("input");

const destinations = document.querySelectorAll(".destination");

const destinationsContainer = document.querySelector("main");

var noDestination;

// Clear <input>
searchInput.value = "";

// If search result has no result, display a message to the user
const displayNoMatchFound = () => {
  // If true and h3 doesnt exist already :
  if (noDestination && !document.querySelector("h3")) {
    // Create an h3 and add it to the <main>
    const h3 = document.createElement("h3");
    const textNode = document.createTextNode("Pas de résultat");
    h3.appendChild(textNode);
    destinationsContainer.appendChild(h3);
    // h3 fade in animation
    gsap.to(h3, { autoAlpha: 1, y: 150 });
  }
};

// Hide "no result message"
const hideNoMatchFound = () => {
  const h3 = document.querySelector("h3");
  if (!noDestination && h3) {
    h3.remove();
  }
};

// Detect when user just released a key on the input
searchInput.onkeyup = () => {
  // Get the input value in lowercase
  const userInput = searchInput.value.toLowerCase();

  // Loop through each destination
  destinations.forEach((destination) => {
    // Get current destination text value in lowercase
    const cityName = destination.querySelector("h2").innerText.toLowerCase();

    // Hide destination animation
    const vanishCard = gsap
      .to(destination, {
        scale: 0,
        duration: 0.3,
        onComplete: () => {
          // When animation is completed : remove destination from the DOM
          destination.remove();
          // Check if all <div class="destination"> are removed
          noDestination =
            document.querySelectorAll(".destination").length === 0;

          // Display a message to the user
          displayNoMatchFound();
        },
      })
      .pause();

    // Show destination animation
    const showCard = gsap
      .to(destination, {
        scale: 1,
        duration: 0.3,
      })
      .pause();

    // If card destination contains user input --> We need to show this destination in the results
    if (cityName.includes(userInput)) {
      // We make sure the card doesnt already exist in the parent container (<main>)
      if (!destinationsContainer.contains(destination)) {
        // If it doesnt exist, we add it to the container
        destinationsContainer.appendChild(destination);
        // Play show destination animation
        showCard.play();
      }

      // Check if all <div class="destination"> are removed
      noDestination = document.querySelectorAll(".destination").length === 0;
      hideNoMatchFound();
      return;
    }

    // If card destination doesnt contains user input --> We need to hide this destination in the results
    if (destinationsContainer.contains(destination)) {
      // Play hide destination animation
      vanishCard.play();
    }
  });
};

// When user clicks on <div class="search">
document.querySelector(".search").addEventListener("click", (event) => {
  // Sets focus on the <input>
  searchInput.focus();
  // Animate glass
  gsap.to(".fa-magnifying-glass", {
    rotation: 360,
    onComplete: () => gsap.set(".fa-magnifying-glass", { clearProps: "all" }),
  });
});
