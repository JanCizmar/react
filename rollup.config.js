import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({ insert: true }),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom"],
};
