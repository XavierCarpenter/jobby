module.exports = {
  getApp: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_app([params.id])
      .then(app => res.status(200).json(app))
      .catch(() => res.status(500).json());
  },
  getApps: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_apps([params.id])
      .then(apps => res.status(200).json(apps))
      .catch(() => res.status(500).json());
  }
};