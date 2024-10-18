$(document).ready(function() {
    $(".btn").click(function() {
        let $phrase = $("#phrase");
        $phrase.css("border-color", "red");

        $phrase.animate({
            top: 0,
            left: $(window).width() - $phrase.outerWidth()
        }, 2000, function() {
            $phrase.text("");

            $phrase.animate({
                top: $(window).height() - $phrase.outerHeight()
            }, 2000, function() {

                $phrase.text("Від топота копит пил по полю");
            });
        });
    });
});
