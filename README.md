# SNAP-TRACER
> shotsnap tracer and reviewer

# Required
- webdriver

## Usage
> snap-tracer [options]

## Options:
    -h, --help          output usage information
    -c --config [file]  select config file
    -s --save           save current snaps as references
    -d --diff           just check the difference

## config.json
```
{
  "options": {
    "browsers": ["chrome", "firefox", "ie"]
  },
  "tasks": [
    {
      "url": "http://mail.163.com/",
      "name": "163"
    },
    {
      "url": "http://mail.qq.com/",
      "name": "qq"
    }
  ]
};
```

## directory
```
    + snaps
        + reference
        + current
        + diff
    - config.json
```

## API
todo

## License
the MIT Lincense.
