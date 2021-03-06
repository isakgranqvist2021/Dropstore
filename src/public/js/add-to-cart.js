/*
    element: string;
    className: string, 
    attributes: {
        key: string;
        value: string;
    }[];
*/
const createElement = (options) => {
	if (!options.element) return null;

	const element = document.createElement(options.element);

	if (options.className) {
		element.className = options.className;
	}

	if (options.attributes && options.attributes.length > 0) {
		options.attributes.forEach((attribute) => {
			element.setAttribute(attribute.key, attribute.value);
		});
	}

	if (options.text) {
		element.textContent = options.text;
	}

	return element;
};

const appendAlert = (text, severity) => {
	if (!text) return;

	const alertContainer = document.getElementById('alert-container');

	Array.from(alertContainer.children).forEach((child) => {
		alertContainer.removeChild(child);
	});

	const alertElement = createElement({
		element: 'div',
		className: 'uk-alert-' + severity,
		attributes: [{ key: 'uk-alert', value: '' }],
	});

	alertElement.appendChild(
		createElement({
			element: 'a',
			className: 'uk-alert-close',
			attributes: [{ key: 'uk-close', value: '' }],
		})
	);

	alertElement.appendChild(createElement({ text, element: 'p' }));

	alertContainer.appendChild(alertElement);
};

const addToCart = async (productId, productName) => {
	const addToCartButton = document.getElementById('add-to-cart');

	addToCartButton.setAttribute('disabled', true);

	try {
		const quantityInput = document.querySelector('[name=quantity]');

		const quantity = parseInt(quantityInput.value);

		const requestInit = {
			method: 'POST',
			body: JSON.stringify({ quantity }),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await (
			await fetch('/cart/add-to-cart/' + productId, requestInit)
		).json();

		appendAlert(res.message, res.success ? 'success' : 'danger');

		if (res.success) {
			addToCartButton.removeAttribute('disabled');
			UIkit.modal(document.getElementById('next-step-modal')).show();
			document.querySelector('modal-product-name').textContent = productName;
		}
	} catch (err) {
		return;
	}

	addToCartButton.removeAttribute('disabled');
};

const closeModal = () => {
	UIkit.modal(document.getElementById('next-step-modal')).hide();
};
