
import { Hospital } from "@/types";

// Mock hospital data with district-specific hospitals
export const mockHospitals: Hospital[] = [
  // Andhra Pradesh Hospitals - Visakhapatnam
  {
    id: "1",
    name: "King George Hospital",
    address: "Maharanipeta, Visakhapatnam, Andhra Pradesh",
    phone: "0891-2564891",
    distance: 1.2,
    latitude: 17.7085,
    longitude: 83.3072,
    subDistrict: "Gajuwaka"
  },
  {
    id: "2",
    name: "GIMSR Hospital",
    address: "Rushikonda, Visakhapatnam, Andhra Pradesh",
    phone: "0891-2840464",
    distance: 2.5,
    latitude: 17.8207,
    longitude: 83.3884,
    subDistrict: "Bheemunipatnam"
  },
  {
    id: "3",
    name: "Seven Hills Hospital",
    address: "Rockdale Layout, Visakhapatnam, Andhra Pradesh",
    phone: "0891-2567000",
    distance: 3.1,
    latitude: 17.7248,
    longitude: 83.3155,
    subDistrict: "Pendurthi"
  },
  
  // Andhra Pradesh Hospitals - Guntur
  {
    id: "4",
    name: "AIIMS Mangalagiri",
    address: "Mangalagiri, Guntur, Andhra Pradesh",
    phone: "0863-2379100",
    distance: 3.7,
    latitude: 16.5062,
    longitude: 80.6480,
    subDistrict: "Mangalagiri"
  },
  {
    id: "5",
    name: "Government General Hospital Guntur",
    address: "Kanna Vari Thota, Guntur, Andhra Pradesh",
    phone: "0863-2225113",
    distance: 4.2,
    latitude: 16.3087,
    longitude: 80.4487,
    subDistrict: "Tenali"
  },
  
  // Tamil Nadu Hospitals - Chennai
  {
    id: "6",
    name: "Apollo Hospital",
    address: "Greams Road, Chennai, Tamil Nadu",
    phone: "044-28290200",
    distance: 2.1,
    latitude: 13.0569,
    longitude: 80.2425,
    subDistrict: "Mylapore"
  },
  {
    id: "7",
    name: "Government General Hospital Chennai",
    address: "Park Town, Chennai, Tamil Nadu",
    phone: "044-25305000",
    distance: 3.4,
    latitude: 13.0878,
    longitude: 80.2723,
    subDistrict: "T. Nagar"
  },
  {
    id: "8",
    name: "Fortis Malar Hospital",
    address: "Gandhi Rd, Adyar, Chennai, Tamil Nadu",
    phone: "044-42892222",
    distance: 5.6,
    latitude: 13.0068,
    longitude: 80.2570,
    subDistrict: "Adyar"
  },
  
  // Tamil Nadu Hospitals - Coimbatore
  {
    id: "9",
    name: "Coimbatore Medical College Hospital",
    address: "Trichy Road, Coimbatore, Tamil Nadu",
    phone: "0422-2301393",
    distance: 4.9,
    latitude: 11.0168,
    longitude: 76.9558,
    subDistrict: "Mettupalayam"
  },
  {
    id: "10",
    name: "PSG Hospitals",
    address: "Peelamedu, Coimbatore, Tamil Nadu",
    phone: "0422-2570170",
    distance: 6.3,
    latitude: 11.0308,
    longitude: 76.9891,
    subDistrict: "Sulur"
  }
];

export const getHospitalsBySubDistrict = (subDistrict: string): Hospital[] => {
  return mockHospitals.filter(hospital => hospital.subDistrict === subDistrict);
};

export const getHospitalsByDistrict = (district: string): Hospital[] => {
  return mockHospitals.filter(hospital => hospital.address.includes(district));
};
