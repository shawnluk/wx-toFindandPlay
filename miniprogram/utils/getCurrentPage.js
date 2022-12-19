
// const pages = getCurrentPages() //获取加载的页面
// console.log(pages);
// const currentPage = pages[pages.length - 1] //获取当前页面的对象
// const url = currentPage.route //当前页面url
// const options = currentPage.options //如果要获取url中所带的参数可以查看options
// console.log(options);

export function getCurrentPage () {
  let pages = getCurrentPages() //获取加载的页面栈
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  // const url = currentPage.route //当前页面url
  const options = currentPage.options //如果要获取url中所带的参数可以查看options
  return options
}