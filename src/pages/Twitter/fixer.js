// MIT LICENSE

const handleTokenization = (e) => {
  //well, at least this part of draftJS making me use the dispatch events like the main one does
  //if it starts with 'from:' insensitive, kill it
  if (e.target.value.toLowerCase() === 'from:') {
    clearTarget(e.target);
    insertFromElement(e.target);
  } // if it's empty and it's a backspace
  else if (e.target.value === '' && e.key === 'Backspace') {
    if (document.getElementById('secret-id-identifier')) {
      //kill it
      document.getElementById('secret-id-identifier').remove();
    }
  }
};

const clearTarget = (target, option = '@') => {
  //select the target
  target.select();
  //insert a backspace
  document.execCommand('insertText', false, option);
};

const insertFromElement = (target) => {
  //add a block with content 'from:' as the first child of the target's parent

  //makse sure from isn't already on page
  if (document.getElementById('secret-id-identifier')) {
    //kill it
    document.getElementById('secret-id-identifier').remove();
  }

  const fromElement = document.createElement('div');
  fromElement.innerHTML = 'from:';
  fromElement.style.margin = 'auto';
  fromElement.id = 'secret-id-identifier';

  target.parentElement.insertBefore(fromElement, target);
};

const handleEnterListener = (e) => {
  //if the secret id isn't up, don't do anything
  if (!document.getElementById('secret-id-identifier')) {
    return;
  }

  const selected = document.querySelector(
    '[role="option"][aria-selected="true"]'
  );

  if (selected) {
    e.preventDefault();
    e.stopPropagation();
    //get the text
    const text = selected.innerText;
    const regex = /@(\w+)/g;

    const target = text.match(regex)[0];

    clearTarget(document.querySelector('[aria-label="Search query"]'), target);
  } else if (e.target.tagName === 'INPUT') {
    e.preventDefault();
    e.stopPropagation();

    //use regex to find the target - first person after the @
    const regex = /@(\w+)/g;

    //get the text
    const text = e.target.value;

    const target = text.match(regex)[0];

    //search is everything after the @word
    let searchString = text.substring(target.length);

    searchString = searchString.trim().replace('" "', '%20');

    const url = `https://twitter.com/search?q=(from%3A${target})${searchString}&src=typed_query&f=top`;

    window.location.href = url;
  }
};

const handleMouseClick = (e) => {
  //check if identirier exists
  if (!document.getElementById('secret-id-identifier')) {
    return;
  }
  //if the innerText has an at
  if (e.target.innerText.includes('@')) {
    e.preventDefault();
    e.stopPropagation();
    //get the text
    const text = e.target.innerText;
    const regex = /@(\w+)/g;

    const target = text.match(regex)[0];

    clearTarget(document.querySelector('[aria-label="Search query"]'), target);
  }
};

const addListeners = () => {
  window.addEventListener(
    'click',
    (e) => {
      handleMouseClick(e);
    },
    true
  );

  //keydown to steal the from
  document
    .querySelector('[aria-label="Search query"]')
    ?.addEventListener('keyup', handleTokenization);

  //add enter listener to put the from back in
  document
    .querySelector('[aria-label="Search query"]')
    ?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleEnterListener(e);
      }
    });
};

const removeListeners = () => {
  window.removeEventListener('click', handleMouseClick, true);
  document
    .querySelector('[aria-label="Search query"]')
    ?.removeEventListener('keyup', handleTokenization);
  document
    .querySelector('[aria-label="Search query"]')
    ?.removeEventListener('keydown', handleEnterListener);
};

//whenever we focus on the search bar, add the listeners
window.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT') {
    removeListeners();
    addListeners();
  }
});
