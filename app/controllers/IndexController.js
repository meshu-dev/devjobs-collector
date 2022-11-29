class IndexController
{
  index(req, res) {
    res.json({
      status: 'Job collector is running'
    });
  }
}

module.exports = IndexController;
