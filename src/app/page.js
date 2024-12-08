// pages/index.js
import CoverPage from './components/CoverPage'
import SolarWaveSection from './components/SolarWaveSection';
import Help from './components/Help';




export default function Home() {
  return (
    <div>
      {/* Render the CoverPage component */}
      <CoverPage />
      <SolarWaveSection />
      <Help/>

    </div>
  );
}
