$(function(){
    $('img[uwp]').each(function() {
        console.log($(this).attr("uwp"));
        let uwp_id = `uwp_${$(this).attr("uwp")}`;
        let file_uwp_id = "file_"+uwp_id;
        let b64_uwp_id = "b64_"+uwp_id;
        $(this).attr("id", uwp_id);
        $(this).attr("onClick", `$("#${file_uwp_id}").click()`);
        let inputB64 = `<input required type='text' class='uwp_input' id='${b64_uwp_id}' name='${$(this).attr("uwp")}' />`;
        let inputFile = `<input required type='file' class='uwp_input' id='${file_uwp_id}' name='${uwp_id}' />`;
        $(inputFile).insertAfter($(this));
        $(inputB64).insertAfter($(this));
        $("#"+file_uwp_id).change(readfile_uwp);
    });

    function readfile_uwp(){
        if (!this.files || !this.files[0]) return;
        let getBase64 = new Promise((resolve, reject) => {
        const reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }).then((data) => {
            $(`#${$(this).attr("name")}`).attr("src", data);
            $(`#b64_${$(this).attr("name")}`).val(data);
        });
    }
});