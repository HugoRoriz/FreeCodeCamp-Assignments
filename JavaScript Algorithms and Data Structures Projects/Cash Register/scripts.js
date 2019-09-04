$("#input").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#button").click();
  }
});

var denom = [{ name: 'ONE HUNDRED', val: 100.00},
  { name: 'TWENTY', val: 20.00},
  { name: 'TEN', val: 10.00},
  { name: 'FIVE', val: 5.00},
  { name: 'ONE', val: 1.00},
  { name: 'QUARTER', val: 0.25},
  { name: 'DIME', val: 0.10},
  { name: 'NICKEL', val: 0.05},
  { name: 'PENNY', val: 0.01}
];

function checkCashRegister() {
  var price = document.getElementById('price').value;
  var cash = document.getElementById('cash').value;
  var cid = document.getElementById('cid').value;
  
  var output = { status: null, change: [] };
  var change = cash - price;
  
  var register = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  }, { total: 0 });

  if (register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return document.getElementById('result').innerHTML = output;
  }

  if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return document.getElementById('result').innerHTML = output;
  }

  var change_arr = denom.reduce(function(acc, curr) {
    var value = 0;
    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;

      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      acc.push([ curr.name, value ]);
    }
    return document.getElementById('result').innerHTML = acc;
  }, []);

  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return document.getElementById('result').innerHTML = output;
  }

  output.status = 'OPEN';
  output.change = change_arr;
  return document.getElementById('result').innerHTML = output;
}
