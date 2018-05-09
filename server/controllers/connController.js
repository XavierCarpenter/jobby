module.exports = {
  getConns: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_conns([params.id])
      .then(conns => res.status(200).json(conns))
      .catch(() => res.status(500).json());
  }
};
