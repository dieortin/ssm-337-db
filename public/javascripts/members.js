var removeMemberRequest = function (memberId) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', function () {
    console.log(this.status);
    location.reload();
  });
  req.open("DELETE", "/members/" + memberId);
  req.send();
}

var addMemberRequest = function (name, surnames, birthDate) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', function () {
    console.log(this.status);
    location.reload();
  });
  url = buildUrl('/members', {
    name: name,
    surnames: surnames,
    birthDate: birthDate
  })
  req.open("PUT", url);
  req.send();
}

var buildUrl = function (url, parameters){
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}

var retrieveAndSendNewMemberData = function (callback) {
  var name = document.getElementById('newMember-name').value;
  var surnames = document.getElementById('newMember-surnames').value;
  var birthDate = document.getElementById('newMember-birthDate').value;

  var parts = birthDate.split("/");
  var birthDate = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
  callback(name, surnames, birthDate);
}