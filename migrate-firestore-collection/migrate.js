const admin = require('firebase-admin'); // npm install -D firebase-admin
const serviceAccount = require('./firebase-service-account.json'); // <= download in firebase console => 'Project settings-Service accounts-Generate new private key'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function migrate() {
  const oldCollection = db.collection('sollicitaties');
  const newCollection = db.collection('jobs');

  const snapshot = await oldCollection.get();

  if (snapshot.empty) {
    console.log('No documents found in sollicitaties.');
    return;
  }

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    const newDocRef = newCollection.doc(doc.id);
    batch.set(newDocRef, doc.data());
  });

  await batch.commit();

  console.log(`Migrated ${snapshot.size} documents to jobs collection.`);
}

migrate().catch(console.error);