const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/audit/management",
            "/balance/api",
            "/balance/management",
            "/balance/v2",
            "/communication-bulk/ws",
            "/config/api",
            "/config/management",
            "/config/v2",
            "/consul/management",
            "/dashboard/api",
            "/dashboard/management",
            "/dashboard/v2",
            "/document/api",
            "/document/management",
            "/entity/api",
            "/entity/management",
            "/entity/v2",
            "/gate/management",
            "/ldb",
            "/management",
            "/otp",
            "/publicregistry/management",
            "/scheduler",
            "/scheduler/management",
            "/swagger-resources",
            "/swagger-ui",
            "/timeline/api",
            "/timeline/management",
            "/timeline/v2",
            "/uaa",
            "/uaa/management",
            "/v2",
            "/wallet",
            "/websocket",
            "/zendesk"
        ],
        target: "http://xm.test.xm-online.com.ua",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    }
];

module.exports = PROXY_CONFIG;
