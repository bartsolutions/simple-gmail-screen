var getReviewUrl = function(){
  var url; 
  if(gIsChrome)
    url = "https://chrome.google.com/webstore/detail/simple-gmail-screen/" + getExtensionID() + "/reviews?hl=en";
  else
    url = "https://addons.mozilla.org/en-US/firefox/addon/simple-gmail-screen/#reviews";

  return url;
};

var savePreferences = function(){
  var headerValue = $("input[name='header']:checked").val();
  var sidebarLeftValue = $("input[name='sidebar_left']:checked").val();

  getBrowser().storage.local.set(
    {"header": headerValue, "sidebar_left": sidebarLeftValue}, 
    function(result){
      $("#status").html("Preferences saved.<br/><br/>");
      setTimeout(function() { 
        $("#status").html("");
      }, 3000);
    }
  );
};

var pullPreferences = function(){
  getBrowser().storage.local.get(
    ["header", "sidebar_left"],
    function(result){
      console.log("@SGS, options", result.header, result.sidebar_left);
      if(result.header == "normal"){
        $("input[name='header'][value='normal']").prop("checked", true);
      }
      if(result.sidebar_left == "normal"){
        $("input[name='sidebar_left'][value='normal']").prop("checked", true);
      }
    }
  );
};

$(document).ready(function(){
  $("#save").click(savePreferences);
  $("#review").click(function(){
    window.open(getReviewUrl(), "_blank");
  });

  pullPreferences();
});
