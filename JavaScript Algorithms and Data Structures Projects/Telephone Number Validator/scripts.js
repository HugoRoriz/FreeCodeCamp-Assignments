$("#input").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#button").click();
  }
});

function telephoneCheck(str) {
  
  var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  if (regex.test(str)) {
    
    $('#wrong').addClass('noDisplay');
    $('#right').removeClass('noDisplay');
    
  } else {
    
    $('#wrong').removeClass('noDisplay');
    $('#right').addClass('noDisplay');

    document.getElementById('result').innerHTML = '';
  }
}