if('geolocation' in navigator) {
  alert('この端末は位置情報を取得できます');
} else {
  alert("この端末では位置情報が取得できません");
}

function success(position) {
  document.getElementById("lat").innerText = "緯度：" + position.coords.latitude;
  document.getElementById("lon").innerText = "経度：" + position.coords.longitude;

  var mapLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

  var mapOption = {
    zoom : 15,
    center : mapLatLng
  };

  var map = new google.maps.Map(
    document.getElementById("map"),
    mapOption
  );
  
  var marker = new google.maps.Marker({
    map : map,
    position : mapLatLng
  });
}

function error(err) {
  switch(err.code) {
    case 1: //PERMISSION_DENIED
      alert("位置情報の利用が許可されていません");
      break;
    case 2: //POSITION_UNAVAILABLE
      alert("現在位置が取得できませんでした");
      break;
    case 3: //TIMEOUT
      alert("タイムアウトになりました");
      break;
    default:
      alert("その他のエラー(エラーコード:"+err.code+")");
      break;
  }
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

navigator.geolocation.getCurrentPosition(success, error, options);

