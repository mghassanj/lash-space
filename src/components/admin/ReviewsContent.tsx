"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceType: string | null;
  approved: boolean;
  createdAt: string;
}

export default function ReviewsContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string, approved: boolean) {
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;

    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "pending") return !review.approved;
    if (filter === "approved") return review.approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-[#9C8974] hover:bg-[#7A6B5A]"
        >
          الكل ({reviews.length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
          className="bg-[#9C8974] hover:bg-[#7A6B5A]"
        >
          قيد الانتظار ({pendingCount})
        </Button>
        <Button
          variant={filter === "approved" ? "default" : "outline"}
          onClick={() => setFilter("approved")}
          className="bg-[#9C8974] hover:bg-[#7A6B5A]"
        >
          موافق عليها ({approvedCount})
        </Button>
      </div>

      {/* Info Alert */}
      {pendingCount > 0 && (
        <Alert className="bg-[#E8E8DC] border-[#9C8974]">
          <AlertDescription>
            لديك {pendingCount} تقييم{pendingCount > 1 ? "ات" : ""} بانتظار الموافقة
          </AlertDescription>
        </Alert>
      )}

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            لا توجد تقييمات
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      {review.name}
                      {review.approved ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          موافق عليه
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          قيد الانتظار
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "fill-[#9C8974] text-[#9C8974]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 mr-2">
                        ({review.rating}/5)
                      </span>
                    </div>
                    {review.serviceType && (
                      <p className="text-sm text-gray-500 mb-2">
                        الخدمة: {review.serviceType}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!review.approved ? (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(review.id, true)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(review.id, false)}
                        className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">&ldquo;{review.comment}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
