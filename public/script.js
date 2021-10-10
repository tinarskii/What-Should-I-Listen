const songs = [];

fetch('https://raw.githubusercontent.com/narze/torpleng/main/README.md')
	.then(res => res.text())
	.then(data => {
		var lyrics = data
		.split('\n')
		.filter((line) => /(youtu\.be|(?:www\.|.*)youtube.com)/.test(line));
		var i = 1;
		lyrics.forEach((line) => {
			let match = line.match(/- (.*) \[(.*)\]\(http(?:s|.*)\:\/\/(?:www|m|.*)(?:\.|.*)(?:youtu\.be|youtube\.com)\/(?:watch\?v=|.*)([A-Za-z0-9_\-]{11})(?:\?|&|#)t=(\d+)(?:s|.*)\).*/);
			if (match === null || match.length !== 5) {
				console.log(`error: can not parse "${line}"`);
				return;
			}
			songs.push({
				author: match[2],
				id: match[3],
				pos: i
			});
			i++;
		})
		if(!location.hash) {
			var randomNum = Math.floor(Math.random() * songs.length)
			var randomSong = songs[randomNum].author;
			location.hash = "#" + (randomNum + 1)
			document.querySelector(".song").innerHTML = randomSong;
			document.querySelector("#playframe").src = "https://www.youtube.com/embed/" + songs[randomNum].id + "?autoplay=1";
		} else if(location.hash.slice(1) <= songs.length) {
			document.querySelector(".song").innerHTML = songs[location.hash.slice(1) - 1].author;
			document.querySelector("#playframe").src = "https://www.youtube.com/embed/" + songs[location.hash.slice(1) - 1].id + "?autoplay=1";	
		}
		window.onhashchange = function() {
			if(!location.hash.slice(1)) {
				var randomNum = Math.floor(Math.random() * songs.length)
				var randomSong = songs[randomNum].author;
				location.hash = "#" + (randomNum + 1)
				document.querySelector(".song").innerHTML = randomSong;
				document.querySelector("#playframe").src = "https://www.youtube.com/embed/" + songs[randomNum].id + "?autoplay=1";	
			}
			document.querySelector(".song").innerHTML = songs[location.hash.slice(1) - 1].author;
			document.querySelector("#playframe").src = "https://www.youtube.com/embed/" + songs[location.hash.slice(1) - 1].id + "?autoplay=1";	
		}
		document.querySelector(".fwd").onclick = function() {
			var position = parseInt(window.location.hash.slice(1));
			if (!position) {
				return (window.location.href = '#1');
			} else if (position === songs.length) {
				return;
			}
			window.location.href = '#' + (position + 1);
		}
		document.querySelector(".bwd").onclick = function() {
			var position = parseInt(window.location.hash.slice(1));
			if (!position) {
				return (window.location.href = '#1');
			} else if (position === 1) {
				return;
			}
			window.location.href = '#' + (position - 1);
		}

	})

	function resetHash() {
		location.hash = ""
	}
