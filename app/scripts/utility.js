/*global require*/
'use strict';
define({
  formatDate: function (created) {
    var date = new Date(created * 1000);
    var year = date.getFullYear();
    var month = new String(1 + date.getMonth());
    if (1 == month.length) month = "0" + month;
    var date = new String(date.getDate());
    if (1 == date.length) date = "0" + date;
    return year+'-'+month+'-'+date;
  }
});
