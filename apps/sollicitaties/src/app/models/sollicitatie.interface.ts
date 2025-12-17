export interface Sollicitatie {
  datum: Date;
  bedrijf: string;
  functie: string;
  sluitingsdatum: Date;
  sollicitatie: string;
  status: 'accepted' | 'rejected' | 'pending';
}
