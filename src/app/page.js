
import CoverPage from './components/CoverPage'
import SolarWaveSection from './components/SolarWaveSection';
import Help from './components/Help';
import Statistics from './components/Statistics';





export default function Home() {
  return (
    <div>
      <CoverPage />
      <SolarWaveSection />
      <Statistics/>
      <Help/>

    </div>
  );
}
