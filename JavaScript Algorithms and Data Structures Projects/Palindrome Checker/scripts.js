$("#input").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#button").click();
  }
});

function palindrome(str) {
  if (str.replace(/[\W_]/g, '').toLowerCase() === str.replace(/[\W_]/g,'').toLowerCase().split('').reverse().join('')) {
    
    $('#input').val("");
    
    $('#is').addClass("noDisplay");
    $('#isnt').addClass("noDisplay");
    
    $('#is').removeClass("noDisplay");
    
  } else {
    
    $('#input').val("");
    
    $('#is').addClass("noDisplay");
    $('#isnt').addClass("noDisplay");
    
    $('#isnt').removeClass("noDisplay");
  }
};