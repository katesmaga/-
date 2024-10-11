$(document).ready(function() {
    $(".element").on("dblclick", function() {
        var elementType = $(this).prop("tagName").toLowerCase();
        var info = $(this).attr("data-info");
        $("#modal-content").text(info + " (" + elementType + ")");
        $(".modal, .modal-overlay").fadeIn();
    });

    $(".close-btn, .modal-overlay").on("click", function() {
        $(".modal, .modal-overlay").fadeOut();
    });
});

$(document).ready(function() {
     $(".btn").click(function() {
         $("#animated-text").css({
             left: '0',
             fontSize: '20px',
             color: 'blue'
         }).animate({
             left: '50%',
             fontSize: '40px'
         }, 2000, function() {
             $(this).css("color", "yellow")
             .animate({
                 left: '80%',
                 fontSize: '60px'
             }, 2000);
         });
     });
 });

 $('#control-word-checkbox').change(function() {
     if ($(this).is(':checked')) {
         $('#control-word-group').slideDown();
     } else {
         $('#control-word-group').slideUp();
     }
 });

 $(document).ready(function() {
     $('#toggleExtraField').change(function() {
         if ($(this).is(':checked')) {
             $('#extraField').show();
         } else {
             $('#extraField').hide();
         }
     });
 });
