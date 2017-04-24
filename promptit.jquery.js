function promptit(obj, callback) {
	var allow = $.trim(obj.allow) || 'Ok';
	var disallow = $.trim(obj.disallow) || 'Cancel';
	var placeholder = $.trim(obj.placeholder) || 'Your input here';
	var $pptLayer = $('<div class="ppt-layer"></div>');
	var $pptContainer = $('<div class="ppt-container"></div>');
	var $pptBox = $('<div class="ppt-box"></div>');
	var $pptMessage = $('<p class="ppt-message">' + $.trim(obj.message) + '</p>');
	var $pptPlaceholder = ('<span class="ppt-placeholder">' + placeholder + '</span>');
	var $pptInput = $('<input type="text" class="ppt-input" autocomplete="off">');
	var $pptBtns = $('<ul class="ppt-btns"></ul>');
	var $pptBtnAllow = $('<li class="ppt-btn btn-allow">' + allow + '</li>');
	var $pptBtnSeparator = $('<li class="ppt-btn btn-separator">&bull;</li>');
	var $pptBtnDisallow = $('<li class="ppt-btn btn-disallow">' + disallow + '</li>');

	$pptBtns
		.append($pptBtnAllow)
		.append($pptBtnSeparator)
		.append($pptBtnDisallow);
	$pptBox
		.append($pptMessage)
		.append($pptPlaceholder)
		.append($pptInput)
		.append($pptBtns);
	$pptContainer.append($pptBox);
	$pptLayer.append($pptContainer);
	$('body').append($pptLayer);

	setTimeout(function() {
		$pptLayer.addClass('visible');
		$pptContainer.addClass('visible');
		$pptInput.focus();
	}, 100);

	$pptBtnDisallow.on('click', function(e) {
		$pptLayer.removeClass('visible');
		$pptContainer.removeClass('visible');

		setTimeout(function() {
			$pptLayer.remove();
		}, 350);
	});

	$pptBtnAllow.on('click', function(e) {
		if (typeof callback === 'function') {
			if ($.trim($pptInput.val()).length) {
				$pptLayer.removeClass('visible');
				$pptContainer.removeClass('visible');

				setTimeout(function() {
					callback($.trim($pptInput.val()));
					$pptLayer.remove();
				}, 350);
			} else {
				$pptInput.attr('placeholder', 'Required field');
			}
		}
	});

	$pptInput.on('keypress', function(e) {
		if (e.keyCode == 13) {
			var	$this = $(this);

			if (typeof callback === 'function') {
				if ($.trim($this.val()).length) {
					$this
						.parents('.ppt-container').removeClass('ppt-visible')
						.parents('.ppt-layer').removeClass('ppt-visible');

					setTimeout(function() {
						callback($.trim($pptInput.val()));
						$this.parents('.ppt-layer').remove();
					}, 300);
				} else {
					$this.attr('placeholder', 'Required field');
				}
			}
		}
	});
};
