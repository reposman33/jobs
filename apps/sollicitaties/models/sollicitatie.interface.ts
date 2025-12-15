export interface Sollicitatie {
  datum: string;
  bedrijf: string;
  functie: string;
  sluitingsdatum: string;
  sollicitatie: string;
  status: 'accepted' | 'rejected' | 'pending';
}
