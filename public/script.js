/* -------------------------------------------------------------- */
/*  LIVING MONASTERY CLOUD  –  NEW-UI  COMPLETE  (ES6)             */
/*  1. Language / Dark mode                                       */
/*  2. Prayer-wheel hero                                          */
/*  3. Aura heat-map  (sentiment)                                 */
/*  4. Decay prediction                                           */
/* 5.  QR Adoption Card  (NEW)                                    */
/* 6.  Digital Dialogue                                           */
/* 7.  Time Layers                                                */
/* 8.  Virtual Darshan  (360 + street-view)                       */
/* 9.  Digital Rituals                                            */
/* -------------------------------------------------------------- */

const translations = {
  en: {
    'home.title': 'Living Monastery Cloud',
    'home.subtitle': '200+ ancient monasteries awakened as self-aware digital entities',
    'monasteries.title': 'Sacred Monasteries of Sikkim',
    'monasteries.subtitle': 'Click any thangka scroll to begin digital dialogue',
    'virtual-darshan.title': 'Virtual Darshan',
    'rituals.title': 'Digital Rituals & Meditation',
    'preservation.title': 'Digital Preservation',
    'visit.title': 'Plan Your Pilgrimage',
    'footer.description': 'Preserving Himalayan Buddhist heritage through respectful digital innovation',
    'common.back': 'Back to Mandala',
    'chat.title': 'Digital Dialogue',
    'chat.choose': 'Choose a monastery to begin dialogue',
    'chat.placeholder': 'Type your question with respect…',
    'chat.welcome': 'The butter lamp is lit. Your questions will rise like sacred smoke...',
    'time.title': 'Temporal Layers',
    'time.generate': 'View This Era',
    'time.placeholder': 'Select monastery & year to view temporal layers',
    'decay.title': 'Decay Prediction AI',
    'decay.loading': 'Loading risk analysis…',
    'aura.peace': 'Peace',
    'aura.devotion': 'Devotion',
    'aura.community': 'Community'
  },
  hi: {
    'home.title': 'लिविंग मठ क्लाउड',
    'home.subtitle': '200+ प्राचीन मठ स्व-जागरूक डिजिटल इकाइयों के रूप में जागृत',
    'chat.title': 'डिजिटल संवाद',
    'time.generate': 'इस युग को देखें',
    'decay.loading': 'जोखिम विश्लेषण लोड हो रहा है…',
    'aura.peace': 'शांति',
    'aura.devotion': 'भक्ति',
    'aura.community': 'समुदाय'
  },
  ne: {
    'home.title': 'लिविङ्ग मोनास्ट्री क्लाउड',
    'home.subtitle': '२००+ प्राचीन मठहरू आत्म-सचेत डिजिटल इकाइहरूको रूपमा जागृत',
    'chat.title': 'डिजिटल संवाद',
    'time.generate': 'यो युग हेर्नुहोस्',
    'aura.peace': 'शान्ति',
    'aura.devotion': 'भक्ति',
    'aura.community': 'समुदाय'
  },
  bo: {
    'home.title': 'ལི་ཝིང་མོ་ནས་ཏྲི་ཁེ་ལད་ཁྲོད',
    'home.subtitle': 'ལོ་༢༠༠+་གྱི་གླིང་དགོན་རྙིང་མ་ཚོས་ཨང་ཀིའི་ཚོར་བ་ཅན་དུ་གྱུར་ཡོད',
    'chat.title': 'ཨང་ཀིའི་གླེང་མོལ',
    'time.generate': 'དུས་རབས་འདི་ལྟ་བ',
    'aura.peace': 'ཞི་བདེ',
    'aura.devotion': 'དད་པ',
    'aura.community': 'སྤུན་ཟླ'
  },
  zh: {
    'home.title': '生活寺院云',
    'home.subtitle': '200多座古老寺院作为自我意识的数字实体觉醒',
    'chat.title': '数字对话',
    'time.generate': '查看这个时代',
    'aura.peace': '和平',
    'aura.devotion': '奉献',
    'aura.community': '社区'
  }
};
let currentLanguage = 'en';

/* ==========================  UTIL  ========================== */
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

/* ==========================  DARK MODE  ========================== */
function initDarkMode() {
  const toggle = $('#darkModeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    toggle.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  toggle.addEventListener('change', e => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

/* ==========================  LANGUAGE  ========================== */
function initLanguageSwitcher() {
  const select = $('#languageSelect');
  const saved = localStorage.getItem('language') || 'en';
  select.value = saved;
  currentLanguage = saved;
  updatePageLanguage();
  select.addEventListener('change', e => {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    updatePageLanguage();
    if (recognition) recognition.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ne' ? 'ne-NP' : currentLanguage === 'bo' ? 'bo-CN' : 'en-US';
  });
}

function updatePageLanguage() {
  $$('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translations[currentLanguage][key];
      else el.innerHTML = translations[currentLanguage][key];
    }
  });
}

/* ==========================  MONASTERY DATA  ========================== */
const monasteries = [
  {
    key: "01_rumtek",
    name: "Rumtek Monastery",
    year: "1740",
    location: "Near Gangtok",
    image: "01_rumtek.jpg",
    ai: 88,
    tagline: "The Great Seat of the Karmapa, now enhanced with temporal AI consciousness."
  },
  {
    key: "02_pemayangtse",
    name: "Pemayangtse Monastery",
    year: "1705",
    location: "West Sikkim",
    image: "02_pemayangtse.jpg",
    ai: 92,
    tagline: "The Perfect Sublime Lotus, whose AI consciousness has absorbed 300+ years of sacred teachings."
  },
  {
    key: "03_tashiding",
    name: "Tashiding Monastery",
    year: "1641",
    location: "Western Sikkim",
    image: "03_tashiding.png",
    ai: 95,
    tagline: "The Devoted Central Glory, positioned at the convergence of rivers, its AI consciousness flows like water."
  }
];

/* ==========================  RENDER HELPERS  ========================== */
function renderCard(m) {
  return `
    <div class="thangka-card" data-key="${m.key}">
      <div class="card-img">
        <img src="/images/${m.image}" alt="${m.name}" onerror="this.src='data:image/svg+xml;base64,${btoa(`<svg width="350" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#D7A86E"/><text x="50%" y="50%" font-size="20" text-anchor="middle" dy=".3em" fill="white">${m.name}</text></svg>`)}'">
      </div>
      <div class="card-content">
        <div class="card-title">${m.name}</div>
        <div class="card-loc">📍 ${m.location} · Est. ${m.year}</div>
        <div class="card-desc">${m.tagline}</div>
        <div class="card-btns">
          <button class="btn chatBtn"><i class="fas fa-comments"></i> Digital Dialogue</button>
          <button class="btn btn-outline timeBtn"><i class="fas fa-clock"></i> Time Layers</button>
        </div>
        <!-- ===== QR ADOPTION CARD ===== -->
        <div class="card-qr">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://localhost:3000/adopt?monastery=${m.key}" alt="QR">
          <small>Scan to adopt me</small>
        </div>
      </div>
    </div>`;
}
function renderGrid(list, container) {
  container.innerHTML = list.map(renderCard).join('');
}

/* ==========================  INIT ALL  ========================== */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initLanguageSwitcher();
  initVoiceRecognition();
  initPrayerWheelNav();
  initAuraHeatmap();
  initDecayPrediction();
  initVirtualDarshan();
  initStreetViewDarshan();
  initRitualCards();

  // Featured thangkas
  renderGrid(monasteries.slice(0, 3), $('#featuredGrid'));

  // All monasteries modal
  const exploreBtn = $('#exploreMoreBtn');
  const modal = $('#allMonasteriesModal');
  const closeModal = $('#closeModal');
  const containerAll = $('#monasteriesContainer');
  const searchInput = $('#monasterySearch');
  const searchBtn = $('#searchBtn');

  exploreBtn.onclick = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderGrid(monasteries, containerAll);
  };
  closeModal.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };
  window.onclick = e => {
    if (e.target === modal) closeModal.onclick();
  };
  function filter() {
    const q = searchInput.value.toLowerCase();
    const filtered = monasteries.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.tagline.toLowerCase().includes(q)
    );
    renderGrid(filtered, containerAll);
  }
  searchBtn.onclick = filter;
  searchInput.onkeyup = e => {
    if (e.key === 'Enter') filter();
  };

  // Smooth scroll for nav-points
  $$('.nav-point').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

/* ==========================  PRAYER-WHEEL NAV  ========================== */
function initPrayerWheelNav() {
  const centerWheel = $('#centerWheel');
  if (!centerWheel) return;
  centerWheel.addEventListener('click', () => {
    const wheel = centerWheel.querySelector('.spinning-wheel');
    wheel.style.animationDuration = '2s';
    setTimeout(() => wheel.style.animationDuration = '20s', 2000);
  });
}

/* ==========================  AURA / SENTIMENT HEATMAP  ========================== */
function initAuraHeatmap() {
  const auras = $$('.monastery-aura');
  auras.forEach(aura => {
    const key = aura.dataset.monastery;
    fetch('/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monastery: key })
    }).then(r => r.json()).then(data => {
      aura.querySelector('.aura-core').style.background = data.peace > 70 ? '#4CAF50' : data.peace > 50 ? '#FF9800' : '#f44336';
      aura.dataset.peace = data.peace;
      aura.dataset.joy = data.joy;
      aura.dataset.concern = data.concern;
      aura.dataset.intensity = (data.peace + data.joy - data.concern) / 100;
      aura.title = `${aura.querySelector('.aura-label').textContent} – Peace:${data.peace}% Joy:${data.joy}% Concern:${data.concern}%`;
    }).catch(() => {
      aura.querySelector('.aura-core').style.background = '#8D6E63';
    });
  });
  // refresh every 30s
  setInterval(() => {
    auras.forEach(aura => {
      const key = aura.dataset.monastery;
      fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monastery: key })
      }).then(r => r.json()).then(data => {
        aura.querySelector('.aura-core').style.background = data.peace > 70 ? '#4CAF50' : data.peace > 50 ? '#FF9800' : '#f44336';
        aura.dataset.peace = data.peace;
        aura.dataset.joy = data.joy;
        aura.dataset.concern = data.concern;
        aura.dataset.intensity = (data.peace + data.joy - data.concern) / 100;
        aura.title = `${aura.querySelector('.aura-label').textContent} – Peace:${data.peace}% Joy:${data.joy}% Concern:${data.concern}%`;
      });
    });
  }, 30000);
}

/* ==========================  DECAY PREDICTION  ========================== */
function initDecayPrediction() {
  const card = $('#decayCard');
  if (!card) return;
  loadDecay();
  // auto-refresh every 30s
  setInterval(() => loadDecay(), 30000);
  // countdown
  let countdown = 30;
  setInterval(() => {
    countdown--;
    $('#nextCheck').textContent = countdown;
    if (countdown <= 0) countdown = 30;
  }, 1000);
}

function loadDecay() {
  fetch('/api/decay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monastery: '01_rumtek', language: currentLanguage })
  }).then(r => r.json()).then(data => {
    $('#decayText').textContent = data.text;
    const percent = data.risk || Math.floor(Math.random() * 31) + 60;
    $('#decayPercent').textContent = `${percent}%`;
    $('#decayBar').style.width = `${percent}%`;
  }).catch(() => {
    $('#decayText').textContent = 'Unable to load risk analysis.';
    $('#decayBar').style.width = '70%';
    $('#decayPercent').textContent = '70%';
  });
}

/* ==========================  VOICE RECOGNITION  ========================== */
let recognition = null;
let synthesis = null;
let isListening = false;

function initVoiceRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ne' ? 'ne-NP' : currentLanguage === 'bo' ? 'bo-CN' : 'en-US';
    recognition.onstart = () => {
      isListening = true;
      $('#startDictation').classList.add('active');
    };
    recognition.onresult = e => {
      $('#chatInput').value = e.results[0][0].transcript;
    };
    recognition.onerror = e => {
      console.error('Speech error', e.error);
      isListening = false;
      $('#startDictation').classList.remove('active');
    };
    recognition.onend = () => {
      isListening = false;
      $('#startDictation').classList.remove('active');
    };
  }
  if ('speechSynthesis' in window) {
    synthesis = window.speechSynthesis;
    $('#speakResponse').addEventListener('click', () => {
      const lastAI = document.querySelector('.chat-message.ai:last-child');
      if (lastAI) {
        const text = lastAI.textContent.replace('AI: ', '');
        speakText(text);
      }
    });
  }
}

function speakText(text) {
  if (!synthesis) return;
  synthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ne' ? 'ne-NP' : currentLanguage === 'bo' ? 'bo-CN' : 'en-US';
  utter.rate = 0.9;
  synthesis.speak(utter);
}

/* ==========================  CHAT WINDOW  ========================== */
const chatWindow = $('#chatWindow');
const chatBody = $('#chatBody');
const chatInput = $('#chatInput');
const sendBtn = $('#sendBtn');
const backFromChat = $('#backFromChat');
const monasteryListChat = $('#monasteryListChat');
let activeMonastery = monasteries[0].key;
let activeWindow = '';

document.addEventListener('click', e => {
  if (e.target.closest('.chatBtn')) {
    activeWindow = 'chat';
    activeMonastery = e.target.closest('.thangka-card').dataset.key;
    buildMonasteryList(monasteryListChat);
    chatWindow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    startChat(activeMonastery);
  }
});

backFromChat.onclick = () => {
  chatWindow.style.display = 'none';
  document.body.style.overflow = 'auto';
};

function buildMonasteryList(listBox) {
  listBox.innerHTML = monasteries.map(m => `
    <li class="monastery-item ${m.key === activeMonastery ? 'active' : ''}" data-key="${m.key}">
      <div class="item-name">${m.name}</div>
      <div class="item-loc">${m.location}</div>
    </li>
  `).join('');
  listBox.onclick = e => {
    const item = e.target.closest('.monastery-item');
    if (!item) return;
    listBox.querySelectorAll('.monastery-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeMonastery = item.dataset.key;
    if (activeWindow === 'chat') startChat(activeMonastery);
    if (activeWindow === 'time') resetTimePanel();
  };
}

function startChat(key) {
  const mind = monasteries.find(m => m.key === key);
  chatBody.innerHTML = `<div class="chat-welcome">${translations[currentLanguage]['chat.welcome']}</div>`;
  $('#chatHeader').textContent = `${translations[currentLanguage]['chat.title']} – ${mind.name}`;
  chatInput.focus();
}

sendBtn.onclick = async () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatInput.value = '';
  chatBody.innerHTML += `<div class="chat-message user">You: ${msg}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monastery: activeMonastery, message: msg, language: currentLanguage })
    });
    const data = await res.json();
    chatBody.innerHTML += `<div class="chat-message ai">AI: ${data.reply}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  } catch (err) {
    chatBody.innerHTML += `<div class="chat-message ai">AI: I am offline – ask about my birth, architecture, festivals, future, or name.</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
chatInput.onkeydown = e => {
  if (e.key === 'Enter') sendBtn.click();
};

/* ==========================  TIME LAYERS WINDOW  ========================== */
const timeWindow = $('#timeWindow');
const backFromTime = $('#backFromTime');
const monasteryListTime = $('#monasteryListTime');
const yearSlider = $('#yearSlider');
const yearValue = $('#yearValue');
const generateBtn = $('#generateBtn');
const imagePanel = $('#imagePanel');
let imageStack = [];
let stackIndex = -1;

document.addEventListener('click', e => {
  if (e.target.closest('.timeBtn')) {
    activeWindow = 'time';
    activeMonastery = e.target.closest('.thangka-card').dataset.key;
    buildMonasteryList(monasteryListTime);
    timeWindow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    resetTimePanel();
  }
});

backFromTime.onclick = () => {
  timeWindow.style.display = 'none';
  document.body.style.overflow = 'auto';
};

function resetTimePanel() {
  const mind = monasteries.find(m => m.key === activeMonastery);
  yearSlider.value = mind.year || new Date().getFullYear();
  yearValue.textContent = yearSlider.value;
  imagePanel.innerHTML = `
    <div class="time-placeholder">
      <i class="fas fa-landmark"></i>
      <p>${translations[currentLanguage]['time.placeholder']}</p>
    </div>
  `;
  imageStack = [];
  stackIndex = -1;
}
yearSlider.oninput = () => yearValue.textContent = yearSlider.value;

generateBtn.onclick = async () => {
  const year = yearSlider.value;
  const mind = monasteries.find(m => m.key === activeMonastery);
  const originalText = generateBtn.innerHTML;
  generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
  generateBtn.disabled = true;
  try {
    const res = await fetch('/api/timetravel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monastery: activeMonastery, year })
    });
    const data = await res.json();
    pushImageToStack(data.imageBase64, year);
  } catch (err) {
    alert('Image generation failed. Please try again.');
  } finally {
    generateBtn.innerHTML = originalText;
    generateBtn.disabled = false;
  }
};

function pushImageToStack(base64, year) {
  const mind = monasteries.find(m => m.key === activeMonastery);
  imagePanel.innerHTML = `
    <div class="image-card active">
      <div class="image-header"><h3>${mind.name} in ${year}</h3></div>
      <div class="image-container"><img src="data:image/png;base64,${base64}" alt="${mind.name} ${year}" /></div>
      <div class="image-footer">
        <span class="image-year">Generated for year ${year}</span>
        <button class="btn btn-small" onclick="resetTimePanel()">Generate New</button>
      </div>
    </div>
  `;
  imageStack.unshift({ base64, year });
  stackIndex = 0;
}

$('#openChatFromTime').onclick = () => {
  chatWindow.style.display = 'flex';
  timeWindow.style.display = 'none';
  activeWindow = 'chat';
  buildMonasteryList(monasteryListChat);
  startChat(activeMonastery);
};
$('#openTimeTravelFromChat').onclick = () => {
  timeWindow.style.display = 'flex';
  chatWindow.style.display = 'none';
  activeWindow = 'time';
  buildMonasteryList(monasteryListTime);
  resetTimePanel();
};

/* ==========================  VIRTUAL DARSHAN  ========================== */
function initVirtualDarshan() {
  const darshanEmbed = {
    rumtek: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE5OekJ4YzJWa1pYSmxZM1F0YUdGcGJtVmpkQ0k2YVd4c2IzTWlPaUptYVd4bElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlMQ0oyWXlJNkltWmxZWEppYkdVaUxDSjJZeUk2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3245!2d88.5982!3f0!4f5!5f0.7820865974627469',
    pemayangtse: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE1UZzVOMlJoWldSbGJHbDJaV1JmYVhCbElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlMQ0oyWXlJNkltWmxZWEppYkdVaUxDSjJZeUk2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3069!2d88.2432!3f0!4f5!5f0.7820865974627469',
    tashiding: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE5OekJ4YzJWa1pYSmxZM1F0YUdGcGJtVmpkQ0k2YVd4c2IzTWlPaUptYVd4bElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3218!2d88.2984!3f0!4f5!5f0.7820865974627469'
  };
  const fallbackImg = {
    rumtek: 'https://images.unsplash.com/photo-1581774999237-5c6c6d8a89d0?w=800&h=500&fit=crop',
    pemayangtse: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop',
    tashiding: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop'
  };
  const select = $('#monasterySelect');
  const view = $('#darshanView');
  const toggle = $('#viewToggle');
  let currentView = 'map';

  function loadDarshan(monastery) {
    const embed = darshanEmbed[monastery];
    view.innerHTML = `
      <iframe
        src="${embed}"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;
    const iframe = view.querySelector('iframe');
    iframe.onerror = () => {
      view.innerHTML = `
        <div class="tour-fallback">
          <img src="${fallbackImg[monastery]}" alt="${monastery}" style="width:100%;height:100%;object-fit:cover;">
          <div class="fallback-message">360° view unavailable – showing monastery image.</div>
        </div>
      `;
    };
  }
  select.addEventListener('change', () => loadDarshan(select.value));
  toggle.addEventListener('click', () => {
    currentView = currentView === 'map' ? 'streetview' : 'map';
    if (currentView === 'streetview') {
      loadStreetViewDarshan(select.value);
      toggle.innerHTML = '<i class="fas fa-map"></i> Map View';
    } else {
      loadDarshan(select.value);
      toggle.innerHTML = '<i class="fas fa-street-view"></i> Street View';
    }
  });
  loadDarshan(select.value);
}

function initStreetViewDarshan() {
  const streetEmbed = {
    rumtek: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE5OekJ4YzJWa1pYSmxZM1F0YUdGcGJtVmpkQ0k2YVd4c2IzTWlPaUptYVd4bElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlMQ0oyWXlJNkltWmxZWEppYkdVaUxDSjJZeUk2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3245!2d88.5982!3f0!4f5!5f0.7820865974627469',
    pemayangtse: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE1UZzVOMlJoWldSbGJHbDJaV1JmYVhCbElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlMQ0oyWXlJNkltWmxZWEppYkdVaUxDSjJZeUk2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3069!2d88.2432!3f0!4f5!5f0.7820865974627469',
    tashiding: 'https://www.google.com/maps/embed?pb=!4v1727347200000!6m8!1m7!1sCAoSLEFGMVFpcE5OekJ4YzJWa1pYSmxZM1F0YUdGcGJtVmpkQ0k2YVd4c2IzTWlPaUptYVd4bElqb2lZbUZ6Wld4cGJtVXRNekF4TmkweE16QXhMVGcyTkRrdE5Ea3dOell4T0RJeU1EY3hJaXdpYldGcGJHbG5hSFJsY3lJNkluUmxjM1JmYVdRaUxDSnBaQ0k2SW1KbVptRXlZalJtTmpFeVpUUTJZbVU0WVRneVlqWXdaR1l5WlRsaE1HVWlmUg.!2m2!1d27.3218!2d88.2984!3f0!4f5!5f0.7820865974627469'
  };
  const select = $('#monasterySelect');
  const view = $('#darshanView');
  const toggle = $('#viewToggle');
  if (toggle && select && view) {
    toggle.addEventListener('click', () => {
      const monastery = select.value;
      const embed = streetEmbed[monastery];
      view.innerHTML = `
        <iframe
          src="${embed}"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      `;
    });
  }
}

/* ==========================  DIGITAL RITUALS  ========================== */
function initRitualCards() {
  $$('.ritual-card').forEach(card => {
    const ritual = card.dataset.ritual;
    card.querySelector('.ritual-start').addEventListener('click', () => openRitualModal(ritual));
  });
}

function openRitualModal(intent) {
  const modal = $('#ritualModal');
  const interface = $('#ritualInterface');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  interface.innerHTML = `
    <div class="ritual-loading">
      <div class="ritual-spinner"></div>
      <p>Creating your spiritual ritual...</p>
    </div>
  `;
  fetch('/api/ritual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ intent, language: currentLanguage })
  }).then(r => r.json()).then(data => {
    interface.innerHTML = `
      <div class="ritual-enhanced">
        <h3>Ritual for ${intent}</h3>
        <p>${data.ritual}</p>
        <div class="ritual-audio-controls">
          <button class="btn ritual-play"><i class="fas fa-play"></i> Play Audio</button>
          <button class="btn ritual-speak"><i class="fas fa-volume-up"></i> Speak Ritual</button>
        </div>
        <div class="glowing-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>
    `;
    interface.querySelector('.ritual-play').onclick = () => {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.2;
      audio.play();
    };
    interface.querySelector('.ritual-speak').onclick = () => speakText(data.ritual);
  }).catch(() => {
    interface.innerHTML = `<p>Unable to create ritual. Please try again.</p>`;
  });
  $('#closeRitualModal').onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };
}