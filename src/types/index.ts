
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number; // in kilometers
  latitude: number;
  longitude: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}
