export interface Sollicitatie {
  id: string;
  aanvraag: string;
  bedrijf: string;
  datum: string;
  locatie: string;
  motivatie: string;
  sluitingsdatum?: string;
  status: 'accepted' | 'rejected' | 'pending';
  updates?: string;
}
