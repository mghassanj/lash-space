"use client";

import { useState } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { ServiceSelector } from "@/components/booking/service-selector";
import { DateTimePicker } from "@/components/booking/date-time-picker";
import { CustomerForm, CustomerFormData } from "@/components/booking/customer-form";
import { BookingSummary } from "@/components/booking/booking-summary";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

interface BookingClientProps {
  services: Service[];
}

export function BookingClient({ services }: BookingClientProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleNextFromService = () => {
    if (selectedServiceId) {
      setCurrentStep(2);
    }
  };

  const handleNextFromDateTime = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(3);
    }
  };

  const handleCustomerFormSubmit = (data: CustomerFormData) => {
    setCustomerData(data);
    setCurrentStep(4);
  };

  const handleConfirmBooking = async () => {
    if (!selectedServiceId || !selectedDate || !selectedTime || !customerData) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          customerName: customerData.name,
          customerPhone: customerData.phone,
          customerEmail: customerData.email,
          notes: customerData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingResult(data.appointment);
        setCurrentStep(5);
      } else {
        alert(data.error || "Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If booking is complete, show confirmation
  if (currentStep === 5 && bookingResult) {
    return <BookingConfirmation appointment={bookingResult} />;
  }

  return (
    <BookingWizard currentStep={currentStep} totalSteps={4}>
      {/* Step 1: Select Service */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <ServiceSelector
            services={services}
            selectedServiceId={selectedServiceId}
            onSelectService={handleServiceSelect}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleNextFromService}
              disabled={!selectedServiceId}
              className="bg-[#9C8974] hover:bg-[#B07E5C] text-white px-8"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Choose Date & Time */}
      {currentStep === 2 && selectedServiceId && (
        <div className="space-y-6">
          <DateTimePicker
            serviceId={selectedServiceId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
          />
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="flex-1 border-gray-300"
            >
              Back
            </Button>
            <Button
              onClick={handleNextFromDateTime}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 bg-[#9C8974] hover:bg-[#B07E5C] text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Customer Details */}
      {currentStep === 3 && (
        <CustomerForm
          initialData={customerData || undefined}
          onSubmit={handleCustomerFormSubmit}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {/* Step 4: Confirmation Summary */}
      {currentStep === 4 &&
        selectedService &&
        selectedDate &&
        selectedTime &&
        customerData && (
          <BookingSummary
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            customerData={customerData}
            onConfirm={handleConfirmBooking}
            onBack={() => setCurrentStep(3)}
            loading={loading}
          />
        )}
    </BookingWizard>
  );
}
