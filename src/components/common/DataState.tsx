import {mockMode} from '../../config/demo'
import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Envelope } from '../../services/api'
export default function DataState<T>({query,children,source}:{query:UseQueryResult<Envelope<T>,Error>;children:(data:T)=>ReactNode;source:string}) {
 if(query.isPending) return <div className="skeleton" role="status">Memuat informasi…</div>
 if(query.isError||!query.data) return <div className="empty" role="status">Data belum tersedia. <button className="text-link" onClick={()=>void query.refetch()}>Coba lagi</button></div>
 return <>{query.data.stale&&<p className="warning">Data tersimpan • sumber sedang tidak tersedia.</p>}{children(query.data.data)}<div className="source">{mockMode?'DATA DEMO · Bukan data sumber resmi':source} · Diambil {new Date(query.data.fetchedAt).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})} WIB</div></>
}
