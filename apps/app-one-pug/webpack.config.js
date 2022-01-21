const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath =
  process.env.NX_TSCONFIG_PATH ??
  path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [
    /* mapped paths to share */
  ],
  workspaceRootPath
);

module.exports = (config) => {

  config.output.uniqueName = 'app-one-pug';
  config.output.publicPath = 'auto';
  config.optimization.runtimeChunk = false;
  config.experiments.outputModule = true;
  // config.resolve.alias = { ...sharedMappings.getAliases() };
  // config.plugins = [
  //   ...config.plugins,
  //   new ModuleFederationPlugin({
  //     name: 'app-one-pug',
  //     filename: 'remoteEntry.js',
  //     exposes: {
  //       './Module': './apps/app-one-pug/src/app/core/core.module.ts',
  //     },
  //     shared: share({
  //       '@angular/core': {
  //         singleton: true,
  //         strictVersion: true,
  //         requiredVersion: 'auto',
  //         includeSecondaries: true,
  //       },
  //       '@angular/common': {
  //         singleton: true,
  //         strictVersion: true,
  //         requiredVersion: 'auto',
  //         includeSecondaries: true,
  //       },
  //       '@angular/common/http': {
  //         singleton: true,
  //         strictVersion: true,
  //         requiredVersion: 'auto',
  //         includeSecondaries: true,
  //       },
  //       '@angular/router': {
  //         singleton: true,
  //         strictVersion: true,
  //         requiredVersion: 'auto',
  //         includeSecondaries: true,
  //       },
  //       rxjs: {
  //         singleton: true,
  //         strictVersion: true,
  //         requiredVersion: 'auto',
  //         includeSecondaries: true,
  //       },
  //       ...sharedMappings.getDescriptors(),
  //     }),
  //     library: {
  //       type: 'module',
  //     },
  //   }),
  //   sharedMappings.getPlugin()
  // ];
    // add pug loader into webpack module rules
    config.module.rules = [
        {
            test: /.(pug|jade)$/,
            exclude: /.(include|partial).(pug|jade)$/,
            use: [
                { loader: 'apply-loader' },
                { loader: 'pug-loader', options: { root: 'libs/pug' } }
            ]
        },
        { test: /.(include|partial).(pug|jade)$/, loader: 'pug-loader' },
        ...config.module.rules
    ];

    // update AngularCompilerPlugin options to turn off directTemplateLoading so we can use pug templates
    const angularPlugin = config.plugins.find(({ constructor: { name }}) => name === 'AngularWebpackPlugin');
    angularPlugin.options.directTemplateLoading = false;

    return config;

  // return require('../../tools/custom-webpack-config')(config);

};
// module.exports = (config) => {

//   // add pug loader into webpack module rules
//   config.module.rules = [
//       {
//           test: /.(pug|jade)$/,
//           exclude: /.(include|partial).(pug|jade)$/,
//           use: [
//               { loader: 'apply-loader' },
//               { loader: 'pug-loader', options: { root: 'libs/pug' } }
//           ]
//       },
//       { test: /.(include|partial).(pug|jade)$/, loader: 'pug-loader' },
//       ...config.module.rules
//   ];

//   // update AngularCompilerPlugin options to turn off directTemplateLoading so we can use pug templates
//   const angularPlugin = config.plugins.find(({ constructor: { name }}) => name === 'AngularWebpackPlugin');
//   angularPlugin.options.directTemplateLoading = false;

//   return config;

// };
