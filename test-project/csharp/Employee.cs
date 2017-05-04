public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public PositionEnum Position { get; set; }
    public StatusEnum Status { get; set; }
    public TimeSpan WorkSchedule { get; set; }
    public Benefits Benefits { get; set; }
    public Employee Manager { get; set; }
}