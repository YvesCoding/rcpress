# Command Line Tool

```bash
rcpress <command> [docsPath] [optons]
```

I will introduce them one by one.

## command

### Commands in development mode

- dev

Run spa mode

- serve

Running SSR mode

### Commands in production mode

- build

Build spa

- generate

Build ssr, generate static html files.

### other commands

- eject

Copy the whole default theme to the current folder. You can modify the whole default theme.

See also:

[Custom theme](./theme)

## docsPath

docsPath is the directory where you store your documents. The default is `docs`.

```bash
rcpress ./ # The document is in the current directory

rcpress my-docs # The documentation is in the my-docs directory
```

## options

- --debug

Turn on debug mode

- --port

Specify the port to run in development mode

- --outDir

Specify the file generation path after packaging in the production environment

## example

```bash
# In the development environment, run the spa, the document is stored in my-docs, and the port is 8080.
rcpress dev my-docs --port 8080
```
