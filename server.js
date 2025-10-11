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
  res.render("pages/index", { title: "Landing Page Tailwind + EJS" });
});
app.get("/profil", (req, res) => {
  res.render("pages/profil", { title: "Profile" });
});
app.get("/kontak", (req, res) => {
  res.render("pages/kontak", { title: "Contact" });
});
app.get("/informasi", (req, res) => {
  res.render("pages/informasi", { title: "Information" });
});
app.get("/galeri", (req, res) => {
  res.render("pages/galeri", { title: "Gallery" });
});
app.get("/unit-kerja", (req, res) => {
  res.render("pages/unit-kerja", { title: "Unit Kerja" });
});
app.get("/ekstrakurikuler", (req, res) => {
  res.render("pages/ekstrakurikuler", { title: "Extracurricular" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
