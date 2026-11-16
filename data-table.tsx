import { ReactNode } from "react";
export function DataTable({title,subtitle,columns,rows,empty}:{title:string;subtitle:string;columns:string[];rows:Record<string,ReactNode>[];empty:string}){
 return <main className="content"><div className="eyebrow">Operations · live database view</div><h1 className="heading">{title}</h1><p className="sub">{subtitle}</p><div className="panel"><div className="tablewrap"><table><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{columns.map(c=><td key={c}>{r[c]??"—"}</td>)}</tr>)}</tbody></table></div>{!rows.length&&<p className="empty">{empty}</p>}<p className="muted">{rows.length} record(s) shown · read-only in v0.2</p></div></main>;
}
