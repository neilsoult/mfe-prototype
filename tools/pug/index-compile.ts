import { TargetOptions } from '@angular-builders/custom-webpack';

const path = require('path');
const pug = require('pug');

export default ({ project }: TargetOptions, html: string) => {

    const appPath = `./apps/${project}/src/`;
    const bodyInjection = html.match(/<body>([^]+)<\/body>/)?.[1];
    const headInjection = html.match(/<head>([^]+)<\/head>/)?.[1];

    let template = pug.renderFile(
        `${appPath}index.pug`,
        { basedir: path.join(__dirname, `${appPath}pug`), doctype: 'html' }
    );

    const headIndex = template.indexOf('<head>') + 6;
    template = `${template.slice(0, headIndex)}${headInjection}${template.slice(headIndex)}`;

    const bodyIndex = template.indexOf('</body>');
    template = `${template.slice(0, bodyIndex)}${bodyInjection}${template.slice(bodyIndex)}`;

    return template;

};
