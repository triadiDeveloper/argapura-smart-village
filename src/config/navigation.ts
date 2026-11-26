import {
  LayoutDashboard,
  Newspaper,
  CloudSun,
  Activity,
  CalendarDays,
  Coins,
  Banknote,
  ChartNoAxesCombined,
  MapPin,
  Search,
  BookOpen,
} from 'lucide-react'

export const navigation = [
  {
    title: 'MAIN MENU',
    items: [
      { label: 'Dashboard', path: '/', icon: LayoutDashboard },
      { label: 'Berita Terkini', path: '/news', icon: Newspaper },
      { label: 'Cuaca Indonesia', path: '/weather', icon: CloudSun },
      { label: 'Gempa Bumi', path: '/earthquake', icon: Activity },
      { label: 'Kalender Nasional', path: '/holiday', icon: CalendarDays },
    ],
  },
  {
    title: 'ECONOMY & DATA',
    items: [
      { label: 'Harga Emas', path: '/gold', icon: Coins },
      { label: 'Kurs Mata Uang', path: '/currency', icon: Banknote },
      { label: 'Statistik Indonesia', path: '/statistics', icon: ChartNoAxesCombined },
    ],
  },
  {
    title: 'UTILITIES',
    items: [
      { label: 'Wilayah Indonesia', path: '/regions', icon: MapPin },
      { label: 'Pencarian Kode Pos', path: '/postal-code', icon: Search },
      { label: 'Kamus Indonesia', path: '/dictionary', icon: BookOpen },
    ],
  },
]