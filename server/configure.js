var path = require("path"),
  routes = require("./routes"),
  
  exphbs = require("express-handlebars"),
  express = require("express"),
  cookieParser = require("cookie-parser"),
  morgan = require("morgan"),
  methodOverride = require("method-override"),
  errorHandler = require("errorhandler"),
  moment = require("moment"),
  multer = require("multer");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");

module.exports = function (app) {
  app.use(
    multer({ dest: path.join(__dirname, "public/upload/temp") }).single("image")
  );
  app.use(morgan("dev"));

  app.use(methodOverride());
  app.use(cookieParser("some-secret-value-here"));
  
  app.use("/public/", express.static(path.join(__dirname, "../public")));

  if ("development" === app.get("env")) {
    app.use(errorHandler());
  }
  app.engine(
    "handlebars",
    exphbs.create({
      defaultLayout: "main",
      allowProtoMethodsByDefault: true,
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      allowProtoPropertiesByDefault: true,
      allowedProtoMethods: {
        title: true,
        description: true,
        filename: true,
        views: true,
        likes: true,
        timestamp: true,
        uniqueId: true,
      },

      layoutsDir: app.get("views") + "/layouts",
      partialsDir: [app.get("views") + "/partials"],
      helpers: {
        timeago: function (timestamp) {
          return moment(timestamp).startOf("minute").fromNow();
        },
      },
    }).engine
  );
  routes.initialize(app);

  app.set("view engine", "handlebars");
  return app;
};
