document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");
    const dogForm = document.getElementById("dog-form");
    let currentDogId = null;
  
    // Fetch dogs and render them in the table
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(dogs => {
          tableBody.innerHTML = ""; // Clear the table before rendering
          dogs.forEach(dog => {
            const row = document.createElement("tr");
  
            row.innerHTML = `
              <td>${dog.name}</td>
              <td>${dog.breed}</td>
              <td>${dog.sex}</td>
              <td><button data-id="${dog.id}">Edit</button></td>
            `;
            
            // Add event listener to the Edit button
            const editButton = row.querySelector("button");
            editButton.addEventListener("click", () => {
              populateForm(dog);
            });
  
            tableBody.appendChild(row);
          });
        });
    }
  
    // Populate the form with the selected dog's details
    function populateForm(dog) {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      currentDogId = dog.id;
    }
  
    // Handle form submission
    dogForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
      };
  
      // Make PATCH request to update dog details
      fetch(`http://localhost:3000/dogs/${currentDogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDog),
      })
        .then(response => response.json())
        .then(() => {
          fetchDogs(); // Re-fetch and update the table
          dogForm.reset(); // Reset the form after submission
        });
    });
  
    // Initial fetch of dogs
    fetchDogs();
  });
  