# Iterm2 + zsh + p10k

------

### Iterm2设置

1. 透明度：Profiles → Window → Transparancy = 50%
2. 窗口标题：Profiles → General → Title = PWD
3. 光标：Profiles → Text → Cursor = Underline

### Zsh配置

1. 使用`brew`安装：`brew install zsh`，设置主机`PS1='%~ '`

2. 安装官方插件：`brew install zsh-syntax-highlighting zsh-autosuggestions zsh-history-substring-search`

   - [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)：高亮

   - [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)：命令建议，右键接受建议

   - [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search)：历史命令搜索，上下键搜索

   - 将插件配置写入`~/.zshrc`

     ```sh
     plugins=( 
         # other plugins...
         zsh-syntax-highlighting,
         zsh-autosuggestions,
         zsh-history-substring-search
     )
     ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#17d900,bold,underline"
     source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
     
     # zsh-history-substring-search configuration
     bindkey '^[[A' history-substring-search-up # or '\eOA'
     bindkey '^[[B' history-substring-search-down # or '\eOB'
     HISTORY_SUBSTRING_SEARCH_ENSURE_UNIQUE=1
     HISTORY_SUBSTRING_SEARCH_HIGHLIGHT_FOUND="fg=#ffffff,bg=#17d900,bold,underline"
     source ~/.oh-my-zsh/custom/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
     ```

### 安装主题[powerlevel10k](https://github.com/romkatv/powerlevel10k)

1. 使用`brew`安装，将配置写入`~/.zshrc`

```sh
brew install powerlevel10k
ZSH_THEME="powerlevel10k/powerlevel10k"
source ~/powerlevel10k/powerlevel10k.zsh-theme
# source $(brew --prefix)/share/powerlevel10k/powerlevel10k.zsh-theme
```

2. 执行命令`p10k configure`，自定义配置界面，过程之中可能会下载字体`MesloLGS NF`
3. 设置`iterm2`的字体为`MesloLGS NF`：Profiles → Text → Font → MesloLGS NF