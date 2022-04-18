namespace WebApi.Entities;

public class BikesData
{
    public long Last_Updated { get; set; }
    public long Ttl { get; set; }
    public Data Data { get; set; }
}
public class Data
{
    public List<Bike> Bikes { get; set; }
}

public class Bike
{
    public string Bike_Id { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
    public long Is_Reserved { get; set; }
    public long Is_Disabled { get; set; }
    public string Vehicle_Type { get; set; }
    public Uri Android { get; set; }
    public Uri Ios { get; set; }
}
