$(document).ready(function () {
    var seconds = 10

    setInterval(function () {
        if (seconds == 0) {
            window.location.href = "http://localhost:3000"
        }

        $('#countdown > #time-left').html(--seconds);

    }, 1000);
})