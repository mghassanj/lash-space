"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, MessageSquare } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Alert, AlertDescription } from "@/components/ui/alert";

const services = [
  { value: "classic-full", labelAr: "كلاسيك كامل", labelEn: "Classic Full Set" },
  { value: "volume-full", labelAr: "فوليوم كامل", labelEn: "Volume Full Set" },
  { value: "hybrid-full", labelAr: "هايبرد كامل", labelEn: "Hybrid Full Set" },
  { value: "mega-volume", labelAr: "ميجا فوليوم", labelEn: "Mega Volume" },
  { value: "wet-look", labelAr: "وت لوك كامل", labelEn: "Wet Look Full Set" },
  { value: "wispy-full", labelAr: "ويسبي كامل", labelEn: "Wispy Full Set" },
  { value: "classic-half", labelAr: "كلاسيك طرف", labelEn: "Classic Half Set" },
  { value: "volume-half", labelAr: "فوليوم طرف", labelEn: "Volume Half Set" },
  { value: "hybrid-half", labelAr: "هايبرد طرف", labelEn: "Hybrid Half Set" },
  { value: "wispy-half", labelAr: "ويسبي طرف", labelEn: "Wispy Half Set" },
  { value: "weekly", labelAr: "رموش أسبوعية", labelEn: "Weekly Lashes" },
  { value: "removal", labelAr: "إزالة آمنة", labelEn: "Safe Removal" },
  { value: "retouch", labelAr: "روتوش", labelEn: "Retouch" },
];

export default function ReviewForm() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    serviceType: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          rating,
          comment: formData.comment,
          serviceType: formData.serviceType || null,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", comment: "", serviceType: "" });
        setRating(0);
        setTimeout(() => {
          setSuccess(false);
          setOpen(false);
        }, 3000);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#9C8974] hover:bg-[#7A6B5A] text-white px-8"
        >
          <MessageSquare className="h-5 w-5 ml-2" />
          {t("reviews.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#1A1A1A]">
            {t("reviews.title")}
          </DialogTitle>
          <DialogDescription className="text-[#898A73]">
            {t("reviews.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              <div className="font-bold mb-1">{t("reviews.successTitle")}</div>
              {t("reviews.successMessage")}
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-[#1A1A1A]">
                {t("reviews.yourName")}
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Rating */}
            <div>
              <Label className="text-[#1A1A1A] mb-2 block">
                {t("reviews.rating")}
              </Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-[#9C8974] text-[#9C8974]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {rating} {locale === "ar" ? "نجمة" : "stars"}
                </p>
              )}
            </div>

            {/* Service Type */}
            <div>
              <Label htmlFor="serviceType" className="text-[#1A1A1A]">
                {t("reviews.service")}
              </Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceType: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t("reviews.selectService")} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {locale === "ar" ? service.labelAr : service.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div>
              <Label htmlFor="comment" className="text-[#1A1A1A]">
                {t("reviews.comment")}
              </Label>
              <Textarea
                id="comment"
                required
                rows={4}
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                placeholder={t("reviews.commentPlaceholder")}
                className="mt-1"
              />
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {t("reviews.errorMessage")}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading || rating === 0}
              className="w-full bg-[#9C8974] hover:bg-[#7A6B5A] text-white"
            >
              {loading
                ? locale === "ar"
                  ? "جاري الإرسال..."
                  : "Submitting..."
                : t("reviews.submit")}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
