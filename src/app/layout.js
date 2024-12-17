
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export const metadata = {
  title: "NJ EVCS Awnings",
  description: "Solar potential Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body style={{ margin: 0, minHeight: "auto", display: "flex", flexDirection: "column" }} >
      <Navbar />
      <div >{children}</div>
      <Footer  />
    </body>
  </html>
  );
}
