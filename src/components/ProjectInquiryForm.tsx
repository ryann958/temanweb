"use client";

import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const serviceOptions = [
  "Website UMKM",
  "Website Sekolah",
  "Company Profile",
  "Website Desa",
  "E-commerce",
  "Custom Web Application",
  "Belum yakin",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  budget: string;
  description: string;
};

export default function ProjectInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: serviceOptions[0],
    budget: "Belum ditentukan",
    description: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatus(null);
    setWhatsappUrl("");
  };

  const buildWhatsAppUrl = () => createWhatsAppUrl(
    formData.service,
    [
      `Nama: ${formData.name}`,
      `Email: ${formData.email}`,
      `Nomor WhatsApp: ${formData.phone || "-"}`,
      `Bisnis/Organisasi: ${formData.businessName || "-"}`,
      `Estimasi anggaran: ${formData.budget}`,
      `Kebutuhan: ${formData.description}`,
    ].join("\n"),
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    setWhatsappUrl("");

    try {
      if (!supabase) {
        setWhatsappUrl(buildWhatsAppUrl());
        setStatus({
          type: "info",
          message: "Formulir belum tersambung ke penyimpanan pesan. Lanjutkan dengan membuka WhatsApp untuk mengirim brief Anda.",
        });
        return;
      }

      const { error } = await supabase.from("messages").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.phone,
        business_name: formData.businessName,
        budget: formData.budget,
        description: `[${formData.service}] ${formData.description}`,
      });

      if (error) throw error;

      setStatus({ type: "success", message: "Terima kasih. Brief Anda berhasil dikirim dan tersimpan." });
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        service: serviceOptions[0],
        budget: "Belum ditentukan",
        description: "",
      });
    } catch (error) {
      console.error("Gagal menyimpan brief proyek:", error);
      setStatus({
        type: "error",
        message: "Brief belum berhasil disimpan. Silakan coba lagi atau kirim langsung melalui WhatsApp.",
      });
      setWhatsappUrl(buildWhatsAppUrl());
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="inquiry-name" className="field-label">Nama</label>
          <input
            id="inquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            value={formData.name}
            onChange={updateField}
            placeholder="Nama Anda"
            className="field-input"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="inquiry-email" className="field-label">Email</label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={updateField}
            placeholder="nama@email.com"
            className="field-input"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="inquiry-phone" className="field-label">Nomor WhatsApp (opsional)</label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="\+?[0-9][0-9 \-]{7,18}"
            value={formData.phone}
            onChange={updateField}
            placeholder="08xx atau +62"
            className="field-input"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="inquiry-business" className="field-label">Bisnis/Organisasi (opsional)</label>
          <input
            id="inquiry-business"
            name="businessName"
            value={formData.businessName}
            onChange={updateField}
            placeholder="Nama usaha atau instansi"
            className="field-input"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="inquiry-service" className="field-label">Layanan yang diminati</label>
          <select id="inquiry-service" name="service" value={formData.service} onChange={updateField} className="field-input">
            {serviceOptions.map((service) => <option key={service}>{service}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="inquiry-budget" className="field-label">Anggaran (opsional)</label>
          <select id="inquiry-budget" name="budget" value={formData.budget} onChange={updateField} className="field-input">
            <option>Belum ditentukan</option>
            <option>Di bawah Rp 1 juta</option>
            <option>Rp 1 juta - Rp 3 juta</option>
            <option>Rp 3 juta - Rp 7 juta</option>
            <option>Di atas Rp 7 juta</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="inquiry-description" className="field-label">Ceritakan kebutuhan Anda</label>
        <textarea
          id="inquiry-description"
          name="description"
          required
          minLength={10}
          rows={4}
          value={formData.description}
          onChange={updateField}
          placeholder="Tujuan website, fitur yang dibutuhkan, atau pertanyaan yang ingin didiskusikan..."
          className="field-input resize-y"
        />
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border p-4 text-sm leading-6 ${
            status.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : status.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-blue-200 bg-blue-50 text-blue-900"
          }`}
        >
          <p>{status.message}</p>
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 font-bold underline underline-offset-2">
              Lanjutkan ke WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={loading} className="button-primary w-full justify-center px-6 py-3.5 disabled:cursor-wait disabled:opacity-60">
        {loading ? "Mengirim brief..." : "Kirim brief untuk konsultasi"}
        <Send className="h-4 w-4" />
      </button>
      <p className="text-center text-xs leading-5 text-slate-500">
        Konsultasi awal gratis dan tidak mewajibkan Anda untuk memesan.
      </p>
    </form>
  );
}
