import { inject, Injectable } from '@angular/core';
import { Auth,
   authState,
   signInWithPopup,
   GoogleAuthProvider,
   GithubAuthProvider,
   User,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  public lastLogin$ = authState(this.auth).pipe(
    map(user => user ? user.metadata.lastSignInTime : null)
  );
  

public get userId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
  
  readonly user$: Observable<User | null> = authState(this.auth);
  readonly isAuthenticated$ = authState(this.auth).pipe(
    map(user => !!user)
  );

  async signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  
  async signInWithGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }

  async signOut() {
    await this.auth.signOut();
    await this.router.navigate(['/login']);
  }

  async signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // async sendPasswordResetEmail(email: string) {
  //   // Implement password reset email logic here
  // } 

}