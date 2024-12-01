# 使用CSS绘制特殊图形

------

### 三角形

CSS绘制三角形主要用到的是`border`属性，也就是边框。

```css
div {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```



### 扇形

和三角形思路基本一致，就是多了一个圆角的样式。

```css
div{
  border: 100px solid transparent;
  width: 0;
  heigt: 0;
  border-radius: 100px;
  border-top-color: red;
}
```



### 宽高自适应的正方形（宽已知，高自适应）

- 利用vw来实现：

  ```css
  .square {
    width: 10%;
    height: 10vw;
    background-color: red;
  }
  ```

- 利用元素的margin/padding百分比是相对父元素的width的性质来实现：

  ```css
  .square {
    width: 10%;
    height: 0;
    padding-top: 10%;
    background-color: red;
  }
  ```

- 利用子元素的margin-top来实现

  ```css
  .square {
    width: 10%;
    overflow: hidden;
    background-color: red;
  }
  .square::after {
    content: '';
    display: block;
    margin-top: 100%;
  }
  ```



### 画一条0.5px的线

- `transform: scale(0.5, 0.5)`
- `meta viewport initial-scale=0.5`，设置窗口的初始缩放是0.5



### 设置小于12px的字体

在谷歌下css设置字体为12px及以下时，都默认显示12px。

解决办法：

- `-webkit-text-size-adjust`，文本大小调整，高版本浏览器不支持了，所以一般不要用
- `transform: scale(0.5)`，通过transform进行调整
- 图片。如果是静态的文字，将小于12px的文字做成图片



### 如何解决1px问题

1px问题：在一些`Retina屏幕`的机型上，移动端页面的1px会变得很粗，呈现出不止1px的效果。原因很简单，CSS的1px不等同与移动设备上的1px。它们之间的比列关系有一个专门的公式：

> window.devicePixelRatio = 设备的物理像素 / CSS像素

解决方法：

- 直接写0.5px
- 在html中获取到window.devicePixelRatio，通过css或js去控制
- 伪元素先放大再缩小
- 修改viewport初始缩放为0.5

