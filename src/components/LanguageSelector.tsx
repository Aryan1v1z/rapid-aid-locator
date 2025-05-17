
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Language } from "@/components/ui/language";
import { Language as LanguageType } from "@/types";

interface LanguageSelectorProps {
  currentLanguage: LanguageType;
  onLanguageChange: (language: LanguageType) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Language className="h-4 w-4 text-muted-foreground" />
      <Select value={currentLanguage} onValueChange={(value) => onLanguageChange(value as LanguageType)}>
        <SelectTrigger className="h-8 w-[100px] text-xs">
          <SelectValue placeholder={currentLanguage} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Telugu">తెలుగు</SelectItem>
          <SelectItem value="Tamil">தமிழ்</SelectItem>
          <SelectItem value="Hindi">हिंदी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
