import { notFound } from "next/navigation";
export default async function ModulePage({params}:{params:Promise<{section:string}>}){const {section}=await params;if(["workforce","assets","import-review","ledger","payments"].includes(section))notFound();notFound();}
