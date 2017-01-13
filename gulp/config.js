var config = {

  fonts: {
    src: 'app/fonts/**/*',
    dest: 'dist/fonts'
  },

  images: {
    src: 'app/images/**/*.+(png|jpg|jpeg|gif|svg)',
    dest: 'dist/images',
    options: {
      name: 'project'
    }
  },

  js: {
    src: 'app/js/**/*.js',
    dest: 'dist/js'
  },

  jshint: {
    reporterOptions: {
      ignoreWarning: true,
      ignoreInfo: true
    }
  },

  jscs: {
    dest: 'app/js',
    options: {
      fix: true,
      configPath: '.jscsrc'
    }
  },

  nunjucks: {
    src: 'app/pages/**/*.+(html|nunjucks)',
    data: './app/data.json',
    templates: ['app/templates/'],
    dest: 'app',
    watch: [
      'app/pages/**/*.+(html|nunjucks)',
      'app/templates/**/*',
      'app/data.json'
    ]
  },

  sass: {
    src: 'app/scss/**/*.scss',
    dest: 'app/css',
    options: {
      includePaths: [
        'app/bower_components',
        './node_modules'
      ]
    }
  },

  sassdoc: {
    options: {
      dest: './sassdoc',
      verbose: true,
      display: {
        alias: true,
        watermark: true
      },
      groups: {
        'undefined': 'Ungrouped',
        foo: 'Foo group',
        bar: 'Bar group',
      }
    }
  },

  scsslint: {
    config: '.scss-lint.yml'
  },

  sprites: {
    src: 'app/images/sprites/**/*',
    imgDest: 'app/images',
    scssDest: 'app/scss',
    options: {
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: '../images/sprites.png',
      retinaSrcFilter: 'app/images/sprites/*@2x.png',
      retinaImgName: 'sprites@2x.png',
      retinaImgPath: '../images/sprites@2x.png'
    }
  },

  uncss: {
    options: {
      html: ['app/*.html'],
      ignore: [
        '.susy-test',
        /.is-/,
        /.has-/
      ]
    }
  },

  useref: {
    src: 'app/*.html',
    dest: 'dist'
  }
};

module.exports = config;
