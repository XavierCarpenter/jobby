module.exports = {
  getComps: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_comps([params.id])
      .then(comps => res.status(200).json(comps))
      .catch(() => res.status(500).json());
  }
};
