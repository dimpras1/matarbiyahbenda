import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Path helper (karena pakai ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve file static (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
console.log("📁 Folder gambar:", path.join(__dirname, "images"));

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // GUNAKAN ENVIRONMENT VARIABLES
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "images/beranda/image.png"));
});

// Route utama
app.get("/", (req, res) => {
  res.render("pages/index", { title: "Beranda" });
});

app.get("/profil", (req, res) => {
  res.render("pages/profil", { title: "Profil" });
});

app.get("/kontak", (req, res) => {
  res.render("pages/kontak", { title: "Kontak" });
});

// Route untuk mengirim email dari form kontak
app.post("/kirim-pesan", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validasi input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Mohon lengkapi semua field yang wajib diisi",
    });
  }

  // Konfigurasi email
  const mailOptions = {
    from: `"Form Kontak Madrasah" <matarbiyahislamiyah84@gmail.com>`,
    to: "matarbiyahislamiyah84@gmail.com", // Email tujuan
    replyTo: email, // Email pengirim bisa langsung direply
    subject: `Pesan Baru: ${subject}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #16a34a; border-bottom: 3px solid #16a34a; padding-bottom: 10px;">Pesan Baru dari Website</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #374151;">Nama:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Telepon:</strong> ${
              phone || "Tidak diisi"
            }</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Subjek:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong style="color: #374151;">Pesan:</strong></p>
            <p style="margin: 10px 0; line-height: 1.6; color: #4b5563;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #6b7280; font-size: 12px;">
            <p>Email ini dikirim otomatis dari form kontak website Madrasah Aliyah Tarbiyah Islamiyah</p>
            <p>Waktu: ${new Date().toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
            })} WIB</p>
          </div>
        </div>
      `,
  };

  // Kirim email
  try {
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
    });
  } catch (error) {
    console.error("Error mengirim email:", error);
    res.status(500).json({
      success: false,
      message:
        "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
    });
  }
});

app.get("/galeri", (req, res) => {
  res.render("pages/galeri", { title: "Galeri" });
});

app.get("/kabar-madrasah", (req, res) => {
  res.render("pages/kabar-madrasah", { title: "Kabar Madrasah" });
});

app.get("/fasilitas", (req, res) => {
  res.render("pages/fasilitas", { title: "Fasilitas" });
});

app.get("/kegiatan", (req, res) => {
  res.render("pages/kegiatan", { title: "Kegiatan" });
});

app.get("/ekstrakurikuler", (req, res) => {
  res.render("pages/ekstrakurikuler", { title: "Ekstrakurikuler" });
});

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

// TAMBAHKAN INI DI AKHIR FILE
export default app;
