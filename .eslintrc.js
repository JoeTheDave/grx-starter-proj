module.exports = {
  env: {
    'shared-node-browser': true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react', 'whatwg-fetch', 'babel', 'no-param-reassign-allow-reduce'],
  // teach eslint about global variables (specifically from WebpackDefine plugin)
  // 'false' means the variable should be immutable
  globals: {
    __DEV__: false,
    __PROD__: false,
    fetch: false,
    localStorage: false,
    document: false,
  },
  rules: {
    // Deliberate rules
    curly: ['error', 'multi-line', 'consistent'],
    'class-methods-use-this': [0],
    'react/jsx-filename-extension': [0],
    'whatwg-fetch/valid-method': 2,
    'whatwg-fetch/uppercase-method': 2,
    'no-param-reassign': 0,
    'no-param-reassign-allow-reduce/allow-reduce': 2,
    'no-param-reassign-allow-reduce/no-reduce-identifiers': 2,
    eqeqeq: ['error', 'smart'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'no-dupe-class-members': 'error',
    'func-names': ['warn', 'as-needed'],
    camelcase: ['error', { properties: 'never' }],
    'react/no-direct-mutation-state': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'no-plusplus': [0],
    'guard-for-in': [0],
    'operator-assignment': [0],
    'react/sort-comp': [0],
    'react/forbid-prop-types': [0],
    'react/prop-types': [
      2,
      {
        ignore: ['children', 'classes'],
      },
    ],
    'no-underscore-dangle': [
      'error',
      { allow: ['__schema', '__typename', '__DEV__'] },
    ],
    'react/jsx-indent': [0],

    // Disabled due to problems or bugs with plugin, check if problems persist
    'import/no-unresolved': [0], // Conflicts with npm pathing
    'global-require': [0], // Conflicts with static image requires
    'import/named': [0],
    'import/extensions': [0],
    'import/no-extraneous-dependencies': [0], // This one might be fixable via: import/core-modules settings
    'import/first': 0, // We have our own absolute imports like grx-common that are internal to the project and not from npm.  These should be alphabetized with the rest of the local imports.

    // Good rule, but sometimes we want to break it. Need to make it conditional
    'import/no-named-as-default': [0],

    // Accessibility is hard
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/alt-text': [0],
    'jsx-a11y/no-redundant-roles': [0],
    'jsx-a11y/label-has-for': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/anchor-is-valid': [0],
  },
  overrides: [
    {
      files: ['browser-src/**/*.js'],
      env: {
        browser: true,
        commonjs: true,
        'shared-node-browser': true,
        es6: true,
        jest: true,
        serviceworker: true,
        worker: true,
      },
    },
    {
      files: [
        'browser-src/**/actions/*.js',
        '**/constants.js',
        'browser-src/lib/analytics-vis/**/*.js',
      ],
      rules: {
        'import/prefer-default-export': [0],
      },
    },
  ],
};
