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
app.use("/images", express.static(path.join(__dirname, "images")));
console.log("📁 Folder gambar:", path.join(__dirname, "images"));


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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});