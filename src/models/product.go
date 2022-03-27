package models

import "github.com/stripe/stripe-go/v72"

type Product struct {
	ID          int64
	Amount      int64
	Description string
	Image       Image
	Features    []string
	Name        string
	Stock       int64
}

func (product *Product) ConvertToStripeProduct() *stripe.CheckoutSessionLineItemParams {
	return &stripe.CheckoutSessionLineItemParams{
		Quantity: stripe.Int64(1),
		Currency: stripe.String("SEK"),
		Name:     stripe.String(product.Name),
		Amount:   stripe.Int64(product.Amount * 100),
	}
}

func ConvertProductsToStripeLineItems(products *[]Product) []*stripe.CheckoutSessionLineItemParams {
	var lineItems []*stripe.CheckoutSessionLineItemParams

	for i := 0; i < len(*products); i++ {
		lineItems = append(
			lineItems,
			(*products)[i].ConvertToStripeProduct(),
		)
	}

	return lineItems
}
