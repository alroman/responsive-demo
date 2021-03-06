// ViewPort script
(function() {
	// Create the iFrame
	var iframe    = document.createElement('iframe');
	
	// Get the current document height and width
	var docHeight = $(document).height() - 45;
	var docWidth  = $(document).width();
	
	// iFrame attributes
	iframe.src    = 'https://preview.ccle.ucla.edu';
	iframe.className = 'viewport';
	iframe.height = docHeight;
	iframe.width  = docWidth;
	
	// Append to body
	document.body.appendChild(iframe);
	
	// New URL submit
	$('#url').submit(function() {
	
		// Get the input value (URL)
		var inputValue = document.getElementById('input').value;
		
		// If the input doesn't have a value, show error
		// Else, update the input value with the new source
		if(!inputValue) {
			document.getElementById('input').className = 'warning';
			return false;
		} else {
			// If the input doesn't contain http:// - add it!
			if(inputValue.substr(0,7) != 'http://'){
				iframe.src = 'http://' + inputValue;
			} else {
				iframe.src = inputValue;
			}

		return false;
		} 
	});
	
	// New width submit
	$('#addwidth').submit(function() {
	
		// Get the input value (Submit)
		var inputValue = document.getElementById('pixel').value;
		
		// If the input doesn't have a value, show error
		// Else, create a new list element and append data-* attribute
		if(!inputValue) {
			document.getElementById('pixel').className = 'warning';
			return false;
		} else {
			// Check if any letters are in the value
			// Append li attributes with custom width
			if(isNaN(inputValue)) {
				alert('Numbers only please, don\'t add the \'px\'');
			} else {
				var li = document.createElement('li');
				li.setAttribute('data-width', inputValue);
				li.className = 'custom-width';
				li.innerHTML = inputValue + 'px';
				document.getElementById('viewports').appendChild(li);
			}
			return false;
		} 
	});
	
	// Scrollbar test
	var scrollBars = document.createElement('div');
	scrollBars.className = 'scroll-test';
	document.body.appendChild(scrollBars);
	
	// Find the scrollbar width
	var scrollbarWidth = scrollBars.offsetWidth - scrollBars.clientWidth;
	document.body.removeChild(scrollBars);
	
	// Using jQuery on for dynamic element click events
	$('body').on('click', '#viewports li', function() {
		
		// For any list item add/remove 'active' class
		$(this).addClass('active').siblings().removeClass('active');
		
		// If the class is the reset button, reset the width
		// Else, animate the viewport and add any scrollbar widths
		if($(this).hasClass('reset')) {
			$(iframe).css({'display': 'block'}).animate({width: docWidth}, 'slow');
		} else {
			var dataWidth = this.getAttribute('data-width');
			var fullWidth = +dataWidth + +scrollbarWidth;
			$(iframe).css({'display': 'block'}).animate({width: fullWidth}, 'slow');
		}
	});
	
	// Onload remove the ajax loader
	window.onload = function() {
		document.getElementById('ajax').remove();
	}
})();
