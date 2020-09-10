# postcss-retina-px-border

PostCSS plugin which create real physical pixel border dynamically on retina screen.

* if like this, could you please ⭐️star⭐ on github

## History versions

* [v1.x](https://github.com/pomelott/postcss-retina-px-border/blob/master/v1.md)
* [v2.x](https://github.com/pomelott/postcss-retina-px-border/blob/master/v2.md) ( use inlined div )
* v3.x use pseudo element

## Fast use

### install

```bash
    npm install postcss postcss-retina-px-border -D
```

or

```bash
    yarn add postcss postcss-retina-px-border --dev
```

### Init

* config in webpack（at root file postcss.config.js）

```js
    module.exports = {
        plugins: [
            require('postcss-retina-px-border')
        ]
    }
```

* import the file (the file will be generated at 'src/retina-border.scss), you can also change the filename in options.

```js
    // app.js
    import './style/retina-border.scss';
```

### Use and development

* the style generated have been transfer with autoprefixer, so just use it.
* then you can use the output selector directly, the selector with dpr 3 as follows, and you can also config by your self.

```css
    .retina-border-box {
        position: relative;
        z-index: 1
    }
    @media screen and (-webkit-min-device-pixel-ratio: 3) {
        .retina-border-1px:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 300%;
            height: 300%;
            border-width: 1px;
            transform: scale(0.3333333333333333);
            transform-origin: 0 0
        }
        .retina-border-2px:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 300%;
            height: 300%;
            border-width: 2px;
            transform: scale(0.3333333333333333);
            transform-origin: 0 0
        }
    }
```

* use in other files:

&nbsp;
notice: you should give a specific class selector of div such as '.text-box'. the example as follows:

```html
    <div class="retina-border-box retina-border-1px text-box">
      <div class="content-box">box-content</div>
    </div>
```

```css
  .text-box{
    width: 50vw;
    height: 40vw;
  }
  .text-box:after{
    border-color: red;
    border-style: solid;
    border-radius: 30px;
  }
```

## Options

### example

```js
    module.exports = {
        plugins: [
            require('postcss-retina-px-border')({
                pxRange: 5
            })
        ]
    }
```

### option list

| option | type | default | description |
|:---:|:---:|:---:|:---:|
| baseDir | string | rootDir-of-project/src | a relative/absolute path to generate file, and this will be joined with filename param. such as 'src/' |
| filename | string | 'retina-border.scss' | the name of target file to generate style with, such as retina-border.scss、 retina-border.less |
| pxRange | number | 2 | the range of borderWidth to generate |
| dprRange | number | 3 | the range of dpr to generate |
| selector | string | '.retina-border-%dpx' | the format of selector when generating |

## Strategy

* the new adaptation scheme of mobile h5 page based on viewport(vw/vh), so there is an problem that when we use small-px border, it become thicker than expected when rendered on retina screen.
* so we enlarge pseudo element size according to dpr, and then reduce the element with scale function.
