export interface Sollicitatie {
  id: string;
  aanvraag: string;
  datum: Date;
  bedrijf: string;
  functie: string;
  locatie: string;
  motivatie: string;
  sluitingsdatum: Date;
  status: 'accepted' | 'rejected' | 'pending';
}
