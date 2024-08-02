(function() {
  let originalContent = '';
  let readerContent = '';

  function createReaderView() {
    const articleContent = new Readability(document.cloneNode(true)).parse();

    return `
      <style>
        body {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f8f8;
        }
        h1 { color: #2c3e50; }
        img { max-width: 100%; height: auto; }
      </style>
      <h1>${articleContent.title}</h1>
      <div>${articleContent.content}</div>
    `;
  }

  function toggleView(mode) {
    if (mode === 'reader') {
      if (!readerContent) {
        originalContent = document.body.innerHTML;
        readerContent = createReaderView();
      }
      document.body.innerHTML = readerContent;
    } else {
      if (originalContent) {
        document.body.innerHTML = originalContent;
      }
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    toggleView(request.mode);
  });
})();