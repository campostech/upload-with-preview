$(function() {

    function hasAttr(element, attr) {
        return (typeof $(element).attr(attr) !== 'undefined' && $(element).attr(attr) !== false);
    }

    function isValidUrl(string) {
        try {
            let url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
        }
    }

    function isValidB64Image(string) {
        let knownTypes = {
            '/': 'data:image/jpg;base64,',
            'i': 'data:image/png;base64,',
        }
        let image = new Image()
        if (!knownTypes[string[0]]) {
            console.log("encoded image didn't match known types");
            return false;
        } else {
            image.src = knownTypes[0] + string
            image.onload = function() {
                if (image.height === 0 || image.width === 0) {
                    console.log('encoded image missing width or height');
                    return false;
                }
            };
        }
        return true;
    }

    $('img[uwp]').each(function() {
        let uwp_id = `uwp_${$(this).attr("uwp")}`;
        let file_uwp_id = `file_${uwp_id}`;
        let b64_uwp_id = `b64_${uwp_id}`;
        let required = hasAttr(this, "required") ? `required=${$(this).attr("required")}` : "";
        let maxSize = hasAttr(this, "maxsize") ? $(this).attr("maxsize") : 5120;
        $(this).attr("id", uwp_id);
        $(this).attr("onClick", `$("#${file_uwp_id}").click()`);
        let inputB64 = `<input ${required} type='text' class='uwp_input' id='${b64_uwp_id}' name='${$(this).attr("uwp")}' />`;
        let inputFile = `<input uwp_maxsize="${maxSize}" type='file' class='uwp_input' id='${file_uwp_id}' name='${uwp_id}' accept="image/svg, image/jpeg, image/png" />`;
        $(inputFile).insertAfter($(this));
        $(inputB64).insertAfter($(this));
        $("#" + file_uwp_id).change(readfile);

        let value = hasAttr(this, "value") ? $(this).attr("value") : null;
        setValueToUWP(uwp_id, value);

    });

    function setValueToUWP(uwp_id, value) {
        if (value != null) {
            if (isValidUrl(value)) {
                setBase64ImageFromURL(uwp_id, value);
                $(`#b64_${uwp_id}`).val(null);
            } else {
                value = value.replace(/^data:image\/(png|jpg|svg);base64,/, "");
                if (isValidB64Image(value)) {
                    setImageUWPtoFields(uwp_id, `data:image/png;base64,${value}`);
                    $(`#b64_${uwp_id}`).val(null);
                }
            }
        }
    }

    function setImageUWPtoFields(uwp_id, data) {
        $(`#${uwp_id}`).attr("src", data);
        $(`#b64_${uwp_id}`).val(data);
    }

    function readfile() {
        if (!this.files || !this.files[0]) return;
        let maxSize = parseFloat($(this).attr('uwp_maxsize'));
        let fileSize = this.files[0].size / 1024;

        if (fileSize > maxSize) {
            alert(`File is too big! The maximum size is ${maxSize}kb`);
            this.value = "";
            return;
        };
        let getBase64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }).then((data) => {
            setImageUWPtoFields($(this).attr("name"), data);
        });
    }

    function setBase64ImageFromURL(uwp_id, url) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            setImageUWPtoFields(uwp_id, dataURL);
        };
        img.setAttribute('crossOrigin', 'anonymous'); //
        img.src = url;
    };
});