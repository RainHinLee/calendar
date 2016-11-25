
fis.config.set('name','util');

fis.hook('module')

// ---组件库es6解析
fis.match('libs/**.js', {
    isMod: true,
    parser: 'es6-babel'
});


