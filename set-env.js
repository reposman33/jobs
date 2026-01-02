const fs = require('fs');

// Het pad naar waar het bestand moet komen
const targetPath = './apps/sollicitaties/src/app/environments/firebase.config.ts';

const envConfigFile = `export const firebaseConfig = {
  apiKey: '${process.env.API_KEY || ""}',
  authDomain: '${process.env.AUTH_DOMAIN || ""}',
  projectId: '${process.env.PROJECT_ID || ""}',
  storageBucket: '${process.env.STORAGE_BUCKET || ""}',
  messagingSenderId: '${process.env.MESSAGING_SENDER_ID || ""}',
  appId: '${process.env.APP_ID || ""}'
};
`;

console.log('Genereren van Firebase config...');
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Bestand aangemaakt op: ${targetPath}`);