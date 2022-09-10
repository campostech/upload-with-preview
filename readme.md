# Upload With Preview

<img src="assets/images/animation.gif" />
This lib is a easy tool to use in html forms with image fields. With UWP you can use a "img" as a complex input for images (autoload, b64 conversion, value).

## Installation
Add the following tag to the header of your page:
```css
<link rel="stylesheet" href="dist/uwp.css" />
```

Add the following tag to the end of your page:
```javascript
<script src="dist/uwp.js"></script>
```

## Usage
1. For use you need put the attribute "uwp" as name of input that will has base64 content from image after upload file:
```html
<img src="assets/images/blank.png" uwp="example1" />
```

2. If you want a required input, just put "required" attribute in `<img>` element:
```html
<img src="assets/images/blank.png" uwp="example2" required />
```

3. If you want the input with a loaded value (full url or base64), just put "value" attribute in `<img>` element:
```html
<img src="assets/images/blank.png" uwp="example3" value="https://www.gstatic.com/webp/gallery3/1.sm.png"/>
```

4. If you want limit file size, just put "maxsize" attribute on image (in KB's):
```html
<img src="assets/images/blank.png" uwp="example4" maxsize="2000">
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)