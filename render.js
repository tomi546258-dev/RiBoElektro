function createCard(item) {
  return `
    <article class="card">
      <div class="card-icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
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

window.siteRenderer = {
  render() {
    const data = window.siteData;

    document.getElementById('heroStats').innerHTML = createStatCards(data.company.introStats);
    document.getElementById('heroHighlights').innerHTML = createHighlightItems(data.company.heroHighlights);
    document.getElementById('servicesGrid').innerHTML = data.services.map(createCard).join('');
    document.getElementById('featureCards').innerHTML = data.features.map(createCard).join('');
    document.getElementById('aboutList').innerHTML = createListItems(data.aboutItems);
    document.getElementById('benefitList').innerHTML = createListItems(data.benefits);
    document.getElementById('contactList').innerHTML = createContactItems(data.company);
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  }
};
