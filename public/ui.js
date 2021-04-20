// needed for creating drag

(function() {
	const gutter = document.getElementById("gutter");
	const app = gutter.parentElement;
	const index = 1;

	var isDragging = false;
	var w, h, template, pos, max;

	var init = function() {

		w = gutter.clientWidth;
		h = gutter.clientHeight;

		if (w < h) {
			app.style.gridTemplateRows = "";
			template = window.getComputedStyle(app).gridTemplateColumns.split(" ");
		} else {
			app.style.gridTemplateColumns = "";
			template = window.getComputedStyle(app).gridTemplateRows.split(" ");
		}
	};  

	var down = function(event) {
		isDragging = true;
		app.style.cursor = w < h ? "col-resize" : "row-resize";
	};

	var up = function(event) {
		isDragging = false;
		app.style.cursor = "auto";
	};

	var move = function(event) {
		if (isDragging) {

			if (document.selection) {
				document.selection.empty()
			} else {
				window.getSelection().removeAllRanges()
			}

			if (w < h) {

				if (typeof event.touches === 'undefined') {
					pos = event.clientX - w / 2;
				} else {
					pos = event.touches[0].clientX - w / 2;
				}
				max = this.clientWidth - w;

			} else {

				if (typeof event.touches === 'undefined') {
					pos = event.clientY - h / 2;
				} else {
					pos = event.touches[0].clientY - h / 2;
				}
				max = this.clientHeight - h - 40;

			}
			pos = pos >= max ? max : pos;
			pos = pos <= 0 ? 0 : pos;

			template[index - 1] = pos.toString() + "px";
			template[index + 1] = "auto";

			if (w < h) {
				this.style.gridTemplateColumns = template.join(" ");
			} else {
				this.style.gridTemplateRows = template.join(" ");
			}
			event.preventDefault();
		}
	};

	init();

	window.addEventListener('resize', init);
	gutter.addEventListener('touchstart', down);
	gutter.addEventListener('mousedown', down);
	document.addEventListener('touchend', up);
	document.addEventListener('mouseup', up);
	app.addEventListener('touchmove', move);
	app.addEventListener('mousemove', move);

})();