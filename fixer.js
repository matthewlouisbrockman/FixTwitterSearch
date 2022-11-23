// MIT LICENSE

const handleTokenization = (e) => {
  //well, at least this part of draftJS making me use the dispatch events like the main one does
  console.log(e.target.value);
  //if it starts with 'from:' insensitive, kill it
  if (e.target.value.toLowerCase() === "from:") {
    console.log("woo, from detected");
    clearTarget(e.target);
    insertFromElement(e.target);
  }
};

const clearTarget = (target, option = "@") => {
  //select the target
  target.select();
  //insert a backspace
  document.execCommand("insertText", false, option);
};

const insertFromElement = (target) => {
  //add a block with content 'from:' as the first child of the target's parent

  //makse sure from isn't already on page
  if (document.getElementById("secret-id-identifier")) {
    //kill it
    document.getElementById("secret-id-identifier").remove();
  }

  const fromElement = document.createElement("div");
  fromElement.innerHTML = "from:";
  fromElement.style.margin = "auto";
  fromElement.id = "secret-id-identifier";

  target.parentElement.insertBefore(fromElement, target);
};

const handleEnterListener = (e) => {
  //if the secret id isn't up, don't do anything
  if (!document.getElementById("secret-id-identifier")) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  //use regex to find the target - first person after the @
  const regex = /@(\w+)/g;

  //get the text
  const text = e.target.value;

  const target = text.match(regex)[0];

  //search is everything after the @word
  let searchString = text.substring(target.length);

  searchString = searchString.trim().replace('" "', "%20");

  const url = `https://twitter.com/search?q=(from%3A${target})${searchString}&src=typed_query&f=top`;

  window.location.href = url;
};

const handleMouseClick = (e) => {
  //check if identirier exists
  if (!document.getElementById("secret-id-identifier")) {
    return;
  }
  //if the innerText has an at
  if (e.target.innerText.includes("@")) {
    e.preventDefault();
    e.stopPropagation();
    //get the text
    const text = e.target.innerText;
    const regex = /@(\w+)/g;

    const target = text.match(regex)[0];

    console.log("target", target);
    clearTarget(document.querySelector('[aria-label="Search query"]'), target);
  }
};

//wait for page to load and then add it
setTimeout(() => {
  window.addEventListener(
    "click",
    (e) => {
      handleMouseClick(e);
    },
    true
  );

  //keydown to steal the from
  document
    .querySelector('[aria-label="Search query"]')
    .addEventListener("keyup", handleTokenization);

  //add enter listener to put the from back in
  document
    .querySelector('[aria-label="Search query"]')
    .addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleEnterListener(e);
      }
    });
}, 1000);
