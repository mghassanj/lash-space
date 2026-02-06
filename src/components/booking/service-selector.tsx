"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (serviceId: string) => void;
}

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelectService,
}: ServiceSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => {
        const isSelected = selectedServiceId === service.id;
        
        return (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() => onSelectService(service.id)}
              className={`p-6 cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? "border-2 border-[#9C8974] bg-[#E8E8DC]"
                  : "border border-gray-200 hover:border-[#9C8974] hover:shadow-md"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-[#9C8974] rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className="mb-3">
                <Badge
                  variant="outline"
                  className="text-xs border-[#9C8974] text-[#9C8974] mb-2"
                >
                  {service.category}
                </Badge>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {service.duration} minutes
                </span>
                <span className="text-lg font-bold text-[#9C8974]">
                  ${service.price}
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
