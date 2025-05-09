
import { Location } from "@/types";

export const districts: Location[] = [
  // Andhra Pradesh Districts
  { name: "Anantapur", state: "Andhra Pradesh", latitude: 14.6819, longitude: 77.6006 },
  { name: "Chittoor", state: "Andhra Pradesh", latitude: 13.2172, longitude: 79.1003 },
  { name: "East Godavari", state: "Andhra Pradesh", latitude: 16.9891, longitude: 82.2475 },
  { name: "Guntur", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365 },
  { name: "Krishna", state: "Andhra Pradesh", latitude: 16.1693, longitude: 81.1326 },
  { name: "Kurnool", state: "Andhra Pradesh", latitude: 15.8281, longitude: 78.0373 },
  { name: "Nellore", state: "Andhra Pradesh", latitude: 14.4426, longitude: 79.9865 },
  { name: "Prakasam", state: "Andhra Pradesh", latitude: 15.3485, longitude: 79.5604 },
  { name: "Srikakulam", state: "Andhra Pradesh", latitude: 18.2949, longitude: 83.8938 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", latitude: 17.6868, longitude: 83.2185 },
  { name: "Vizianagaram", state: "Andhra Pradesh", latitude: 18.1067, longitude: 83.3956 },
  { name: "West Godavari", state: "Andhra Pradesh", latitude: 16.9174, longitude: 81.3399 },
  { name: "YSR District", state: "Andhra Pradesh", latitude: 14.4775, longitude: 78.8383 },
  
  // Tamil Nadu Districts
  { name: "Ariyalur", state: "Tamil Nadu", latitude: 11.1400, longitude: 79.0786 },
  { name: "Chennai", state: "Tamil Nadu", latitude: 13.0827, longitude: 80.2707 },
  { name: "Coimbatore", state: "Tamil Nadu", latitude: 11.0168, longitude: 76.9558 },
  { name: "Cuddalore", state: "Tamil Nadu", latitude: 11.7500, longitude: 79.7500 },
  { name: "Dharmapuri", state: "Tamil Nadu", latitude: 12.1210, longitude: 78.1582 },
  { name: "Dindigul", state: "Tamil Nadu", latitude: 10.3624, longitude: 77.9695 },
  { name: "Erode", state: "Tamil Nadu", latitude: 11.3410, longitude: 77.7172 },
  { name: "Kanchipuram", state: "Tamil Nadu", latitude: 12.8342, longitude: 79.7036 },
  { name: "Kanyakumari", state: "Tamil Nadu", latitude: 8.0883, longitude: 77.5385 },
  { name: "Karur", state: "Tamil Nadu", latitude: 10.9601, longitude: 78.0766 },
  { name: "Madurai", state: "Tamil Nadu", latitude: 9.9252, longitude: 78.1198 },
  { name: "Nagapattinam", state: "Tamil Nadu", latitude: 10.7672, longitude: 79.8449 },
  { name: "Salem", state: "Tamil Nadu", latitude: 11.6643, longitude: 78.1460 },
  { name: "Thanjavur", state: "Tamil Nadu", latitude: 10.7870, longitude: 79.1378 },
  { name: "Tiruchirappalli", state: "Tamil Nadu", latitude: 10.7905, longitude: 78.7047 }
];

export const getDistrictsByState = (state: string): Location[] => {
  return districts.filter(district => district.state === state);
};
