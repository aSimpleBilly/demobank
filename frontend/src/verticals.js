const verticals = {
  banking: {
    id: 'banking',
    balanceLabel: 'Current balance',
    accountTag: 'Personal Account',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    transactionTitle: 'Make a transaction',
    historyTitle: 'Recent transactions',
    emptyStateMsg: 'No transactions yet — make your first deposit!',
    insufficientMsg: 'Insufficient funds',
    quickAmounts: [50, 100, 250, 500],
    actions: [
      { key: 'deposit',    label: 'Deposit',  icon: '↑', direction: 'in',  cssClass: 'action-in'  },
      { key: 'withdrawal', label: 'Withdraw', icon: '↓', direction: 'out', cssClass: 'action-out' },
    ],
  },

  gaming: {
    id: 'gaming',
    balanceLabel: 'Coin balance',
    accountTag: 'Player Wallet',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    transactionTitle: 'Add or spend coins',
    historyTitle: 'Recent activity',
    emptyStateMsg: 'No activity yet — buy your first coins!',
    insufficientMsg: 'Not enough coins',
    quickAmounts: [10, 25, 50, 100],
    actions: [
      { key: 'buy_coins',   label: 'Buy Coins',  icon: '🪙', direction: 'in',  cssClass: 'action-in'  },
      { key: 'spend_coins', label: 'Spend Coins', icon: '🎮', direction: 'out', cssClass: 'action-out' },
    ],
  },

  retail: {
    id: 'retail',
    balanceLabel: 'Store credit',
    accountTag: 'Loyalty Account',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    transactionTitle: 'Manage store credit',
    historyTitle: 'Recent orders',
    emptyStateMsg: 'No orders yet — add credit to get started!',
    insufficientMsg: 'Insufficient credit',
    quickAmounts: [20, 50, 100, 200],
    actions: [
      { key: 'top_up',   label: 'Top Up',    icon: '↑', direction: 'in',  cssClass: 'action-in'  },
      { key: 'purchase', label: 'Purchase',  icon: '🛒', direction: 'out', cssClass: 'action-out' },
    ],
  },

  pharma: {
    id: 'pharma',
    balanceLabel: 'Account balance',
    accountTag: 'Healthcare Account',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    transactionTitle: 'Manage funds',
    historyTitle: 'Recent claims',
    emptyStateMsg: 'No claims yet — submit your first claim!',
    insufficientMsg: 'Insufficient balance for claim',
    quickAmounts: [25, 75, 150, 300],
    actions: [
      { key: 'reimburse', label: 'Reimburse', icon: '↑', direction: 'in',  cssClass: 'action-in'  },
      { key: 'claim',     label: 'Claim',     icon: '📋', direction: 'out', cssClass: 'action-out' },
    ],
  },

  insurance: {
    id: 'insurance',
    balanceLabel: 'Policy value',
    accountTag: 'Insurance Account',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    transactionTitle: 'Manage policy',
    historyTitle: 'Recent activity',
    emptyStateMsg: 'No activity yet — make your first payment!',
    insufficientMsg: 'Exceeds policy value',
    quickAmounts: [100, 250, 500, 1000],
    actions: [
      { key: 'premium', label: 'Pay Premium',  icon: '↑', direction: 'in',  cssClass: 'action-in'  },
      { key: 'payout',  label: 'Claim Payout', icon: '↓', direction: 'out', cssClass: 'action-out' },
    ],
  },
  credit: {
    id: 'credit',
    balanceLabel: 'Credit score',
    accountTag: 'Credit Profile',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    transactionTitle: 'Manage credit profile',
    historyTitle: 'Recent activity',
    emptyStateMsg: 'No activity yet — boost your score!',
    insufficientMsg: 'Score too low',
    quickAmounts: [10, 25, 50, 100],
    actions: [
      { key: 'boost',  label: 'Boost Score', icon: '↑', direction: 'in',  cssClass: 'action-in'  },
      { key: 'report', label: 'Pull Report', icon: '📊', direction: 'out', cssClass: 'action-out' },
    ],
  },
  media: {
    id: 'media',
    balanceLabel: 'Account credit',
    accountTag: 'Subscriber Account',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    transactionTitle: 'Manage account',
    historyTitle: 'Recent activity',
    emptyStateMsg: 'No activity yet — top up your account!',
    insufficientMsg: 'Insufficient credit',
    quickAmounts: [10, 25, 50, 100],
    actions: [
      { key: 'top_up',       label: 'Top Up',           icon: '↑',  direction: 'in',  cssClass: 'action-in'  },
      { key: 'subscription', label: 'Pay Subscription', icon: '📺', direction: 'out', cssClass: 'action-out' },
    ],
  },
};

export function getVertical(key) {
  return verticals[key] || verticals.banking;
}

export default verticals;
