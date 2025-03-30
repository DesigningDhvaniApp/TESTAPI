import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

globalThis.__filename = __filename;
globalThis.__dirname = __dirname;
