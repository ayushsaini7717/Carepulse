import { cookies } from "next/headers";

async function verifyToken(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; 
  const res = await fetch(`${baseUrl}/api/token?token=${token}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to verify token");
  return res.json();
}

export default async function Dashboard() {
  const token = (await cookies()).get("jwt")?.value || ""; 

  const result = token ? await verifyToken(token) : { verified: false };

  return (
    <div>
      {result.verified ? (
        <p>Token is valid! User: {JSON.stringify(result.decoded)}</p>
      ) : (
        <p>Invalid token</p>
      )}
    </div>
  );
}
