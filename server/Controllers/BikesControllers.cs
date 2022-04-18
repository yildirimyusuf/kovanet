namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using RestSharp;
using System.Threading.Tasks;
using System.Text.Json;
using WebApi.Entities;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BikesController : ControllerBase
{
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    private readonly RestClient _client;

    public BikesController(
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _client = new RestClient("https://announcekit-cdn.s3.amazonaws.com/");
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    [HttpGet("getVehicleStatus")]
    public async Task<IActionResult> GetVehicleStatusAsync()
    {
        var request = new RestRequest("bikes.json");
        var response = await _client.ExecuteGetAsync(request);
        BikesData bikesData = JsonSerializer.Deserialize<BikesData>(response.Content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        return Ok(bikesData);
    }

    [HttpGet("getData")]
    public async Task<IActionResult> GetDataAsync()
    {
        var request = new RestRequest("bikes.json");
        var response = await _client.ExecuteGetAsync(request);
        BikesData bikesData = JsonSerializer.Deserialize<BikesData>(response.Content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        Data data = bikesData.Data;
        return Ok(data);
    }

    [HttpGet("getAllbikes")]
    public async Task<IActionResult> GetAllbikesAsync()
    {
        var request = new RestRequest("bikes.json");
        var response = await _client.ExecuteGetAsync(request);
        BikesData bikesData = JsonSerializer.Deserialize<BikesData>(response.Content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        List<Bike> bikes = bikesData.Data.Bikes;
        return Ok(bikes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBikeByIdAsync(string id)
    {
        var request = new RestRequest("bikes.json");
        var response = await _client.ExecuteGetAsync(request);
        BikesData bikesData = JsonSerializer.Deserialize<BikesData>(response.Content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        List<Bike> bike = bikesData.Data.Bikes;
        foreach(var item in bike)
        {
            if (item.Bike_Id == id.ToString())
            {
                bike.Clear();
                bike.Add(item);

                return Ok(bike);
            }
               
        }
        return NotFound();
    }

}