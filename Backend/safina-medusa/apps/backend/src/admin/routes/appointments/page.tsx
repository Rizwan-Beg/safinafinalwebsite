import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Calendar } from "@medusajs/icons"
import { Container, Heading, Text, Table, Badge, Select } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const config = defineRouteConfig({
  label: "Appointments",
  icon: Calendar,
})

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Completed", label: "Completed" },
  { value: "Missed", label: "Missed" },
  { value: "Cancelled", label: "Cancelled" },
]

function badgeColor(status: string): "orange" | "green" | "red" | "blue" | "grey" {
  switch (status) {
    case "Pending":
      return "orange"
    case "Confirmed":
      return "blue"
    case "Completed":
      return "green"
    case "Missed":
    case "Cancelled":
      return "red"
    default:
      return "grey"
  }
}

export default function AppointmentsPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await fetch("/admin/appointments")
      return res.json()
    }
  })

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch("/admin/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
  })

  return (
    <Container className="p-8">
      <Heading level="h1" className="mb-4">Booked Appointments</Heading>
      <Text className="text-ui-fg-subtle mb-8">
        Manage customer meetings and consultations booked through the storefront.
      </Text>

      {isLoading ? (
        <Text>Loading appointments...</Text>
      ) : !data?.appointments?.length ? (
        <Text className="text-ui-fg-muted">No appointments yet.</Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Contact Info</Table.HeaderCell>
              <Table.HeaderCell>Date & Time</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Update Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.appointments.map((appt: any) => (
              <Table.Row key={appt.id}>
                <Table.Cell className="font-semibold">{appt.customer_name || appt.customerName}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="text-ui-fg-base">{appt.email}</span>
                    <span className="text-ui-fg-muted">{appt.phone}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="text-ui-fg-base">{appt.date}</span>
                    <span className="text-ui-fg-muted">{appt.time}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="max-w-[200px] truncate" title={appt.notes}>
                  {appt.notes || "No notes"}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={badgeColor(appt.status)}>
                    {appt.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Select
                    value={appt.status}
                    onValueChange={(value) => {
                      updateStatus.mutate({ id: appt.id, status: value })
                    }}
                  >
                    <Select.Trigger>
                      <Select.Value placeholder="Change status" />
                    </Select.Trigger>
                    <Select.Content>
                      {STATUS_OPTIONS.map((opt) => (
                        <Select.Item key={opt.value} value={opt.value}>
                          {opt.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}
