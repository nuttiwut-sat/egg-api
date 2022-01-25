module.exports = {
    apps: [
        {
            name: 'api-newatlantis',
            script: './dist/index.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3100,
                DATABASE_URL: 'mysql://root:@localhost:3306/egg-handle',
                SECRET_AUTH_PASS:
                    'sjaw3468f54w3f4w348waw643f3hr554shfgbdf45zsc24',
            },
            env_development: {
                PORT: 3100,
                NODE_ENV: 'development',
                DATABASE_URL: 'mysql://root:@localhost:3306/egg-handle',
                SECRET_AUTH_PASS:
                    'sjaw3468f54w3f4w348waw643f3hr554shfgbdf45zsc24',
            },
        },
    ],
};
