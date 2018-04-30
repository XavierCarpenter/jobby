module.exports = {
  getInts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_ints([params.id])
      .then(app => res.status(200).json(app))
      .catch(() => res.status(500).json());
  }
};