"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/public/Section";
import { Badge } from "@/components/ui/badge";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "Classic", value: "classic" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Volume", value: "volume" },
    { label: "Mega Volume", value: "mega" },
    { label: "Lash Lift", value: "lash-lift" },
  ];

  const galleryItems = [
    { id: 1, category: "volume", gradient: "from-[#9C8974] to-[#7A6B5A]" },
    { id: 2, category: "classic", gradient: "from-[#1A1A1A] to-[#2A2A3E]" },
    { id: 3, category: "hybrid", gradient: "from-[#898A73] to-[#6C8A6E]" },
    { id: 4, category: "mega", gradient: "from-[#9C8974] via-[#7A6B5A] to-[#A66D3F]" },
    { id: 5, category: "lash-lift", gradient: "from-[#E8E8DC] to-[#FFE5CB]" },
    { id: 6, category: "volume", gradient: "from-[#7A6B5A] to-[#A66D3F]" },
    { id: 7, category: "classic", gradient: "from-[#2A2A3E] to-[#3A3A4E]" },
    { id: 8, category: "hybrid", gradient: "from-[#8CAA8E] to-[#898A73]" },
    { id: 9, category: "volume", gradient: "from-[#D8A57C] to-[#9C8974]" },
    { id: 10, category: "mega", gradient: "from-[#A66D3F] to-[#965D2F]" },
    { id: 11, category: "lash-lift", gradient: "from-[#FFE5CB] to-[#FFD5AB]" },
    { id: 12, category: "classic", gradient: "from-[#1A1A1A] to-[#0A0A1E]" },
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Explore our stunning lash transformations and get inspired for your next appointment
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <Section className="bg-white pt-8">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                activeFilter === filter.value
                  ? "bg-[#9C8974] text-white hover:bg-[#7A6B5A]"
                  : "border-[#9C8974] text-[#9C8974] hover:bg-[#E8E8DC]"
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <div
                className={`h-full w-full bg-gradient-to-br ${item.gradient} transition-transform group-hover:scale-110`}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-4xl opacity-50">✨</div>
                    <p className="text-sm font-medium text-white/80">
                      Before & After
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20" />
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No images found for this category.
            </p>
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-[#9C8974] to-[#1A1A1A] text-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Get Your Dream Lashes?
          </h2>
          <p className="mb-6 text-lg text-gray-200">
            Join hundreds of satisfied clients and experience the transformation
          </p>
          <a
            href="/booking"
            className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
          >
            Book Your Appointment
          </a>
        </div>
      </Section>
    </>
  );
}
