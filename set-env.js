const fs = require('fs');
const path = require('path');

// Pad vanaf de root naar je environments map
const targetPath = path.join(__dirname, 'apps/jobs/src/environments/');

const environment = `{
    firebase: {
        apiKey: '${process.env.apiKey || ""}',
        authDomain: '${process.env.authDomain || ""}',
        projectId: '${process.env.projectId || ""}',
        storageBucket: '${process.env.storageBucket || ""}',
        messagingSenderId: '${process.env.messagingSenderId || ""}',
        appId: '${process.env.appId || ""}'
    },
    production: true,
    currentBuildCommitSha: '${process.env.VERCEL_GIT_COMMIT_SHA}',
    vercelUrl: '${process.env.VERCEL_URL}'
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
