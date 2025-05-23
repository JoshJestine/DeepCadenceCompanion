$(document).ready(function () {
    $('#EditAlgoRenderButton').click(function () {
        var file = document.getElementById('currentTrackName').textContent;
        var start = document.getElementById('AlgoStartTime').value;
        var end = document.getElementById('AlgoEndTime').value;
        var add_fades = document.getElementById('AlgoAddFades').checked;
        var fade_in = 0, fade_out = 0;
        if (add_fades) {
            fade_in = document.getElementById('AlgoFadeInTime').value;
            fade_out = document.getElementById('AlgoFadeOutTime').value;
        }
        $.ajax({
            type: 'POST',
            url: '/generate/edit_algorithmic',
            data: {'file': file, 'start': start, 'end': end, 'fade_in': fade_in, 'fade_out': fade_out},
            success: function (data) {
                var renderButton = document.getElementById('EditAlgoRenderButton');
                renderButton.innerText = "Rerender";

                var mp3Url = '/generated_data/' + data.file;
                $('#mp3PlayerContainerForAlgorithmicMusicEdited').html('<audio-player src="/generated_data/' + data.file + '" bar-width="5" bar-gap="2" preload loop> </audio-player>')
                $('#downloadEditedMP3ButtonContainer').html('<a class="hyperlink-text" id="DownloadEditedMP3File" href="/downloadEditedMP3/' + data.file + '" download>Download MP3</a>');
            }
        });
    });
});