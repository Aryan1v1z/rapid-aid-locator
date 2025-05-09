
import { Hospital } from "@/types";

// Mock hospital data with district-specific hospitals
export const mockHospitals: Hospital[] = [
  // Andhra Pradesh Hospitals
  {
    id: "1",
    name: "King George Hospital",
    address: "Maharanipeta, Visakhapatnam, Andhra Pradesh",
    phone: "0891-2564891",
    distance: 1.2,
    latitude: 17.7085,
    longitude: 83.3072
  },
  {
    id: "2",
    name: "AIIMS Mangalagiri",
    address: "Mangalagiri, Guntur, Andhra Pradesh",
    phone: "0863-2379100",
    distance: 2.5,
    latitude: 16.5062,
    longitude: 80.6480
  },
  {
    id: "3",
    name: "Sri Venkateswara Institute of Medical Sciences",
    address: "Alipiri Road, Tirupati, Andhra Pradesh",
    phone: "0877-2287777",
    distance: 3.7,
    latitude: 13.6388,
    longitude: 79.4192
  },
  {
    id: "4",
    name: "Government General Hospital Anantapur",
    address: "Anantapur, Andhra Pradesh",
    phone: "08554-222555",
    distance: 4.1,
    latitude: 14.6819,
    longitude: 77.6006
  },
  {
    id: "5",
    name: "NRI General Hospital",
    address: "Chinakakani, Guntur, Andhra Pradesh",
    phone: "0866-2880000",
    distance: 5.3,
    latitude: 16.3903,
    longitude: 80.5053
  },
  
  // Tamil Nadu Hospitals
  {
    id: "6",
    name: "Apollo Hospital",
    address: "Greams Road, Chennai, Tamil Nadu",
    phone: "044-28290200",
    distance: 6.2,
    latitude: 13.0569,
    longitude: 80.2425
  },
  {
    id: "7",
    name: "Christian Medical College",
    address: "Vellore, Tamil Nadu",
    phone: "0416-2282010",
    distance: 7.5,
    latitude: 12.9252,
    longitude: 79.1353
  },
  {
    id: "8",
    name: "Government Rajaji Hospital",
    address: "Madurai, Tamil Nadu",
    phone: "0452-2532535",
    distance: 8.7,
    latitude: 9.9252,
    longitude: 78.1198
  },
  {
    id: "9",
    name: "Stanley Medical College and Hospital",
    address: "Old Jail Road, Chennai, Tamil Nadu",
    phone: "044-25281347",
    distance: 9.1,
    latitude: 13.1068,
    longitude: 80.2876
  },
  {
    id: "10",
    name: "Coimbatore Medical College Hospital",
    address: "Trichy Road, Coimbatore, Tamil Nadu",
    phone: "0422-2301393",
    distance: 10.3,
    latitude: 11.0168,
    longitude: 76.9558
  }
];
