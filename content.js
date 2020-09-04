/*
 * Simple Gmail Screen 
 * https://github.com/bart2016
 * author: Bart Solutions Limited (HK)
 * license: GPLv3
 */

var gTotalRetry = 0;

var updateUI = function(mainNode, setupTopbar, setupLeftbar){
  if(setupTopbar){
    var headerNode = $("header").first().closest(".w-asV");
    var searchRefinementNode = $("[aria-label='search refinement']").first();

    
    console.log("@SGS: start set up...", setupTopbar, setupLeftbar);

    // set up top bar
    var topbar = $("<div class='simple-gmail-screen-top-bar'></div>");

    // cannot use margin here, because some !important styles used by gmail
    searchRefinementNode.parent().css("height", "auto"
      ).css("padding-top", 10).css("padding-bottom", 10);

    $("body").first().append(topbar);

    topbar.mouseenter(function(){
      console.log("@SGS: mouse over");
      topbar.hide();
      searchRefinementNode.show();
      headerNode.show();
    });
    
    headerNode.mouseleave(function(){
      console.log("@SGS: mouse out");
      headerNode.hide();
      searchRefinementNode.hide();
      topbar.show(300);
    });

    headerNode.hide();
    searchRefinementNode.hide();

    //fix some misc places after head removed
    mainNode.height("100vh");

    // the main node may be replaced on screen change
    $(window).on('hashchange', function(e){
      if(mainNode.css("height") != "100vh"){
        mainNode.css("height", "100vh");
      }
    });
  }

  if(setupLeftbar){
    var leftMenuNode = $(".aeN").first();
    var leftbar = $("<div class='simple-gmail-screen-left-bar'></div>");

    $("body").first().append(leftbar);

    leftbar.mouseenter(function(){
      console.log("@SGS: mouse over left");
      leftbar.hide();
      leftMenuNode.show(300);
    });
    
    leftMenuNode.mouseleave(function(){
      console.log("@SGS: mouse out left");
      leftMenuNode.hide();
      leftbar.show();
    });

    leftMenuNode.hide();
  }
};

var startSetupBars = function() {
  console.log("@SGS: trying to set up sidebar");
  if($(".simple-gmail-screen-top-bar").length){
    // already set up before
    return;
  }

  if(gTotalRetry > 30){
    // max retry reached, probably network error, just give up
    return;
  }

  var mainNode = $("[role='main']").first();

  // wait until gmail loading screen finished
  if(!mainNode.length){
    gTotalRetry += 1;
    setTimeout(startSetupBars, 1000);
    return;
  }

  getBrowser().storage.local.get(
    ["header", "sidebar_left"],
    function(result){
      var setupTopbar = result.header !== "normal";
      var setupLeftbar = result.sidebar_left !== "normal";
      if(!setupTopbar && !setupLeftbar){
        console.log("@SGS: User keep everthing unchanged, exit now");
        return;
      }

      //wait one more second for search bar to come out
      setTimeout(function(){
        updateUI(mainNode, setupTopbar, setupLeftbar);
      }, 500);
    }
  );


};

$(document).ready(function(){
  console.log('@SGS: entered content.js');
  startSetupBars();
});

