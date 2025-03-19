import { fetchProducts } from './api.js'

export const renderProducts = async () => {
	const productsWrapper = document.querySelector('.products__wrapper')
	const products = await fetchProducts()
	productsWrapper.innerHTML = '' // Очищаем контейнер перед добавлением

	products.forEach(({ node }) => {
        console.log(node);
		const {
			title,
			description = 'Описание отсутствует',
			variants: { edges: variantEdges },
			images: { edges: imageEdges },
		} = node

		const price = variantEdges[0]?.node?.price || {
			amount: 'N/A',
			currencyCode: '',
		}
		const compareAtPrice = variantEdges[0]?.node?.compareAtPrice || {
			amount: '',
			currencyCode: '',
		}

		// Берем первое изображение (основное) и второе (если есть)
		const imageUrl = imageEdges[0]?.node?.url || './default.jpg'
		const hoverImageUrl = imageEdges[1]?.node?.url || imageUrl // Если второго нет, оставляем первое

		const productHTML = `
			<div class="products__item">
				<img class="product__item-img" src="${imageUrl}" alt="${title}" data-hover-img="${hoverImageUrl}" />
				<div class="products__item-body">
					<span class="product__item-name">${title}</span>
					<p class="product__item-descriptions">${description}</p>
					<div class="product__item-price">
						<span class="product__item-price-old">${
							compareAtPrice.amount
								? `${compareAtPrice.amount} ${compareAtPrice.currencyCode}`
								: ''
						}</span>
						<span class="product__item-price-new">${price.amount} ${
			price.currencyCode
		}</span>
					</div>
				</div>
			</div>
		`

		productsWrapper.insertAdjacentHTML('beforeend', productHTML)
	})

	// Добавляем логику hover для всех товаров
	document.querySelectorAll('.product__item-img').forEach(img => {
		const hoverImg = img.getAttribute('data-hover-img')
		const originalImg = img.src

		if (hoverImg && hoverImg !== originalImg) {
			img.addEventListener('mouseenter', () => {
				img.src = hoverImg
			})
			img.addEventListener('mouseleave', () => {
				img.src = originalImg
			})
		}
	})
}
