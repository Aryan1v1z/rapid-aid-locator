
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hospital, EmergencyContact } from "@/types";
import { mockHospitals } from "@/data/mockHospitals";
import { getCurrentPosition, calculateDistance } from "@/services/locationService";
import HospitalCard from "@/components/HospitalCard";
import LocationStatus from "@/components/LocationStatus";
import EmergencyContacts from "@/components/EmergencyContacts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Ambulance } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { toast } = useToast();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    setIsLoading(true);
    setLocationError(null);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      
      // Update hospital distances based on user location
      const hospitalsWithDistance = mockHospitals.map((hospital) => ({
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
      
      toast({
        title: "Location found",
        description: "Showing nearest hospitals to your location",
      });
    } catch (error) {
      console.error("Error getting user location:", error);
      setLocationError("Unable to access your location. Please enable location services.");
      setHospitals(mockHospitals);
      setIsLoading(false);
    }
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
    window.location.href = "tel:911";
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 min-h-screen">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <Ambulance className="h-8 w-8 mr-2 text-emergency" />
            <span>Emergency</span>
          </h1>
          <Button
            variant="destructive"
            className="bg-emergency hover:bg-emergency-hover text-emergency-foreground"
            onClick={callEmergency}
          >
            <Phone className="mr-2 h-4 w-4" /> Call 911
          </Button>
        </div>
      </header>

      <LocationStatus isLoading={isLoading} error={locationError} />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <MapPin className="h-5 w-5 mr-1 text-hospital" />
            <span>Nearby Hospitals</span>
          </h2>
          <Badge variant="outline" className="cursor-pointer" onClick={fetchUserLocation}>
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
