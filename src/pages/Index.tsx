
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hospital, EmergencyContact, Language as LanguageType } from "@/types";
import { mockHospitals, getHospitalsBySubDistrict } from "@/data/mockHospitals";
import { getCurrentPosition, calculateDistance } from "@/services/locationService";
import HospitalCard from "@/components/HospitalCard";
import LocationStatus from "@/components/LocationStatus";
import EmergencyContacts from "@/components/EmergencyContacts";
import ManualLocationSelector from "@/components/ManualLocationSelector";
import LanguageSelector from "@/components/LanguageSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Ambulance, Navigation } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { toast } = useToast();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isUsingManualLocation, setIsUsingManualLocation] = useState<boolean>(false);
  const [showManualSelector, setShowManualSelector] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [language, setLanguage] = useState<LanguageType>("English");

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    setIsLoading(true);
    setLocationError(null);
    setIsUsingManualLocation(false);
    setShowManualSelector(false);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      
      updateHospitalDistances(latitude, longitude);
      
      toast({
        title: "Location found",
        description: "Showing nearest hospitals to your location",
      });
    } catch (error) {
      console.error("Error getting user location:", error);
      setLocationError("Unable to access your location. Please enable location services or use manual location.");
      setHospitals(mockHospitals);
      setIsLoading(false);
    }
  };

  const updateHospitalDistances = (latitude: number, longitude: number, district?: string, subDistrict?: string) => {
    // Filter hospitals based on selected location parameters if available
    let filteredHospitals = [...mockHospitals];
    
    if (subDistrict) {
      filteredHospitals = getHospitalsBySubDistrict(subDistrict);
    } else if (district) {
      filteredHospitals = filteredHospitals.filter(h => h.address.includes(district));
    }

    // Update hospital distances based on user location
    const hospitalsWithDistance = filteredHospitals.map((hospital) => ({
      ...hospital,
      distance: calculateDistance(
        latitude,
        longitude,
        hospital.latitude,
        hospital.longitude
      )
    }));

    // Sort hospitals by distance
    const sortedHospitals = hospitalsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );
    
    setHospitals(sortedHospitals);
    setIsLoading(false);
  };

  const handleLanguageChange = (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    toast({
      title: "Language changed",
      description: `Application language set to ${newLanguage}`,
    });
  };

  const handleAddContact = (contact: Omit<EmergencyContact, "id">) => {
    const newContact = {
      id: uuidv4(),
      ...contact
    };
    setContacts([...contacts, newContact]);
  };

  const handleNotifyAllContacts = () => {
    toast({
      title: "Notifications sent",
      description: `${contacts.length} emergency contacts have been notified of your situation.`,
    });
  };

  const callEmergency = () => {
    // Updated to use the tel: protocol without dashes for better compatibility
    window.location.href = "tel:911";
  };

  const handleManualLocationSelected = (latitude: number, longitude: number, district: string, subDistrict?: string) => {
    setIsUsingManualLocation(true);
    setUserLocation({ lat: latitude, lng: longitude });
    setSelectedDistrict(district);
    setSelectedSubDistrict(subDistrict || "");
    setLocationError(null);
    updateHospitalDistances(latitude, longitude, district, subDistrict);
    
    const locationDescription = subDistrict 
      ? `${subDistrict}, ${district}`
      : district;
    
    toast({
      title: "Manual location set",
      description: `Showing hospitals near ${locationDescription}`,
    });
  };

  const toggleManualLocationSelector = () => {
    setShowManualSelector(!showManualSelector);
  };

  // Get the appropriate emergency number based on selected language/region
  const getEmergencyNumber = () => {
    return "108"; // Using 108 as the standard emergency medical helpline in India
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 min-h-screen">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <Ambulance className="h-8 w-8 mr-2 text-emergency" />
            <span>AIMA</span>
          </h1>
          <div className="flex space-x-2">
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <Button
              variant="destructive"
              className="bg-emergency hover:bg-emergency-hover text-emergency-foreground"
              onClick={callEmergency}
            >
              <Phone className="mr-2 h-4 w-4" /> Call {getEmergencyNumber()}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">All India Medical Assistance</p>
        {selectedDistrict && (
          <Badge variant="outline" className="mt-2">
            {selectedSubDistrict ? `${selectedSubDistrict}, ${selectedDistrict}` : selectedDistrict}
          </Badge>
        )}
      </header>

      <LocationStatus isLoading={isLoading} error={locationError} />

      {locationError && (
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="w-full mb-4 flex items-center justify-center"
            onClick={fetchUserLocation}
          >
            <Navigation className="mr-2 h-4 w-4" /> 
            Try Again with Automatic Location
          </Button>
          
          <ManualLocationSelector onLocationSelected={handleManualLocationSelected} />
        </div>
      )}

      {!locationError && (
        <div className="mb-4 flex justify-end">
          {isUsingManualLocation ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchUserLocation}
            >
              <Navigation className="mr-2 h-4 w-4" /> 
              Use My Current Location
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleManualLocationSelector}
            >
              <MapPin className="mr-2 h-4 w-4" /> 
              {showManualSelector ? "Hide Manual Selection" : "Select Location Manually"}
            </Button>
          )}
        </div>
      )}

      {showManualSelector && !locationError && (
        <div className="mb-4">
          <ManualLocationSelector onLocationSelected={handleManualLocationSelected} />
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <MapPin className="h-5 w-5 mr-1 text-hospital" />
            <span>Nearby Hospitals</span>
          </h2>
          <Badge variant="outline" className="cursor-pointer" onClick={isUsingManualLocation ? () => {} : fetchUserLocation}>
            Refresh
          </Badge>
        </div>

        {hospitals.length > 0 ? (
          <div>
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            {isLoading ? "Finding hospitals..." : "No hospitals found"}
          </p>
        )}
      </div>

      <Separator className="my-6" />

      <EmergencyContacts
        contacts={contacts}
        onAddContact={handleAddContact}
        onNotifyAll={handleNotifyAllContacts}
      />
    </div>
  );
};

export default Index;
