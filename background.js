/*
 * Simple Gmail Screen 
 * https://github.com/bart2016
 * Copyright (C) 2020 Bart Solutions (HK)
 * License: GPLv3
 */


getBrowser().browserAction.onClicked.addListener(function(tab) {
  openTab("options.html");
});

getBrowser().runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      openTab("https://www.bart.com.hk/simple-gmail-screen-installed/");
      openTab("options.html");
    } 
    else if(details.reason == "update"){
      // no need to do the warning here
    }
});
