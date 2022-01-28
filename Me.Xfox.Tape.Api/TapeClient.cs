using System.Collections.Specialized;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Flurl;
using Flurl.Http;

namespace Me.Xfox.Tape.Api;

public class TapeClient
{
    private FlurlClient Client { get; init; }
    private Random RNG { get; init; }
    private string PeerID { get; init; }

    public TapeClient() : this("")
    {
        var peerID = new byte[6];
        RNG.NextBytes(peerID);
        PeerID = BitConverter.ToString(peerID);
        System.Diagnostics.Debug.Assert(PeerID.Length == 12);

        Client.WithHeader("peerID", PeerID);
    }

    public TapeClient(string peerID)
    {
        RNG = new();

        PeerID = peerID;

        Client = new FlurlClient("http://apiv4.tapechat.net")
            .WithHeader("version", "1.7.1")
            .WithHeader("os", "1")
            .WithHeader("peerID", PeerID)
            .WithHeader("Accept", "*/*")
            .WithHeader("Accept-Language", "zh-Hans-CN;1")
            .WithHeader("Accept-Encoding", "gzip, deflate")
            .WithHeader("User-Agent", "Tape/1.7.1 (iPhone; iOS 15.2; Scale/3.00)");
        Client.BeforeCall(call =>
        {
            if (call.Request.Verb == HttpMethod.Get)
            {
                var sign = SignRequestParameters(call.Request.Url.QueryParams.ToDictionary(
                    p => p.Name,
                    p => p.Value.ToString() ?? ""));
                call.Request.WithHeader("sign", sign);
            }
            else
            {
                var body = call.RequestBody;
                var parsed = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(body);
                if (parsed == null)
                {
                    throw new InvalidOperationException("body cannot be parsed into a JSON dictionary");
                }
                var sign = SignRequestParameters(parsed);
                call.Request.WithHeader("sign", sign);
            }
            call.Request.SetQueryParam("app_id", "5749260381");
            call.Request.SetQueryParam("nonce", CreateNonce(6));
            call.Request.SetQueryParam("timestamp", GetTimestamp());
            call.Request.WithHeader("time", GetTimestamp());
        });
    }

    internal string CreateNonce(int stringLength)
    {
        const string allowedChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
        char[] chars = new char[stringLength];

        for (int i = 0; i < stringLength; i++)
        {
            chars[i] = allowedChars[RNG.Next(0, allowedChars.Length)];
        }

        return new string(chars);
    }

    private static string GetTimestamp()
    {
        return (new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds() * 1000).ToString();
    }

    protected static string SignRequestParameters(IDictionary<string, string> args)
    {
        var toSign = string.Join('&', args.OrderBy(x => x.Key)
            .Append(new("appKey", "hPyKQn3yozr&&6$efket$lyAEQV65CSQ"))
            .Select(x => $"{x.Key}={x.Value}"));
        var hasher = MD5.Create();
        var hash = hasher.ComputeHash(Encoding.UTF8.GetBytes(toSign));
        return BitConverter.ToString(hash);
    }

    protected async Task GetAsync(string url, IDictionary<string, string> args)
    {
        var builder = new UriBuilder
        {
            Scheme = "https",
            Host = "apiv4.tapechat.net",
            Path = url,
        };

        NameValueCollection queryParams = HttpUtility.ParseQueryString(builder.Query);
        foreach (var (k, v) in args)
        {
            queryParams.Add(k, v);
        }
        queryParams.Add("app_id", "5749260381");
        queryParams.Add("nonce", CreateNonce(6));
        queryParams.Add("timestamp", GetTimestamp());
        builder.Query = queryParams.ToString();

        return;
    }
}
