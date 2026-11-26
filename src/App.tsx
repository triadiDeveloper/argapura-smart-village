import {mockMode} from './config/demo'
import {DemoAid,DemoEmergency,DemoVillage} from './pages/Explore/DemoPages'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/Home/HomePage'
import {WeatherPage,QuakePage,HolidayPage} from './pages/Explore/ExplorePage'
import {AidPage,EmergencyPage,VillagePage} from './pages/Explore/VillagePages'
import {sections} from './config/village'
const client=new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false}}})
export default function App(){return <QueryClientProvider client={client}><BrowserRouter><Routes><Route element={<MainLayout/>}><Route index element={<HomePage/>}/><Route path="bansos" element={mockMode?<DemoAid/>:<AidPage/>}/><Route path="darurat" element={mockMode?<DemoEmergency/>:<EmergencyPage/>}/><Route path="weather" element={<WeatherPage/>}/><Route path="earthquake" element={<QuakePage/>}/><Route path="holiday" element={<HolidayPage/>}/>{sections.map(s=><Route key={s.path} path={s.path} element={mockMode?<DemoVillage key={s.path} path={s.path}/>:<VillagePage path={s.path}/>}/>)}<Route path="*" element={<div className="panel pad"><h1>Halaman tidak ditemukan</h1><Link to="/" className="text-link">Kembali ke beranda</Link></div>}/></Route></Routes></BrowserRouter></QueryClientProvider>}
