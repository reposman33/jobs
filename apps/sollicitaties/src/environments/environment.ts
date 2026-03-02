export const environment = {
  firebase: {
    apiKey: (import.meta as any).env.apiKey,
    authDomain: (import.meta as any).env.authDomain,
    projectId: (import.meta as any).env.projectId,
    storageBucket: (import.meta as any).env.storageBucket,
    messagingSenderId: (import.meta as any).env.messagingSenderId,
    appId: (import.meta as any).env.appId,
    measurementId: (import.meta as any).env.measurementId,
  },
  production: false,
};