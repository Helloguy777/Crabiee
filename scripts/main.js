function handleSearch(event) {
  event.preventDefault();

  const query = document.getElementById('search-input').value;
  if (!query) return;

  const proxyUrl = `${window.location.origin}/proxy?url=${encodeURIComponent('https://www.google.com/webhp?igu=1'>' + query)}`;

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