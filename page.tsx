 "use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function LoginPage() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");
    try{const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error)throw error;window.location.href="/dashboard";
    }catch(err){setError(err instanceof Error?err.message:"Unable to sign in");}finally{setBusy(false);}
  }
  return <main className="login"><form className="loginbox" onSubmit={submit}>
    <div className="brandmark">THEURBANHUTS</div><div className="eyebrow" style={{marginTop:8}}>Business control centre</div>
    <h1 className="heading">Owner & staff login</h1><p className="sub">Sign in with your invited CRM account.</p>
    <div className="field"><label>Email address</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></div>
    <div className="field"><label>Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></div>
    {error&&<p className="error">{error}</p>}<button className="btn" disabled={busy} style={{width:"100%"}}>{busy?"Signing in…":"Sign in securely"}</button>
    <p className="sub" style={{marginTop:20}}>We Design. We Build. We Transform.</p>
  </form></main>;
}