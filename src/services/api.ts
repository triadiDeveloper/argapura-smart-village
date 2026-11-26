import {mockMode} from '../config/demo'
import {mockResponse} from '../mocks/api'
import { useQuery } from '@tanstack/react-query'
export type Envelope<T> = { data:T; fetchedAt:number; stale:boolean }
export function useApi<T>(path:string, minutes=5, enabled=true) {
  return useQuery({queryKey:[mockMode,path],enabled,queryFn:async({signal}):Promise<Envelope<T>>=>{
    if(mockMode) return {data:mockResponse(path) as T,fetchedAt:Date.now(),stale:false};
    const response=await fetch(`/api/${path}`,{signal}); if(!response.ok) throw new Error('Sumber data belum tersedia.'); return response.json()
  },staleTime:minutes*60000,refetchInterval:minutes*60000,retry:1})
}
export type News = {title:string; link:string; pubDate:string; description?:string; thumbnail?:string}
export type NewsData = {data?:{posts?:News[]}}
export type Quake = {Tanggal:string; Jam:string; Magnitude:string; Kedalaman:string; Wilayah:string; Potensi:string; Coordinates?:string; Dirasakan?:string}
export type QuakeData = {Infogempa?:{gempa?:Quake|Quake[]}}
export type Forecast = {local_datetime:string; t:number; weather_desc:string; hu:number; ws:number}
export type WeatherData = {lokasi?:{desa?:string; kecamatan?:string; kotkab?:string}; data?:{cuaca?:Forecast[][]}[]}
export type Holiday = {tanggal?:string; keterangan?:string; is_cuti?:boolean; holiday_date?:string; holiday_name?:string}
export type Rates = {date:string; rates:Record<string,number>}
export type Region = {id?:string; code?:string; nama?:string; name?:string; postal_code?:string; province?:{name?:string;nama?:string}; regency?:{name?:string;nama?:string}; district?:{name?:string;nama?:string}}
export type Regions = {data?:Region[]}|Region[]
export const regions = (x?:Regions):Region[] => Array.isArray(x)?x:Array.isArray(x?.data)?x.data:[]
export const regionName=(x:Region)=>x.name||x.nama||x.code||x.id||'—'
export const regionId=(x:Region)=>x.code||x.id||''
export const dateLabel=(value:string)=>{const d=new Date(value);return Number.isNaN(d.getTime())?value:d.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'})}
export const rupiah=(n:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:2}).format(n)
export const safeLink=(s?:string)=>{try{const u=new URL(s||'');return u.protocol==='https:'||u.protocol==='http:'?u.href:undefined}catch{return undefined}}
export const cleanText=(s?:string)=> (s||'').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
export const quakeList=(x?:QuakeData)=>{const q=x?.Infogempa?.gempa;return Array.isArray(q)?q:q?[q]:[]}
export const forecasts=(x?:WeatherData)=>x?.data?.[0]?.cuaca?.flat()||[]
