
  function overlay() {
    el = document.getElementById("contact-form");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

$(document).ready(function() {

  $('#send').on('click', function(){
    console.log('clicked');
    $("#spinner").css({visibility: 'visible'})
    name = $('#name').val();
    email = $('#email').val();
    message = $('#message').val();
    $.ajax({
        type: 'POST',
        url: '/contact',
        data: ({name: name, email: email, message: message}),
        dataType: 'json'
    }).done (function(data){
      console.log(data);
      $("#spinner").css({visibility: 'hidden'})
      $("#thank-you").css({visibility: 'visible'})
      setTimeout(function(){
        $("#thank-you").css({visibility: 'hidden'})
      }, 2000);

      overlay();
      $('#name').val("");
      $('#email').val("");
      $('#message').val("");
    })
  });
});


