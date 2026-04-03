function createCard(item) {
  const itemsList = item.items
    ? `<ul class="card-items">${item.items.map(i => `<li>${i}</li>`).join('')}</ul>`
    : '';
  const disabledClass = item.disabled ? ' card-disabled' : '';
  const badge = item.disabled ? `<span class="card-soon">Hamarosan</span>` : '';
  return `
    <article class="card${disabledClass}">
      <div class="card-icon">${item.icon}</div>
      <h3>${item.title} ${badge}</h3>
      <p>${item.text}</p>
      ${itemsList}
    </article>
  `;
}

function createListItems(items) {
  return items.map(item => `<li>${item}</li>`).join('');
}

function createStatCards(items) {
  return items.map(item => `<div class="stat-card">${item}</div>`).join('');
}

function createHighlightItems(items) {
  return items.map(item => `
    <div class="highlight-item">
      <strong>${item.title}</strong>
      <span>${item.text}</span>
    </div>
  `).join('');
}

function createContactItems(company) {
  return `
    <div class="contact-item"><strong>Telefon:</strong> <a href="tel:${company.phone.replace(/\s+/g, '')}">${company.phone}</a></div>
    <div class="contact-item"><strong>E-mail:</strong> <a href="mailto:${company.email}">${company.email}</a></div>
    <div class="contact-item"><strong>Terület:</strong> ${company.area}</div>
  `;
}

function initServiceTabs(data) {
  const tabResidential = document.getElementById('tabResidential');
  const tabCorporate = document.getElementById('tabCorporate');
  const servicesGrid = document.getElementById('servicesGrid');
  const servicesTagline = document.getElementById('servicesTagline');

  const taglines = {
    residential: 'Segítünk biztonságosabbá, korszerűbbé és energiatakarékosabbá tenni otthonát.',
    corporate: 'Komplex villamos és automatizálási megoldásokat kínálunk ipari partnereink számára a hatékonyabb működés érdekében.'
  };

  function switchTab(type) {
    if (type === 'residential') {
      tabResidential.classList.add('tab-active');
      tabCorporate.classList.remove('tab-active');
      servicesTagline.textContent = taglines.residential;
      servicesGrid.innerHTML = data.servicesResidential.map(createCard).join('');
    } else {
      tabCorporate.classList.add('tab-active');
      tabResidential.classList.remove('tab-active');
      servicesTagline.textContent = taglines.corporate;
      servicesGrid.innerHTML = data.servicesCorporate.map(createCard).join('');
    }
    // Animate cards in
    const cards = servicesGrid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  }

  tabResidential.addEventListener('click', () => switchTab('residential'));
  tabCorporate.addEventListener('click', () => switchTab('corporate'));

  // Default: residential
  switchTab('residential');
}

window.siteRenderer = {
  render() {
    const data = window.siteData;
    if (!data) return;

    document.getElementById('heroStats').innerHTML = createStatCards(data.company.introStats);
    document.getElementById('heroHighlights').innerHTML = createHighlightItems(data.company.heroHighlights);
    document.getElementById('featureCards').innerHTML = data.features.map(createCard).join('');
    document.getElementById('aboutList').innerHTML = createListItems(data.aboutItems);
    document.getElementById('benefitList').innerHTML = createListItems(data.benefits);
    document.getElementById('contactList').innerHTML = createContactItems(data.company);
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    initServiceTabs(data);
  }
};
