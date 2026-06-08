/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      comment: 'Prevent circular dependencies in application code.',
      severity: 'error',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'not-to-dev-dep',
      comment: 'Do not import devDependencies in src.',
      severity: 'error',
      from: { path: '^src' },
      to: { dependencyTypes: ['npm-dev'] },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: [
        'npm',
        'npm-dev',
        'npm-optional',
        'npm-peer',
        'npm-bundled',
        'npm-no-pkg',
      ],
    },
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
}
