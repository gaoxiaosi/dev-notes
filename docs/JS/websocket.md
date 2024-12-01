# WebSocket

------

### 定义：

WebSocket是一种在单个TCP连接上进行**全双工通信**的协议，客户端和服务器可以互相发送数据。



### 原理：



### 特点（优点）：

- WebSocket连接成功后，互相沟通所消耗的请求头很小
- 服务器可以向客户端推送消息



### 断线重连（心跳机制）：



#### Socket.io优势：

兼容性：WebSocket至少需要IE10，Socket.io可以兼容到IE10以下，使用polling模式。

生态：netty-socketio（之前实习时后端用的就是这个）、Vue-socket.io，前后端一致的API，emit、on可以自定义事件名。



### 多个标签页之间通信：

1. `WebSocket`
2. `LocalStorage`
3. `Worker`
4. `BroadcastChannel`
5. `SSE`：单向通信，协议更简单，默认就是自动重连。
6. `postMessage`
7. `IndexedDB`