
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export const metadata = {
  title: "Solar Potential",
  description: "Calculating Solar potential",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body style={{ margin: 0, minHeight: "auto", display: "flex", flexDirection: "column" }} >
      <Navbar />
      <div style={{ marginBottom:"20px"}}>{children}</div>
      <Footer style={{ marginTop: "20px" }} />
    </body>
  </html>
  );
}
