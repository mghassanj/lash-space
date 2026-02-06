"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  category: string;
  featured?: boolean;
}

export function ServiceCard({
  id,
  name,
  description,
  duration,
  price,
  category,
  featured,
}: ServiceCardProps) {
  const { t, locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group h-full border-[#9C8974]/20 transition-all hover:border-[#9C8974] hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <Badge
              variant="secondary"
              className="bg-[#E8E8DC] text-[#9C8974] hover:bg-[#E8E8DC]"
            >
              {category}
            </Badge>
            {featured && (
              <Badge className="bg-[#9C8974] text-white hover:bg-[#7A6B5A]">
                {t("common.popular")}
              </Badge>
            )}
          </div>
          <CardTitle className="font-serif text-2xl">{name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-[#9C8974]" />
              <span>
                {duration} {t("services.min")}
              </span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <span className="text-lg">
                {price}{" "}
                <span className="text-sm text-[#9C8974]">{t("common.sar")}</span>
              </span>
            </div>
          </div>
          <Button asChild className="w-full bg-[#9C8974] hover:bg-[#7A6B5A]">
            <Link href={`/booking?service=${id}`}>{t("nav.bookNow")}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
