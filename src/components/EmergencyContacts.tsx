
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmergencyContact } from "@/types";
import { Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, "id">) => void;
  onNotifyAll: () => void;
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({
  contacts,
  onAddContact,
  onNotifyAll,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onAddContact({ name, phone });
      setName("");
      setPhone("");
      toast({
        title: "Contact added",
        description: `${name} has been added to your emergency contacts.`,
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Emergency Contacts</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contact name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  required
                  type="tel"
                />
              </div>
              <Button type="submit" className="w-full">Save Contact</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length > 0 ? (
        <>
          <ScrollArea className="h-[120px] rounded-md border p-2 mb-4">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    window.location.href = `tel:${contact.phone}`;
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
          <Button 
            className="w-full bg-emergency hover:bg-emergency-hover text-emergency-foreground"
            onClick={onNotifyAll}
          >
            Notify All Contacts
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground text-center py-4 border rounded-md">
          No emergency contacts added yet
        </p>
      )}
    </div>
  );
};

export default EmergencyContacts;
