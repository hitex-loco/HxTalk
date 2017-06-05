window.onload = function() {

	var room = location.search && location.search.split('?')[1];

	var webrtc = new SimpleWebRTC({
		localVideoEl: 'localVideo',
		remoteVideosEl: 'remotes',
		autoRequestMedia: true
	});

	webrtc.on('readyToCall',function(){
		if(room) webrtc.joinRoom(room);
	});

	function setRoom(name) {
		$('form').remove();
		$('h1').text('Welcome to room : '+name);
		$('#roomLink').text('Room created, your room link is : '+location.href);
		$('body').addClass('active');
	}

	if(room) {
		setRoom(room);
	} else {
		$('form').submit(function(){
			var val = $('#sessionInput').val();
			webrtc.createRoom(val,function(err,name){
				var newUrl = location.pathname + '?' + name;
				if(!err) {
					history.replaceState({foo: 'bar'},null,newUrl);
					setRoom(name);
				}
			});
			return false;
		});
	}

}