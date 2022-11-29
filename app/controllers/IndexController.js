class IndexController
{
  index(req, res) {
    res.json({
      status: 'Job collector is fine'
    });
  }
}

module.exports = IndexController;
