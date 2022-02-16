export function debounce(func,delay){
  let timer = null
  return function(...args){ //返回一个立即执行函数 执行里面的func
    if(timer) clearTimeout(timer) // 还有下一条 清除定时器
    timer = setTimeout(()=>{
      func.apply(this,...args) //当读取完所有图片 timer不再被清除 func被执行
    },delay)
  }
}