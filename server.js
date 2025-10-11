import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Path helper (karena pakai ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve file static (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));

// Route utama
app.get("/", (req, res) => {
  res.render("pages/index", { title: "Beranda" }); // Title disesuaikan
});

app.get("/profil", (req, res) => {
  res.render("pages/profil", { title: "Profil" }); // Title disesuaikan
});

app.get("/kontak", (req, res) => {
  res.render("pages/kontak", { title: "Kontak" }); // Title disesuaikan
});

app.get("/galeri", (req, res) => {
  res.render("pages/galeri", { title: "Galeri" }); // Title disesuaikan
});

// Rute yang diganti dari "/informasi"
app.get("/kabar-madrasah", (req, res) => {
  res.render("pages/kabar-madrasah", { title: "Kabar Madrasah" }); // Sesuaikan nama file view jika perlu
});

// Rute yang ditambahkan (rekomendasi)
app.get("/fasilitas", (req, res) => {
  res.render("pages/fasilitas", { title: "Fasilitas" });
});

app.get("/kegiatan", (req, res) => {
  res.render("pages/kegiatan", { title: "Kegiatan" });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
