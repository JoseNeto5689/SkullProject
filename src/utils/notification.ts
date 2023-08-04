import https from "https"
export default async function Notification(text: string) {
    let data = {
        app_id: String(process.env.APP_ID),
        contents: { "en": text },
        included_segments: ["Subscribed Users"]
    }

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${String(process.env.REST_API_ID)}`
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers
    };

    var request = https.request(options, function (response: any) {
        response.on('data', function (data: any) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    request.on('error', function (e: any) {
        console.log("ERROR:");
        console.log(e);
    });

    request.write(JSON.stringify(data));
    request.end();

    return { status: "ok" }

}