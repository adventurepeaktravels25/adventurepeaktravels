import { cp, mkdir, readFile, writeFile } from "node:fs/promises";

async function main() {
  const outputDir = ".vercel/output";
  await mkdir(outputDir, { recursive: true });

  // Copy Vercel Build Output API config
  const configJson = await readFile("dist/config.json", "utf-8");
  await writeFile(`${outputDir}/config.json`, configJson);

  // Copy server function
  const funcDir = `${outputDir}/functions/__server.func`;
  await mkdir(funcDir, { recursive: true });
  await cp("dist/server", funcDir, { recursive: true });

  // Copy static assets
  const staticDir = `${outputDir}/static`;
  await mkdir(staticDir, { recursive: true });
  await cp("dist/client", staticDir, { recursive: true });

  console.log("✓ Vercel output ready at .vercel/output/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
