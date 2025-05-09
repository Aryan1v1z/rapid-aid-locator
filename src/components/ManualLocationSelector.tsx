
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Location, State } from "@/types";
import { getDistrictsByState } from "@/data/locationData";
import { districts } from "@/data/locationData";

interface ManualLocationSelectorProps {
  onLocationSelected: (latitude: number, longitude: number) => void;
}

const ManualLocationSelector: React.FC<ManualLocationSelectorProps> = ({ onLocationSelected }) => {
  const [selectedState, setSelectedState] = useState<State | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState<Location | null>(null);
  const [districtOptions, setDistrictOptions] = useState<Location[]>([]);

  useEffect(() => {
    if (selectedState) {
      setDistrictOptions(getDistrictsByState(selectedState));
      setSelectedDistrict(null);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedState]);

  const handleStateChange = (value: string) => {
    setSelectedState(value as State);
  };

  const handleDistrictChange = (value: string) => {
    const district = districts.find(d => d.name === value);
    if (district) {
      setSelectedDistrict(district);
      onLocationSelected(district.latitude, district.longitude);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
      <h3 className="text-md font-medium">Manual Location Selection</h3>
      
      <div className="space-y-2">
        <label htmlFor="state-select" className="text-sm font-medium">
          Select State
        </label>
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger id="state-select">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedState && (
        <div className="space-y-2">
          <label htmlFor="district-select" className="text-sm font-medium">
            Select District
          </label>
          <Select 
            value={selectedDistrict?.name || ""} 
            onValueChange={handleDistrictChange}
            disabled={districtOptions.length === 0}
          >
            <SelectTrigger id="district-select">
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent>
              {districtOptions.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ManualLocationSelector;
