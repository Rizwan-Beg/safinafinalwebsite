import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Heart } from "@medusajs/icons"
import { Container, Heading, Text, Table, Badge } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"

export const config = defineRouteConfig({
  label: "Favorites",
  icon: Heart,
})

export default function FavoritesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/admin/favorites")
      return res.json()
    }
  })

  return (
    <Container className="p-8">
      <Heading level="h1" className="mb-4">Customer Favorites</Heading>
      <Text className="text-ui-fg-subtle mb-8">
        View products that logged-in customers have added to their favorites (wishlist).
      </Text>

      {isLoading ? (
        <Text>Loading favorites...</Text>
      ) : !data?.favorites?.length ? (
        <Text className="text-ui-fg-muted">No favorites have been added yet.</Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Product ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.favorites.map((fav: any) => (
              <Table.Row key={fav.id}>
                <Table.Cell className="font-semibold">
                  {fav.customer_name || "Unknown"}
                </Table.Cell>
                <Table.Cell className="text-ui-fg-muted">
                  {fav.customer_email || "N/A"}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    {fav.product_thumbnail && (
                      <img 
                        src={fav.product_thumbnail} 
                        alt={fav.product_title} 
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-ui-fg-base font-medium">{fav.product_title}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge size="small" color="grey">{fav.product_handle || fav.product_id}</Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}
