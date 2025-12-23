import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  DocumentData,
  addDoc,
  query, 
  where,
  DocumentReference,
  QuerySnapshot,
  getDocs
} from '@angular/fire/firestore';
import { Sollicitatie } from '../../../models/sollicitatie.interface';
// Import the functions you need from the SDKs you need
import { from, Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
   protected querySnapshot!: QuerySnapshot<DocumentData>;
   constructor(private firestore: Firestore, private authService: AuthService) {}
   
   // geef een Promise die resolved naar een Sollicitatie []
   //  getDocumentsOnce: wordt niet opnieuw aangeroepen als upstream een document dat aan query voldoet wijzigt
   async getDocumentsOnce (): Promise<Sollicitatie[]> {
     const ref = collection(this.firestore, 'sollicitaties');
     const q = query(ref, where("userId","==", this.authService.userId));
     const docs = await getDocs(q);
     const sollicitaties: Sollicitatie[] = [];

     docs.forEach((doc) => {
      const sollicitatie: Sollicitatie = doc.data() as Sollicitatie;
       sollicitaties.push({...sollicitatie, id: doc.id});
     });
     return sollicitaties;
  }

  // Voeg een nieuwe sollicitatie toe
  addSollicitatie(sollicitatie: Sollicitatie): Promise<DocumentReference<DocumentData, DocumentData>> {
    const sollicitatieRef = collection(this.firestore, 'sollicitaties');
    return addDoc(sollicitatieRef, sollicitatie);
  }

  // Haal alle sollicitaties op
  getAllSollicitaties(): Promise<Sollicitatie[]> {
    return this.getDocumentsOnce();
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
  getSollicitatieById(id: string): Observable<Sollicitatie> {
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