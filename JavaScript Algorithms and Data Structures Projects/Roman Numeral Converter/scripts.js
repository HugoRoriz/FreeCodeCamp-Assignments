$("#input").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#button").click();
  }
});

function roman(num) {

  if (isNaN(num)) {
    
    $('#wrong').removeClass('noDisplay');
    document.getElementById('result').innerHTML = '';
    
  } else {
  
    $('#wrong').addClass('noDisplay');
    
    let decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];

    let romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

    let romanized = '';

    for (var index = 0; index < decimalValue.length; index++) {
      while (decimalValue[index] <= num) {
        romanized += romanNumeral[index];
        num -= decimalValue[index];
      }
    }

  document.getElementById('result').innerHTML = romanized;
  
  }
}