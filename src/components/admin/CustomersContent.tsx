"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit } from "lucide-react";
import { format } from "date-fns";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  notes: string | null;
  skinType: string | null;
  allergies: string | null;
  createdAt: string;
  _count?: { appointments: number };
  totalSpent?: number;
  lastVisit?: string;
}

interface CustomerWithAppointments extends Customer {
  appointments: Array<{
    id: string;
    date: string;
    status: string;
    totalPrice: number;
    service: { name: string };
  }>;
}

export default function CustomersContent() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithAppointments | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    skinType: "",
    allergies: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.set("search", searchQuery);
      }
      
      const response = await fetch(`/api/admin/customers?${params}`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCustomerDetails(id: string) {
    try {
      const response = await fetch(`/api/admin/customers/${id}`);
      const data = await response.json();
      setSelectedCustomer(data);
      setShowDetailsDialog(true);
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
    }
  }

  async function handleAddCustomer() {
    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddDialog(false);
        setFormData({ name: "", email: "", phone: "", notes: "", skinType: "", allergies: "" });
        fetchCustomers();
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  }

  async function handleEditCustomer() {
    if (!selectedCustomer) return;
    
    try {
      const response = await fetch(`/api/admin/customers/${selectedCustomer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowEditDialog(false);
        fetchCustomers();
      }
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  }

  function openEditDialog(customer: Customer) {
    setSelectedCustomer(customer as CustomerWithAppointments);
    setFormData({
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone,
      notes: customer.notes || "",
      skinType: customer.skinType || "",
      allergies: customer.allergies || "",
    });
    setShowEditDialog(true);
  }

  return (
    <div className="space-y-4">
      {/* Search & Add */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="ابحثي بالاسم، الإيميل أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#9C8974] hover:bg-[#B8856C]">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة عميل
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة عميل جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">الاسم *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="skinType">نوع البشرة</Label>
                    <Input
                      id="skinType"
                      value={formData.skinType}
                      onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">الحساسية</Label>
                    <Input
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">ملاحظات</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddCustomer} className="bg-[#9C8974] hover:bg-[#B8856C]">
                    إضافة عميل
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">جاري تحميل العملاء...</div>
          ) : customers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">لا يوجد عملاء.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">الاسم</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">معلومات الاتصال</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">إجمالي الزيارات</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">إجمالي الإنفاق</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">آخر زيارة</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{customer.name}</td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">
                          {customer.email && <div className="text-xs">{customer.email}</div>}
                          <div className="text-xs">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">{customer._count?.appointments || 0}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {(customer.totalSpent || 0).toFixed(2)} ر.س
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {customer.lastVisit
                          ? format(new Date(customer.lastVisit), "MMM dd, yyyy")
                          : "لم تتم زيارة"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => fetchCustomerDetails(customer.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(customer)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات العميل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name">الاسم *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">البريد الإلكتروني</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">رقم الهاتف *</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-skinType">نوع البشرة</Label>
              <Input
                id="edit-skinType"
                value={formData.skinType}
                onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-allergies">الحساسية</Label>
              <Input
                id="edit-allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">ملاحظات</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditCustomer} className="bg-[#9C8974] hover:bg-[#B8856C]">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCustomer.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{selectedCustomer.email || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{selectedCustomer.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Skin Type</div>
                    <div className="font-medium">{selectedCustomer.skinType || "—"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Allergies</div>
                    <div className="font-medium">{selectedCustomer.allergies || "—"}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        {selectedCustomer.appointments.length}
                      </div>
                      <div className="text-sm text-gray-500">Total Visits</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        $
                        {selectedCustomer.appointments
                          .reduce((sum, appt) => sum + appt.totalPrice, 0)
                          .toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">Lifetime Spend</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Notes */}
                {selectedCustomer.notes && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Notes</div>
                    <div className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      {selectedCustomer.notes}
                    </div>
                  </div>
                )}

                {/* Visit History */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Visit History</div>
                  {selectedCustomer.appointments.length === 0 ? (
                    <div className="text-gray-500 text-sm">No visits yet.</div>
                  ) : (
                    <div className="space-y-2">
                      {selectedCustomer.appointments
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((appt) => (
                          <div
                            key={appt.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{appt.service.name}</div>
                              <div className="text-xs text-gray-500">
                                {format(new Date(appt.date), "MMM dd, yyyy · h:mm a")}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`text-xs ${
                                appt.status === "completed" ? "bg-green-100 text-green-800" : 
                                appt.status === "cancelled" ? "bg-red-100 text-red-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {appt.status}
                              </Badge>
                              <div className="font-medium">${appt.totalPrice.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
