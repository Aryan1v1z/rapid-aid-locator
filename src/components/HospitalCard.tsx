
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types";
import { PhoneCall } from "lucide-react";

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const handleCall = () => {
    // Use tel: protocol to launch the device's dialpad with the number pre-filled
    window.location.href = `tel:${hospital.phone.replace(/-/g, "")}`;
  };

  return (
    <Card className="mb-4 border-l-4 border-l-hospital hover:shadow-md transition-all">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{hospital.name}</h3>
            <p className="text-sm text-muted-foreground">{hospital.address}</p>
          </div>
          <div className="bg-blue-50 px-2 py-1 rounded-full">
            <span className="text-hospital text-sm font-medium">{hospital.distance} km</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Button 
          className="w-full bg-hospital hover:bg-hospital-hover text-hospital-foreground"
          onClick={handleCall}
        >
          <PhoneCall className="mr-2 h-4 w-4" /> Call {hospital.phone}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
