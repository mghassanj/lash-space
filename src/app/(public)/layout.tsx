import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { AnnouncementBar } from "@/components/public/AnnouncementBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen bg-[#E8E8DC]/30">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
