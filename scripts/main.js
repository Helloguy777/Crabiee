function handleSearch(event) {
  event.preventDefault();  

  const query = document.getElementById('search-input').value;
  if (!query) return;  

  
  const proxyUrl = `152.26.229.52:9443/${query}`;

  
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
