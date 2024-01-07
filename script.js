function initializeDecisions() {
  let storedData = localStorage.getItem("decisionsData");
  if (storedData) {
    let decisionsData = JSON.parse(storedData);
    console.log("Retrieved Data:", decisionsData);

    // Display decisions
    let decisionsContainer = document.getElementById("decisionsContainer");
    decisionsData.forEach((decision) => {
      let decisionBox = document.createElement("div");
      decisionBox.className = "decision-box";
      decisionBox.innerHTML =
        `<div class="checkicons">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </div>` +
        '<i class="fa fa-th-large delete-icon" aria-hidden="true"></i>' +
        "<strong>Name:</strong> " +
        `  <h6>${decision.name}</h6>` +
        "<br><strong>Description:</strong> " +
        `  <p>${decision.description}</p>` +
        '   <button class="btndecison">Take Decison</button>' +
        '<i class="fa fa-trash delete-icon" aria-hidden="true" onclick="deleteDecision(this)"></i>';

      decisionsContainer.appendChild(decisionBox);
    });
  }
}

// Function to save a decision to local storage
function saveDecision(name, description) {
  let decisionsData = JSON.parse(localStorage.getItem("decisionsData")) || [];
  decisionsData.push({ name: name, description: description });
  localStorage.setItem("decisionsData", JSON.stringify(decisionsData));
}

// Function to delete a decision from local storage
function deleteDecision(element) {
  let decisionBox = element.parentNode;
  decisionBox.parentNode.removeChild(decisionBox);

  // Implement logic to update local storage after deleting
  let decisionsData = JSON.parse(localStorage.getItem("decisionsData")) || [];
  // Get the index of the decision to be deleted
  let index = Array.from(decisionBox.parentNode.children).indexOf(decisionBox);
  decisionsData.splice(index, 1);
  localStorage.setItem("decisionsData", JSON.stringify(decisionsData));
}

document.getElementById("openFormBtn").addEventListener("click", function () {
  $("#myModal").modal("show");
});

document
  .getElementById("saveDecisionBtn")
  .addEventListener("click", function () {
    let name = document.getElementById("nameInput").value;
    let description = document.getElementById("descriptionInput").value;

    let decisionsContainer = document.getElementById("decisionsContainer");
    let decisionBox = document.createElement("div");
    decisionBox.className = "decision-box";
    decisionBox.innerHTML =
      `<div class="checkicons">
              <i class="fa fa-check" aria-hidden="true"></i>
            </div>` +
      '<i class="fa fa-th-large delete-icon" aria-hidden="true"></i>' +
      "<strong>Name:</strong> " +
      `  <h6>${name}</h6>` +
      "<br><strong>Description:</strong> " +
      `  <p>${description}</p>` +
      '   <button class="btndecison">Take Decison</button>' +
      '<i class="fa fa-trash delete-icon" aria-hidden="true" onclick="deleteDecision(this)"></i>';

    decisionsContainer.appendChild(decisionBox);

    // Save the decision to local storage
    saveDecision(name, description);

    // Clear the form fields
    document.getElementById("nameInput").value = "";
    document.getElementById("descriptionInput").value = "";

    $("#myModal").modal("hide");
  });

document.getElementById("nextButton").addEventListener("click", function () {
  initializeDecisions();
});
