# 命令行工具

```bash
rcpress <command> [docsPath] [optons]
```

下面逐一进行介绍。

## command

### 开发模式下的命令

- dev

运行 spa 模式

- serve

运行 ssr 模式

### 生产模式下的命令

- build

打包 spa

- generate

打包 ssr， 生成静态 html 文件。

### 其他命令

- eject

拷贝整个默认的主题到当前文件夹下，你可以对整个默认主题进行修改。

参考：

[自定义主题](./theme)

## docsPath

docsPath 是你存放文档的目录， 默认为 `docs`.

```bash
rcpress ./ # 文档在当前目录下

rcpress my-docs # 文档在my-docs目录下
```

## options

- --debug

开启调试模式

- --port

指定开发模式下运行的端口

- --outDir

指定生产环境下打包后的文件生成路径

## 例子

```bash
# 在开发环境下，运行spa， 文档存放于my-docs，运行的端口为8080
rcpress dev my-docs --port 8080
```
