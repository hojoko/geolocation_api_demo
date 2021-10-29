
  // Geolocation APIに対応している
  if (navigator.geolocation) {
    alert("この端末では位置情報が取得できます");
  // Geolocation APIに対応していない
  } else {
    alert("この端末では位置情報が取得できません");
  }

  // 現在地取得処理
  document.getElementById("getPosition").onclick = function () {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      function(position) {
          document.getElementById("lat").innerText = "緯度" + position.coords.latitude;
          document.getElementById("lon").innerText = "経度" + position.coords.longitude;

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
      },
      // 取得失敗した場合
      function(error) {
        switch(error.code) {
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
            alert("その他のエラー(エラーコード:"+error.code+")");
            break;
        }
      }
    );
  };
