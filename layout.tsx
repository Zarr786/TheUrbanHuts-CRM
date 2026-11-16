import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "./logout-button";
const groups=[
 {label:"WORKSPACE",links:[["Overview","/dashboard"],["Leads","/dashboard/leads"],["Clients","/dashboard/clients"],["Projects","/dashboard/projects"],["Tasks","/dashboard/tasks"],["Quotations","/dashboard/quotations"]]},
 {label:"OPERATIONS",links:[["Vendors","/dashboard/vendors"],["Expenses","/dashboard/expenses"],["Workforce","/dashboard/workforce"],["Assets & tools","/dashboard/assets"],["Import review","/dashboard/import-review"]]},
 {label:"FINANCE",links:[["Payments & receipts","/dashboard/payments"],["Ledger & cashbook","/dashboard/ledger"]]},
 {label:"ADMIN",links:[["CMS & settings","/dashboard/settings"]]}
];
export default async function DashboardLayout({children}:{children:React.ReactNode}) {
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 return <div className="shell"><aside className="sidebar"><div className="brand"><div className="brandmark">THEURBANHUTS</div><small>WE DESIGN · WE BUILD · WE TRANSFORM</small></div>
 {groups.map(g=><div key={g.label}><div className="navlabel">{g.label}</div><nav className="nav">{g.links.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav></div>)}
 <div className="sidefoot">Signed in as<br/><b>{user.email}</b><br/><br/>Premium interiors · construction · turnkey</div></aside>
 <section className="main"><header className="topbar"><span>THEURBANHUTS / CRM · v0.2</span><LogoutButton/></header>{children}</section></div>;
}
