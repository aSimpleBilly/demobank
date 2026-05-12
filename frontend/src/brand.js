import { getVertical } from './verticals';

const brands = {
  sage: {
    name: 'sage',
    logoText: 'sage',
    logoUrl: 'https://www.sage.com/en-gb/-/media/images/sagedotcom/master/logos/sage-logo%20svg.svg',
    logoHasText: true,
    vertical: 'banking',
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
    logoHasText: false,
    vertical: 'banking',
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
    logoHasText: true,
    vertical: 'banking',
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
  lloyds: {
    name: 'Lloyds',
    logoText: 'Lloyds',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Lloyds_2024_wordmark.svg',
    logoHasText: true,
    vertical: 'banking',
    subtitle: 'Your personal banking demo',
    font: "'Inter', Arial, sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#1b1b1b',
      muted:      '#6b6b6b',
      accent:     '#006A4D',
      accent2:    '#006A4D',
      accentDark: '#00482F',
      green:      '#11B67A',
      red:        '#e51515',
    },
    balanceGradient: 'linear-gradient(135deg, #006A4D 0%, #00482F 100%)',
  },
  accessgroup: {
    name: 'The Access Group',
    logoText: 'the access group',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/The_Access_Group_logo.svg',
    logoHasText: true,
    vertical: 'retail',
    subtitle: 'Your personal retail demo',
    font: "'Inter', Arial, sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#1a1a2e',
      muted:      '#6b6b6b',
      accent:     '#00B0B9',
      accent2:    '#009EA0',
      accentDark: '#008A8F',
      green:      '#00B0B9',
      red:        '#E5004B',
    },
    balanceGradient: 'linear-gradient(135deg, #00B0B9 0%, #008A8F 100%)',
  },
  playtika: {
    name: 'Playtika',
    logoText: 'Playtika',
    logoUrl: 'https://www.playtika.com/img/logo-playtika.png',
    logoHasText: true,
    vertical: 'gaming',
    subtitle: 'Your personal gaming demo',
    font: "'Inter', sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#1a1a1a',
      surface:    '#242424',
      surface2:   '#2c2c2c',
      border:     '#3a3a3a',
      text:       '#f3f3f3',
      muted:      '#999999',
      accent:     '#FF3344',
      accent2:    '#FFD96B',
      accentDark: '#cc2836',
      green:      '#34d399',
      red:        '#FF3344',
    },
    balanceGradient: 'linear-gradient(135deg, #FF3344 0%, #cc2836 100%)',
  },
  experian: {
    name: 'Experian',
    logoText: 'Experian',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Experian_logo.svg/500px-Experian_logo.svg.png',
    logoHasText: true,
    vertical: 'credit',
    subtitle: 'Your personal credit demo',
    font: "'Inter', sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#0a0a23',
      muted:      '#6b6b6b',
      accent:     '#26478D',
      accent2:    '#1F3A75',
      accentDark: '#162A55',
      green:      '#26C281',
      red:        '#E5004B',
    },
    balanceGradient: 'linear-gradient(135deg, #26478D 0%, #162A55 100%)',
  },
  sky: {
    name: 'Sky',
    logoText: 'Sky',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Sky_logo_2025.svg/500px-Sky_logo_2025.svg.png',
    logoHasText: true,
    vertical: 'media',
    subtitle: 'Your personal media demo',
    font: "'Inter', sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#1a1a2e',
      muted:      '#6b6b6b',
      accent:     '#000FF5',
      accent2:    '#000FF5',
      accentDark: '#000DC0',
      green:      '#00b140',
      red:        '#e02b2b',
    },
    balanceGradient: 'linear-gradient(135deg, #000FF5 0%, #000DC0 100%)',
  },
  comparethemarket: {
    name: 'Compare the Market',
    logoText: 'Compare the Market',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Compare_The_Market_Logo_2024.svg',
    logoHasText: true,
    vertical: 'insurance',
    subtitle: 'Your personal insurance demo',
    font: "'Nunito Sans', sans-serif",
    fontImport: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap',
    colors: {
      bg:         '#f5f5f5',
      surface:    '#ffffff',
      surface2:   '#f0f0f0',
      border:     '#e0e0e0',
      text:       '#2d2d2d',
      muted:      '#6b6b6b',
      accent:     '#2da9b0',
      accent2:    '#249198',
      accentDark: '#1d7a80',
      green:      '#2da9b0',
      red:        '#e5004b',
    },
    balanceGradient: 'linear-gradient(135deg, #2da9b0 0%, #1d7a80 100%)',
  },
};

const DEFAULT_BRAND = 'experian';

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

  let link = document.getElementById('brand-font');
  if (!link) {
    link = document.createElement('link');
    link.id = 'brand-font';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = brand.fontImport;

  const vertical = getVertical(brand.vertical);
  document.title = `${brand.name} - ${vertical.accountTag} Demo`;
}

export default brands;
