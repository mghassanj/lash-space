"use client";

import { useEffect, useState } from "react";
import { Package, Plus, AlertTriangle, Trash2, Edit, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const dynamic = "force-dynamic";

interface InventoryItem {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  brand: string | null;
  sku: string | null;
  quantity: number;
  minQuantity: number;
  unit: string;
  costPrice: number | null;
  expiryDate: string | null;
  notes: string | null;
  isActive: boolean;
}

const CATEGORIES = [
  { value: "lashes", label: "رموش / Lashes", emoji: "👁️" },
  { value: "adhesive", label: "لاصق / Adhesive", emoji: "🧴" },
  { value: "tools", label: "أدوات / Tools", emoji: "🔧" },
  { value: "care_products", label: "منتجات عناية / Care Products", emoji: "💄" },
  { value: "other", label: "أخرى / Other", emoji: "📦" },
];

const UNITS = [
  { value: "piece", label: "قطعة / Piece" },
  { value: "box", label: "علبة / Box" },
  { value: "pack", label: "باكت / Pack" },
  { value: "ml", label: "مل / ml" },
  { value: "pair", label: "زوج / Pair" },
  { value: "tray", label: "صينية / Tray" },
];

const emptyForm = {
  name: "",
  nameAr: "",
  category: "lashes",
  brand: "",
  sku: "",
  quantity: 0,
  minQuantity: 5,
  unit: "piece",
  costPrice: "",
  expiryDate: "",
  notes: "",
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/inventory");
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error("Failed to fetch inventory", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      quantity: Number(form.quantity),
      minQuantity: Number(form.minQuantity),
      costPrice: form.costPrice ? Number(form.costPrice) : null,
      expiryDate: form.expiryDate || null,
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/inventory/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/inventory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditingId(null);
      fetchItems();
    } catch (e) {
      console.error("Failed to save item", e);
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setForm({
      name: item.name,
      nameAr: item.nameAr,
      category: item.category,
      brand: item.brand || "",
      sku: item.sku || "",
      quantity: item.quantity,
      minQuantity: item.minQuantity,
      unit: item.unit,
      costPrice: item.costPrice?.toString() || "",
      expiryDate: item.expiryDate ? item.expiryDate.split("T")[0] : "",
      notes: item.notes || "",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await fetch(`/api/admin/inventory/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const filteredItems = filter === "all" ? items : items.filter((i) => i.category === filter);
  const lowStockItems = items.filter((i) => i.quantity <= i.minQuantity && i.isActive);
  const totalValue = items.reduce((sum, i) => sum + (i.costPrice || 0) * i.quantity, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📦 المخزون / Inventory</h1>
          <p className="text-muted-foreground">إدارة المواد والمنتجات</p>
        </div>
        <Button
          onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
          className="bg-[#9C8974] hover:bg-[#7A6B5A]"
        >
          <Plus className="mr-2 h-4 w-4" /> إضافة منتج
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">إجمالي المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{items.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">منخفض المخزون</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${lowStockItems.length > 0 ? "text-red-500" : "text-green-500"}`}>
              {lowStockItems.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">الأصناف</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{new Set(items.map((i) => i.category)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">قيمة المخزون</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalValue.toFixed(0)} ر.س</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="font-bold text-red-700">تنبيه نفاذ المخزون!</h3>
          </div>
          <div className="space-y-1">
            {lowStockItems.map((item) => (
              <p key={item.id} className="text-sm text-red-600">
                • {item.name} — متبقي {item.quantity} {UNITS.find(u => u.value === item.unit)?.label || item.unit} (الحد الأدنى: {item.minQuantity})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-[#9C8974] hover:bg-[#7A6B5A]" : ""}
        >
          الكل ({items.length})
        </Button>
        {CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category === cat.value).length;
          return (
            <Button
              key={cat.value}
              variant={filter === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat.value)}
              className={filter === cat.value ? "bg-[#9C8974] hover:bg-[#7A6B5A]" : ""}
            >
              {cat.emoji} {cat.label.split(" / ")[0]} ({count})
            </Button>
          );
        })}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-6 border-[#9C8974]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editingId ? "تعديل المنتج" : "إضافة منتج جديد"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditingId(null); }}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label>الاسم (English)</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>الاسم (عربي)</Label>
                <Input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} dir="rtl" />
              </div>
              <div>
                <Label>الصنف</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>الماركة</Label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div>
                <Label>SKU</Label>
                <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>
              <div>
                <Label>الوحدة</Label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>الكمية</Label>
                <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} min="0" />
              </div>
              <div>
                <Label>الحد الأدنى (تنبيه)</Label>
                <Input type="number" value={form.minQuantity} onChange={(e) => setForm({ ...form, minQuantity: Number(e.target.value) })} min="0" />
              </div>
              <div>
                <Label>سعر التكلفة (ر.س)</Label>
                <Input type="number" step="0.01" value={form.costPrice} onChange={(e) => setForm({ ...form, costPrice: e.target.value })} />
              </div>
              <div>
                <Label>تاريخ الانتهاء</Label>
                <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>ملاحظات</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-[#9C8974] hover:bg-[#7A6B5A]">
                  <Check className="mr-2 h-4 w-4" /> {editingId ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Items Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-[#E8E8DC]">
            <tr>
              <th className="p-3 text-right">المنتج</th>
              <th className="p-3 text-right">الصنف</th>
              <th className="p-3 text-right">الماركة</th>
              <th className="p-3 text-center">الكمية</th>
              <th className="p-3 text-right">الوحدة</th>
              <th className="p-3 text-right">التكلفة</th>
              <th className="p-3 text-right">الانتهاء</th>
              <th className="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  لا توجد منتجات — اضغطي &quot;إضافة منتج&quot; للبدء
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className={`border-t hover:bg-gray-50 ${item.quantity <= item.minQuantity ? "bg-red-50" : ""}`}>
                  <td className="p-3">
                    <div className="font-medium">{item.nameAr || item.name}</div>
                    {item.nameAr && <div className="text-xs text-muted-foreground">{item.name}</div>}
                  </td>
                  <td className="p-3">
                    {CATEGORIES.find((c) => c.value === item.category)?.emoji}{" "}
                    {CATEGORIES.find((c) => c.value === item.category)?.label.split(" / ")[0]}
                  </td>
                  <td className="p-3">{item.brand || "—"}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      item.quantity <= item.minQuantity
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="p-3">{UNITS.find((u) => u.value === item.unit)?.label.split(" / ")[0] || item.unit}</td>
                  <td className="p-3">{item.costPrice ? `${item.costPrice} ر.س` : "—"}</td>
                  <td className="p-3">
                    {item.expiryDate ? (
                      <span className={new Date(item.expiryDate) < new Date() ? "text-red-500 font-medium" : ""}>
                        {new Date(item.expiryDate).toLocaleDateString("ar-SA")}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
