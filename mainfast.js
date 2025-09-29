const presets = [
  {name:'(none) — Disabled', ua:'___NONE___'},
  {name:'Googlebot', ua:'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'},
  {name:'Googlebot-Image', ua:'Googlebot-Image/1.0'},
  {name:'Googlebot-Video', ua:'Googlebot-Video/1.0'},
  {name:'Googlebot Smartphone', ua:'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.88 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'},
  {name:'AdsBot-Google', ua:'AdsBot-Google (+http://www.google.com/adsbot.html)'},
  {name:'AdsBot-Google-Mobile-Apps', ua:'AdsBot-Google-Mobile-Apps'},
  {name:'Bingbot', ua:'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'},
  {name:'BingPreview', ua:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36 Edge/83.0.478.37 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'},
  {name:'Bing Mobile (compatible)', ua:'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'},
  {name:'MSNBot (legacy)', ua:'msnbot/2.0b (+http://search.msn.com/msnbot.htm)'},
  {name:'DuckDuckBot', ua:'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)'},
  {name:'Baiduspider', ua:'Baiduspider+(+http://www.baidu.com/search/spider.htm)'},
  {name:'YandexBot', ua:'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'},
  {name:'Yandex Mobile', ua:'Mozilla/5.0 (Linux; Android 8.0.0; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.126 Mobile Safari/537.36 (compatible; YandexBot/3.0)'},
  {name:'Sogou Spider', ua:'Sogou Spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)'},
  {name:'Exabot', ua:'Mozilla/5.0 (compatible; Exabot/3.0; +http://www.exabot.com/go/robot)'},
  {name:'Applebot', ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)'},
  {name:'Applebot-News', ua:'Applebot/0.1 (News; +http://www.apple.com/go/applebot)'},
  {name:'Facebook ExternalHit', ua:'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'},
  {name:'Twitterbot', ua:'Twitterbot/1.0'},
  {name:'LinkedInBot', ua:'LinkedInBot/1.0 (+http://www.linkedin.com)'},
  {name:'Pinterestbot', ua:'Pinterestbot/1.0 (+http://www.pinterest.com/bot.html)'},
  {name:'Slackbot', ua:'Slackbot 1.0 (+https://api.slack.com/robots)'},
  {name:'Discordbot', ua:'Discordbot/2.0'},
  {name:'AhrefsBot', ua:'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)'}, 
  {name:'SemrushBot', ua:'Mozilla/5.0 (compatible; SemrushBot/7~blabla; +http://www.semrush.com/bot.html)'},
  {name:'MJ12bot', ua:'MJ12bot/v1.4.8 (http://mj12bot.com/)'}, 
  {name:'PetalBot', ua:'Mozilla/5.0 (compatible; PetalBot;+https://webmaster.petalsearch.com/site/petalbot)'},
  {name:'PetalBot-Mobile', ua:'Mozilla/5.0 (Linux; Android 9; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Mobile Safari/537.36 (compatible; PetalBot/1.0)'},
  {name:'Wget', ua:'Wget/1.20.3 (linux-gnu)'},
  {name:'Curl', ua:'curl/7.68.0'},
  {name:'Python-requests', ua:'python-requests/2.25.1'},
  {name:'Java/HttpClient', ua:'Java/1.8.0_181'},
  {name:'HeadlessChrome', ua:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/88.0.4324.96 Safari/537.36'},
  {name:'PhantomJS', ua:'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1'}
];

const presetSelect = document.getElementById('preset');
const customContainer = document.getElementById('customContainer');
const customUA = document.getElementById('customUA');
const customName = document.getElementById('customName');

function fillPresets(){
  presets.forEach(p => {
    const o = document.createElement('option');
    o.value = p.ua;
    o.textContent = p.name;
    presetSelect.appendChild(o);
  });
}

presetSelect.addEventListener('change', () => {
  if (presetSelect.value === 'custom') {
    customContainer.style.display = 'block';
  } else {
    customContainer.style.display = 'none';
  }
});

document.getElementById('apply').addEventListener('click', async () => {
  let uaValue = presetSelect.value;
  if (uaValue === '___NONE___') {
    await chrome.storage.sync.set({ ua: '', enabled: false });
    alert('Disabled: UA rewriting turned off.');
    return;
  }
  if (uaValue === 'custom') {
    const ua = customUA.value.trim();
    if (!ua) { alert('Custom UA is empty'); return; }
    await chrome.storage.sync.set({ ua: ua, customName: customName.value || '', enabled: true });
    alert('Custom UA applied');
    return;
  }
  await chrome.storage.sync.set({ ua: uaValue, enabled: true });
  alert('Preset UA applied');
});

document.getElementById('defaultBtn').addEventListener('click', async () => {
  await chrome.storage.sync.set({ ua: '', enabled: false });
  customUA.value = '';
  customName.value = '';
  presetSelect.selectedIndex = 0;
  customContainer.style.display = 'none';
  alert('Restored to default (disabled).');
});

fillPresets();

const customOption = document.createElement('option');
customOption.value = 'custom';
customOption.textContent = 'Custom…';
presetSelect.appendChild(customOption);
