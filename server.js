"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{i(r.next(e))}catch(e){s(e)}}function c(e){try{i(r.throw(e))}catch(e){s(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}i((r=r.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,r,o,s,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function c(c){return function(i){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,r=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}};exports.__esModule=!0;var express=require("express"),http_proxy_middleware_1=require("http-proxy-middleware"),axios_1=require("axios"),fs=require("fs"),pm2=require("pm2"),basicAuth=require("express-basic-auth"),util=require("util"),promisify=require("util").promisify,exec=promisify(require("child_process").exec),ExecBashToken="password",port=parseInt(process.env.PORT||"")||3e3;function getHttpsKeys(){for(var e=[],t=Object.entries(process.env),n=0;n<t.length;n++){var r=t[n],o=r[0],s=r[1];/^https:\/\/(?!localhost|127\.0\.0\.1|registry).*$/i.test(s)&&!o.includes("API_HOST")&&e.push(o)}return e.includes("https")?e:[""]}var httpsKeys=getHttpsKeys();if(httpsKeys[0].length>0){var httpsKey=httpsKeys[0];console.log("[".concat(new Date,"] Find httpsKey: ").concat(httpsKey))}else console.log("[".concat(new Date,"] No httpsKey found ").concat(httpsKeys[0].length));var url=process.env.EXTERNAL_HOSTNAME||process.env.RENDER_EXTERNAL_URL||process.env.NF_HOSTS||process.env.SPACE_HOST||(httpsKeys[0].length>0?httpsKeys[0]:"http://localhost:".concat(port)),urls=["https://hello-world-jsx.deno.dev/","https://hello-world.com/","https://hello-world.deno.dev/"],app=express();app.use(express.json());var execRoute=function(e,t){return __awaiter(void 0,void 0,void 0,(function(){var n,r;return __generator(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,exec(e)];case 1:return n=o.sent().stdout,t.type("html").send("<pre>Command execution result:\n".concat(n,"</pre>")),[3,3];case 2:return r=o.sent(),t.type("html").send("<pre>Command execution error:\n".concat(r,"</pre>")),[3,3];case 3:return[2]}}))}))};app.get("/",(function(e,t){return __awaiter(void 0,void 0,void 0,(function(){var e,n;return __generator(this,(function(r){switch(r.label){case 0:e=process.env.FAKE_URL||urls[Math.floor(Math.random()*urls.length)],r.label=1;case 1:return r.trys.push([1,3,,4]),[4,axios_1.default.get(e)];case 2:return n=r.sent().data,t.setHeader("X-Argo-Paas","true"),t.setHeader("X-Argo-Host",e),t.send(n.replace(/Deno Land!/g,"Hello World!")),[3,4];case 3:return r.sent(),t.setHeader("X-Argo-Paas","true"),t.setHeader("X-Argo-Host",e),t.send("Hello World!"),[3,4];case 4:return[2]}}))}))})),app.get("/favicon.ico",(function(e,t){t.type("image/x-icon").send("")})),app.get("/favicon.png",(function(e,t){t.type("image/x-icon").send("")})),app.get(["/index.html","/index.php","/index.htm"],(function(e,t){t.type("html").send("")})),app.get("/robots.txt",(function(e,t){t.type("text").send("User-agent: *\nDisallow: /")})),app.get("/logs",(function(e,t){execRoute("pm2 logs --time 1h &",t)})),app.get("/logs/:id",(function(e,t){execRoute("pm2 logs --time 1h ".concat(e.params.id),t)})),app.get("/logs/:id/:lines",(function(e,t){execRoute("pm2 logs --time 1h ".concat(e.params.id," --lines ").concat(e.params.lines),t)})),app.get("/logs/:id/:lines/:format",(function(e,t){execRoute("pm2 logs --time 1h ".concat(e.params.id," --lines ").concat(e.params.lines," --format ").concat(e.params.format),t)}));var authorize=function(e,t,n){e.headers.authorization&&e.headers.authorization==="Bearer ".concat(ExecBashToken)?n():t.status(401).send("Unauthorized: Access token is missing or invalid")};function keep_web_alive(){return __awaiter(this,void 0,void 0,(function(){var e,t;return __generator(this,(function(n){switch(n.label){case 0:return[4,axios_1.default.get(url,{timeout:8e3}).then((function(){console.log("axios success")})).catch((function(e){console.log("axios error: "+e)}))];case 1:n.sent(),n.label=2;case 2:return n.trys.push([2,7,,8]),[4,exec("pgrep -laf PM2")];case 3:return-1===n.sent().stdout.indexOf("God Daemon")?[3,4]:(console.log("pm2 already running"),[3,6]);case 4:return[4,exec("[ -e ecosystem.config.js ] && pm2 start")];case 5:e=n.sent().stdout,console.log("pm2 start success: "+e),n.label=6;case 6:return[3,8];case 7:return t=n.sent(),console.log("exec error: "+t),[3,8];case 8:return[2]}}))}))}app.post("/bash",authorize,(function(e,t){return __awaiter(void 0,void 0,void 0,(function(){var n,r,o,s;return __generator(this,(function(a){switch(a.label){case 0:if(!(n=e.body.cmd))return t.status(400).send("Bad Request: Missing or invalid cmd property"),[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,util.promisify(exec)(n)];case 2:return r=a.sent(),o=r.stdout,r.stderr,t.status(200).type("text").send(o),[3,4];case 3:return s=a.sent(),console.error("[".concat(new Date,"] Error executing command: ").concat(s)),t.status(500).type("text").send(s.stderr),[3,4];case 4:return[2]}}))}))})),app.post("/post-test",(function(e,t){console.log("Got body:",e.body),t.sendStatus(200)})),app.get("/health",(function(e,t){return __awaiter(void 0,void 0,void 0,(function(){return __generator(this,(function(e){switch(e.label){case 0:return t.send("ok"),url.startsWith("http://")?[3,2]:[4,axios_1.default.request({url:"".concat(url),method:"GET",timeout:5e3})];case 1:e.sent(),e.label=2;case 2:return console.log("[".concat(new Date,"] Health Check!")),[2]}}))}))})),app.get("/status",(function(e,t){execRoute("pm2 ls && ps -ef | grep -v 'defunct' && ls -l / && ls -l",t)})),app.use("/env",basicAuth({users:{admin:"password"},challenge:!0})),app.get("/env",(function(e,t){execRoute("whoami && env",t)})),app.get("/ip",(function(e,t){execRoute("ip addr & ifconfig",t)})),app.get("/combined",(function(e,t){return __awaiter(void 0,void 0,void 0,(function(){var e,n,r,o,s,a;return __generator(this,(function(c){switch(c.label){case 0:e=5e3,c.label=1;case 1:return c.trys.push([1,5,,6]),[4,axios_1.default.get("https://api.ipify.org?format=json",{timeout:e})];case 2:return n=c.sent(),[4,axios_1.default.get("https://speed.cloudflare.com/meta",{timeout:e})];case 3:return r=c.sent(),[4,axios_1.default.get("https://ipinfo.io/json",{timeout:e})];case 4:return o=c.sent(),s={ipify:n.data,cloudflare:r.data,ipinfo:o.data},t.send(s),[3,6];case 5:return a=c.sent(),t.status(500).send(a.message),[3,6];case 6:return[2]}}))}))})),app.get("/process",(function(e,t){var n={arch:process.arch,platform:process.platform,versions:process.versions,pid:process.pid,ppid:process.ppid,execPath:process.execPath,execArgv:process.execArgv,argv:process.argv,cwd:process.cwd(),memoryUsage:process.memoryUsage(),uptime:process.uptime(),features:process.features,release:process.release,config:process.config,title:process.title,env:process.env,umask:process.umask(),hrtime:process.hrtime()};t.send(JSON.stringify(n,null,2))})),app.get("/listen",(function(e,t){execRoute("ss -nltp && ss",t)})),app.get("/list",(function(e,t){execRoute("bash argo.sh && cat list",t)})),app.get("/start",(function(e,t){execRoute("[ -e entrypoint.sh ] && /bin/bash entrypoint.sh >/dev/null 2>&1",t)})),app.get("/pm2",(function(e,t){execRoute("[ -e ecosystem.config.js ] && pm2 start",t)})),app.get("/web",(function(e,t){execRoute("pm2 start web",t)})),app.get("/argo",(function(e,t){execRoute("pm2 start argo",t)})),app.get("/nezha",(function(e,t){execRoute("pm2 start nztz",t)})),app.get("/apps",(function(e,t){execRoute("pm2 start apps",t)})),app.get("/info",(function(e,t){execRoute("cat /etc/*release | grep -E ^NAME",t)})),app.get("/test",(function(e,t){fs.writeFile("./test.txt","This is the newly created file content!",(function(e){e?t.send("Failed to create file, file system permission is read-only: "+e):t.send("File created successfully, file system permission is not read-only.")}))}));var random_interval=Math.floor(30*Math.random())+1;setTimeout(keep_web_alive,1e3*random_interval);var ARGO_SCRIPT="pm2 start argo";function keepArgoAlive(){var e=this;pm2.list((function(t,n){return __awaiter(e,void 0,void 0,(function(){var e,r,o;return __generator(this,(function(s){switch(s.label){case 0:return t||!n.find((function(e){return"argo"===e.name}))?[3,1]:[3,3];case 1:return[4,exec(ARGO_SCRIPT).catch((function(e){return{err:e}}))];case 2:e=s.sent(),r=e.stdout,o=e.stderr,r&&!o?console.log("[".concat(new Date,"] Argo started!")):(console.error("[".concat(new Date,"] Failed to start Argo:\n ").concat(t.message,"\n ").concat(r,"\n ").concat(o,"\n Retrying...")),setTimeout(keepArgoAlive,1e4*random_interval)),s.label=3;case 3:return[2]}}))}))}))}process.env.ARGO_AUTH&&process.env.ARGO_KEEP_ALIVE&&setInterval(keepArgoAlive,16e3*random_interval);var NEZHA_SERVER=process.env.NEZHA_SERVER,NEZHA_PORT=process.env.NEZHA_PORT,NEZHA_KEY=process.env.NEZHA_KEY,NEZHA_SCRIPT="pm2 start nztz";function keepNezhaAlive(){var e=this;pm2.list((function(t,n){return __awaiter(e,void 0,void 0,(function(){var e,r,o;return __generator(this,(function(s){switch(s.label){case 0:return t||!n.find((function(e){return"nztz"===e.name}))?[3,1]:[3,3];case 1:return[4,exec(NEZHA_SCRIPT).catch((function(e){return{err:e}}))];case 2:e=s.sent(),r=e.stdout,o=e.stderr,r&&!o?console.log("[".concat(new Date,"] Nezha started!")):(console.error("[".concat(new Date,"] Failed to start Nezha:\n ").concat(t.message,"\n ").concat(r,"\n ").concat(o,"\n Retrying...")),setTimeout(keepNezhaAlive,1e4*random_interval)),s.label=3;case 3:return[2]}}))}))}))}NEZHA_SERVER&&NEZHA_PORT&&NEZHA_KEY&&setInterval(keepNezhaAlive,6e3*random_interval);var targetHostname=process.env.TARGET_HOSTNAME_URL||"http://127.0.0.1:8081",protocol=targetHostname.startsWith("https")?"https":"http",proxyMiddlewareOptions={target:"".concat(protocol,"://").concat(targetHostname.replace("https://","").replace("http://","")),changeOrigin:!0,ws:!0,secure:!1,rejectUnauthorized:!1,pathRewrite:{"^/":"/"},onProxyReq:function(e,t,n){t.headers.upgrade&&"websocket"===t.headers.upgrade.toLowerCase()?console.log("[".concat(new Date,"] Incomming websocket request ").concat(t.method," ").concat(t.url," to ").concat(targetHostname)):console.log("[".concat(new Date,"] Incomming non-websocket request ").concat(t.method," ").concat(t.url," to ").concat(targetHostname))},logLevel:"silent"};if(app.use("/proxy/*",(0,http_proxy_middleware_1.createProxyMiddleware)({target:"",changeOrigin:!0,ws:!0,secure:!1,router:function(e){return e.url.split("/proxy/")[1]},logLevel:"silent",onProxyReq:function(e,t,n){e.setHeader("X-Argo-Paas-req","true")},onProxyRes:function(e,t,n){e.headers["X-Argo-Paas-res"]="true"}})),app.use("/",(0,http_proxy_middleware_1.createProxyMiddleware)(proxyMiddlewareOptions)),process.platform.includes("win"))console.log("[".concat(new Date,"] Skipping entrypoint.sh execution on Windows"));else try{exec("bash entrypoint.sh",(function(e,t,n){}))}catch(e){console.error("[".concat(new Date,"] Error executing entrypoint.sh: ").concat(e))}try{var buildTime=fs.readFileSync("./build_time.txt","utf8").trim();console.log("[".concat(new Date,"] Image build time: ").concat(buildTime))}catch(e){console.error("[".concat(new Date,"] Error reading build_time.txt file: ").concat(e))}app.listen(port,(function(){console.log("[".concat(new Date,"] Server running at ").concat(url))}));