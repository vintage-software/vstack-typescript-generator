public interface IHuman : IMammal
{
        string Name { get; }

        int Height { get; }

        // nullable because maybe I don't want to tell!
        int? Weight { get; }

        List<string> Appendages { get; }
}