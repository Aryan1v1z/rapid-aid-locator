
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Location, State } from "@/types";
import { getDistrictsByState, getSubDistrictsByDistrict } from "@/data/locationData";
import { districts } from "@/data/locationData";

interface ManualLocationSelectorProps {
  onLocationSelected: (latitude: number, longitude: number, district: string, subDistrict?: string) => void;
}

const ManualLocationSelector: React.FC<ManualLocationSelectorProps> = ({ onLocationSelected }) => {
  const [selectedState, setSelectedState] = useState<State | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState<Location | null>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [districtOptions, setDistrictOptions] = useState<Location[]>([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      setDistrictOptions(getDistrictsByState(selectedState));
      setSelectedDistrict(null);
      setSelectedSubDistrict("");
      setSubDistrictOptions([]);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      const subDistricts = getSubDistrictsByDistrict(selectedDistrict.name);
      setSubDistrictOptions(subDistricts);
      setSelectedSubDistrict("");
    } else {
      setSubDistrictOptions([]);
    }
  }, [selectedDistrict]);

  const handleStateChange = (value: string) => {
    setSelectedState(value as State);
  };

  const handleDistrictChange = (value: string) => {
    const district = districts.find(d => d.name === value);
    if (district) {
      setSelectedDistrict(district);
      // If there are no sub-districts, select the district directly
      if (getSubDistrictsByDistrict(district.name).length === 0) {
        onLocationSelected(district.latitude, district.longitude, district.name);
      }
    }
  };

  const handleSubDistrictChange = (value: string) => {
    setSelectedSubDistrict(value);
    if (selectedDistrict) {
      // For simplicity, using district coordinates for its sub-districts
      // In a real app, you would have precise coordinates for each sub-district
      onLocationSelected(selectedDistrict.latitude, selectedDistrict.longitude, selectedDistrict.name, value);
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

      {subDistrictOptions.length > 0 && (
        <div className="space-y-2">
          <label htmlFor="sub-district-select" className="text-sm font-medium">
            Select Sub-District
          </label>
          <Select 
            value={selectedSubDistrict} 
            onValueChange={handleSubDistrictChange}
          >
            <SelectTrigger id="sub-district-select">
              <SelectValue placeholder="Select a sub-district" />
            </SelectTrigger>
            <SelectContent>
              {subDistrictOptions.map((subDistrict) => (
                <SelectItem key={subDistrict} value={subDistrict}>
                  {subDistrict}
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
