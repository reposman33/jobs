export interface Sollicitatie {
  id: string;
  datum: Date;
  bedrijf: string;
  functie: string;
  sluitingsdatum: Date;
  sollicitatie: string;
  status: 'accepted' | 'rejected' | 'pending';
}
