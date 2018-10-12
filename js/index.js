$(document).ready(function () {
    var substrings = [];

    $('#addSubstring').click(function () {
        $('.superstring-display').hide();
        var substring = $('#substring').val();
        if (substring.length > 0) {
            substrings.push(substring.split(""));
            if ($('#substringContent tr').length === 0) {
                $('#substringContent').html('<tr><td>' + substring + '</td></tr>');
            } else {
                $('#substringContent tr:last').after('<tr><td>' + substring + '</td></tr>');
            }
            $('#substring').val("");
        } else {
            alert("Text fragment cannot be empty!");
        }
    });

    $('#clearSubstrings').click(function () {
        $('#substringContent').html('');
        substrings = [];
        $('.superstring-display').hide();
    });

    $('#computeSuperstring').click(function () {
        if (substrings.length > 0) {
            var superstring = getShortestCommonSuperString(substrings);
            $("#superstring").text(superstring[0].join(""));
            $('.superstring-display').show();
        } else {
            alert("Please add atleast one text fragment to the list in order to compute the shortest common superstring!");
        }
    });
});


