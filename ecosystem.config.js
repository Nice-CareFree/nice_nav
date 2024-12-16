// 使用pm2，根目录创建ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'niceCat',
            port: '3200',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        }
    ]
}
