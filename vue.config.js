module.exports ={
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
        'router': 'router',
        'views': '@/views',
        'store': '@/store',
        'utils': '@/utils'
      }
    },
    
    externals: {  
      express: 'express' 
    }
  }
}