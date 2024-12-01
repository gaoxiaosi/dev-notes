# 特殊的布局

------

### 水平垂直居中

1. `translate`配合`absolute`的`top:50%`和`left:50%`定位到正中心。该方法`不需考虑盒子的宽高`，需考虑translate的`兼容性`。

   ```css
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     left: 50%;
     top: 50%;
     transform:translate(-50%,-50%);}
   ```

2. 利用`absolute`，设置四个方向都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分。该方法适用于`盒子有宽高`的情况。

   ```css
   .parent {
       position: relative;
   }
    
   .child {
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       margin: auto;
   }
   ```

3. 利用`absolute`，先将元素的左下角通过`top:50%`和`left:50%`定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。该方法适用于`盒子宽高已知`的情况。

   ```css
   .parent {
   	position: relative;
   }
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     margin-top: -50px; /* 自身height的一半 */
     margin-left: -50px; /* 自身width的一半 */
   }
   ```

4. 使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向向上为居中对齐，该方法要考虑`兼容性`问题，移动端用的较多。

   ```css
   .parent {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

   
