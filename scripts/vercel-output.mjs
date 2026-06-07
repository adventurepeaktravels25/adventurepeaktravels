import { cp, mkdir, readFile, writeFile, access, constants } from "node:fs/promises";

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyIfExists(source, destination) {
  if (await exists(source)) {
    await cp(source, destination, { recursive: true });
    return true;
  }
  return false;
}

async function main() {
  const outputDir = ".vercel/output";
  await mkdir(outputDir, { recursive: true });

  const distConfigPath = "dist/config.json";
  const outputConfigPath = `${outputDir}/config.json`;

  if (await exists(distConfigPath)) {
    const configJson = await readFile(distConfigPath, "utf-8");
    await writeFile(outputConfigPath, configJson);
  } else if (await exists(outputConfigPath)) {
    // Nitro already emitted the Vercel config directly.
  } else {
    console.warn("Warning: no config.json found in dist/ or .vercel/output/");
  }

  const funcDir = `${outputDir}/functions/__server.func`;
  await mkdir(funcDir, { recursive: true });
  if (!(await copyIfExists("dist/server", funcDir))) {
    // If Nitro already output to .vercel/output, leave it as-is.
    if (!(await exists(`${outputDir}/functions/__server.func`))) {
      throw new Error("No server function output found in dist/server or .vercel/output/functions/__server.func");
    }
  }

  const staticDir = `${outputDir}/static`;
  await mkdir(staticDir, { recursive: true });
  if (!(await copyIfExists("dist/client", staticDir))) {
    if (!(await exists(staticDir))) {
      throw new Error("No static client output found in dist/client or .vercel/output/static");
    }
  }

  console.log("✓ Vercel output ready at .vercel/output/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
