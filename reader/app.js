document.getElementById('cleanAndDisplay').addEventListener('click', async () => {
  const url = document.getElementById('url').value;
  if (!url) return alert('Please enter a URL');

  try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const doc = new DOMParser().parseFromString(data.contents, 'text/html');
      
      const article = new Readability(doc).parse();
      const cleanHTML = sanitizeHtml(article.content);

      document.getElementById('content').innerHTML = cleanHTML;
      document.getElementById('saveContent').style.display = 'block';
  } catch (error) {
      console.error('Error fetching or processing the article:', error);
  }
});

document.getElementById('saveContent').addEventListener('click', () => {
  const content = document.getElementById('content').innerHTML;
  const blob = new Blob([content], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cleaned_article.html';
  link.click();
});