module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        "next",
        "airbnb",
        "airbnb-typescript",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier"
    ],
    plugins: ["@typescript-eslint", "import"],
    settings: {
        next: {
            rootDir: ["apps/*/", "packages/*/"]
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: ["apps/*/tsconfig.json"]
            }
        }
    },
    rules: {
        // semi: ["error", "always"],
        semi: 0,
        "no-unexpected-multiline": "error",
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow tsx syntax in ts files (for next.js project)
        "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
        // suppress errors for props spreading
        "react/jsx-props-no-spreading": "off",
        // suppress errors for nested ternaries
        "no-nested-ternary": "off",
        "no-param-reassign": "off",
        // export styling
        "import/prefer-default-export": "off"
    },
    ignorePatterns: [
        "**/*.js",
        "**/*.json",
        "node_modules",
        "public",
        "styles",
        ".next",
        "coverage",
        "dist"
    ]
}
