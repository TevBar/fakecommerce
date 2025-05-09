export const getEnv = () => ({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY || '',
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_MSG_SENDERID || '',
    appId: import.meta.env.VITE_APP_ID || '',
  });
  