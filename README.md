# Philips Hue alert for Reportr

### How to add it to your instance?

Add `reportr-alerts-hue` to the `package.json` and load it in your Reportr configuration:

```js
reportr.configure({
    alerts: [
        require("reportr-alerts-hue")({
            hostname: "192.168.2.129",
            username: "08a902b95915cdd9b75547cb50892dc4"
        })
    ]
});
```
