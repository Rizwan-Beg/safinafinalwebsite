import { medusaClient } from "../lib/medusa";

/**
 * Fetches products from Medusa and maps them to the exact shape 
 * that the original custom MongoDB backend used. This prevents having 
 * to rewrite every single UI component.
 */
export const fetchProducts = async (regionId = 'reg_01KRQKQ7G3BFCGV3NT7HT91ZJA') => {
  try {
    const { products } = await medusaClient.products.list({
      limit: 100,
      region_id: regionId,
      fields: "*variants.calculated_price,*variants.prices"
    });

    return products.map(product => {
      // Find default variant for pricing and id
      const defaultVariant = product.variants?.[0] || {};
      
      // Attempt to extract options (like size, material, color) if they exist
      // Medusa stores these in options and variants. For simplicity, we fallback to strings if empty.
      const sizeOption = product.options?.find(o => o.title.toLowerCase() === 'size');
      const materialOption = product.options?.find(o => o.title.toLowerCase() === 'material');
      
      // Calculate a base price. Medusa v2 prices are in calculated_price object.
      // USER REQUEST: 1:1 Pricing. What is entered in Admin (e.g. 10000) shows as 10000 on site.
      let rawPrice = 0; 
      
      if (defaultVariant.calculated_price && typeof defaultVariant.calculated_price === 'object') {
        rawPrice = defaultVariant.calculated_price.calculated_amount || 0;
      } else if (defaultVariant.calculated_price && typeof defaultVariant.calculated_price === 'number') {
        rawPrice = defaultVariant.calculated_price;
      } else if (defaultVariant.prices && defaultVariant.prices.length > 0) {
        // Try to find INR price first
        const inrPrice = defaultVariant.prices.find(p => p.currency_code === 'inr');
        if (inrPrice) {
          rawPrice = inrPrice.amount || 0;
        } else {
          // Fallback to USD or first price
          const priceObj = defaultVariant.prices.find(p => p.currency_code === 'usd') || defaultVariant.prices[0];
          rawPrice = priceObj.amount || 0;
        }
      }

      // If price is missing, use fallback of 10000
      if (rawPrice <= 0) { 
        rawPrice = 10000; 
      }

      const basePriceInRupees = rawPrice; // NO DIVISION BY 100 (1:1 Pricing)
      // Add 5% GST manually for display consistency
      const priceWithTax = Math.round(basePriceInRupees * 1.05);

      return {
        _id: product.id,
        id: product.id,
        name: product.title,
        description: product.description,
        imageUrl: product.thumbnail || (product.images && product.images.length > 0 ? product.images[0].url : "https://placehold.co/400x400/f8f8f8/333333?text=No+Image"),
        category: product.collection?.title || "Carpets",
        material: materialOption ? materialOption.values[0]?.value : "Wool & Cotton",
        color: "Terracotta / Beige", 
        size: sizeOption ? sizeOption.values[0]?.value : "4x6 ft",
        price: priceWithTax, 
        basePrice: basePriceInRupees,
        createdAt: product.created_at,
        variant_id: defaultVariant.id, 
        variants: product.variants
      };
    });
  } catch (error) {
    console.error("Error fetching products from Medusa:", error);
    return [];
  }
};

export const fetchProductById = async (id, regionId = 'reg_01KRQKQ7G3BFCGV3NT7HT91ZJA') => {
  try {
    const { product } = await medusaClient.products.retrieve(id, {
      region_id: regionId,
      fields: "*variants.calculated_price,*variants.prices"
    });
    
    const defaultVariant = product.variants?.[0] || {};
    
    let rawPrice = 0;
    if (defaultVariant.calculated_price && typeof defaultVariant.calculated_price === 'object') {
      rawPrice = defaultVariant.calculated_price.calculated_amount || 0;
    } else if (defaultVariant.calculated_price && typeof defaultVariant.calculated_price === 'number') {
      rawPrice = defaultVariant.calculated_price;
    } else if (defaultVariant.prices && defaultVariant.prices.length > 0) {
      const inrPrice = defaultVariant.prices.find(p => p.currency_code === 'inr');
      if (inrPrice) {
        rawPrice = inrPrice.amount || 0;
      } else {
        const priceObj = defaultVariant.prices.find(p => p.currency_code === 'usd') || defaultVariant.prices[0];
        rawPrice = priceObj.amount || 0;
      }
    }

    if (rawPrice <= 0) {
      rawPrice = 10000;
    }

    const basePriceInRupees = rawPrice; // 1:1 Pricing
    const priceWithTax = Math.round(basePriceInRupees * 1.05);

    return {
      id: product.id,
      name: product.title,
      price: priceWithTax,
      basePrice: basePriceInRupees,
      image: product.thumbnail,
      imageUrl: product.thumbnail,
      category: product.type?.value || 'Carpets',
      description: product.description,
      variants: product.variants,
    };
  } catch (error) {
    console.error("Error fetching product from Medusa:", error);
    throw error;
  }
};
