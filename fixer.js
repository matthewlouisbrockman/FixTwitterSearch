console.log("hello world");

const loadHandler = () => {
  console.log("loading handler");
  document
    .querySelector('[aria-label="Search query"]')
    .addEventListener("keyup", handleTokenization);
};

const clearTarget = (target) => {
  //select the target
  target.select();
  //insert a backspace
  document.execCommand("insertText", false, "");
};

const handleTokenization = (e) => {
  //this is an input in draftjs. Can get content with e.target.value
  console.log(e.target.value);
  //if it starts with 'from:' insensitive, kill it
  if (e.target.value.toLowerCase().startsWith("from:")) {
    clearTarget(e.target);
  }
};

//wait 3 seconds
setTimeout(loadHandler, 3000);
