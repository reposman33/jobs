const fs = require('fs');
const path = require('path');

// Pad vanaf de root naar je environments map
const targetPath = path.join(__dirname, 'apps/sollicitaties/src/app/environments/firebase.config.ts');

const envConfigFile = `export const firebaseConfig = {
  apiKey: '${process.env.apiKey || ""}',
  authDomain: '${process.env.authDomain || ""}',
  projectId: '${process.env.projectId || ""}',
  storageBucket: '${process.env.storageBucket || ""}',
  messagingSenderId: '${process.env.messagingSenderId || ""}',
  appId: '${process.env.appId || ""}'
};
`;

console.log('Genereren van Firebase config...');

// Zorg dat de map bestaat
const dir = path.dirname(targetPath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

try {
    fs.writeFileSync(targetPath, envConfigFile);
    console.log(`✅ Bestand succesvol aangemaakt op: ${targetPath}`);
} catch (err) {
    console.error('❌ Fout bij aanmaken bestand:', err);
    process.exit(1);
}