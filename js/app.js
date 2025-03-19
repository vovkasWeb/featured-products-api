import { renderProducts } from './render.js'

document.addEventListener('DOMContentLoaded', () => {
	renderProducts()


	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('.products__item').forEach(item => {
			item.addEventListener('click', () => {
				const firstImg = item.querySelector('.product__item-img.first')
				const secondImg = item.querySelector('.product__item-img.second')

				if (firstImg && secondImg) {
					firstImg.style.opacity = firstImg.style.opacity === '0' ? '1' : '0'
					secondImg.style.opacity = secondImg.style.opacity === '0' ? '1' : '0'
				}
			})
		})
	})

	document.querySelectorAll('.accordion-header').forEach(header => {
		header.addEventListener('click', function () {
			let content = this.nextElementSibling
			let parentItem = this.parentElement
			let icon = this.querySelector('.info__accordion-icon') 

			
			document.querySelectorAll('.accordion-content').forEach(item => {
				if (item !== content) {
					item.style.maxHeight = null
					item.parentElement.style.background = ''

					let otherIcon = item.previousElementSibling.querySelector(
						'.info__accordion-icon'
					)
					if (otherIcon) {
						otherIcon.src = './img/plus.png'
					}
				}
			})

			
			if (content.style.maxHeight) {
				content.style.maxHeight = null
				parentItem.style.background = '' 
				if (icon) icon.src = './img/plus.png' 
			} else {
				content.style.maxHeight = content.scrollHeight + 'px'
				parentItem.style.background = '#D7ECEC' 
				if (icon) icon.src = './img/minus.png' 
			}
		})
	})
})
