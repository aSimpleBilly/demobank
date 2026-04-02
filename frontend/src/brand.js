const brands = {
  sage: {
    name: 'sage',
    logoText: 'sage',
    logoUrl: 'https://www.sage.com/en-gb/-/media/images/sagedotcom/master/logos/sage-logo%20svg.svg',
    subtitle: 'Your personal banking demo',
    font: "'Inter', Arial, sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#1d252c',
      muted:      '#6b7280',
      accent:     '#00dc00',
      accent2:    '#00b140',
      accentDark: '#009930',
      green:      '#00dc00',
      red:        '#e02b2b',
    },
    balanceGradient: 'linear-gradient(135deg, #00b140 0%, #009930 100%)',
  },

  vault: {
    name: 'Vault',
    logoText: 'Vault',
    logoUrl: null,
    subtitle: 'Your personal banking demo',
    font: "'DM Sans', sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap',
    colors: {
      bg:         '#0d0f14',
      surface:    '#161a23',
      surface2:   '#1e2330',
      border:     '#2a3045',
      text:       '#e8eaf0',
      muted:      '#7a8099',
      accent:     '#c9a84c',
      accent2:    '#e8c96a',
      accentDark: '#b8942f',
      green:      '#3ecf8e',
      red:        '#f06060',
    },
    balanceGradient: 'linear-gradient(135deg, #1a1f2e 0%, #0f1219 100%)',
  },

  monzo: {
    name: 'Monzo',
    logoText: 'monzo',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Monzo_2022_logo.svg/500px-Monzo_2022_logo.svg.png',
    subtitle: 'Your personal banking demo',
    font: "'Inter', Arial, sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f7f7f7',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e5e5e5',
      text:       '#1b1b1b',
      muted:      '#6b6b6b',
      accent:     '#ff5c57',
      accent2:    '#e04440',
      accentDark: '#c73a36',
      green:      '#2ecc71',
      red:        '#e04440',
    },
    balanceGradient: 'linear-gradient(135deg, #1b1b1b 0%, #2d2d2d 100%)',
  },
};

const DEFAULT_BRAND = 'sage';

export function getBrand() {
  const key = (process.env.REACT_APP_BRAND || DEFAULT_BRAND).toLowerCase();
  return brands[key] || brands[DEFAULT_BRAND];
}

export function applyBrand(brand) {
  const root = document.documentElement;
  const c = brand.colors;

  root.style.setProperty('--bg', c.bg);
  root.style.setProperty('--surface', c.surface);
  root.style.setProperty('--surface2', c.surface2);
  root.style.setProperty('--border', c.border);
  root.style.setProperty('--text', c.text);
  root.style.setProperty('--muted', c.muted);
  root.style.setProperty('--accent', c.accent);
  root.style.setProperty('--accent2', c.accent2);
  root.style.setProperty('--accent-dark', c.accentDark);
  root.style.setProperty('--green', c.green);
  root.style.setProperty('--red', c.red);
  root.style.setProperty('--font', brand.font);
  root.style.setProperty('--balance-gradient', brand.balanceGradient);

  // Swap Google Fonts stylesheet
  let link = document.getElementById('brand-font');
  if (!link) {
    link = document.createElement('link');
    link.id = 'brand-font';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = brand.fontImport;

  document.title = `${brand.name} - Personal Banking Demo`;
}

export default brands;
