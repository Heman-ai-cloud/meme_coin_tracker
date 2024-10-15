import { Memecoin, MentionData, Alert } from '../types';

// ... (keep the existing code for generating random data)

let alerts: Alert[] = [];

export const getMemecoins = (): Memecoin[] => {
  // ... (keep the existing code)
};

export const getMentionData = (coinId: string): MentionData[] => {
  // ... (keep the existing code)
};

export const getAlerts = (): Alert[] => {
  return alerts;
};

export const addAlert = (alert: Omit<Alert, 'id'>): Alert => {
  const newAlert = { ...alert, id: Date.now().toString() };
  alerts.push(newAlert);
  return newAlert;
};

export const removeAlert = (id: string): void => {
  alerts = alerts.filter(alert => alert.id !== id);
};

export const updateAlerts = (memecoins: Memecoin[]): Alert[] => {
  alerts = alerts.map(alert => {
    const coin = memecoins.find(c => c.id === alert.coinId);
    if (coin) {
      let triggered = false;
      switch (alert.type) {
        case 'mentions':
          triggered = alert.condition === 'above' ? coin.totalMentions > alert.threshold : coin.totalMentions < alert.threshold;
          break;
        case 'sentiment':
          triggered = alert.condition === 'above' ? coin.sentiment > alert.threshold : coin.sentiment < alert.threshold;
          break;
        case 'price':
          triggered = alert.condition === 'above' ? coin.price > alert.threshold : coin.price < alert.threshold;
          break;
      }
      return { ...alert, triggered };
    }
    return alert;
  });
  return alerts;
};