"use strict";
var map;
var markerArray;
window.onload = function(){
  $('#searchbutton').on('click',toggleAudio);
  $('#searchbutton').on('click', doAjax1);
  $('#searchbutton').on('click', ajaxSpotifyId);
  $('#cleartable').on('click', clearTable);
  // $('#searchbutton').on('click',resetZoom);
  $('#searchbutton').on('click', toggleMap);
  $('#refresh-zoom').on('click', function(){
      map.setZoom(2);

    });
  console.log("window loaded");
}

//clear table function
  function clearTable(){
    $('.artisttable').empty();
  }
//api key storage obj
  var ticketmaster = {
    apiKey : 'GX80lmualWfeGuPRYvuXHsg9IjE1KkNl'
  }

  function doAjax1(event){
    let artist = $('#artistinput').val();

    console.log(artist);
    let requestObject = {
      url: `https://app.ticketmaster.com/discovery/v2/events.json?&keyword=`+ artist +`&apikey=` + ticketmaster.apiKey,
      method: 'GET',
      dataType: 'json',
      success: buildTable
    }
    $.ajax(requestObject);
    return false;
  }

  var globalObj = {};
  function buildTable(response){
    if (response._embedded){
    var eventsArray = response._embedded.events;

      var objArray = eventsArray.map(function(elem){
        var obj = {};
          if (elem.priceRanges){
            obj.maxPrice = elem.priceRanges[0].max;
          }
          if (elem.priceRanges){
            obj.minPrice = elem.priceRanges[0].min;
          }
          obj.name = elem._embedded.venues[0].name;
	        obj.location = elem._embedded.venues[0].location;
          obj.dates = elem.dates.start.localDate;
	        obj.time = elem.dates.start.localTime;
          obj.city = elem._embedded.venues[0].city.name;
          return obj;
      });
    globalObj = objArray;
    console.log(globalObj);
    for (var i = 0; i < objArray.length; i++ ){
      var tr = $('<tr>');
      var td = $('<td>').text(objArray[i].name);
      var td2 = $('<td>').text(objArray[i].dates);
      if (objArray[i].city){
        var td5 = $('<td>').text(objArray[i].city);
      }
        if (objArray[i].maxPrice && objArray[i].minPrice){
          var td3 = $('<td>').text('Max$' + objArray[i].maxPrice);
          var td4 = $('<td>').text('Min$' + objArray[i].minPrice);
        }
      // if (objArray[i].minPrice){
      // var td4 = $('<td>').text(objArray[i].minPrice);
    // }
        var buttonTest = $('<button>');
        if(objArray[i].location){
        buttonTest.data("lat", objArray[i].location.latitude)
        buttonTest.data("long", objArray[i].location.longitude)


        buttonTest.on("click", buttonEvent)

        console.log(objArray[i])
        var trow = tr.append(td).append(td2);
        if (td3 && td4){
        trow.append(td3).append(td4);
        }
        if (td5){
          trow.append(td5);
        }
        trow.append(buttonTest).on('click', markerArray[i]);
        $('.artisttable').append(trow);
      }
    }
  }
      // var img = $('<img src = ' + eventsArray[0].images[0].url + '>')
      // $('body').append(img);
      createMarkers(objArray)
}


  var spotify = {
    client_id: '83331e55bfd746ee89b8171365810330',
    client_secret: 'fdae2bd742294d6d955063e92d516541'
  }

var searchedArtist = {
  id : "",
  url : ""
}

function ajaxSpotifyId(){
  let artist = spotifyArtist($('#artistinput').val());
  let requestObject = {
    url: `https://api.spotify.com/v1/search?q=` + artist + `&type=artist`,
    method: 'GET',
    dataType: 'json',
    success: function(response){
    console.log(response);
      if (response.artists.items[0]){
      searchedArtist.id = response.artists.items[0].id;
      ajaxSpotifyUrl()
      }
    }
  }
  $.ajax(requestObject);
  return false;
}

  function ajaxSpotifyUrl(){
    let id = searchedArtist.id;
    let requestObject = {
      url: `https://api.spotify.com/v1/artists/`+ id + `/top-tracks?country=US`,
      method: 'GET',
      dataType: 'json',
      success: function(response){
        var preview = response.tracks[0].preview_url;
        var audio = $('#audioplayer');
        var song = $('<source src='+preview+'>');
        audio.append(song);
        var songTitle = response.tracks[0].name;
        $('#songname').text(songTitle);
      }
    }
    $.ajax(requestObject);
    return false;
  }


  function spotifyArtist(string){
	  if (string.includes(" ")){
		  var s = string.split(" ");
  		var builtString = (s[0] + "%20"+ s[1]);
  		return builtString;
	  }
	  else{
		return string;
	  }
  }

  function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: uluru,
      mapTypeId: 'satellite'
    });
      // $('#mapheading').append('<div id="map">');

    console.log(globalObj);
    createMarkers(globalObj);
  }
  function createMarkers(objArray){
    // if (objArray[1].location.latitude = 'undefined'){
    //   alert("sorry ticket master doesn't have coordinates")
    // }
    // else{
    markerArray = [];
    if (objArray){
      for (var i = 0; i < objArray.length; i++){
        if (objArray[i].location){
          var lat = objArray[i].location.latitude;
          var long = objArray[i].location.longitude;
        }
          if (objArray[i].name){
            var venueName = objArray[i].name;
          }
            var myLatLng = new google.maps.LatLng(lat, long);
            let marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              label: venueName
            });
            marker.addListener('click',function(){
              map.setZoom(18);
              map.setCenter(marker.getPosition());
            });
            markerArray.push(marker);
            console.log(markerArray);
      }
    }
    else{
    alert("no Events for this artist");
    }
  }
// }
  // console.log(audioList);
  // function buildAudio(){
  //   audioList.push(response);
  //   var audio = $('#audioplayer');
  //   var song = ('<source>')
  //   song.src = audioList[0];
  //   audio.append(song);
  // }
  function toggleMap(){
    var mapToggle = $('#map');
    mapToggle.css('visibility', 'visible');
  }
// function resetZoom(){
//   var resetZoom = $('#refresh-zoom');
//   resetZoom.addListener('click',function(){
//     map.setZoom(3);
//   });
// }
function buttonEvent(event){
  var lat = $(event.target).data("lat")
  var long = $(event.target).data("long")

  var myLatLng = new google.maps.LatLng(lat, long);

  map.setZoom(18);
  map.setCenter(myLatLng);
  console.log(lat)
  // for (var i = 0; i < array.length; i++){
  //   var lat = array[i].location.latitude;
  //   var long = array[i].location.longitude;
  //
  // }
}
function toggleAudio(){
  var audio = $('#audioplayer');
  audio.css('visibility', 'visible');
  }
