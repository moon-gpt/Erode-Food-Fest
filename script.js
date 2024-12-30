(function(){
    var script = {
 "propagateClick": false,
 "data": {
  "name": "Player460"
 },
 "class": "Player",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
  "this.Container_1525D29B_1838_4E3F_41A0_42D1BC807D34"
 ],
 "start": "this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_01B808A4_17C7_7A88_41B6_4CC6903BA22D].forEach(function(component) { component.set('visible', false); }) }",
 "vrPolyfillScale": 1,
 "borderSize": 0,
 "width": "100%",
 "layout": "absolute",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "desktopMipmappingEnabled": false,
 "paddingRight": 0,
 "contentOpaque": false,
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "unregisterKey": function(key){  delete window[key]; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "registerKey": function(key, value){  window[key] = value; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getKey": function(key){  return window[key]; }
 },
 "downloadEnabled": false,
 "height": "100%",
 "minWidth": 20,
 "backgroundPreloadEnabled": true,
 "buttonToggleFullscreen": "this.IconButton_01B808A4_17C7_7A88_41B6_4CC6903BA22D",
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "gap": 10,
 "definitions": [{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_16AE2180_0DBA_9B69_41A5_BE534DAB6C28",
  "this.overlay_11EF0226_0DBB_B9A9_41A3_28B75DD1ECD5",
  "this.overlay_2E815168_0DAD_BBB9_418E_0CD775E6A54A",
  "this.overlay_294030DE_0DAD_9A99_419D_A5CD0E5B7E93"
 ],
 "label": "RENDERPanorama_16",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
   "yaw": 175.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -5.02
  },
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": -173.82,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -158.32
  },
  {
   "panorama": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
   "yaw": -2.72,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 80.06
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": -15.8,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 123.7
  }
 ],
 "id": "panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -53.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16881238_1838_CE79_41B2_DE436F32806E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -162.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1694522A_1838_CE19_418B_30CB2146120E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -91.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17DF8F20_1838_D60A_41B6_581D0A651361",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 140.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16C48287_1838_CE17_41B2_DD24015927A1",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -172.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1792538F_1838_CE16_41B4_5856747D39AC",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -26.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_082B1456_1838_CA09_41AA_C96C3922A0B6",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_camera",
 "class": "PanoramaCamera"
},
{
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "buttonCardboardView": "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
},
{
 "initialPosition": {
  "yaw": -111.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17F90EF3_1838_D60F_4181_57E37FEA09EB",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 76.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_164FCD9A_1838_DA3E_4192_A5E2BF93D280",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -178.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_166101D5_1838_CA0B_419A_1B5EFC34ADB8",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45",
   "camera": "this.panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
   "camera": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD",
   "camera": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "camera": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "camera": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
   "camera": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "camera": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "camera": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
   "camera": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  "this.PanoramaPlayListItem_15837CC0_1838_DA09_41B4_8D3DD507F976",
  {
   "media": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
   "camera": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "camera": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3",
   "camera": "this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
   "camera": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
   "camera": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
   "camera": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
   "camera": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "camera": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "camera": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "camera": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB",
   "camera": "this.panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "camera": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 6.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16E24DFC_1838_D5F9_41B6_BD6E04BBE5AF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 2.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15D39109_1838_CA1A_4197_8AE5E0BB73E3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 59.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08D5D076_1838_CA09_41A5_7B31754CEE4B",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -122.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_0840100F_1838_CA17_41AD_33491C1E4EB4",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_25E507AA_0DBD_86B9_4195_9E7B7360108E",
  "this.overlay_27CA0267_0DBD_99B7_418E_E4970EAFD4A1",
  "this.overlay_27AB5FB5_0DBA_86AB_417F_D6FBE03580E9",
  "this.overlay_2765D7EE_0DBB_86B9_41A4_18E3DE99E9B5",
  "this.overlay_20CDEDAB_0DB6_8ABF_4193_A8FC0FA499D9",
  "this.overlay_26ECA36E_0DB7_BFB9_417C_852F56E985D2",
  "this.overlay_21C43DA4_0DB5_8AA9_417E_2DC0EC2F81CA",
  "this.overlay_262D27A4_0DAA_86A9_419A_A0A1F607BC25",
  "this.overlay_26353D8F_0DAA_8B77_4194_081B8F6C6B6E",
  "this.overlay_2096EBEA_0DAD_8EB9_415D_752B06C54033"
 ],
 "label": "RENDERPanorama_18(2)",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
   "yaw": -77.28,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 27.1
  },
  {
   "panorama": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
   "yaw": 148.71,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -32.99
  },
  {
   "panorama": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "yaw": 132.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 117.05
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 178,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.87
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": 173.62,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -132.58
  },
  {
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "yaw": -133.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 27.31
  },
  {
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
   "yaw": -1.52,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 1.39
  },
  {
   "panorama": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
   "yaw": 60.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 143.18
  },
  {
   "panorama": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "yaw": 153.31,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 28.98
  },
  {
   "panorama": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "yaw": -150.36,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -12
  }
 ],
 "id": "panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -85.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16F38254_1838_CE0A_41AE_1043B032C240",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -40.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08F60059_1838_CA3B_41B6_40DFAA0DD9C3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 17.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17275E33_1838_D60F_4196_CDC622C01A78",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -36.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1655F1E3_1838_CA0E_4178_179A67E27E99",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 97.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1619ED46_1838_DA16_41B7_38174E642F0D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -55.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17890EDE_1838_D636_41A1_940E95E8B788",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 11.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1676CD70_1838_DA09_41B5_037F534C38C3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 148.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16024D62_1838_DA0E_41AD_35EE4656152B",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 121.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16FE3247_1838_CE17_415E_83E9F6E2446A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -3.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08E77067_1838_CA16_4185_243053B7E3FE",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 29.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_0924C0A2_1838_CA09_4197_E46F474B7244",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_176832FB_1838_CFFF_41B1_9949E0B26E6D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -88.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08B0A01F_1838_CA37_41B4_DB7E6EC0197A",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 164.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15E9ECE5_1838_DA0B_41B2_0B4C15BAFAC4",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 47.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_167B31B9_1838_CA7A_4167_02AAEC0C0668",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -47.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_162D9162_1838_CA0E_41A1_55329A96B230",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -151.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_164971F1_1838_CA0D_419F_1E7DDE9792D5",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -119.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1693ADD1_1838_DA0A_41B8_1B23DA825AFD",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 7.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17D723FC_1838_CDFA_419F_BC3BED75CC90",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 48.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_175EF30E_1838_CE19_4195_BCD453D520DD",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -62.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_160D219B_1838_CA3F_41B6_0B942D253920",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1DBDED75_0D9A_801E_418E_B898D8EB0D40",
  "this.overlay_1C289BEF_0D9D_800A_418B_04017BFEDC60",
  "this.overlay_1959B981_0DAB_80F9_4199_B6CFD68C6B5E",
  "this.overlay_106833DF_0D96_9E97_41A6_F825184F44BF",
  "this.overlay_10BFC25C_0D97_B999_4195_79E24DBB39A1"
 ],
 "label": "RENDERPanorama_3",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD",
   "yaw": -177.69,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 4.56
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": 93.13,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -36.78
  },
  {
   "panorama": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "yaw": 1.02,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 53.29
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 117.05,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 132.14
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 40.36,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 58.91
  }
 ],
 "id": "panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -24.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15DD9CF4_1838_DA0A_419C_E015D8626FE1",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -170.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_177822D3_1838_CE0E_41A2_63A15A869207",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_03917043_0D95_807A_4178_C3101671688A"
 ],
 "label": "RENDERPanorama",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
   "yaw": -0.45,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -100.46
  }
 ],
 "id": "panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -111.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16387D1D_1838_DA3A_41B2_9025B4EC2C80",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 79.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1683ADDF_1838_DA36_41B1_D4327423E271",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -122.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16D0AE09_1838_D61B_41AA_A738E310D46D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -86.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17AC435A_1838_CE3E_41AF_7889EC0FED4C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -179.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17BABE95_1838_D60B_41B2_9C1C7BCEAFEF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 158.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16268D39_1838_DA7B_4195_92D4C6ABAFBF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 50.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16591D8C_1838_DA1A_4175_31B31B11E1C6",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 137.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16C0BE17_1838_D637_41B4_63F53DA44AA2",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1E4BFE0F_0D97_800A_4199_627D3D8444DD",
  "this.overlay_18BA2C4A_0D96_800A_416F_F27C38888519",
  "this.overlay_2D44FE5E_0D9D_8999_41AA_A37EFF6C2794",
  "this.overlay_2D3FBA69_0D9A_89BB_418F_DF4AA7D58BA0"
 ],
 "label": "RENDERPanorama_8",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "yaw": 94.47,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -21.25
  },
  {
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
   "yaw": -9.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -82.01
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 27.1,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -77.28
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 68.36,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -31.11
  }
 ],
 "id": "panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -147.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15C5D127_1838_CA17_4186_F1F572C30D19",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 179.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08524FF6_1838_D5F6_41B4_7E4F1D28F752",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -31.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_174E6328_1838_CE19_41A2_2066E84C35E4",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -121.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_162AD171_1838_CA0B_41A5_DAD6465FFDE6",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 2.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_082D5F68_1838_D619_41B0_1E84882C878E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 6.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16ADDDB5_1838_DA0A_41B7_5DB6F1435008",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -101.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08619FE3_1838_D60E_41AE_D7A1CB5A50AF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 174.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1734D296_1838_CE09_4194_B1199B046B99",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -157.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16B1C20E_1838_CE16_41A4_2020EA5C700F",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1C24E297_0D9D_8019_4181_03CE1BF11230",
  "this.overlay_1E92C8E6_0D9D_803B_4199_068B0D51CEC4",
  "this.overlay_18A6FC48_0DAA_8076_4167_C47926287C1C",
  "this.overlay_103433AA_0D9B_BEB9_4195_9E80BB9A921D",
  "this.overlay_12A029C6_0D9B_8AE9_4194_BF28086C933E",
  "this.overlay_101CD170_0D9A_BBA9_4178_917FB012AEE6",
  "this.overlay_2DC6760E_0D9A_9979_41A6_AB5F6BE949A4"
 ],
 "label": "RENDERPanorama_5",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3",
   "yaw": 91.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -150.29
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 88.22,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -173.6
  },
  {
   "panorama": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "yaw": -1.69,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 57.68
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3"
  },
  {
   "panorama": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "yaw": -172.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -42.19
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C"
  }
 ],
 "id": "panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 69.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_091570B0_1838_CA09_419C_FEA2C123D862",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1EEA6900_0D96_81F7_41A3_879920BCC2B0",
  "this.overlay_1E75AD0E_0D96_800A_4198_1B4BA3D2568F",
  "this.overlay_19F99EA6_0DAD_803A_41A7_98D2786F6768",
  "this.overlay_2D94E8C8_0D9D_8AF9_41A4_0214085F3E0E",
  "this.overlay_2D99F283_0D9D_B96F_4174_261DFE13EEAB"
 ],
 "label": "RENDERPanorama_7",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 127.62,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -58.95
  },
  {
   "panorama": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
   "yaw": -21.25,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 94.47
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": 69.53,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 144.3
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 27.31,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -133.01
  },
  {
   "panorama": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "yaw": 159.68,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -39.37
  }
 ],
 "id": "panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -152.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1621317F_1838_CAF6_4162_BA724B2ECD53",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -59.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17C5F417_1838_CA37_41B3_BF039ACCB058",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1AA6AF9E_0DB6_800A_4170_271BDDD7725C",
  "this.overlay_1A2CC69A_0DB7_800A_4171_FC1DFB9A1B6D",
  "this.overlay_1A4C52E3_0DB6_803A_419C_02D97587AE52",
  "this.overlay_15AE7E68_0DB6_89B9_41A5_4E3A4209DFF3",
  "this.overlay_2C9816AD_0D95_86BB_41A8_F55F7D8B10DD",
  "this.overlay_2C514205_0D95_F96B_4158_1F87BE9F1934"
 ],
 "label": "RENDERPanorama_10",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD"
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": -177.27,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 9.16
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA"
  },
  {
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
   "yaw": 2.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -179.49
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": -179.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -131.58
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": -32.99,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 148.71
  }
 ],
 "id": "panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 102.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_160DFD54_1838_DA0A_4171_039271E827BC",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_071AE771_0D76_8016_4199_4528BEAFCD87_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 148.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17E86F0C_1838_D61A_4168_A8DB9E5068DB",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 179.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_169D2DC4_1838_DA09_41B7_E5CF53C815FB",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_033D4CC3_0D96_807A_4184_467B13FD2409",
  "this.overlay_0228055E_0D96_800B_41A0_D367AB17DC21",
  "this.overlay_3E0B5BF6_0D6A_8EA9_4169_DAA9BEB45837",
  "this.overlay_0197B03A_17C3_09FB_41B3_A76EC803589D"
 ],
 "label": "RENDERPanorama_1",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
   "yaw": 164.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 81.5
  },
  {
   "panorama": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD",
   "yaw": 97.66,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -173.75
  },
  {
   "panorama": "this.panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45",
   "yaw": -100.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.45
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 143.18,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 60.46
  }
 ],
 "id": "panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -104.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_0897403B_1838_CA7E_41A5_F53C7C1F373E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 21.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_172A92A6_1838_CE09_41B4_9BFC1F1BE4A2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -35.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16E0D264_1838_CE09_41B8_1A8A636FEDFA",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -126.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16373153_1838_CA0E_41A9_42E84F2C2FB4",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_14F3AF20_0DBF_87A9_4191_F6FF5990644D",
  "this.overlay_16CE3CE9_0DBE_8ABB_41A2_056055022865",
  "this.overlay_2FCC0F81_0D96_876A_419B_7DF5816A7738",
  "this.overlay_2E8E492A_0D95_8BB9_417F_1699DADF0E2F",
  "this.overlay_2E78FD9F_0DAA_8A97_417F_CE2513261CAB"
 ],
 "label": "RENDERPanorama_14",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": -110.48,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 75.86
  },
  {
   "panorama": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "yaw": -110.89,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 153.22
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": -10.57,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 139.11
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87"
  },
  {
   "panorama": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
   "yaw": 17.12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 176.46
  }
 ],
 "id": "panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_17F92F69_0DBD_87BB_41A1_B58F019DE299",
  "this.overlay_163E45EB_0DBD_BABF_4174_F85312E3E987",
  "this.overlay_2F3B1C79_0DAB_899B_41A0_785B2633C675",
  "this.overlay_29E8C234_0DAA_99A9_4185_62D4CDF35F84"
 ],
 "label": "RENDERPanorama_15",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": -159.15,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 22.39
  },
  {
   "panorama": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
   "yaw": -5.02,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 175.91
  },
  {
   "panorama": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
   "yaw": 176.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 17.12
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": -3.58,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 126.1
  }
 ],
 "id": "panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -29.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08A0E02D_1838_CA1B_41B3_CDB309E29A1C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17BC0346_1838_CE16_418B_CEED1744B02E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -98.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16BD3DA8_1838_DA19_41B7_57EA9101E3E0",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -152.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_166F31C7_1838_CA17_418E_A2F8DE3527A0",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 169.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1632BD2B_1838_DA1E_4192_C659AE763E7B",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1C865004_0D9E_9FFF_4172_A303CB98A220",
  "this.overlay_1F027987_0D9F_80FA_4159_BB9B861FC0B2",
  "this.overlay_1FB768DF_0D9E_8009_4186_A847201E0589",
  "this.overlay_10B85EFA_0D96_8699_4177_38C19985CB1C",
  "this.overlay_10FF2D03_0D95_8B6F_41A0_DC46810A1315",
  "this.overlay_1363D374_0D95_BFA9_4189_FD531A2B32BD"
 ],
 "label": "RENDERPanorama_4",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "yaw": 53.29,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 1.02
  },
  {
   "panorama": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
   "yaw": -42.19,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -172.17
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": -0.95,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 120.04
  },
  {
   "panorama": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
   "yaw": -129.42,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -171.15
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 28.98,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 153.31
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C"
  }
 ],
 "id": "panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -26.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_0887F049_1838_CA1B_41A1_FC4AC5AC3C91",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -150.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08732FC9_1838_D61A_419A_0F5A6F1E6B5C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 168,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16BC6201_1838_CE0B_4180_0089008C108C",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_15B09939_0DBA_8B9B_41A3_C76467A5154C",
  "this.overlay_141C0C59_0DBA_899B_41A3_08C6EA16017B",
  "this.overlay_1425FA41_0DBB_89EB_4193_D99AE67A1891",
  "this.overlay_142C5933_0DBA_8BAE_4198_0691B14AB27F",
  "this.overlay_2C155B36_0D96_8FA9_418D_FC627E6BF9B6",
  "this.overlay_2F785A5E_0D96_8999_4197_EB9959CE0209"
 ],
 "label": "RENDERPanorama_11",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
   "yaw": -131.58,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -179.01
  },
  {
   "panorama": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "yaw": -36.78,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 93.13
  },
  {
   "panorama": "this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3",
   "yaw": 57.75,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 16.76
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 78.95,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 7.49
  },
  {
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "yaw": 144.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 69.53
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": -132.58,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 173.62
  }
 ],
 "id": "panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -20.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_09361094_1838_CA09_41AE_436D83C3A3DF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 178.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17993EC4_1838_D609_41B1_26CC3150B4AF",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 178.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08C51085_1838_CA0B_4176_4E6B5C7DCD4C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 17.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15C45D0F_1838_DA17_41A8_7DEEE2C79E78",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 176.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15D1BD02_1838_DA09_41B6_83B53D6B41F4",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -44.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1765CE6A_1838_D61E_4189_AEE70D003555",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 23.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_080C8F99_1838_D63A_41A1_45ED722E066E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 143.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_163A3145_1838_CA0B_419C_C631914E9A5C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17CEFF39_1838_D67A_41B5_A4DE8BEDFAAE",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_288AD063_0DAB_99AF_41A8_9CF65E25A941",
  "this.overlay_2B119105_0DAB_7B6B_419C_95CCCAB4E0A0",
  "this.overlay_22CBCE7B_0D96_899F_41A1_DB489CD6B42D",
  "this.overlay_3D00D34B_0D95_9FFF_41A0_69D2EA6BF9F5",
  "this.overlay_38FB2451_0D9B_99EB_4196_0C483172A690",
  "this.overlay_3EF181E1_0D9D_9AAB_4198_BB843576D053"
 ],
 "label": "RENDERPanorama_20",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
   "yaw": 123.7,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -15.8
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": -156.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 155.9
  },
  {
   "panorama": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
   "yaw": 126.1,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -3.58
  },
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": 135.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -162.3
  },
  {
   "panorama": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
   "yaw": -103.2,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 68.42
  },
  {
   "panorama": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
   "yaw": 139.11,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -10.57
  }
 ],
 "id": "panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_2BF63813_0DB5_896F_415F_F66A2CDF6113",
  "this.overlay_2ADD48D9_0DB5_8A9B_41A7_E51D4746A546",
  "this.overlay_3D4BA3D3_0D9E_BEEF_4196_AB5E3A9894BB",
  "this.overlay_3FD6029A_0D9F_9E99_41AA_8D52EAAB529E",
  "this.overlay_3BA93AAF_0D9E_8EB7_414E_0D6CC77E9741",
  "this.overlay_3F3099EF_0D9D_8AB7_419F_8FCEE95E6EDC"
 ],
 "label": "RENDERPanorama_21",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
   "yaw": -158.32,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -173.82
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 124.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -162.03
  },
  {
   "panorama": "this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB",
   "yaw": 22.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -159.15
  },
  {
   "panorama": "this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
   "yaw": -168.71,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 87.14
  },
  {
   "panorama": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
   "yaw": 75.86,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -110.48
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": -162.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 135.17
  }
 ],
 "id": "panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 179.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_160081AA_1838_CA19_4193_79F667763DB8",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -92.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1705AE4F_1838_D617_41A8_176521FC3462",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 6.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1730BE25_1838_D60B_419A_E21663E6E1BD",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -139.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_081D5F83_1838_D60E_41A4_77A98926649C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07059A67_0D6B_803A_4191_9A79E662F85C_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 170.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17540E79_1838_D6FB_41B0_706AB1025D93",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -175.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15C38135_1838_CA0A_41A5_F8B882C8463B",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 69.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1775DE5C_1838_D63A_41AA_E5B2F36603E1",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -6.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17F783C1_1838_CE0B_41B5_1CF588F0965E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -151.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_083EEF4E_1838_D619_4161_C74BD4DBF5C4",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 177.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16648D7E_1838_DAF9_418F_3F89FA30794E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -4.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16A5821C_1838_CE39_41B4_9666A57DC4C2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -15.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17AB6EAF_1838_D617_41B1_727A9A5A0EA9",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 147.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_161B218E_1838_CA19_41B7_DEE1E94DB8C9",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -52.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08031FB4_1838_D609_41B0_703E429B3DCB",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1862339B_0DAA_800A_41AA_262DEAF58005",
  "this.overlay_1B281522_0DAB_803A_415D_70D7B39DD192",
  "this.overlay_1B92F836_0DAB_801A_41A2_0011A761270C",
  "this.overlay_1B5C8A76_0DB5_801A_418F_6A1A16D318AE",
  "this.overlay_2D6EA21C_0D9B_B999_419E_773B99522BAB",
  "this.overlay_2CA9451D_0D9A_9B9B_415F_20E01E2A21AD"
 ],
 "label": "RENDERPanorama_9",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
   "yaw": -82.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -9.38
  },
  {
   "panorama": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
   "yaw": -179.49,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 2.55
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87"
  },
  {
   "panorama": "this.panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB",
   "yaw": -0.1,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 0.58
  },
  {
   "panorama": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
   "yaw": 81.5,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 164.77
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": 1.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -1.52
  }
 ],
 "id": "panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_160FDB31_0DBA_8FAB_419F_1E382FF1DE61",
  "this.overlay_10D145BE_0DB5_9A99_419E_2539F8302A9E",
  "this.overlay_2E321043_0DAF_99EF_41A0_A5B3E6432852",
  "this.overlay_2895E479_0DAF_999B_419B_61836D799FEA"
 ],
 "label": "RENDERPanorama_17",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": 87.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -168.71
  },
  {
   "panorama": "this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E",
   "yaw": 80.06,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -2.72
  },
  {
   "panorama": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "yaw": -171.15,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -129.42
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": 68.42,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -103.2
  }
 ],
 "id": "panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_156A373E_0DBA_8799_4194_E40B6EE70D50",
  "this.overlay_17DD1794_0DBD_8769_418E_769249E83A0C",
  "this.overlay_2C29658B_0D97_BB7F_415C_4A4DB400F360",
  "this.overlay_2F29590D_0D97_8B7B_41A6_9EC4D0FF8D96"
 ],
 "label": "RENDERPanorama_12",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD"
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": 16.76,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 57.75
  },
  {
   "panorama": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
   "yaw": -150.29,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 91.64
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": -31.62,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 150.44
  }
 ],
 "id": "panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -82.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_15C95118_1838_CA39_41AE_7AF01A861290",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 8.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_08353436_1838_CA09_418F_81C87D0BAFF9",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 20.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17173E41_1838_D60B_41B3_30D8704C4946",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -163.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17A3A375_1838_CE0B_4199_623B49710C9C",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -56.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_170A12C2_1838_CE09_41A0_03E26BC1DBB8",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 46.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16D72277_1838_CEF7_41B1_DB63022522A2",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -177.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17445E86_1838_D609_41AF_7784DCAAF9E8",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_1FE83BF5_0D9B_801E_417D_1A6FC672ECF0",
  "this.overlay_1E8557F1_0D9B_8019_4194_3F16D5A40CB6",
  "this.overlay_19D15A02_0D9A_83FB_4178_A249F9A7B084",
  "this.overlay_12CEB7CA_0D9D_86F9_41A8_5EF600E2EEC0",
  "this.overlay_2DE129F7_0D9E_8A97_41A0_82228D197A83",
  "this.overlay_2DCA32D5_0D9F_BEEB_41A2_24C9DA5BDEBC",
  "this.overlay_2D97D2EB_0D9F_9EBF_4178_82D870C6FB62"
 ],
 "label": "RENDERPanorama_6",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3"
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 28.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -120.79
  },
  {
   "panorama": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
   "yaw": 57.68,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -1.69
  },
  {
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "yaw": -39.37,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 159.68
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C"
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": -12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -150.36
  },
  {
   "panorama": "this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2",
   "yaw": 153.22,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -110.89
  }
 ],
 "id": "panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -178.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_17E7A3E0_1838_CE0A_41AC_F4E06E1AC734",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_2AF95C30_0DB7_89A9_4184_0E0F11C4ADE1",
  "this.overlay_2AC5176B_0DB6_87BF_41A7_7DB5EDEA3450",
  "this.overlay_2A74042D_0DB6_99BB_4196_BD22913B1B17",
  "this.overlay_2585DD99_0DBA_8A9B_41A1_9C0CC34E484E",
  "this.overlay_27FAB3E1_0DBB_BEAB_4173_D7FC2FE78E5D"
 ],
 "label": "RENDERPanorama_13(1)",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36"
  },
  {
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
   "yaw": 0.58,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD"
  }
 ],
 "id": "panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_0704B10F_0D6A_8009_4199_533F07F794D0_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 179.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_081BE475_1838_CA0B_41B6_E7CB38BFB5D0",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_camera",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_29ACE8E4_0DAE_8AA9_41A7_E8AA115C0527",
  "this.overlay_28B11631_0DAD_99AB_41A1_A2FD2B3AF21E",
  "this.overlay_2AA2EF78_0DAA_8799_419E_2CA42FF6C0CE",
  "this.overlay_21D2C779_0DAF_879B_41A3_B2E94A69A911",
  "this.overlay_233F1158_0DAE_BB99_41A4_400C77DEED44",
  "this.overlay_20DE9CDB_0DAD_8A9E_418E_58AC9A0D1248",
  "this.overlay_22D9453E_0DAA_FB99_41A7_9D3EAE68E30A",
  "this.overlay_23F1CE42_0DAB_89E9_419C_F9A12F2442E2",
  "this.overlay_20079E5B_0DAA_899F_419E_1169E9507819",
  "this.overlay_3DE00948_0D95_8BF9_4195_BAF0E43F4086",
  "this.overlay_233137B5_0D96_86AB_41A6_369C36F0B3DB",
  "this.overlay_3D08852F_0D97_9BB7_4190_A57FBA00331B",
  "this.overlay_22E9A628_0D97_79B9_4178_63BA831926E4"
 ],
 "label": "RENDERPanorama_19",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3",
   "yaw": -162.03,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 124.17
  },
  {
   "panorama": "this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36",
   "yaw": -31.11,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 68.36
  },
  {
   "panorama": "this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3",
   "yaw": 150.44,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -31.62
  },
  {
   "panorama": "this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389",
   "yaw": -173.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 88.22
  },
  {
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD",
   "yaw": -0.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 178
  },
  {
   "panorama": "this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C",
   "yaw": -120.79,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 28.64
  },
  {
   "panorama": "this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF",
   "yaw": 9.16,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -177.27
  },
  {
   "panorama": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "yaw": 58.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 40.36
  },
  {
   "panorama": "this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C",
   "yaw": 155.9,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -156.61
  },
  {
   "panorama": "this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA",
   "yaw": -58.95,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 127.62
  },
  {
   "panorama": "this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD",
   "yaw": 32.65,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 29.88
  },
  {
   "panorama": "this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0",
   "yaw": 7.49,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 78.95
  },
  {
   "panorama": "this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E",
   "yaw": 120.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.95
  }
 ],
 "id": "panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 29.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_16F26DED_1838_DA1B_41A9_0AD8D36BF045",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -99.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_171AF2B3_1838_CE0F_4196_DF8CD8ED6B18",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -110.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "id": "camera_1781E3AD_1838_CE1B_41A8_193CDC19142B",
 "class": "PanoramaCamera"
},
{
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_t.jpg",
 "hfov": 360,
 "overlays": [
  "this.overlay_02365278_0D9A_8017_41A3_9A1AFF9C05A5",
  "this.overlay_1DAE4948_0D9B_8077_419E_7C8CE84195DA",
  "this.overlay_191DA21A_0DAA_800A_4186_C8A182975809",
  "this.overlay_11616295_0DEF_996B_41A7_0DBB8CEDD8FB",
  "this.overlay_10094453_0D95_F9EF_418C_0881FE17B42E"
 ],
 "label": "RENDERPanorama_2",
 "hfovMin": "120%",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497"
  },
  {
   "panorama": "this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64",
   "yaw": 4.56,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -177.69
  },
  {
   "panorama": "this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E",
   "yaw": -173.75,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 97.66
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD"
  },
  {
   "panorama": "this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87",
   "yaw": 29.88,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 32.65
  }
 ],
 "id": "panorama_070AAB72_0D6B_801A_41A3_7F76811209DD",
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "id": "MainViewer",
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderRadius": 0,
 "minWidth": 100,
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "transitionDuration": 500,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 1400,
 "progressBarBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowHorizontalLength": 0,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "toolTipBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "paddingTop": 0
},
{
 "paddingBottom": 0,
 "data": {
  "name": "--- MENU"
 },
 "class": "Container",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
  "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
 ],
 "id": "Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
 "right": "0%",
 "borderSize": 0,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundImageUrl": "skin/Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC.png",
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "height": "12.832%",
 "minWidth": 1,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "gap": 10,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "overflow": "visible",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1,
  1
 ],
 "propagateClick": false,
 "data": {
  "name": "Container2461"
 },
 "class": "Container",
 "id": "Container_1525D29B_1838_4E3F_41A0_42D1BC807D34",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_181C18C6_17CD_3A8B_4156_53CFF244D2F2",
  "this.Button_05B123A3_17C3_0E88_41AC_56DBB95A9F9D",
  "this.Button_06BF88FE_17C5_FA78_41B6_F87BB7C0AEE6"
 ],
 "borderSize": 0,
 "width": "100%",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "backgroundColor": [
  "#000000",
  "#000000",
  "#FFFFFF"
 ],
 "top": "4.88%",
 "height": "6.078%",
 "minWidth": 1,
 "backgroundOpacity": 0.08,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false
},
{
 "toolTipFontFamily": "Arial",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "class": "IconButton",
 "id": "IconButton_01B808A4_17C7_7A88_41B6_4CC6903BA22D",
 "toolTipShadowHorizontalLength": 0,
 "width": 38.6,
 "toolTipBorderColor": "#767676",
 "transparencyActive": true,
 "maxWidth": 128,
 "borderSize": 0,
 "toolTipOpacity": 1,
 "maxHeight": 128,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "horizontalAlign": "center",
 "toolTipShadowBlurRadius": 3,
 "paddingLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "paddingRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "height": 42.8,
 "toolTip": "Fullscreen",
 "iconURL": "skin/IconButton_01B808A4_17C7_7A88_41B6_4CC6903BA22D.png",
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "toolTipShadowVerticalLength": 0,
 "verticalAlign": "middle",
 "toolTipBorderSize": 1,
 "mode": "toggle",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "toolTipShadowOpacity": 1,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipFontStyle": "normal",
 "toolTipPaddingTop": 4,
 "paddingTop": 0,
 "toolTipTextShadowOpacity": 0,
 "cursor": "hand",
 "propagateClick": false,
 "data": {
  "name": "IconButton1493"
 },
 "shadow": false
},
{
 "items": [
  {
   "hfov": 16.58,
   "image": "this.AnimatedImageResource_3215FA24_0D96_89A9_418D_8C802C86B7D8",
   "pitch": -13.41,
   "yaw": -2.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40, this.camera_171AF2B3_1838_CE0F_4196_DF8CD8ED6B18); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -2.72,
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.41
  }
 ],
 "id": "overlay_16AE2180_0DBA_9B69_41A5_BE534DAB6C28",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.73,
   "image": "this.AnimatedImageResource_32159A24_0D96_89A9_41A2_A099C39B5425",
   "pitch": -9.4,
   "yaw": 175.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB, this.camera_1734D296_1838_CE09_4194_B1199B046B99); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 175.91,
   "hfov": 15.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.4
  }
 ],
 "id": "overlay_11EF0226_0DBB_B9A9_41A3_28B75DD1ECD5",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_2_0.png",
      "width": 333,
      "class": "ImageResourceLevel",
      "height": 327
     }
    ]
   },
   "pitch": 50.07,
   "yaw": -15.8
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_170A12C2_1838_CE09_41A0_03E26BC1DBB8); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -15.8,
   "hfov": 9.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 50.07
  }
 ],
 "id": "overlay_2E815168_0DAD_BBB9_418E_0CD775E6A54A",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_3_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 234
     }
    ]
   },
   "pitch": 34.23,
   "yaw": -173.82
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_172A92A6_1838_CE09_41B4_9BFC1F1BE4A2); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   },
   "yaw": -173.82,
   "hfov": 6.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 34.23
  }
 ],
 "id": "overlay_294030DE_0DAD_9A99_419D_A5CD0E5B7E93",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "cursor": "hand",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "width": 49,
 "transparencyActive": true,
 "maxWidth": 49,
 "right": 29.2,
 "borderSize": 0,
 "maxHeight": 37,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": 8,
 "height": 37,
 "iconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553.png",
 "minHeight": 1,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553_rollover.png",
 "paddingTop": 0,
 "propagateClick": true,
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false
},
{
 "media": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497",
 "camera": "this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_15837CC0_1838_DA09_41B4_8D3DD507F976",
 "class": "PanoramaPlayListItem"
},
{
 "items": [
  {
   "hfov": 11.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_0_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 16.47,
   "yaw": 178
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_160081AA_1838_CA19_4193_79F667763DB8); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 178,
   "hfov": 11.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 16.47
  }
 ],
 "id": "overlay_25E507AA_0DBD_86B9_4195_9E7B7360108E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.93,
   "image": "this.AnimatedImageResource_4DE09A3D_0D96_899B_419F_4A56B32A5654",
   "pitch": -49.34,
   "yaw": -1.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497, this.camera_166101D5_1838_CA0B_419A_1B5EFC34ADB8); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.52,
   "hfov": 12.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -49.34
  }
 ],
 "id": "overlay_27CA0267_0DBD_99B7_418E_E4970EAFD4A1",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.47,
   "image": "this.AnimatedImageResource_4DE00A3E_0D96_8999_4197_548C3D91669E",
   "pitch": -15.75,
   "yaw": 60.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E, this.camera_1655F1E3_1838_CA0E_4178_179A67E27E99); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 60.46,
   "hfov": 8.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.75
  }
 ],
 "id": "overlay_27AB5FB5_0DBA_86AB_417F_D6FBE03580E9",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.52,
   "image": "this.AnimatedImageResource_4DE1DA3E_0D96_8999_41AA_1C2822634097",
   "pitch": -19.78,
   "yaw": -77.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36, this.camera_1621317F_1838_CAF6_4162_BA724B2ECD53); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -77.28,
   "hfov": 7.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.78
  }
 ],
 "id": "overlay_2765D7EE_0DBB_86B9_41A4_18E3DE99E9B5",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.75,
   "image": "this.AnimatedImageResource_4DE17A3E_0D96_8999_41A8_E468C277E6B3",
   "pitch": -14.21,
   "yaw": 132.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64, this.camera_160D219B_1838_CA3F_41B6_0B942D253920); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 132.14,
   "hfov": 6.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.21
  }
 ],
 "id": "overlay_20CDEDAB_0DB6_8ABF_4193_A8FC0FA499D9",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.88,
   "image": "this.AnimatedImageResource_4DE11A3F_0D96_8997_417E_3158CC45537A",
   "pitch": -8.81,
   "yaw": 153.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E, this.camera_164971F1_1838_CA0D_419F_1E7DDE9792D5); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 153.31,
   "hfov": 4.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.81
  }
 ],
 "id": "overlay_26ECA36E_0DB7_BFB9_417C_852F56E985D2",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.06,
   "image": "this.AnimatedImageResource_4DE2DA3F_0D96_8997_41A4_068E0686931B",
   "pitch": -13.72,
   "yaw": -133.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA, this.camera_166F31C7_1838_CA17_418E_A2F8DE3527A0); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_6_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -133.01,
   "hfov": 7.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.72
  }
 ],
 "id": "overlay_21C43DA4_0DB5_8AA9_417E_2DC0EC2F81CA",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 5.76,
   "image": "this.AnimatedImageResource_4DE26A3F_0D96_8997_41A0_AD3495656F22",
   "pitch": -9.38,
   "yaw": -150.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C, this.camera_16BC6201_1838_CE0B_4180_0089008C108C); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_7_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -150.36,
   "hfov": 5.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.38
  }
 ],
 "id": "overlay_262D27A4_0DAA_86A9_419A_A0A1F607BC25",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.68,
   "image": "this.AnimatedImageResource_4DE22A3F_0D96_8997_419E_51AB26D3F5E5",
   "pitch": -42.6,
   "yaw": 148.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF, this.camera_161B218E_1838_CA19_41B7_DEE1E94DB8C9); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_8_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 148.71,
   "hfov": 6.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -42.6
  }
 ],
 "id": "overlay_26353D8F_0DAA_8B77_4194_081B8F6C6B6E",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.12,
   "image": "this.AnimatedImageResource_4DE14A40_0D96_89E9_4197_D5895F2F996A",
   "pitch": -24.05,
   "yaw": 173.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_167B31B9_1838_CA7A_4167_02AAEC0C0668); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_9_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 173.62,
   "hfov": 6.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.05
  }
 ],
 "id": "overlay_2096EBEA_0DAD_8EB9_415D_752B06C54033",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.7,
   "image": "this.AnimatedImageResource_3A4DD765_0EBA_87AB_41A6_C98EE3A2859F",
   "pitch": -8.85,
   "yaw": 1.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E, this.camera_16373153_1838_CA0E_41A9_42E84F2C2FB4); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 1.02,
   "hfov": 8.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.85
  }
 ],
 "id": "overlay_1DBDED75_0D9A_801E_418E_B898D8EB0D40",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.41,
   "image": "this.AnimatedImageResource_320149F6_0D96_8AA9_41A7_176697EE8B2A",
   "pitch": -13.93,
   "yaw": -177.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD, this.camera_15C38135_1838_CA0A_41A5_F8B882C8463B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -177.69,
   "hfov": 14.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.93
  }
 ],
 "id": "overlay_1C289BEF_0D9D_800A_418B_04017BFEDC60",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.17,
   "image": "this.AnimatedImageResource_320109F7_0D96_8A97_41A0_C01706AF4247",
   "pitch": -10.24,
   "yaw": 93.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_163A3145_1838_CA0B_419C_C631914E9A5C); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.13,
   "hfov": 13.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.24
  }
 ],
 "id": "overlay_1959B981_0DAB_80F9_4199_B6CFD68C6B5E",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_3_0.png",
      "width": 289,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": 27.61,
   "yaw": 117.05
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_162D9162_1838_CA0E_41A1_55329A96B230); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 117.05,
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 27.61
  }
 ],
 "id": "overlay_106833DF_0D96_9E97_41A6_F825184F44BF",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_4_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 178
     }
    ]
   },
   "pitch": 21.62,
   "yaw": 40.36
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_162AD171_1838_CA0B_41A5_DAD6465FFDE6); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "yaw": 40.36,
   "hfov": 6.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 21.62
  }
 ],
 "id": "overlay_10BFC25C_0D97_B999_4195_79E24DBB39A1",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.13,
   "image": "this.AnimatedImageResource_320D99EF_0D96_8AB7_4136_ADF8A8E8433E",
   "pitch": -17.18,
   "yaw": -0.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E, this.camera_1683ADDF_1838_DA36_41B1_D4327423E271); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.45,
   "hfov": 13.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.18
  }
 ],
 "id": "overlay_03917043_0D95_807A_4178_C3101671688A",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.19,
   "image": "this.AnimatedImageResource_3219FA08_0D96_8979_41A4_F6FC57A14B32",
   "pitch": -12.28,
   "yaw": 94.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA, this.camera_16268D39_1838_DA7B_4195_92D4C6ABAFBF); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 94.47,
   "hfov": 17.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.28
  }
 ],
 "id": "overlay_1E4BFE0F_0D97_800A_4199_627D3D8444DD",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16,
   "image": "this.AnimatedImageResource_32199A08_0D96_8979_419A_9600951F80E1",
   "pitch": -14.05,
   "yaw": -9.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497, this.camera_1619ED46_1838_DA16_41B7_38174E642F0D); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -9.38,
   "hfov": 16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.05
  }
 ],
 "id": "overlay_18BA2C4A_0D96_800A_416F_F27C38888519",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_2_0.png",
      "width": 227,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": 25.46,
   "yaw": 27.1
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_160DFD54_1838_DA0A_4171_039271E827BC); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 27.1,
   "hfov": 9.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 25.46
  }
 ],
 "id": "overlay_2D44FE5E_0D9D_8999_41AA_A37EFF6C2794",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_3_0.png",
      "width": 101,
      "class": "ImageResourceLevel",
      "height": 109
     }
    ]
   },
   "pitch": 15.8,
   "yaw": 68.36
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_16024D62_1838_DA0E_41AD_35EE4656152B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 68.36,
   "hfov": 4.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 15.8
  }
 ],
 "id": "overlay_2D3FBA69_0D9A_89BB_418F_DF4AA7D58BA0",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.27,
   "image": "this.AnimatedImageResource_32045A00_0D96_8969_4192_8E3A21F31AA0",
   "pitch": -14,
   "yaw": -1.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C, this.camera_16D0AE09_1838_D61B_41AA_A738E310D46D); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.69,
   "hfov": 16.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14
  }
 ],
 "id": "overlay_1C24E297_0D9D_8019_4181_03CE1BF11230",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.54,
   "image": "this.AnimatedImageResource_3205FA00_0D96_8969_4189_F19AB2592700",
   "pitch": -16.65,
   "yaw": -172.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E, this.camera_16C0BE17_1838_D637_41B4_63F53DA44AA2); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -172.17,
   "hfov": 15.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.65
  }
 ],
 "id": "overlay_1E92C8E6_0D9D_803B_4199_068B0D51CEC4",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.55,
   "image": "this.AnimatedImageResource_3205BA00_0D96_8969_41A3_6A20912A3F90",
   "pitch": -19.75,
   "yaw": 91.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3, this.camera_16F26DED_1838_DA1B_41A9_0AD8D36BF045); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 91.64,
   "hfov": 16.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.75
  }
 ],
 "id": "overlay_18A6FC48_0DAA_8076_4167_C47926287C1C",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_3_0.png",
      "width": 271,
      "class": "ImageResourceLevel",
      "height": 296
     }
    ]
   },
   "pitch": 54.64,
   "yaw": 88.22
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_16E24DFC_1838_D5F9_41B6_BD6E04BBE5AF); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 88.22,
   "hfov": 6.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 54.64
  }
 ],
 "id": "overlay_103433AA_0D9B_BEB9_4195_9E80BB9A921D",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_4_0.png",
      "width": 208,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": 16.03,
   "yaw": 92.03
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_4_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 92.03,
   "hfov": 8.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 16.03
  }
 ],
 "id": "overlay_12A029C6_0D9B_8AE9_4194_BF28086C933E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_5_0.png",
      "width": 202,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 37.75,
   "yaw": -118.57
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -118.57,
   "hfov": 7.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 37.75
  }
 ],
 "id": "overlay_101CD170_0D9A_BBA9_4178_917FB012AEE6",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_6_0.png",
      "width": 246,
      "class": "ImageResourceLevel",
      "height": 203
     }
    ]
   },
   "pitch": 35.97,
   "yaw": -50.84
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_6_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -50.84,
   "hfov": 8.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 35.97
  }
 ],
 "id": "overlay_2DC6760E_0D9A_9979_41A6_AB5F6BE949A4",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.25,
   "image": "this.AnimatedImageResource_3219EA05_0D96_896B_41A8_E066A44CC3D8",
   "pitch": -11.25,
   "yaw": 159.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C, this.camera_16C48287_1838_CE17_41B2_DD24015927A1); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 159.68,
   "hfov": 17.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.25
  }
 ],
 "id": "overlay_1EEA6900_0D96_81F7_41A3_879920BCC2B0",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.38,
   "image": "this.AnimatedImageResource_32198A06_0D96_8969_4198_CB6C14EA4632",
   "pitch": -10.91,
   "yaw": -21.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36, this.camera_16F38254_1838_CE0A_41AE_1043B032C240); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -21.25,
   "hfov": 15.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.91
  }
 ],
 "id": "overlay_1E75AD0E_0D96_800A_4198_1B4BA3D2568F",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.29,
   "image": "this.AnimatedImageResource_32195A06_0D96_8969_4185_033F0E7613A1",
   "pitch": -10.54,
   "yaw": 69.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_16E0D264_1838_CE09_41B8_1A8A636FEDFA); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 69.53,
   "hfov": 12.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.54
  }
 ],
 "id": "overlay_19F99EA6_0DAD_803A_41A7_98D2786F6768",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_3_0.png",
      "width": 233,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 25.55,
   "yaw": 27.31
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_16D72277_1838_CEF7_41B1_DB63022522A2); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": 27.31,
   "hfov": 9.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 25.55
  }
 ],
 "id": "overlay_2D94E8C8_0D9D_8AF9_41A4_0214085F3E0E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_4_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 153
     }
    ]
   },
   "pitch": 18.09,
   "yaw": 127.62
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_16FE3247_1838_CE17_415E_83E9F6E2446A); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 127.62,
   "hfov": 7.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 18.09
  }
 ],
 "id": "overlay_2D99F283_0D9D_B96F_4174_261DFE13EEAB",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.8,
   "image": "this.AnimatedImageResource_321C8A12_0D96_8969_419D_80B795C26340",
   "pitch": -15.09,
   "yaw": 2.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497, this.camera_176832FB_1838_CFFF_41B1_9949E0B26E6D); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 2.55,
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.09
  }
 ],
 "id": "overlay_1AA6AF9E_0DB6_800A_4170_271BDDD7725C",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.99,
   "image": "this.AnimatedImageResource_321C5A13_0D96_896F_4197_C20D1A2FEFE5",
   "pitch": -56.69,
   "yaw": 94.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 94.76,
   "hfov": 15.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -56.69
  }
 ],
 "id": "overlay_1A2CC69A_0DB7_800A_4171_FC1DFB9A1B6D",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.01,
   "image": "this.AnimatedImageResource_321DEA13_0D96_896F_4192_2FC11DDD7979",
   "pitch": -55.31,
   "yaw": -85.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -85.43,
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -55.31
  }
 ],
 "id": "overlay_1A4C52E3_0DB6_803A_419C_02D97587AE52",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.11,
   "image": "this.AnimatedImageResource_321D8A14_0D96_8969_417D_20E85CEACB5C",
   "pitch": -20.45,
   "yaw": -179.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_175EF30E_1838_CE19_4195_BCD453D520DD); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -179.01,
   "hfov": 12.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.45
  }
 ],
 "id": "overlay_15AE7E68_0DB6_89B9_41A5_4E3A4209DFF3",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_4_0.png",
      "width": 439,
      "class": "ImageResourceLevel",
      "height": 359
     }
    ]
   },
   "pitch": 68.71,
   "yaw": -32.99
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_174E6328_1838_CE19_41A2_2066E84C35E4); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -32.99,
   "hfov": 7.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 68.71
  }
 ],
 "id": "overlay_2C9816AD_0D95_86BB_41A8_F55F7D8B10DD",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_5_0.png",
      "width": 214,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": 28.76,
   "yaw": -177.27
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_177822D3_1838_CE0E_41A2_63A15A869207); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -177.27,
   "hfov": 8.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 28.76
  }
 ],
 "id": "overlay_2C514205_0D95_F96B_4158_1F87BE9F1934",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.59,
   "image": "this.AnimatedImageResource_3A4EA764_0EBA_87A9_41A3_9D836EC46DC6",
   "pitch": -8.98,
   "yaw": 97.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD, this.camera_16ADDDB5_1838_DA0A_41B7_5DB6F1435008); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 97.66,
   "hfov": 10.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.98
  }
 ],
 "id": "overlay_033D4CC3_0D96_807A_4184_467B13FD2409",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.59,
   "image": "this.AnimatedImageResource_3A4EF764_0EBA_87A9_4194_4314BB0242CE",
   "pitch": -9.05,
   "yaw": -100.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45, this.camera_169D2DC4_1838_DA09_41B7_E5CF53C815FB); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -100.46,
   "hfov": 10.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.05
  }
 ],
 "id": "overlay_0228055E_0D96_800B_41A0_D367AB17DC21",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.39,
   "image": "this.AnimatedImageResource_3A4E3764_0EBA_87A9_419A_6E38DEDE7C19",
   "pitch": -6.1,
   "yaw": 164.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497, this.camera_16BD3DA8_1838_DA19_41B7_57EA9101E3E0); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 164.77,
   "hfov": 7.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.1
  }
 ],
 "id": "overlay_3E0B5BF6_0D6A_8EA9_4169_DAA9BEB45837",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0_HS_3_0.png",
      "width": 214,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 25.43,
   "yaw": 143.18
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_1693ADD1_1838_DA0A_41B8_1B23DA825AFD); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_0_HS_3_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 143.18,
   "hfov": 8.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 25.43
  }
 ],
 "id": "overlay_0197B03A_17C3_09FB_41B3_A76EC803589D",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 19.95,
   "image": "this.AnimatedImageResource_3212BA1F_0D96_8997_419E_086AA2A6E7E5",
   "pitch": -17.22,
   "yaw": -110.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C, this.camera_0887F049_1838_CA1B_41A1_FC4AC5AC3C91); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -110.89,
   "hfov": 19.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.22
  }
 ],
 "id": "overlay_14F3AF20_0DBF_87A9_4191_F6FF5990644D",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.79,
   "image": "this.AnimatedImageResource_32127A1F_0D96_8997_419D_09CD070FEE5F",
   "pitch": -16.74,
   "yaw": 17.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB, this.camera_08E77067_1838_CA16_4185_243053B7E3FE); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 17.12,
   "hfov": 15.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.74
  }
 ],
 "id": "overlay_16CE3CE9_0DBE_8ABB_41A2_056055022865",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_2_0.png",
      "width": 739,
      "class": "ImageResourceLevel",
      "height": 734
     }
    ]
   },
   "pitch": 66.65,
   "yaw": -110.48
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_0897403B_1838_CA7E_41A5_F53C7C1F373E); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -110.48,
   "hfov": 12.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 66.65
  }
 ],
 "id": "overlay_2FCC0F81_0D96_876A_419B_7DF5816A7738",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_3_0.png",
      "width": 221,
      "class": "ImageResourceLevel",
      "height": 178
     }
    ]
   },
   "pitch": 25.92,
   "yaw": -10.57
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_08F60059_1838_CA3B_41B6_40DFAA0DD9C3); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -10.57,
   "hfov": 8.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 25.92
  }
 ],
 "id": "overlay_2E8E492A_0D95_8BB9_417F_1699DADF0E2F",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_4_0.png",
      "width": 124,
      "class": "ImageResourceLevel",
      "height": 136
     }
    ]
   },
   "pitch": 27.27,
   "yaw": -69.77
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": -69.77,
   "hfov": 4.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 27.27
  }
 ],
 "id": "overlay_2E78FD9F_0DAA_8A97_417F_CE2513261CAB",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.8,
   "image": "this.AnimatedImageResource_32132A21_0D96_89AB_41AB_35C5526FDF0F",
   "pitch": -10.27,
   "yaw": -5.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E, this.camera_16A5821C_1838_CE39_41B4_9666A57DC4C2); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -5.02,
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.27
  }
 ],
 "id": "overlay_17F92F69_0DBD_87BB_41A1_B58F019DE299",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.9,
   "image": "this.AnimatedImageResource_3214FA22_0D96_89A9_418F_1EA0E9E60883",
   "pitch": -11.39,
   "yaw": 176.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2, this.camera_1694522A_1838_CE19_418B_30CB2146120E); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 176.46,
   "hfov": 15.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.39
  }
 ],
 "id": "overlay_163E45EB_0DBD_BABF_4174_F85312E3E987",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_2_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": 31.85,
   "yaw": -3.58
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_16881238_1838_CE79_41B2_DE436F32806E); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "yaw": -3.58,
   "hfov": 6.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 31.85
  }
 ],
 "id": "overlay_2F3B1C79_0DAB_899B_41A0_785B2633C675",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_3_0.png",
      "width": 289,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": 41.39,
   "yaw": -159.15
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_16B1C20E_1838_CE16_41A4_2020EA5C700F); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -159.15,
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 41.39
  }
 ],
 "id": "overlay_29E8C234_0DAA_99A9_4185_62D4CDF35F84",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.12,
   "image": "this.AnimatedImageResource_320239F8_0D96_8A99_419A_4FB6DD4DBEF6",
   "pitch": -13.31,
   "yaw": 53.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64, this.camera_17E7A3E0_1838_CE0A_41AC_F4E06E1AC734); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 53.29,
   "hfov": 17.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.31
  }
 ],
 "id": "overlay_1C865004_0D9E_9FFF_4172_A303CB98A220",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.88,
   "image": "this.AnimatedImageResource_3203D9F9_0D96_8A9E_4195_8CC8303010B2",
   "pitch": -14.87,
   "yaw": -42.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389, this.camera_17D723FC_1838_CDFA_419F_BC3BED75CC90); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -42.19,
   "hfov": 14.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.87
  }
 ],
 "id": "overlay_1F027987_0D9F_80FA_4159_BB9B861FC0B2",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.92,
   "image": "this.AnimatedImageResource_320369FE_0D96_8A99_41A1_5F0D43A999DB",
   "pitch": -12.21,
   "yaw": -129.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40, this.camera_08353436_1838_CA09_418F_81C87D0BAFF9); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -129.42,
   "hfov": 16.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.21
  }
 ],
 "id": "overlay_1FB768DF_0D9E_8009_4186_A847201E0589",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_3_0.png",
      "width": 189,
      "class": "ImageResourceLevel",
      "height": 170
     }
    ]
   },
   "pitch": 23.68,
   "yaw": -0.95
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_17C5F417_1838_CA37_41B3_BF039ACCB058); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.95,
   "hfov": 7.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 23.68
  }
 ],
 "id": "overlay_10B85EFA_0D96_8699_4177_38C19985CB1C",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_4_0.png",
      "width": 93,
      "class": "ImageResourceLevel",
      "height": 109
     }
    ]
   },
   "pitch": 10.61,
   "yaw": 28.98
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_082B1456_1838_CA09_41AA_C96C3922A0B6); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "yaw": 28.98,
   "hfov": 4.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 10.61
  }
 ],
 "id": "overlay_10FF2D03_0D95_8B6F_41A0_DC46810A1315",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_5_0.png",
      "width": 195,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": 31,
   "yaw": -85.96
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -85.96,
   "hfov": 7.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 31
  }
 ],
 "id": "overlay_1363D374_0D95_BFA9_4189_FD531A2B32BD",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.58,
   "image": "this.AnimatedImageResource_321EBA15_0D96_896B_419A_B9778DA94D10",
   "pitch": -19.49,
   "yaw": 57.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3, this.camera_17A3A375_1838_CE0B_4199_623B49710C9C); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 57.75,
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.49
  }
 ],
 "id": "overlay_15B09939_0DBA_8B9B_41A3_C76467A5154C",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.58,
   "image": "this.AnimatedImageResource_321E4A16_0D96_8969_41A7_48C2FD1936AC",
   "pitch": -15.33,
   "yaw": -36.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64, this.camera_17AC435A_1838_CE3E_41AF_7889EC0FED4C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -36.78,
   "hfov": 14.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.33
  }
 ],
 "id": "overlay_141C0C59_0DBA_899B_41A3_08C6EA16017B",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.8,
   "image": "this.AnimatedImageResource_321FFA16_0D96_8969_419E_5A0464491C5B",
   "pitch": -15.97,
   "yaw": 144.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA, this.camera_1781E3AD_1838_CE1B_41A8_193CDC19142B); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 144.3,
   "hfov": 14.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.97
  }
 ],
 "id": "overlay_1425FA41_0DBB_89EB_4193_D99AE67A1891",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.88,
   "image": "this.AnimatedImageResource_321F8A17_0D96_8997_4178_65C764DE380C",
   "pitch": -17.72,
   "yaw": -131.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF, this.camera_17BC0346_1838_CE16_418B_CEED1744B02E); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -131.58,
   "hfov": 13.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.72
  }
 ],
 "id": "overlay_142C5933_0DBA_8BAE_4198_0691B14AB27F",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_4_0.png",
      "width": 333,
      "class": "ImageResourceLevel",
      "height": 396
     }
    ]
   },
   "pitch": 55.34,
   "yaw": 78.95
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_1792538F_1838_CE16_41B4_5856747D39AC); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "yaw": 78.95,
   "hfov": 8.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 55.34
  }
 ],
 "id": "overlay_2C155B36_0D96_8FA9_418D_FC627E6BF9B6",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_5_0.png",
      "width": 202,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": 22.08,
   "yaw": -132.58
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_17F783C1_1838_CE0B_41B5_1CF588F0965E); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -132.58,
   "hfov": 8.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 22.08
  }
 ],
 "id": "overlay_2F785A5E_0D96_8999_4197_EB9959CE0209",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_0_0.png",
      "width": 339,
      "class": "ImageResourceLevel",
      "height": 284
     }
    ]
   },
   "pitch": 18.91,
   "yaw": 135.17
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_15C45D0F_1838_DA17_41A8_7DEEE2C79E78); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 135.17,
   "hfov": 14.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 18.91
  }
 ],
 "id": "overlay_288AD063_0DAB_99AF_41A8_9CF65E25A941",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_1_0.png",
      "width": 202,
      "class": "ImageResourceLevel",
      "height": 196
     }
    ]
   },
   "pitch": 21.07,
   "yaw": -156.61
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_15DD9CF4_1838_DA0A_419C_E015D8626FE1); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": -156.61,
   "hfov": 8.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 21.07
  }
 ],
 "id": "overlay_2B119105_0DAB_7B6B_419C_95CCCAB4E0A0",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.1,
   "image": "this.AnimatedImageResource_4DEA1A32_0D96_89A9_419D_EAE5812D5B02",
   "pitch": -30.7,
   "yaw": -103.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40, this.camera_16387D1D_1838_DA3A_41B2_9025B4EC2C80); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -103.2,
   "hfov": 15.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.7
  }
 ],
 "id": "overlay_22CBCE7B_0D96_899F_41A1_DB489CD6B42D",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.84,
   "image": "this.AnimatedImageResource_4DEB8A32_0D96_89A9_4189_88B495A09896",
   "pitch": -58.7,
   "yaw": 123.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E, this.camera_15E9ECE5_1838_DA0B_41B2_0B4C15BAFAC4); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 123.7,
   "hfov": 10.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -58.7
  }
 ],
 "id": "overlay_3D00D34B_0D95_9FFF_41A0_69D2EA6BF9F5",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.22,
   "image": "this.AnimatedImageResource_4DEB3A33_0D96_89AF_41AA_9C4652FFB6E6",
   "pitch": -24.62,
   "yaw": 126.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB, this.camera_15D1BD02_1838_DA09_41B6_83B53D6B41F4); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 126.1,
   "hfov": 8.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.62
  }
 ],
 "id": "overlay_38FB2451_0D9B_99EB_4196_0C483172A690",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 5.52,
   "image": "this.AnimatedImageResource_4DECDA33_0D96_89AF_4196_6A788640B0E7",
   "pitch": -15.22,
   "yaw": 139.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2, this.camera_1632BD2B_1838_DA1E_4192_C659AE763E7B); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 139.11,
   "hfov": 5.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.22
  }
 ],
 "id": "overlay_3EF181E1_0D9D_9AAB_4198_BB843576D053",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_0_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": 23.01,
   "yaw": 124.17
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_17275E33_1838_D60F_4196_CDC622C01A78); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 124.17,
   "hfov": 7.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 23.01
  }
 ],
 "id": "overlay_2BF63813_0DB5_896F_415F_F66A2CDF6113",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_1_0.png",
      "width": 302,
      "class": "ImageResourceLevel",
      "height": 259
     }
    ]
   },
   "pitch": 26.63,
   "yaw": -162.3
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_1765CE6A_1838_D61E_4189_AEE70D003555); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_1_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -162.3,
   "hfov": 11.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 26.63
  }
 ],
 "id": "overlay_2ADD48D9_0DB5_8A9B_41A7_E51D4746A546",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.04,
   "image": "this.AnimatedImageResource_4DEDCA34_0D96_89A9_419F_5AC044CE61B8",
   "pitch": -27.56,
   "yaw": 75.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2, this.camera_1775DE5C_1838_D63A_41AA_E5B2F36603E1); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 75.86,
   "hfov": 12.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.56
  }
 ],
 "id": "overlay_3D4BA3D3_0D9E_BEEF_4196_AB5E3A9894BB",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_4DED6A35_0D96_89AB_41A3_B2260F1F1DC0",
   "pitch": -78.38,
   "yaw": 22.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07020F76_0D75_801A_41A8_99181EB5E2BB, this.camera_17173E41_1838_D60B_41B3_30D8704C4946); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 22.39,
   "hfov": 7.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -78.38
  }
 ],
 "id": "overlay_3FD6029A_0D9F_9E99_41AA_8D52EAAB529E",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 15.99,
   "image": "this.AnimatedImageResource_4DED3A35_0D96_89AB_4193_D38DE246B266",
   "pitch": -29.67,
   "yaw": -158.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E, this.camera_1730BE25_1838_D60B_419A_E21663E6E1BD); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -158.32,
   "hfov": 15.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.67
  }
 ],
 "id": "overlay_3BA93AAF_0D9E_8EB7_414E_0D6CC77E9741",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.79,
   "image": "this.AnimatedImageResource_4DEECA36_0D96_89A9_4172_F1A1C9B8AEF3",
   "pitch": -11.68,
   "yaw": -168.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40, this.camera_1705AE4F_1838_D617_41A8_176521FC3462); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -168.71,
   "hfov": 8.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.68
  }
 ],
 "id": "overlay_3F3099EF_0D9D_8AB7_419F_8FCEE95E6EDC",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.75,
   "image": "this.AnimatedImageResource_321A8A0F_0D96_8977_41A7_903DFA178329",
   "pitch": -5.63,
   "yaw": -0.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB, this.camera_17BABE95_1838_D60B_41B2_9C1C7BCEAFEF); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.1,
   "hfov": 8.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.63
  }
 ],
 "id": "overlay_1862339B_0DAA_800A_41AA_262DEAF58005",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 13.01,
   "image": "this.AnimatedImageResource_321A3A0F_0D96_8977_41A7_40965DFD890D",
   "pitch": -9.6,
   "yaw": 81.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E, this.camera_17AB6EAF_1838_D617_41B1_727A9A5A0EA9); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 81.5,
   "hfov": 13.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.6
  }
 ],
 "id": "overlay_1B281522_0DAB_803A_415D_70D7B39DD192",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 11.32,
   "image": "this.AnimatedImageResource_321BCA10_0D96_8969_416E_65FC29F32510",
   "pitch": -11.46,
   "yaw": -82.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36, this.camera_17540E79_1838_D6FB_41B0_706AB1025D93); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -82.01,
   "hfov": 11.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.46
  }
 ],
 "id": "overlay_1B92F836_0DAB_801A_41A2_0011A761270C",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.36,
   "image": "this.AnimatedImageResource_321B9A10_0D96_8969_41A8_B352E40B094A",
   "pitch": -36.71,
   "yaw": -179.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF, this.camera_17445E86_1838_D609_41AF_7784DCAAF9E8); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -179.49,
   "hfov": 10.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -36.71
  }
 ],
 "id": "overlay_1B5C8A76_0DB5_801A_418F_6A1A16D318AE",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_4_0.png",
      "width": 583,
      "class": "ImageResourceLevel",
      "height": 621
     }
    ]
   },
   "pitch": 74.63,
   "yaw": 1.39
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_17993EC4_1838_D609_41B1_26CC3150B4AF); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 1.39,
   "hfov": 6.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 74.63
  }
 ],
 "id": "overlay_2D6EA21C_0D9B_B999_419E_773B99522BAB",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_5_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 159
     }
    ]
   },
   "pitch": 29.62,
   "yaw": 178.87
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 178.87,
   "hfov": 6.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 29.62
  }
 ],
 "id": "overlay_2CA9451D_0D9A_9B9B_415F_20E01E2A21AD",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.96,
   "image": "this.AnimatedImageResource_32168A25_0D96_89AB_4197_A03C4DB8B29E",
   "pitch": -15.37,
   "yaw": 80.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E, this.camera_16648D7E_1838_DAF9_418F_3F89FA30794E); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 80.06,
   "hfov": 16.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.37
  }
 ],
 "id": "overlay_160FDB31_0DBA_8FAB_419F_1E382FF1DE61",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.48,
   "image": "this.AnimatedImageResource_32162A26_0D96_89A9_4197_6C885F2E8954",
   "pitch": -12.76,
   "yaw": -171.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E, this.camera_16591D8C_1838_DA1A_4175_31B31B11E1C6); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -171.15,
   "hfov": 14.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.76
  }
 ],
 "id": "overlay_10D145BE_0DB5_9A99_419E_2539F8302A9E",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_2_0.png",
      "width": 564,
      "class": "ImageResourceLevel",
      "height": 565
     }
    ]
   },
   "pitch": 66.23,
   "yaw": 68.42
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_164FCD9A_1838_DA3E_4192_A5E2BF93D280); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 68.42,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 66.23
  }
 ],
 "id": "overlay_2E321043_0DAF_99EF_41A0_A5B3E6432852",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_3_0.png",
      "width": 165,
      "class": "ImageResourceLevel",
      "height": 178
     }
    ]
   },
   "pitch": 20.2,
   "yaw": 87.14
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_1676CD70_1838_DA09_41B5_037F534C38C3); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 87.14,
   "hfov": 6.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 20.2
  }
 ],
 "id": "overlay_2895E479_0DAF_999B_419B_61836D799FEA",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.75,
   "image": "this.AnimatedImageResource_3211FA18_0D96_8999_41A1_2ABA01F1431A",
   "pitch": -12.62,
   "yaw": 16.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_0840100F_1838_CA17_41AD_33491C1E4EB4); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 16.76,
   "hfov": 14.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.62
  }
 ],
 "id": "overlay_156A373E_0DBA_8799_4194_E40B6EE70D50",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.15,
   "image": "this.AnimatedImageResource_3211BA18_0D96_8999_419D_46F006564D5A",
   "pitch": -21.37,
   "yaw": -150.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389, this.camera_08B0A01F_1838_CA37_41B4_DB7E6EC0197A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -150.29,
   "hfov": 17.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.37
  }
 ],
 "id": "overlay_17DD1794_0DBD_8769_418E_769249E83A0C",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 5.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_2_0.png",
      "width": 502,
      "class": "ImageResourceLevel",
      "height": 427
     }
    ]
   },
   "pitch": 75.78,
   "yaw": -31.62
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_08A0E02D_1838_CA1B_41B3_CDB309E29A1C); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -31.62,
   "hfov": 5.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 75.78
  }
 ],
 "id": "overlay_2C29658B_0D97_BB7F_415C_4A4DB400F360",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_3_0.png",
      "width": 196,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": 20.47,
   "yaw": 9.6
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.6,
   "hfov": 8.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 20.47
  }
 ],
 "id": "overlay_2F29590D_0D97_8B7B_41A6_9EC4D0FF8D96",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 14.32,
   "image": "this.AnimatedImageResource_32060A02_0D96_8969_41A3_BBAEC078FD9E",
   "pitch": -15.23,
   "yaw": 57.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389, this.camera_08C51085_1838_CA0B_4176_4E6B5C7DCD4C); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 57.68,
   "hfov": 14.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.23
  }
 ],
 "id": "overlay_1FE83BF5_0D9B_801E_417D_1A6FC672ECF0",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.87,
   "image": "this.AnimatedImageResource_3207DA03_0D96_896F_4196_D3D3DC4872A5",
   "pitch": -16.4,
   "yaw": -39.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA, this.camera_09361094_1838_CA09_41AE_436D83C3A3DF); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -39.37,
   "hfov": 16.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.4
  }
 ],
 "id": "overlay_1E8557F1_0D9B_8019_4194_3F16D5A40CB6",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 16.24,
   "image": "this.AnimatedImageResource_32076A03_0D96_896F_4192_AEADED8BF352",
   "pitch": -14.34,
   "yaw": 153.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2, this.camera_091570B0_1838_CA09_419C_FEA2C123D862); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 153.22,
   "hfov": 16.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.34
  }
 ],
 "id": "overlay_19D15A02_0D9A_83FB_4178_A249F9A7B084",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_3_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 28.17,
   "yaw": 28.64
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_08D5D076_1838_CA09_41A5_7B31754CEE4B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 28.64,
   "hfov": 10.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 28.17
  }
 ],
 "id": "overlay_12CEB7CA_0D9D_86F9_41A8_5EF600E2EEC0",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 5.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_4_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": 13.18,
   "yaw": -12
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_0924C0A2_1838_CA09_4197_E46F474B7244); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_4_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "yaw": -12,
   "hfov": 5.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.18
  }
 ],
 "id": "overlay_2DE129F7_0D9E_8A97_41A0_82228D197A83",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_5_0.png",
      "width": 258,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": 48.15,
   "yaw": 144.5
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_5_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 144.5,
   "hfov": 7.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 48.15
  }
 ],
 "id": "overlay_2DCA32D5_0D9F_BEEB_41A2_24C9DA5BDEBC",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 3.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_6_0.png",
      "width": 86,
      "class": "ImageResourceLevel",
      "height": 138
     }
    ]
   },
   "pitch": 24.39,
   "yaw": 89.37
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   },
   "yaw": 89.37,
   "hfov": 3.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 24.39
  }
 ],
 "id": "overlay_2D97D2EB_0D9F_9EBF_4178_82D870C6FB62",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 33,
   "image": "this.AnimatedImageResource_4DEE4A36_0D96_89A9_4191_CF968B4F855A",
   "pitch": -32.79,
   "yaw": 0.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07050958_0D6A_8016_41A2_EB0B19B8D497, this.camera_081BE475_1838_CA0B_41B6_E7CB38BFB5D0); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.58,
   "hfov": 33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.79
  }
 ],
 "id": "overlay_2AF95C30_0DB7_89A9_4184_0E0F11C4ADE1",
 "data": {
  "label": "Circle Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_1_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 43.93,
   "yaw": -0.12
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.12,
   "hfov": 8.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 43.93
  }
 ],
 "id": "overlay_2AC5176B_0DB6_87BF_41A7_7DB5EDEA3450",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_2_0.png",
      "width": 161,
      "class": "ImageResourceLevel",
      "height": 88
     }
    ]
   },
   "pitch": 13.82,
   "yaw": 1.4
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 1.4,
   "hfov": 6.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.82
  }
 ],
 "id": "overlay_2A74042D_0DB6_99BB_4196_BD22913B1B17",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.95,
   "image": "this.AnimatedImageResource_4DEF7A37_0D96_8997_417F_4E0D7F3D12D7",
   "pitch": -12.51,
   "yaw": -51.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -51.95,
   "hfov": 7.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.51
  }
 ],
 "id": "overlay_2585DD99_0DBA_8A9B_41A1_9C0CC34E484E",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.32,
   "image": "this.AnimatedImageResource_4DEF3A3D_0D96_899B_4196_39137A2E6376",
   "pitch": -11.01,
   "yaw": 51.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_4_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 51.36,
   "hfov": 8.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.01
  }
 ],
 "id": "overlay_27FAB3E1_0DBB_BEAB_4173_D7FC2FE78E5D",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_0_0.png",
      "width": 221,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": 31.8,
   "yaw": -0.87
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD, this.camera_17CEFF39_1838_D67A_41B5_A4DE8BEDFAAE); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.87,
   "hfov": 8.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 31.8
  }
 ],
 "id": "overlay_29ACE8E4_0DAE_8AA9_41A7_E8AA115C0527",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_1_0.png",
      "width": 208,
      "class": "ImageResourceLevel",
      "height": 209
     }
    ]
   },
   "pitch": 22.43,
   "yaw": 155.9
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C, this.camera_080C8F99_1838_D63A_41A1_45ED722E066E); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 155.9,
   "hfov": 8.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 22.43
  }
 ],
 "id": "overlay_28B11631_0DAD_99AB_41A1_A2FD2B3AF21E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_2_0.png",
      "width": 221,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": 18.55,
   "yaw": -162.03
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3, this.camera_17890EDE_1838_D636_41A1_940E95E8B788); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -162.03,
   "hfov": 9.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 18.55
  }
 ],
 "id": "overlay_2AA2EF78_0DAA_8799_419E_2CA42FF6C0CE",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 3.65,
   "image": "this.AnimatedImageResource_4DE85A28_0D96_89B9_418F_0E7E458BD5B8",
   "pitch": -20.13,
   "yaw": 9.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07057D5A_0D6A_800A_4190_A059C2D210AF, this.camera_082D5F68_1838_D619_41B0_1E84882C878E); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.16,
   "hfov": 3.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.13
  }
 ],
 "id": "overlay_21D2C779_0DAF_879B_41A3_B2E94A69A911",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.73,
   "image": "this.AnimatedImageResource_4DE9EA29_0D96_89BB_41A3_10109CE6067A",
   "pitch": -36.51,
   "yaw": 7.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704B10F_0D6A_8009_4199_533F07F794D0, this.camera_08619FE3_1838_D60E_41AE_D7A1CB5A50AF); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 7.49,
   "hfov": 7.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -36.51
  }
 ],
 "id": "overlay_233F1158_0DAE_BB99_41A4_400C77DEED44",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.91,
   "image": "this.AnimatedImageResource_4DE9BA2E_0D96_89B9_419F_E5615DAB10C2",
   "pitch": -44.7,
   "yaw": 150.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3, this.camera_17E86F0C_1838_D61A_4168_A8DB9E5068DB); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 150.44,
   "hfov": 8.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -44.7
  }
 ],
 "id": "overlay_20DE9CDB_0DAD_8A9E_418E_58AC9A0D1248",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.47,
   "image": "this.AnimatedImageResource_4DE8FA2F_0D96_89B7_419C_4950A6B24728",
   "pitch": -20.4,
   "yaw": 120.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E, this.camera_08524FF6_1838_D5F6_41B4_7E4F1D28F752); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_6_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 120.04,
   "hfov": 7.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.4
  }
 ],
 "id": "overlay_22D9453E_0DAA_FB99_41A7_9D3EAE68E30A",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.25,
   "image": "this.AnimatedImageResource_4DE86A2F_0D96_89B7_419A_2993AE2483A8",
   "pitch": -19.65,
   "yaw": 58.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64, this.camera_081D5F83_1838_D60E_41A4_77A98926649C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_7_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 58.91,
   "hfov": 7.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.65
  }
 ],
 "id": "overlay_23F1CE42_0DAB_89E9_419C_F9A12F2442E2",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 5.98,
   "image": "this.AnimatedImageResource_4DE82A30_0D96_89A9_41A8_4FFFACE65538",
   "pitch": -13.03,
   "yaw": 32.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070AAB72_0D6B_801A_41A3_7F76811209DD, this.camera_08732FC9_1838_D61A_419A_0F5A6F1E6B5C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_8_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 32.65,
   "hfov": 5.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.03
  }
 ],
 "id": "overlay_20079E5B_0DAA_899F_419E_1169E9507819",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 7.58,
   "image": "this.AnimatedImageResource_4DE9EA30_0D96_89A9_41A0_DDDC25E89B7A",
   "pitch": -19.42,
   "yaw": -120.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07059A67_0D6B_803A_4191_9A79E662F85C, this.camera_083EEF4E_1838_D619_4161_C74BD4DBF5C4); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_9_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -120.79,
   "hfov": 7.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.42
  }
 ],
 "id": "overlay_3DE00948_0D95_8BF9_4195_BAF0E43F4086",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 8.34,
   "image": "this.AnimatedImageResource_4DE9BA30_0D96_89A9_418B_40B467A4DB08",
   "pitch": -33.5,
   "yaw": -173.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07040A96_0D6B_801A_419A_0B32DDB6E389, this.camera_17DF8F20_1838_D60A_41B6_581D0A651361); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_10_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -173.6,
   "hfov": 8.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -33.5
  }
 ],
 "id": "overlay_233137B5_0D96_86AB_41A6_369C36F0B3DB",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 6.34,
   "image": "this.AnimatedImageResource_4DE95A30_0D96_89A9_418B_A51FEA3B2959",
   "pitch": -18.53,
   "yaw": -58.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA, this.camera_08031FB4_1838_D609_41B0_703E429B3DCB); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_11_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -58.95,
   "hfov": 6.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.53
  }
 ],
 "id": "overlay_3D08852F_0D97_9BB7_4190_A57FBA00331B",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.63,
   "image": "this.AnimatedImageResource_4DEACA31_0D96_89AB_418B_CFDF82A39BB5",
   "pitch": -11.43,
   "yaw": -31.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_070625E9_0D6A_8036_41A3_88842D1A1E36, this.camera_17F90EF3_1838_D60F_4181_57E37FEA09EB); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_12_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -31.11,
   "hfov": 4.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.43
  }
 ],
 "id": "overlay_22E9A628_0D97_79B9_4178_63BA831926E4",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.27,
   "image": "this.AnimatedImageResource_320F29F3_0D96_8AAF_4159_040A6CBEDB72",
   "pitch": -10.91,
   "yaw": 4.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_07063B29_0D6B_8036_4175_E35AE12E2F64, this.camera_15D39109_1838_CA1A_4197_8AE5E0BB73E3); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 4.56,
   "hfov": 17.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.91
  }
 ],
 "id": "overlay_02365278_0D9A_8017_41A3_9A1AFF9C05A5",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 12.9,
   "image": "this.AnimatedImageResource_3200F9F4_0D96_8AA9_419A_611EFDCB5CFE",
   "pitch": -12.07,
   "yaw": -173.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E, this.camera_15C95118_1838_CA39_41AE_7AF01A861290); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -173.75,
   "hfov": 12.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.07
  }
 ],
 "id": "overlay_1DAE4948_0D9B_8077_419E_7C8CE84195DA",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 10.86,
   "image": "this.AnimatedImageResource_320089F4_0D96_8AA9_419E_5706E61A91F1",
   "pitch": -9.21,
   "yaw": 118.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 118.38,
   "hfov": 10.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.21
  }
 ],
 "id": "overlay_191DA21A_0DAA_800A_4186_C8A182975809",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 9.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_3_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 221
     }
    ]
   },
   "pitch": 36.71,
   "yaw": 68.18
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 68.18,
   "hfov": 9.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 36.71
  }
 ],
 "id": "overlay_11616295_0DEF_996B_41A7_0DBB8CEDD8FB",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 4.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_4_0.png",
      "width": 113,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ]
   },
   "pitch": 17.08,
   "yaw": 29.88
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_071AE771_0D76_8016_4199_4528BEAFCD87, this.camera_15C5D127_1838_CA17_4186_F1F572C30D19); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.88,
   "hfov": 4.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 17.08
  }
 ],
 "id": "overlay_10094453_0D95_F9EF_418C_0881FE17B42E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "class": "Container",
 "id": "Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 1199,
 "borderSize": 0,
 "children": [
  "this.IconButton_01B808A4_17C7_7A88_41B6_4CC6903BA22D"
 ],
 "layout": "horizontal",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "paddingLeft": 30,
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "height": 51,
 "verticalAlign": "middle",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "gap": 10,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "overflow": "scroll",
 "shadow": false
},
{
 "paddingBottom": 0,
 "data": {
  "name": "Button house info"
 },
 "class": "Button",
 "iconWidth": 0,
 "id": "Button_181C18C6_17CD_3A8B_4156_53CFF244D2F2",
 "left": "9.58%",
 "backgroundColorRatios": [
  0
 ],
 "width": 130,
 "fontFamily": "Moonet DEMO",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "rollOverFontColor": "#DB9B4D",
 "shadowColor": "#000000",
 "backgroundColorDirection": "vertical",
 "fontSize": "35px",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "borderColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#CCCCCC",
 "iconHeight": 0,
 "rollOverBackgroundOpacity": 0,
 "rollOverShadow": false,
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "top": "0%",
 "verticalAlign": "middle",
 "label": "ENTRANCE",
 "mode": "push",
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "shadowBlurRadius": 15,
 "backgroundColor": [
  "#000000"
 ],
 "pressedFontColor": "#000000",
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "layout": "horizontal",
 "minWidth": 1,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "fontStyle": "normal",
 "gap": 5,
 "shadowSpread": 1,
 "cursor": "hand",
 "propagateClick": true,
 "fontWeight": "normal",
 "shadow": false
},
{
 "paddingBottom": 0,
 "data": {
  "name": "Button house info"
 },
 "class": "Button",
 "iconWidth": 0,
 "id": "Button_05B123A3_17C3_0E88_41AC_56DBB95A9F9D",
 "backgroundColorRatios": [
  0
 ],
 "width": 150,
 "fontFamily": "Moonet DEMO",
 "iconBeforeLabel": true,
 "right": "13.34%",
 "borderSize": 0,
 "rollOverFontColor": "#DB9B4D",
 "shadowColor": "#000000",
 "backgroundColorDirection": "vertical",
 "fontSize": "35px",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "borderColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#CCCCCC",
 "iconHeight": 0,
 "rollOverBackgroundOpacity": 0,
 "rollOverShadow": false,
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "height": 42,
 "top": "0%",
 "verticalAlign": "middle",
 "label": "AMUSEMENT",
 "mode": "push",
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "shadowBlurRadius": 15,
 "backgroundColor": [
  "#000000"
 ],
 "pressedFontColor": "#000000",
 "click": "this.mainPlayList.set('selectedIndex', 18)",
 "layout": "horizontal",
 "minWidth": 1,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "fontStyle": "normal",
 "gap": 5,
 "shadowSpread": 1,
 "cursor": "hand",
 "propagateClick": true,
 "fontWeight": "normal",
 "shadow": false
},
{
 "paddingBottom": 0,
 "data": {
  "name": "Button house info"
 },
 "class": "Button",
 "iconWidth": 0,
 "id": "Button_06BF88FE_17C5_FA78_41B6_F87BB7C0AEE6",
 "left": "44.66%",
 "backgroundColorRatios": [
  0
 ],
 "width": 130,
 "fontFamily": "Moonet DEMO",
 "iconBeforeLabel": true,
 "borderSize": 0,
 "rollOverFontColor": "#DB9B4D",
 "shadowColor": "#000000",
 "backgroundColorDirection": "vertical",
 "fontSize": "35px",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "borderColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#CCCCCC",
 "iconHeight": 0,
 "rollOverBackgroundOpacity": 0,
 "rollOverShadow": false,
 "minHeight": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "height": 41.98,
 "top": "0%",
 "verticalAlign": "middle",
 "label": "STAGE AREA",
 "mode": "push",
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "shadowBlurRadius": 15,
 "backgroundColor": [
  "#000000"
 ],
 "pressedFontColor": "#000000",
 "click": "this.setPanoramaCameraWithCurrentSpot(this.PanoramaPlayListItem_15837CC0_1838_DA09_41B4_8D3DD507F976);; this.mainPlayList.set('selectedIndex', 9)",
 "layout": "horizontal",
 "minWidth": 1,
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "fontStyle": "normal",
 "gap": 5,
 "shadowSpread": 1,
 "cursor": "hand",
 "propagateClick": true,
 "fontWeight": "normal",
 "shadow": false
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3215FA24_0D96_89A9_418D_8C802C86B7D8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07023684_0D75_80FF_4192_0E4D5DFA9C5E_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32159A24_0D96_89A9_41A2_A099C39B5425",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE09A3D_0D96_899B_419F_4A56B32A5654",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE00A3E_0D96_8999_4197_548C3D91669E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE1DA3E_0D96_8999_41AA_1C2822634097",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE17A3E_0D96_8999_41A8_E468C277E6B3",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE11A3F_0D96_8997_417E_3158CC45537A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE2DA3F_0D96_8997_41A4_068E0686931B",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_7_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE26A3F_0D96_8997_41A0_AD3495656F22",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_8_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE22A3F_0D96_8997_419E_51AB26D3F5E5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_107D2844_0DEB_89E9_41A6_CFEF2F1D60CD_1_HS_9_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE14A40_0D96_89E9_4197_D5895F2F996A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3A4DD765_0EBA_87AB_41A6_C98EE3A2859F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320149F6_0D96_8AA9_41A7_176697EE8B2A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07063B29_0D6B_8036_4175_E35AE12E2F64_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320109F7_0D96_8A97_41A0_C01706AF4247",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07931402_0D6B_87FA_41A1_819F8D7E7B45_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320D99EF_0D96_8AB7_4136_ADF8A8E8433E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3219FA08_0D96_8979_41A4_F6FC57A14B32",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070625E9_0D6A_8036_41A3_88842D1A1E36_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32199A08_0D96_8979_419A_9600951F80E1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32045A00_0D96_8969_4192_8E3A21F31AA0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3205FA00_0D96_8969_4189_F19AB2592700",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07040A96_0D6B_801A_419A_0B32DDB6E389_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3205BA00_0D96_8969_41A3_6A20912A3F90",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3219EA05_0D96_896B_41A8_E066A44CC3D8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32198A06_0D96_8969_4198_CB6C14EA4632",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070400A4_0D6A_803E_41A5_3DA15D1EB4BA_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32195A06_0D96_8969_4185_033F0E7613A1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321C8A12_0D96_8969_419D_80B795C26340",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321C5A13_0D96_896F_4197_C20D1A2FEFE5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321DEA13_0D96_896F_4192_2FC11DDD7979",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07057D5A_0D6A_800A_4190_A059C2D210AF_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321D8A14_0D96_8969_417D_20E85CEACB5C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3A4EA764_0EBA_87A9_41A3_9D836EC46DC6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3A4EF764_0EBA_87A9_4194_4314BB0242CE",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0737DCFC_0D6B_800E_41A9_B1C66C5B7E7E_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3A4E3764_0EBA_87A9_419A_6E38DEDE7C19",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3212BA1F_0D96_8997_419E_086AA2A6E7E5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07113DC4_0D75_807E_4191_B2C3F25B40D2_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32127A1F_0D96_8997_419D_09CD070FEE5F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32132A21_0D96_89AB_41AB_35C5526FDF0F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07020F76_0D75_801A_41A8_99181EB5E2BB_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3214FA22_0D96_89A9_418F_1EA0E9E60883",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320239F8_0D96_8A99_419A_4FB6DD4DBEF6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3203D9F9_0D96_8A9E_4195_8CC8303010B2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07056AAF_0D6B_800A_419B_D17BBD813F0E_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320369FE_0D96_8A99_41A1_5F0D43A999DB",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321EBA15_0D96_896B_419A_B9778DA94D10",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321E4A16_0D96_8969_41A7_48C2FD1936AC",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321FFA16_0D96_8969_419E_5A0464491C5B",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704B10F_0D6A_8009_4199_533F07F794D0_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321F8A17_0D96_8997_4178_65C764DE380C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEA1A32_0D96_89A9_419D_EAE5812D5B02",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEB8A32_0D96_89A9_4189_88B495A09896",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEB3A33_0D96_89AF_41AA_9C4652FFB6E6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0714EB15_0D76_8019_41A7_E5F79B8D262C_0_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DECDA33_0D96_89AF_4196_6A788640B0E7",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEDCA34_0D96_89A9_419F_5AC044CE61B8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DED6A35_0D96_89AB_41A3_B2260F1F1DC0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DED3A35_0D96_89AB_4193_D38DE246B266",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071BDE51_0D76_8016_41A5_93B2CE5767D3_0_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEECA36_0D96_89A9_4172_F1A1C9B8AEF3",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321A8A0F_0D96_8977_41A7_903DFA178329",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321A3A0F_0D96_8977_41A7_40965DFD890D",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321BCA10_0D96_8969_416E_65FC29F32510",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07050958_0D6A_8016_41A2_EB0B19B8D497_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_321B9A10_0D96_8969_41A8_B352E40B094A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32168A25_0D96_89AB_4197_A03C4DB8B29E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07036C8A_0D75_800A_41A3_70A1C0CC1B40_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32162A26_0D96_89A9_4197_6C885F2E8954",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3211FA18_0D96_8999_41A1_2ABA01F1431A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_0704D619_0D6A_8016_41A3_6F2FE2A7DFA3_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3211BA18_0D96_8999_419D_46F006564D5A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32060A02_0D96_8969_41A3_BBAEC078FD9E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3207DA03_0D96_896F_4196_D3D3DC4872A5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_07059A67_0D6B_803A_4191_9A79E662F85C_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_32076A03_0D96_896F_4192_AEADED8BF352",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEE4A36_0D96_89A9_4191_CF968B4F855A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_3_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEF7A37_0D96_8997_417F_4E0D7F3D12D7",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1BAE58CB_0DAF_8009_41A6_1263CBB1F1EB_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEF3A3D_0D96_899B_4196_39137A2E6376",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE85A28_0D96_89B9_418F_0E7E458BD5B8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE9EA29_0D96_89BB_41A3_10109CE6067A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE9BA2E_0D96_89B9_419F_E5615DAB10C2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE8FA2F_0D96_89B7_419C_4950A6B24728",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_7_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE86A2F_0D96_89B7_419A_2993AE2483A8",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_8_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE82A30_0D96_89A9_41A8_4FFFACE65538",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_9_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE9EA30_0D96_89A9_41A0_DDDC25E89B7A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_10_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE9BA30_0D96_89A9_418B_40B467A4DB08",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_11_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DE95A30_0D96_89A9_418B_A51FEA3B2959",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_071AE771_0D76_8016_4199_4528BEAFCD87_0_HS_12_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4DEACA31_0D96_89AB_418B_CFDF82A39BB5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320F29F3_0D96_8AAF_4159_040A6CBEDB72",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3200F9F4_0D96_8AA9_419A_611EFDCB5CFE",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_070AAB72_0D6B_801A_41A3_7F76811209DD_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_320089F4_0D96_8AA9_419E_5706E61A91F1",
 "class": "AnimatedImageResource"
}],
 "mouseWheelEnabled": true,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
