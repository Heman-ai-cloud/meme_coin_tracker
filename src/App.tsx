import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart2, ThumbsUp } from 'lucide-react';
import MemecoinsTable from './components/MemecoinsTable';
import MentionChart from './components/MentionChart';
import AlertsPanel from './components/AlertsPanel';
import { getMemecoins, getMentionData, getAlerts, updateAlerts } from './services/memecoinsService';
import { Memecoin, Alert } from './types';

const App: React.FC = () => {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [mentionData, setMentionData] = useState([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const newMemecoins = getMemecoins();
      setMemecoins(newMemecoins);
      setMentionData(getMentionData(newMemecoins[0].id));
      const updatedAlerts = updateAlerts(newMemecoins);
      setAlerts(updatedAlerts);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAlertsChange = () => {
    setAlerts(getAlerts());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <DollarSign className="mr-2" />
            Memecoin Tracker
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ... (keep the existing code for the top cards) */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MemecoinsTable memecoins={memecoins} />
          </div>
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Mention Trend</h2>
              <MentionChart data={mentionData} />
            </div>
            <AlertsPanel alerts={alerts} memecoins={memecoins} onAlertsChange={handleAlertsChange} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;