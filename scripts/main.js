document.querySelectorAll(".sidebar button").forEach(button => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("active");
    });
    document.getElementById(`${targetTab}-tab`).classList.add("active");
  });
});

function handleSearch(event) {
  event.preventDefault();
  const input = document.getElementById("search-input");
  const query = input.value.trim();
  if (!query) return;
  let finalURL = query;
  if (!/^https?:\/\//i.test(query)) {
    finalURL = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
  }
  window.location.href = `pages/proxy.html?url=${encodeURIComponent(finalURL)}`;
}

function initProxyPage() {
  const iframe = document.getElementById("proxy-frame");
  const input = document.getElementById("proxy-input");
  const params = new URLSearchParams(window.location.search);
  const url = params.get("url");
  if (url && iframe && input) {
    input.value = url;
    iframe.src = `/proxy?url=${encodeURIComponent(url)}`;
    document.getElementById("proxy-form").addEventListener("submit", e => {
      e.preventDefault();
      const newUrl = input.value.trim();
      if (!newUrl) return;
      let targetUrl = newUrl;
      if (!/^https?:\/\//i.test(newUrl)) {
        targetUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(newUrl);
      }
      window.location.href = `/pages/proxy.html?url=${encodeURIComponent(targetUrl)}`;
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("proxy.html")) {
    initProxyPage();
  }
});