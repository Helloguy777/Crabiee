function handleSearch(event) {
  event.preventDefault();

  const query = document.getElementById('search-input').value;
  if (!query) return;

  const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent('https://www.google.com/search?q=' + query)}`;

  window.open(proxyUrl, '_blank');
}

document.querySelectorAll('.sidebar button').forEach(button => {
  button.addEventListener('click', function () {
    const targetTab = this.getAttribute('data-tab');

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });

    document.getElementById(`${targetTab}-tab`).classList.add('active');
  });
});