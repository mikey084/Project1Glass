"use strict";

window.onload = function(){
  $('#searchbutton').on('click', doAjax1);
  console.log("window loaded");
}

function doAjax1(event){
  var artist = $('#artistinput').val();
  console.log(artist);
  var requestObject = {
    url: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=`+ artist +`&apikey=GX80lmualWfeGuPRYvuXHsg9IjE1KkNl`,
    method: 'GET',
    dataType: 'json',
    success: buildTable
    }
    $.ajax(requestObject);
    return false;
  }

  function buildTable(response){
    console.log(response);
    var eventsArray = response._embedded.events;
    var objArray = eventsArray.map(function(elem){
      var obj = {};
	      obj.name = elem._embedded.venues[0].name;
	      obj.location = elem._embedded.venues[0].location;
	      obj.dates = elem.dates.start.localDate;
	      obj.time = elem.dates.start.localTime;
        return obj;
    });
    console.log(objArray);
    for (var i = 0; i < objArray.length; i++ ){
      var tr = $('<tr>');
      var td = $('<td>').text(objArray[i].name);
      var td2 = $('<td>').text(objArray[i].dates);
      var trow = tr.append(td).append(td2);
      $('.artisttable').append(trow);
    }
  }
