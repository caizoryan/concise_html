import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "./script.ts",
    output: {
        file: "./script.js",
        format: "es",
        sourcemap: true,
    },
    plugins: [resolve(), typescript()],
};
