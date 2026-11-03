const WHATSAPP_NUMBER = "6281363799776";

export function createWhatsAppUrl(service = "Konsultasi website", details?: string) {
  const message = [
    `Halo TemanWeb, saya ingin konsultasi tentang ${service}.`,
    "",
    details,
    "Mohon informasi langkah selanjutnya. Terima kasih.",
  ].filter(Boolean).join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
