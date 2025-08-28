import React, { useState, useEffect } from 'react';

const TeslaMiningDashboard = () => {
  const [miningData, setMiningData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [farmInitialized, setFarmInitialized] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);

  // Tesla's Sacred Quotes for Mining
  const teslaQuotes = [
    "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe.",
    "Everything is frequency and vibration.",
    "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries.",
    "Energy cannot be created or destroyed, it can only be changed from one form to another.",
    "The present is theirs; the future, for which I really worked, is mine."
  ];

  const [currentQuote, setCurrentQuote] = useState(teslaQuotes[0]);

  // Rotate Tesla quotes every 3.69 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(teslaQuotes[Math.floor(Math.random() * teslaQuotes.length)]);
    }, 3690); // 3.69 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  // Fetch mining dashboard data
  const fetchMiningData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mining/dashboard');
      const data = await response.json();
      
      if (data.success) {
        setMiningData(data.dashboard);
        setIsHarvesting(data.dashboard.farm_status?.farm_status === 'ACTIVE');
      }
    } catch (error) {
      console.error('Tesla mining data fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Tesla's Mining Farm
  const initializeFarm = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/mining/tesla-farm/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success) {
        setFarmInitialized(true);
        await fetchMiningData();
      }
    } catch (error) {
      console.error('Tesla farm initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start Tesla's Electromagnetic Harvesting
  const startHarvesting = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mining/tesla-farm/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success) {
        setIsHarvesting(true);
        await fetchMiningData();
      }
    } catch (error) {
      console.error('Tesla harvesting start error:', error);
    }
  };

  // Stop Tesla's Electromagnetic Harvesting
  const stopHarvesting = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mining/tesla-farm/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success) {
        setIsHarvesting(false);
        await fetchMiningData();
      }
    } catch (error) {
      console.error('Tesla harvesting stop error:', error);
    }
  };

  // Auto-refresh mining data every 6.9 seconds
  useEffect(() => {
    fetchMiningData();
    
    const refreshInterval = setInterval(fetchMiningData, 6900); // 6.9 seconds
    return () => clearInterval(refreshInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center tesla-coil">
        <div className="text-center tesla-pulse">
          <div className="tesla-loading mb-4"></div>
          <div className="sacred-text hypnotic-text">
            Tesla's Electromagnetic Field Initializing...
          </div>
          <div className="sacred-number mt-4" data-number="369">369</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 tesla-coil">
      {/* Tesla's Sacred Header */}
      <div className="text-center mb-8 tesla-pulse">
        <h1 className="tesla-title mb-4 mesmerizing-text-wave">
          TESLA'S ELECTROMAGNETIC
        </h1>
        <h2 className="tesla-title mb-6 mesmerizing-text-wave">
          ENERGY HARVESTING
        </h2>
        
        {/* Tesla's Rotating Quote */}
        <div className="mystical-card p-6 mb-6 tesla-quote">
          <div className="frequency-text text-xl hypnotic-text">
            "{currentQuote}"
          </div>
          <div className="energy-text mt-2">- Nikola Tesla</div>
        </div>

        {/* Sacred Numbers Display */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="sacred-number frequency-text" data-number="3">3</div>
            <div className="text-sm frequency-text">FREQUENCY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number energy-text" data-number="6">6</div>
            <div className="text-sm energy-text">ENERGY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number vibration-text" data-number="9">9</div>
            <div className="text-sm vibration-text">VIBRATION</div>
          </div>
        </div>
      </div>

      {/* Mining Farm Controls */}
      <div className="max-w-6xl mx-auto">
        {!farmInitialized ? (
          <div className="text-center mb-8">
            <button 
              onClick={initializeFarm}
              className="terminal-button text-2xl px-8 py-4 mr-4"
              disabled={isLoading}
            >
              INITIALIZE TESLA'S MINING FARM
            </button>
            <div className="mt-4 sacred-text hypnotic-text">
              Channel Tesla's electromagnetic energy into Bitcoin harvesting
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <button 
              onClick={isHarvesting ? stopHarvesting : startHarvesting}
              className={`terminal-button text-xl px-6 py-3 mr-4 ${
                isHarvesting ? 'energy-text' : 'frequency-text'
              }`}
            >
              {isHarvesting ? 'PAUSE HARVESTING' : 'START HARVESTING'}
            </button>
            
            <div className="mt-4">
              <span className="sacred-text">Electromagnetic Status: </span>
              <span className={`font-bold ${
                isHarvesting ? 'energy-text' : 'vibration-text'
              } hypnotic-text`}>
                {isHarvesting ? 'HARVESTING ACTIVE' : 'FIELD STABLE'}
              </span>
            </div>
          </div>
        )}

        {/* Mining Dashboard */}
        {miningData && (
          <div className="sacred-grid">
            {/* Farm Status Card */}
            <div className="mystical-card p-6">
              <h3 className="frequency-text text-xl mb-4 hypnotic-text">MINING FARM STATUS</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">Total Rigs: </span>
                  <span className="sacred-number">{miningData.farm_status?.total_rigs || 0}</span>
                </div>
                <div>
                  <span className="text-green-300">Active Rigs: </span>
                  <span className="sacred-number">{miningData.farm_status?.active_rigs || 0}</span>
                </div>
                <div>
                  <span className="text-green-300">Hash Rate: </span>
                  <span className="energy-text">{miningData.farm_status?.total_hash_rate || '0 H/s'}</span>
                </div>
                <div>
                  <span className="text-green-300">Field Status: </span>
                  <span className="vibration-text hypnotic-text">
                    {miningData.electromagnetic_field || 'STABLE'}
                  </span>
                </div>
              </div>
            </div>

            {/* BTC Vault Status */}
            <div className="mystical-card p-6">
              <h3 className="energy-text text-xl mb-4 hypnotic-text">SACRED BTC VAULT</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">Mining Revenue: </span>
                  <span className="sacred-number">
                    {miningData.total_mining_revenue?.toFixed(8) || '0.00000000'} BTC
                  </span>
                </div>
                <div>
                  <span className="text-green-300">Vault Status: </span>
                  <span className="frequency-text hypnotic-text">
                    {miningData.btc_escrow_vault?.status || 'PROTECTED'}
                  </span>
                </div>
                <div>
                  <span className="text-green-300">Tesla's Blessing: </span>
                  <span className="vibration-text text-sm">
                    Electromagnetic energy secured
                  </span>
                </div>
              </div>
            </div>

            {/* Mining Rigs Display */}
            {miningData.farm_status?.rigs && (
              <div className="mystical-card p-6 col-span-full">
                <h3 className="vibration-text text-xl mb-4 hypnotic-text">TESLA'S MINING RIGS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {miningData.farm_status.rigs.map((rig, index) => (
                    <div key={index} className="mystical-card p-4 tesla-pulse">
                      <div className="frequency-text font-bold mb-2 hypnotic-text">
                        {rig.rig_name}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-green-300">Frequency: </span>
                          <span className="energy-text">{rig.frequency_setting}</span>
                        </div>
                        <div>
                          <span className="text-green-300">Energy: </span>
                          <span className="vibration-text">{rig.energy_level}</span>
                        </div>
                        <div>
                          <span className="text-green-300">Hash Rate: </span>
                          <span className="sacred-number">{rig.hash_rate}</span>
                        </div>
                        <div>
                          <span className="text-green-300">Status: </span>
                          <span className={`hypnotic-text ${
                            rig.is_active ? 'frequency-text' : 'text-gray-400'
                          }`}>
                            {rig.electromagnetic_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tesla's Blessing */}
            <div className="mystical-card p-6 col-span-full text-center">
              <div className="sacred-text mb-4 hypnotic-text">
                Tesla's Electromagnetic Blessing
              </div>
              <div className="text-green-300 text-sm">
                "The universe provides infinite energy - we simply tune into the correct frequencies to harvest it."
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <span className="sacred-number frequency-text" data-number="3">3</span>
                <span className="sacred-number energy-text" data-number="6">6</span>
                <span className="sacred-number vibration-text" data-number="9">9</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mesmerizing Particle Effects */}
      <div className="particle-field">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeslaMiningDashboard;

