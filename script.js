var cardcontainer = document.getElementById("cardcontainer");
var cardName = document.getElementById("item-name");
// Add Button Dialog Box Variable
var addCardpopup = document.getElementById("addCardpopup");
var submit = document.getElementById("submitBtn");
var closebutton = document.getElementById("closeBtn");
// Sub-Task variables
var mainContainer = document.getElementById("main");
// Blur Variable Div
var blurry = document.getElementById("blurry");
// Heading Tasks List
var taskListHeading = document.getElementById("taskListHeading");
// Task List Cancel Button
var backButton = document.getElementById("backButton");
// Add Item Button
var addItemButton = document.getElementById("add-item-button");
// Heading of Each Card When Clicked at Heading
var headingCard = document.getElementById("heading-card");

// To Show Popup and Add New Task List.
function showPopup() {
  addCardpopup.classList.remove("hide");
  blurry.classList.add("blurry");
}
// To closepopup
function closePopup() {
  addCardpopup.classList.add("hide");

  // After the POp-Up is Closed, Hide the Blurry Div.
  blurry.classList.remove("blurry");
}

//Add card function
function addcard() {
  // create elements dialogue box
  var card = document.createElement("div");
  var heading = document.createElement("h3");
  var hr = document.createElement("hr");
  var subTasklist = document.createElement("div");
  var buttonGroup = document.createElement("div");
  var addsubtask = document.createElement("button");
  var deletecard = document.createElement("button");

  // If Task List Input is Empty No Card is Generated.
  if (cardName.value == "") {
    addCardpopup.classList.add("hide");
    blurry.classList.remove("blurry");
    return;
  }

  // Appends Children to Card.
  cardcontainer.appendChild(card);
  card.appendChild(heading);
  card.appendChild(hr);
  card.appendChild(subTasklist);

  card.appendChild(buttonGroup);
  buttonGroup.appendChild(addsubtask);
  buttonGroup.appendChild(deletecard);

  // Button Group Class
  buttonGroup.classList.add("card-button-group");

  // Giving the  Values to Card Header.
  heading.innerText = cardName.value;

  // Hiding the card pop-up after clearing the input field by adding the hide class defined in styles.css .
  addCardpopup.classList.add("hide");

  // After the Card is Removed, Hide the Blurry Div.
  blurry.classList.remove("blurry");

  // Create an <i> element for the plus icon and set its class as mentioned in fontawsome icons.
  const plusIcon = document.createElement("i");
  plusIcon.className = "fas fa-plus-circle";

  // Same done with delete button icon.
  const minusIcon = document.createElement("i");
  minusIcon.className = "fa-regular fa-trash-can";

  // Button Icons Added
  addsubtask.appendChild(plusIcon);
  deletecard.appendChild(minusIcon);

  // Button Icons Class
  addsubtask.classList.add("add-icon");
  deletecard.classList.add("delete-icon");

  // We will provide classes over here card and card's content.
  card.classList.add("card");
  subTasklist.classList.add("sub-task-list");

  // List No Card Message Function Call.
  showNoListMessage();

  // Card Heading Event Listner.
  heading.addEventListener("click", function(e) {
    document.querySelectorAll(".card").forEach(function(card) {
      card.classList.add("active");
      card.classList.add("card-position");
      taskListHeading.classList.add("visibility");
      backButton.style.display = "block";

      // Add Item List Button Blur Effect and Disabled.
      addItemButton.style.filter = "blur(8px)";
      addItemButton.disabled = true;

      // Adding Value to Heading Card.
      headingCard.innerText = e.target.innerText;

    });

    // Remove 'hidden' class from the clicked card
    e.target.closest(".card").classList.remove("active");

    // Resetting the Card Input Box Value to Empty String.
    cardName.value = "";

    // Invoking Back Button Event Listner
    backButton.addEventListener("click", function() {
      document.querySelectorAll(".card").forEach(function(card) {
        card.classList.remove("active");
        backButton.style.display = "none";
        taskListHeading.classList.remove("visibility");
        card.classList.remove("card-position");

        addItemButton.style.filter = "none";
        addItemButton.disabled = false;

        // Removing Value to Heading Card.
        headingCard.innerText = "";
      });
    });
  });

  //Delete Icon Event Listner to Delete the Card.
  deletecard.addEventListener("click", function() {
    // Removing Card From Main cardContainer.
    card.remove();

    headingCard.innerHTML = "";

    // Resetting Card Classes
    card.classList.remove("active");
    backButton.style.display = "none";
    taskListHeading.classList.remove("visibility");
    card.classList.remove("card-position");

    addItemButton.style.filter = "none";
    addItemButton.disabled = false;

    // Invoking Task List Empty Function Again.
    showNoListMessage();

    // Removed card visibility classes.
    document.querySelectorAll(".card").forEach(function(card) {
      card.classList.remove("active");
      backButton.style.display = "none";
      taskListHeading.classList.remove("visibility");
      card.classList.remove("card-position");

      addItemButton.style.filter = "none";
      addItemButton.disabled = false;

      // Removing Value to Heading Card.
      headingCard.innerText = "";
    });

  });

  // Handles Operations Related To Adding Subtasks.
  addsubtask.addEventListener("click", function() {
    var subTaskPopup = document.createElement("div");
    var heading = document.createElement("h3");
    var subTaskname = document.createElement("input");
    var buttonGroup = document.createElement("div");
    var addItem = document.createElement("button");
    var closeItem = document.createElement("button");

    // On Clicking the Add Icon on the Card The Blurry Class will Get Activated.
    blurry.classList.add("blurry");

    mainContainer.appendChild(subTaskPopup);
    subTaskPopup.appendChild(heading);
    subTaskPopup.appendChild(subTaskname);
    subTaskPopup.appendChild(buttonGroup);

    buttonGroup.appendChild(addItem);
    buttonGroup.appendChild(closeItem);

    //Giving some values
    heading.innerText = "Add Item";
    addItem.innerText = "Add";
    closeItem.innerText = "Close";

    // Classes for SubTasks
    buttonGroup.classList.add("card-button-group");
    subTaskPopup.classList.add("sub-task-popup");

    // Add Button Event Listner Calling addSubtaskItem Function from Item Insertion.
    addItem.addEventListener("click", () => {
      // Checks if New Sub-Task Input Have Value or not.
      if (subTaskname.value == "") {
        closePopupItem();
        return;
      }

      // If New Sub-Task Input Have Value Calling the Below Functions.
      addSubtaskItem(subTaskname, subTasklist);
      closePopupItem();
    });

    // Close Button Event Listner to Close the Sub-Task Pop-Up.
    closeItem.addEventListener("click", closePopupItem);

    // Function to Close the Add Sub-Task Pop-Up.
    function closePopupItem() {
      subTaskPopup.remove();

      // After the Pop-Up is Closed, Hide the Blurry Div.
      blurry.classList.remove("blurry");
    }
  });
}

// Adding List as Sub-Task to the Task-List.
function addSubtaskItem(subTaskname, parent) {
  var div = document.createElement("div");
  var li = document.createElement("li");
  var markDone = document.createElement("span");

  // Appending or Inserting HTML elements to the respective parent Sub-Task List.
  parent.appendChild(div);
  div.appendChild(li);
  div.appendChild(markDone);

  li.innerText = subTaskname.value;
  markDone.innerText = "Mark Done";

  // Class Style
  div.classList.add("sub-task-wrapper");
  li.classList.add("sub-task-item");
  markDone.classList.add("mark-done");

  markDone.addEventListener("click", function() {
    li.classList.add("line-through");
    markDone.remove();
  });
}

// Function to Show No Item in ToDo List.
function showNoListMessage() {
  cardLength = document.querySelectorAll(".card").length;
  if (cardLength == null || cardLength == 0) {
    document.getElementsByClassName("no-item-message")[0].style.display = "block";
  } else {
    document.getElementsByClassName("no-item-message")[0].style.display = "none";
  }
}
