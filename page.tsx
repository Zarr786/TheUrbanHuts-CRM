import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
const fmt=(n:number)=>new Intl.NumberFormat("en-IN").format(n);
export default async function DashboardPage(){
 const s=await createClient();
 const modules=["leads","clients","projects","quotations","tasks","vendors","expenses"];
 const counts=await Promise.all(modules.map(async module=>{const {count,error}=await s.from("crm_records").select("id",{count:"exact",head:true}).eq("module",module);return {count:count??0,error:!!error};}));
 const cards=[["Leads",counts[0],"/dashboard/leads"],["Clients",counts[1],"/dashboard/clients"],["Projects",counts[2],"/dashboard/projects"],["Quotations",counts[3],"/dashboard/quotations"],["Tasks",counts[4],"/dashboard/tasks"],["Vendors",counts[5],"/dashboard/vendors"],["Expenses",counts[6],"/dashboard/expenses"]];
 const [{data:tasks},{data:clients},{data:projects}]=await Promise.all([
 s.from("crm_records").select("id,data,updated_at").eq("module","tasks").order("updated_at",{ascending:false}).limit(6),
 s.from("crm_records").select("id,data,updated_at").eq("module","clients").order("updated_at",{ascending:false}).limit(5),
 s.from("crm_records").select("id,data,updated_at").eq("module","projects").order("updated_at",{ascending:false}).limit(5)
 ]);
 return <main className="content"><div className="eyebrow">Business control centre · v0.3</div><h1 className="heading">Good work starts with control.</h1><p className="sub">TheUrbanHuts operations overview · Patna, Bihar</p>
 <div className="grid">{cards.map(([label,item,href])=><Link className="stat" href={String(href)} key={String(label)}><label>{label}</label><strong>{(item as any).error?"—":fmt((item as any).count)}</strong><small>Open module →</small></Link>)}</div>
 <div className="grid2">
 <div className="panel"><h2>Recently updated tasks</h2>{tasks?.length?<div className="tablewrap"><table><thead><tr><th>Task</th><th>Assignee</th><th>Status</th></tr></thead><tbody>{tasks.map(t=><tr key={t.id}><td>{t.data?.title??"—"}</td><td>{t.data?.assignee??"—"}</td><td>{t.data?.status??"—"}</td></tr>)}</tbody></table></div>:<p className="empty">No CRM tasks yet.</p>}<p><Link href="/dashboard/tasks" className="textlink">View tasks →</Link></p></div>
 <div className="panel"><h2>Recent clients</h2>{clients?.length?<div className="tablewrap"><table><thead><tr><th>Client</th><th>Company</th><th>Phone</th></tr></thead><tbody>{clients.map(c=><tr key={c.id}><td>{c.data?.name??"—"}</td><td>{c.data?.company??"—"}</td><td>{c.data?.phone??"—"}</td></tr>)}</tbody></table></div>:<p className="empty">No CRM clients yet.</p>}<p><Link href="/dashboard/clients" className="textlink">View clients →</Link></p></div>
 </div>
 <div className="panel"><h2>Recent projects</h2>{projects?.length?<div className="tablewrap"><table><thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Target date</th></tr></thead><tbody>{projects.map(p=><tr key={p.id}><td>{p.data?.name??"—"}</td><td>{p.data?.client??"—"}</td><td>{p.data?.status??"—"}</td><td>{p.data?.target_date??"—"}</td></tr>)}</tbody></table></div>:<p className="empty">No CRM projects yet.</p>}</div>
 <div className="notice">CRM records are stored in the new RLS-protected crm_records table. Existing imported registers and accounting tables are retained separately.</div>
 </main>;
}
