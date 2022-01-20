module.exports = (config) => {

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

};
