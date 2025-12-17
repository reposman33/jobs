import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
  CollectionReference
} from '@angular/fire/firestore';
import { Sollicitatie } from '../../../models/sollicitatie.interface';
// Import the functions you need from the SDKs you need
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly sollicitaties$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const ref = collection(this.firestore, 'sollicitaties');
    this.sollicitaties$ = collectionData(ref, { idField: 'id' });
  }
  private sollicitatiesRef!: CollectionReference;

  ngOnInit() {
    this.sollicitatiesRef = collection(this.firestore, 'sollicitaties');
  }

  // // Voeg een nieuwe sollicitatie toe
  addSollicitatie(sollicitatie: Sollicitatie): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${sollicitatie.datum}`); // We gebruiken de datum als ID (je kunt dit ook vervangen door een UUID of andere unieke identifier)
    return setDoc(sollicitatieRef, sollicitatie);
  }

  // Haal alle sollicitaties op
  getSollicitaties() {
    return this.sollicitaties$ as Observable<Sollicitatie[]>;
  }

  // Update een sollicitatie
  updateSollicitatie(id: string, sollicitatie: Sollicitatie): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return updateDoc(sollicitatieRef, {...sollicitatie});
  }

  // Verwijder een sollicitatie
  deleteSollicitatie(id: string): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return deleteDoc(sollicitatieRef);
  }

  // Haal een specifieke sollicitatie op
  getSollicitatie(id: string): Observable<Sollicitatie> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return from(
      getDoc(sollicitatieRef).then(docSnap => {
        if (docSnap.exists()) {
          return docSnap.data() as Sollicitatie;
        } else {
          throw new Error('Sollicitatie not found');
        }
      })
    );
  }
}