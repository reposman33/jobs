const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');
const serviceAccount = require('./serviceAccountKey.json');

// Initialiseer Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const COLLECTION_NAME = 'jobs'; // Pas dit aan naar jouw collectienaam
const jobCount = 15; // Aantal dummy documenten dat je wilt genereren

async function seedDatabase() {
  const batch = db.batch();

  console.log('Dummy data genereren...');

  for (let i = 0; i < jobCount; i++) {
    // Definieer de mogelijke statussen
    const statuses = ['accepted', 'rejected', 'pending'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Maak een nieuw documentreferentie aan met een uniek ID
    const docRef = db.collection(COLLECTION_NAME).doc();

    const datum = admin.firestore.Timestamp.fromDate(new Date(faker.date.recent({ days: 90 })));

    const dummyAanvraag = {
      id: docRef.id, // We gebruiken het Firestore Document ID als de 'id' string
      aanvraag: faker.company.catchPhrase(),
      bedrijf: faker.company.name(),
      // datum: faker.date.recent({ days: 30 }).toISOString().split('T')[0], // Formaat: YYYY-MM-DD
      datum: datum,
      locatie: `${faker.location.city()}, ${faker.location.country()}`,
      motivatie: faker.lorem.paragraph(),
      status: randomStatus,
      // Optionele velden toevoegen op basis van kans (bijv. 70% kans dat ze bestaan)
      ...(Math.random() > 0.3 && { 
        sluitingsdatum: faker.date.future({ years: 1 }).toISOString().split('T')[0] 
      }),
      ...(Math.random() > 0.3 && { 
        updates: faker.lorem.sentence() 
      }),
      userId: "D5Spw157BeTOMCVWY3ogLnVC0Zu2" // Vaste userId voor alle documenten
    };

    batch.set(docRef, dummyAanvraag);
  }

  // Voer de batch in één keer uit (Firestore ondersteunt tot 500 operaties per batch)
  try {
    await batch.commit();
    console.log('✅ Succesvol 20 dummy documenten toegevoegd aan Firestore!');
  } catch (error) {
    console.error('❌ Fout bij het toevoegen van data:', error);
  }
}

seedDatabase();