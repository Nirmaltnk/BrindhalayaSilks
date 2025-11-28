"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function ContactConfigPage() {
    const { contactInfo, updateContactInfo } = useProducts();
    const [whatsapp, setWhatsapp] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (contactInfo) {
            setWhatsapp(contactInfo.whatsapp);
            setPhone(contactInfo.phone);
        }
    }, [contactInfo]);

    const handleContactUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateContactInfo({ whatsapp, phone });
        alert("Contact information updated successfully!");
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold">Contact Configuration</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Update Contact Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleContactUpdate} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Number (with country code, no +)</Label>
                                <Input
                                    id="whatsapp"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    placeholder="e.g., 919876543210"
                                />
                                <p className="text-sm text-muted-foreground">Used for WhatsApp enquiry links.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number (display format)</Label>
                                <Input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g., +91 98765 43210"
                                />
                                <p className="text-sm text-muted-foreground">Used for direct call links.</p>
                            </div>
                        </div>
                        <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                            <Save className="mr-2 h-4 w-4" /> Save Contact Info
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
