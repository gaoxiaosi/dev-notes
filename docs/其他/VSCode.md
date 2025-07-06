# VSCode使用技巧

------

### 主题 & 字体：（[主题网站，随便挑](https://vscodethemes.com/)）

[One Dark Pro](https://github.com/Binaryify/OneDark-Pro)：编辑器主题。

[material icon](https://github.com/material-extensions/vscode-material-icon-theme)：图标主题。

[FiraCode](https://github.com/tonsky/FiraCode)：字体，连贯符号。



### 插件：

[background](https://github.com/shalldie/vscode-background)：设置背景图片。

[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)：更好的注释显示，如To Do会高亮。

[Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)：右键直接运行代码。

[colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)：在CSS中根据颜色值自动显示颜色。

[Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)：鼠标滑过预览图片。

[Live Server](https://github.com/ritwickdey/vscode-live-server-plus-plus)：启动一个可实时刷新的开发本地服务器。

[Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)：markdown文件预览，主题设置为`github-dark.css`。

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)：鼠标或点击某行代码，可以看到上次的提交信息。

[bracket-padder](https://marketplace.visualstudio.com/items?itemName=viablelab.bracket-padder)：在`()[]{}`中自动添加前后空格。

[JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)：根据JSON格式的对象生成TS的interface。

[Github Copilot](https://copilot.github.com/)：人工智能编程，目前只是一个玩具，偶尔玩玩还行。



### 快捷键（MacOS）：

`command + P`：查找文件，输入`command + P + >`直接打开命令面板。

`command + B`：切换侧边栏的显示隐藏。

`control + shift + tab`：切换已打开的文件选项卡。

`command + J`：打开终端。

`command + L`：选中当前行。

`command + shift + L`：选中文件中所有的当前文本，并可同时编辑。

`command + D`：逐个选中多个结果。

`option + shift + ↑/↓`：向上或向下复制当前行代码。

`option + ↑/↓`：向上或向下移动当前行代码。



### 自定义Snippets：

`lg`：`console.log($1)`

`ed` ：`export default ($1) => {\n  $2\n}\n`

`ef`：`export function $1() {\n  $2\n}\n`

`im`：`import {$2} from '$1'\n`

`rm`：`const {$2} = require($1);\n`

`cf`：`const $1 = $2 => $3`

