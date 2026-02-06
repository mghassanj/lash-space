# Booking System - Quick Reference

## 📂 File Structure
```
src/
├── app/
│   ├── api/
│   │   └── booking/
│   │       ├── route.ts                    # POST: Create booking
│   │       └── availability/
│   │           └── route.ts                # GET: Check available slots
│   └── (public)/
│       └── booking/
│           ├── page.tsx                    # Server component (fetches services)
│           └── booking-client.tsx          # Client component (wizard logic)
└── components/
    └── booking/
        ├── booking-wizard.tsx              # Progress indicator + wrapper
        ├── service-selector.tsx            # Step 1: Service cards grid
        ├── date-time-picker.tsx            # Step 2: Calendar + time slots
        ├── customer-form.tsx               # Step 3: Contact details
        ├── booking-summary.tsx             # Step 4: Review before confirm
        └── booking-confirmation.tsx        # Step 5: Success screen
```

## 🎯 Component Usage

### BookingWizard
```tsx
<BookingWizard currentStep={1} totalSteps={4}>
  {/* Step content */}
</BookingWizard>
```

### ServiceSelector
```tsx
<ServiceSelector
  services={services}
  selectedServiceId={selectedId}
  onSelectService={(id) => setSelectedId(id)}
/>
```

### DateTimePicker
```tsx
<DateTimePicker
  serviceId={serviceId}
  selectedDate={date}
  selectedTime={time}
  onSelectDate={(d) => setDate(d)}
  onSelectTime={(t) => setTime(t)}
/>
```

### CustomerForm
```tsx
<CustomerForm
  initialData={data}
  onSubmit={(data) => handleSubmit(data)}
  onBack={() => goBack()}
/>
```

### BookingSummary
```tsx
<BookingSummary
  service={service}
  date={date}
  time={time}
  customerData={customerData}
  onConfirm={() => createBooking()}
  onBack={() => goBack()}
  loading={isSubmitting}
/>
```

### BookingConfirmation
```tsx
<BookingConfirmation appointment={appointmentData} />
```

## 🔗 API Endpoints

### Get Availability
```
GET /api/booking/availability?date=YYYY-MM-DD&serviceId=xxx

Response:
{
  "slots": ["09:00", "09:30", "10:00", ...]
}
```

### Create Booking
```
POST /api/booking
Content-Type: application/json

{
  "serviceId": "xxx",
  "date": "2026-02-10",
  "time": "10:00",
  "customerName": "Jane Doe",
  "customerPhone": "+1-555-123-4567",
  "customerEmail": "jane@example.com",  // optional
  "notes": "First visit"                 // optional
}

Response:
{
  "success": true,
  "appointment": {
    "id": "xxx",
    "date": "2026-02-10T10:00:00Z",
    "endTime": "2026-02-10T11:30:00Z",
    "service": { "name": "...", "duration": 90, "price": 150 },
    "customer": { "name": "...", "phone": "...", "email": "..." },
    "totalPrice": 150
  }
}
```

## ⏰ Business Hours

| Day       | Hours         | Status |
|-----------|---------------|--------|
| Monday    | 9 AM - 7 PM   | Open   |
| Tuesday   | 9 AM - 7 PM   | Open   |
| Wednesday | 9 AM - 7 PM   | Open   |
| Thursday  | 9 AM - 9 PM   | Open   |
| Friday    | 9 AM - 9 PM   | Open   |
| Saturday  | 10 AM - 6 PM  | Open   |
| Sunday    | CLOSED        | ❌     |

**Slot Interval:** 30 minutes  
**Slot Logic:** Service must finish before closing time

## 🎨 Color Palette

| Name     | Hex       | Usage                          |
|----------|-----------|--------------------------------|
| Gold     | `#C8956C` | Primary accent, selected state |
| Charcoal | `#1A1A2E` | Text, headings                 |
| Cream    | `#FFF5EB` | Backgrounds, highlights        |

## ✅ Validation Rules

### Phone Number
- Required
- Format: Allows digits, spaces, dashes, parentheses, plus sign
- Regex: `/^[\d\s\-\+\(\)]+$/`

### Email
- Optional
- Format: Standard email validation
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Name
- Required
- Must not be empty after trim

### Date
- Must be in the future
- Cannot be Sunday (closed)
- Cannot be in the past

## 🔄 Booking Flow States

```
Step 1: SELECT SERVICE
  ↓ (service selected)
Step 2: CHOOSE DATE & TIME
  ↓ (date + time selected)
Step 3: YOUR DETAILS
  ↓ (form validated)
Step 4: CONFIRMATION
  ↓ (confirm clicked)
API CALL → Create Customer & Appointment
  ↓ (success)
Step 5: SUCCESS SCREEN
```

## 🐛 Common Issues & Fixes

### Issue: No time slots showing
**Check:**
- Is the date in the future?
- Is it Sunday? (closed)
- Are there conflicting appointments?
- Is the service duration too long for remaining hours?

### Issue: Booking creation fails
**Check:**
- All required fields present?
- Phone number format valid?
- Date in correct format (YYYY-MM-DD)?
- Time in correct format (HH:mm)?
- Service exists in database?

### Issue: Calendar not working
**Check:**
- Is Calendar component from shadcn/ui installed?
- Is date-fns installed?
- Are date utilities imported correctly?

## 📦 Dependencies Used

- **next** - Framework
- **react** - UI library
- **prisma** - Database ORM
- **date-fns** - Date manipulation
- **framer-motion** - Animations
- **lucide-react** - Icons
- **shadcn/ui** - UI components (Button, Card, Calendar, Input, Label, Badge)

## 🚀 Quick Start

1. Navigate to `/booking` in browser
2. Click a service card
3. Pick a date on calendar
4. Select a time slot
5. Fill in your details
6. Review and confirm
7. Download calendar invite

**That's it!** 🎉
