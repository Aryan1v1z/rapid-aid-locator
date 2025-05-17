
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number; // in kilometers
  latitude: number;
  longitude: number;
  subDistrict?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

export interface Location {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export type State = "Andhra Pradesh" | "Tamil Nadu";
export type Language = "English" | "Telugu" | "Tamil" | "Hindi";
