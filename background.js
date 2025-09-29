let currentUA = '';
let enabled = false;

chrome.storage.sync.get(['ua','enabled'], data => {
  currentUA = data.ua || '';
  enabled = data.enabled || false;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.ua) currentUA = changes.ua.newValue;
  if (changes.enabled) enabled = changes.enabled.newValue;
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    if (!enabled) return {};
    let headers = details.requestHeaders || [];
    let found = false;
    for (let h of headers) {
      if (h.name.toLowerCase() === 'user-agent') { h.value = currentUA; found = true; break; }
    }
    if (!found) headers.push({ name: 'User-Agent', value: currentUA });
    return { requestHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders", "extraHeaders"]
);
