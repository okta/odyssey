(function () {
  var passinputs = document.getElementsByClassName('password-input');

  for (var i = 0; i < passinputs.length; i++) {
    var passinput = passinputs[i];
    var label = passinput.nextElementSibling;
    label.onclick = function () {
      var type = passinput.getAttribute('type');

      if (type === 'password') {
        passinput.setAttribute('type', 'text');
      }

      if (type === 'text') {
        passinput.setAttribute('type', 'password');
      }
    };
  }
})();

// Add Rule
(function () {
  var passchange = document.getElementById('changepass');
  var passreset = document.getElementById('resetpass');

  passchange.onclick = function () {
    if (passchange.checked === true ) {
      resetpass.disabled = false;
    }

    if (passchange.checked === false) {
      resetpass.disabled = true;
      resetpass.checked = false;
    }
  };
})();
