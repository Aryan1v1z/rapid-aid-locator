
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Locate } from "lucide-react";

interface LocationStatusProps {
  isLoading: boolean;
  error: string | null;
}

const LocationStatus: React.FC<LocationStatusProps> = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <Alert className="bg-blue-50 border-blue-100 mb-4">
        <Locate className="h-4 w-4 text-hospital animate-pulse" />
        <AlertTitle>Locating you</AlertTitle>
        <AlertDescription>
          Please wait while we find your location...
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-50 border-red-100 mb-4">
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default LocationStatus;
