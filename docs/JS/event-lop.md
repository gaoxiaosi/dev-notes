# Event-Lop

------

执行顺序：

1. 一开始整个脚本作为一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完毕
4. 执行浏览器UI线程的渲染工作
5. 检查是否有Web Worker任务，有则执行
6. 执行完本轮宏任务，回到2，依此循环，直到宏任务和微任务队列都为空



微任务：`MutationObserver`、`Promise.then或catch`、`Promise为基础开发的其它技术，比如fetch API`、`V8的垃圾回收过程`、`Node独有的process.nextTick`

宏任务：`script`、`setTimeout`、`SetInterval`、`setImmediately`、`I/O`、`UI rendering`

