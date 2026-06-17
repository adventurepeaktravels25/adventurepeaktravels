export function GET() {
  return new Response("User-agent: *\nAllow: /\nSitemap: https://travel.app.colaber.in/sitemap.xml\n", {
    headers: { "Content-Type": "text/plain" },
  });
}
