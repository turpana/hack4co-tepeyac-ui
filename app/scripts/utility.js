/*global require*/
'use strict';
define({
  formatDate: function (created) {
    var formatted = '';
    // assuming '/' char present means '05/31/2014 22:53:52' formate
    if (created.indexOf("/") > -1) {
      formatted = created.substring(0, 10);
      formatted = formatted.replace(/\//g, "-");
    } else {
      // assuming unix timestamp
      var date = new Date(created * 1000);
      var year = date.getFullYear();
      var month = new String(1 + date.getMonth());
      if (1 == month.length) month = "0" + month;
      var day = new String(date.getDate());
      if (1 == day.length) day = "0" + day;
      formatted = year+'-'+month+'-'+day;
    }
    return formatted;
  }
});
