module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://baidu.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            
        }
    }
}