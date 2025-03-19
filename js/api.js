export const fetchProducts = async () => {
	const query = `
  {
    products(first: 10) {
      edges {
        node {
          title
          description
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

	try {
		const response = await fetch(
			'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token':
						'7e174585a317d187255660745da44cc7',
				},
				body: JSON.stringify({ query }),
			}
		)

		if (!response.ok) throw new Error(`Ошибка сети: ${response.statusText}`)

		const { data } = await response.json()
		return data?.products?.edges || []
	} catch (error) {
		console.error('Ошибка загрузки товаров:', error)
		return []
	}
}
