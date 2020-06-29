import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
      },
    ],
    plugins: [typescript({ declaration: true, outDir: "dist" })],
  },
  {
    input: "index.ts",
    output: [
      {
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    plugins: [typescript()],
  },
];
