const mix = require('laravel-mix');
const fs = require('fs');
const path = require('path');

// mix.webpackConfig({
//     stats: {
//         children: true
//     }
// });

mix.js('resources/js/app.js', 'public/js').vue()
mix.css('resources/css/app.css', 'public/css')
mix.postCss('resources/css/tailwind.css', 'public/css', [
    require('tailwindcss'),
]);

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.resolve(p, f)).isDirectory())
let modules = dirs('./Modules');

[...modules].forEach((module) => {
    let path = './Modules/' + module + '/Resources/assets';
    mix.js(path + '/js/app.js', 'public/js/' + module.toLowerCase() + '.js').vue()
    mix.sass(path + '/sass/app.scss', 'public/css/' + module.toLowerCase() + '.css')
});

if (mix.inProduction()) {
    mix.version();
}


