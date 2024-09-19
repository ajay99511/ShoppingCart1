using System.Text.Json.Serialization;

namespace API.Entities;
public class Product
{
    // [JsonIgnore]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; }
    public string PictureUrl { get; set; }
    public string Type { get; set; }
    public string Brand { get; set; }
    public int QuantityInStock  { get; set; }
}        


// public static async Task Main(string[] args)
//     {
//         // Read JSON data from file
//         string filePath = "C:\Users\ajaye\ReStore\API\Data\productSeed.json";
//         string jsonData = await File.ReadAllTextAsync(filePath);

//         // Deserialize the JSON into a list of products
//         List<Product> products = JsonSerializer.Deserialize<List<Product>>(jsonData);

//         // Insert into SQL Server
//         string connectionString = "your_connection_string";
//         using (SqlConnection connection = new SqlConnection(connectionString))
//         {
//             await connection.OpenAsync();
            
//             foreach (var product in products)
//             {
//                 string query = "INSERT INTO Products (Name, Price, Description) VALUES (@Name, @Price, @Description)";
                
//                 using (SqlCommand command = new SqlCommand(query, connection))
//                 {
//                     command.Parameters.AddWithValue("@Name", product.Name);
//                     command.Parameters.AddWithValue("@Price", product.Price);
//                     command.Parameters.AddWithValue("@Description", product.Description);

//                     await command.ExecuteNonQueryAsync();
//                 }
//             }
//         }

//         Console.WriteLine("Data inserted successfully!");
//     }