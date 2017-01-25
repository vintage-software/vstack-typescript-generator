public class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public PositionEnum Position { get; set; }
    public StatusEnum Status { get; set; }
    public TimeSpan WorkSchedule { get; set; }
    public Benefits Benefits { get; set; }
}