import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "./script.ts",
    output: {
        file: "./script.js",
        format: "es",
        sourcemap: true,
    },
    plugins: [resolve()],
};
