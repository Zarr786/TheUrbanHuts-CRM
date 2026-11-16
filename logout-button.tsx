 "use client";
import { createClient } from "@/lib/supabase/client";
export function LogoutButton(){return <button className="btn" onClick={async()=>{const s=createClient();await s.auth.signOut();window.location.href="/login";}}>Sign out</button>}