
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxInvalid = document.querySelector(".box-info");
var bookmarks = [];

// !add bookmark function
function addBookmark() {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearForm();
}

// !clear form function
function clearForm() {
    siteName.value = "";
    siteURL.value = "";
  }

//   !display bookmarks in table
function displayBookmark(indexOfWebsite) {
  validateURL(indexOfWebsite);
    var cartoona = `
                <tr>
                  <td>${indexOfWebsite + 1}</td>
                  <td>${bookmarks[indexOfWebsite].siteName}</td>              
                  <td>
                    <button class="btn btn-visit" data-index="${indexOfWebsite}">
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
              </tr>
              `;
    tableContent.innerHTML += cartoona;
    // !handling when clicking on visit button
    
    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
      for (var y = 0; y < visitBtns.length; y++) {
        visitBtns[y].addEventListener("click", function (e) {
          visitWebsite(e);
        });
      }
    }
    
    // !handling when clicking on delete button
    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
      for (var x = 0; x < deleteBtns.length; x++) {
        deleteBtns[x].addEventListener("click", function (e) {
          deleteBookmark(e);
        });
      }
    }
    
  }

// !  submitting bookmark name and url
  submitBtn.addEventListener("click", function () {
    if (
      siteName.classList.contains("is-valid") &&
      siteURL.classList.contains("is-valid")
    ) {
        addBookmark();
   
      siteName.classList.remove("is-valid");
      siteURL.classList.remove("is-valid");
    } else {
      boxInvalid.classList.remove("d-none");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (
            siteName.classList.contains("is-valid") &&
            siteURL.classList.contains("is-valid")
          ) {
              addBookmark();
         
            siteName.classList.remove("is-valid");
            siteURL.classList.remove("is-valid");
          } else {
            boxInvalid.classList.remove("d-none");
          }
    }
  });

//   !validating url 
  function validateURL(index) {
    var userURL = bookmarks[index].siteURL;
    var httpsRegex = /^https?:\/\//g; 
    if (httpsRegex.test(userURL)) {
      validURL = userURL;
      var fixedURL = validURL.split("").splice(validURL.match(httpsRegex)[0].length).join("");
     } else {
      fixedURL = userURL;
      validURL = `https://${userURL}`;
    }
    
  }
//   ! function delete bookmark
  function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
      displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }
  
  //!function visit website
  function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
      open(bookmarks[websiteIndex].siteURL);
    } else {
      open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
  }

// !validation
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  
  siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
  });
  
  siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
  });
  
  function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }
  
//   ! closing box-info
  
  closeBtn.addEventListener("click", function(e){
    boxInvalid.classList.add("d-none");
  });
  
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        boxInvalid.classList.add("d-none");
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        boxInvalid.classList.add("d-none");
    }
  });