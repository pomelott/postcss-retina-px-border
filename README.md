# postcss-retina-px-border

PostCSS plugin which create real physical pixel border dynamically on retina screen.

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

* create specific file named 'retina-border.scss', this take sass as an example, others is the same.
* import the file as above wherever you need.

```js
    // app.js
    import './style/retina-border.scss';
```

### Use and development

* the style generated have been transfer with autoprefixer, so just use it.
* then you can use the output selector directly, the selector with dpr 3 as follows, and you can also config by your self.

```css
    @media screen and (-webkit-min-device-pixel-ratio: 3) {
        .retina-border-1px {
            position: relative;
            width: 300%;
            height: 300%;
            border-width: 1px;
            transform: scale(0.3333333333333333);
            transform-origin: 0 0
        }
        .retina-border-2px {
            position: relative;
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
notice: you should use a div to wrap the retina-border box, and provide the true width and height for the wrapper box, and add the style of border related on retina-border box. the example as follows:

```html
    <div class="box">
      <div class="retina-border-1px inter-box"></div>
    </div>
```

```css
    .box{
        width: 20vw;
        height: 40vw;
    }
    .inter-box{
        border-style: solid;
        border-color: red;
        border-radius: 100px;
        overflow: hidden;
        background: #f8f8f8;
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
| filename | string | 'retina-border' | the target file to generate style, such as retina-border.scss、 retina-border.less |
| pxRange | number | 2 | the range of borderWidth to generate |
| dprRange | number | 3 | the range of dpr to generate |
| selector | string | '.retina-border-%dpx' | the format of selector when generating |

## Strategy

* the new adaptation scheme of mobile h5 page based on viewport(vw/vh), so there is an problem that when we use small-px border, it become thicker than expected when rendered on retina screen.
* so we enlarge div size according to dpr, and then reduce the div with scale function.
