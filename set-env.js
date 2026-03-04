const fs = require('fs');
const path = require('path');

// Pad vanaf de root naar je environments map
const targetPath = path.join(__dirname, 'apps/jobs/src/environments/');
const nu = new Date();
const nu = new Date();

const environment = `export const environment = {
    firebase: {
        apiKey: '${process.env.apiKey || ""}',
        authDomain: '${process.env.authDomain || ""}',
        projectId: '${process.env.projectId || ""}',
        storageBucket: '${process.env.storageBucket || ""}',
        messagingSenderId: '${process.env.messagingSenderId || ""}',
        appId: '${process.env.appId || ""}',
        measurementId: '${process.env.appId || ""}'
    },
    PRODUCTION: true,
    BUILD_COMMIT: '${process.env.VERCEL_GIT_COMMIT_SHA}',
    VERCEL_URL: '${process.env.VERCEL_URL}',
    BUILD_DATE: ${nu}.toLocaleString("sv-SE", { timeZone: "Europe/Amsterdam",hour12: false })
}
`;

if (!fs.existsSync(targetPath)){
    console.log('Genereren van environments folder...');
    fs.mkdirSync(targetPath, { recursive: true });
}

try {
    fs.writeFileSync(targetPath + 'environment.ts', environment, 'utf8');
    console.log(`✅ Bestand succesvol aangemaakt op: ${targetPath}environment.ts`);
} catch (err) {
    console.error('❌ Fout bij aanmaken bestand:', err);
    process.exit(1);
}
