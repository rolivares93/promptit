function promptit(params, callback) {
	var allowLabel = params.allow.trim() || 'Ok';
	var disallowLabel = params.disallow.trim() || 'Cancel';
	var placeholder = params.placeholder.trim() || 'Input here';
	var body = document.body;
	var pptLayer = document.createElement('div');
	var pptContainer = document.createElement('div');
	var pptBox = document.createElement('div');
	var pptMessage = document.createElement('p');
	var pptPlaceholder = document.createElement('span');
	var pptInput = document.createElement('input');
	var pptBtns = document.createElement('ul');
	var pptBtnAllow = document.createElement('li');
	var pptBtnSeparator = document.createElement('li');
	var pptBtnDisallow = document.createElement('li');

	pptLayer.classList.add('ppt-layer');
	pptContainer.classList.add('ppt-container');
	pptBox.classList.add('ppt-box');
	pptMessage.classList.add('ppt-message');
	pptPlaceholder.classList.add('ppt-placeholder');
	pptInput.classList.add('ppt-input');
	pptInput.setAttribute('type', 'text');
	pptInput.setAttribute('autocomplete', 'off');
	pptBtns.classList.add('ppt-btns');
	pptBtnAllow.classList.add('ppt-btn');
	pptBtnAllow.classList.add('btn-allow');
	pptBtnDisallow.classList.add('ppt-btn');
	pptBtnDisallow.classList.add('btn-disallow');
	pptBtnSeparator.classList.add('ppt-btn');
	pptBtnSeparator.classList.add('btn-separator');

	pptMessage.textContent = params.message.trim();
	pptPlaceholder.textContent = placeholder.trim();
	pptBtnAllow.textContent = allowLabel.trim();
	pptBtnDisallow.textContent = disallowLabel.trim();
	pptBtnSeparator.innerHTML = '&bull;';

	pptBtns.appendChild(pptBtnAllow);
	pptBtns.appendChild(pptBtnSeparator);
	pptBtns.appendChild(pptBtnDisallow);

	pptBox.appendChild(pptMessage);
	pptBox.appendChild(pptPlaceholder);
	pptBox.appendChild(pptInput);
	pptBox.appendChild(pptBtns);

	pptContainer.appendChild(pptBox);

	pptLayer.appendChild(pptContainer);

	body.appendChild(pptLayer);

	setTimeout(function() {
		pptLayer.classList.add('visible');
		pptContainer.classList.add('visible');
		pptInput.focus();
	}, 100);

	pptBtnDisallow.addEventListener('click', function() {
		pptLayer.classList.remove('visible');
		pptContainer.classList.remove('visible');

		setTimeout(function() {
			pptLayer.remove();
		}, 350);
	});

	pptBtnAllow.addEventListener('click', function() {
		if (typeof callback === 'function') {
			if (pptInput.value.trim().length) {
				pptLayer.classList.remove('visible');
				pptContainer.classList.remove('visible');

				setTimeout(function() {
					callback(pptInput.value.trim());
					pptLayer.remove();
				}, 350);
			} else {
				pptInput.setAttribute('placeholder', 'Required field');
			}
		}
	});
}
