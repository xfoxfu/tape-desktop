using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Text;
using ReactiveUI;

namespace Me.Xfox.Tape.Desktop.ViewModels;

public class MainWindowViewModel : ViewModelBase
{
    // private string username = string.Empty;
    // public string Username
    // {
    //     get => username;
    //     set => this.RaiseAndSetIfChanged(ref username, value);
    // }

    // private string password = string.Empty;
    // public string Password
    // {
    //     get => password;
    //     set => this.RaiseAndSetIfChanged(ref password, value);
    // }
    public string Username { get; set; }
    public string Password { get; set; }

    private readonly ObservableAsPropertyHelper<string> text;
    public string Text => text.Value;

    public MainWindowViewModel()
    {
        this.WhenAnyValue(x => x.Username, x => x.Password)
            .Where(x => !string.IsNullOrEmpty(x.Item1) && !string.IsNullOrEmpty(x.Item2))
            .Select(x => $"{x.Item1} -- {x.Item2}")
            .ToProperty(this, x => x.Text, out text);
        Username = string.Empty;
        Password = string.Empty;
    }

    public void Compute()
    {
        Console.WriteLine(Username);
        Console.WriteLine(Password);
    }
}
