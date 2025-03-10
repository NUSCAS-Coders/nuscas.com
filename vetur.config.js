// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    // **optional** default: `{}`
    // override vscode settings
    // Notice: It only affects the settings used by Vetur.
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": true,

    },
    // **optional** default: `[{ root: './' }]`
    // support monorepos
    projects: [
      {
        root: './client/',
        package: './package.json',
        tsconfig: './tsconfig.json',
        // **optional** default: `'./.vscode/vetur/snippets'`
        // Where is vetur custom snippets folders?
        snippetFolder: './.vscode/vetur/snippets',
        // **optional** default: `[]`
        // Register globally Vue component glob.
        // If you set it, you can get completion by that components.
        // It is relative to root property.
        // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
        globalComponents: [
          '.client/src/components/**/*.vue'
        ]
      }
    ]
  }