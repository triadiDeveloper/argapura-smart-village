import {weather} from './data'
export function mockResponse(path:string):unknown {
 const [route,query]=path.split('?'); const p=new URLSearchParams(query)
 switch(route){
 case 'weather': if(p.get('adm4') && p.get('adm4')!=='32.01.22.2006') throw new Error('Demo hanya tersedia untuk Argapura.'); return weather
 case 'earthquake': case 'earthquakes': return {Infogempa:{gempa:[]}} // never fabricate emergency alerts
 case 'holidays': return [{tanggal:`${p.get('year')||2026}-01-01`,keterangan:'Contoh libur tahun baru'},{tanggal:`${p.get('year')||2026}-08-17`,keterangan:'Contoh hari kemerdekaan'}]
 case 'regions': return {data:[{code:p.get('level')==='villages'?'32.01.22.2006':p.get('level')==='districts'?'32.01.22':p.get('level')==='regencies'?'32.01':'32',name:p.get('level')==='villages'?'Argapura':p.get('level')==='districts'?'Cigudeg':p.get('level')==='regencies'?'Kabupaten Bogor':'Jawa Barat'}]}
 default: throw new Error('Dataset demo belum tersedia.')
 }
}
