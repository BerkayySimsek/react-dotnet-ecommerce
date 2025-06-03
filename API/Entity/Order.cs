namespace API.Entity;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Phone { get; set; }
    public string? City { get; set; }
    public string? AddressLine { get; set; }
    public string? CustomerId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public List<OrderItem> OrderItems { get; set; } = new();
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }
    
    public string? ConversationId { get; set; }
    public string? BasketId { get; set; }
    public decimal GetTotal()
    {
        return SubTotal + DeliveryFee;
    }

}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order? Order { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public string? ProductName { get; set; }
    public string? ProductImage { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

}

public enum OrderStatus
{
    Pending,
    Approved,
    PaymentFailed,
    Completed
}