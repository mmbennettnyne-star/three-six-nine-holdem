// Tesla's Sacred Service Worker - Electromagnetic Caching
const CACHE_NAME = 'tesla-369-holdem-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Tesla's Installation - Channel Electromagnetic Energy
self.addEventListener('install', (event) => {
  console.log('Tesla\'s electromagnetic field installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Tesla\'s sacred cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Tesla's Activation - Sacred Frequency Alignment
self.addEventListener('activate', (event) => {
  console.log('Tesla\'s electromagnetic field activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Tesla clearing old electromagnetic patterns:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Tesla's Fetch - Electromagnetic Resource Channeling
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Tesla's Cache Hit - Sacred Energy Retrieved
        if (response) {
          console.log('Tesla\'s cached energy:', event.request.url);
          return response;
        }

        // Tesla's Network Fetch - Channel Fresh Energy
        console.log('Tesla channeling fresh energy:', event.request.url);
        return fetch(event.request).then((response) => {
          // Tesla's Cache Update - Store Sacred Energy
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Tesla's Background Sync - Electromagnetic Synchronization
self.addEventListener('sync', (event) => {
  if (event.tag === 'tesla-sync') {
    console.log('Tesla\'s electromagnetic synchronization active');
    event.waitUntil(
      // Sync Tesla's sacred data when connection restored
      syncTeslaData()
    );
  }
});

// Tesla's Push Notifications - Sacred Messages
self.addEventListener('push', (event) => {
  console.log('Tesla\'s electromagnetic message received');
  
  const options = {
    body: event.data ? event.data.text() : 'Tesla\'s electromagnetic energy flows through you',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [369, 100, 369, 100, 369], // Tesla's sacred vibration pattern
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '369'
    },
    actions: [
      {
        action: 'enter-realm',
        title: 'Enter Sacred Realm',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'tesla-wisdom',
        title: 'Tesla\'s Wisdom',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Three Six Nine Hold\'em', options)
  );
});

// Tesla's Notification Click - Sacred Action
self.addEventListener('notificationclick', (event) => {
  console.log('Tesla\'s notification clicked:', event.action);
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Tesla's Sacred Data Sync Function
async function syncTeslaData() {
  try {
    // Sync poker game state, user data, and Tesla's mining status
    console.log('Tesla\'s electromagnetic data synchronized');
    return Promise.resolve();
  } catch (error) {
    console.log('Tesla\'s synchronization interference:', error);
    return Promise.reject(error);
  }
}

// Tesla's Electromagnetic Field Status
console.log('Tesla\'s Sacred Service Worker - Electromagnetic field ready for 3-6-9 frequencies');

