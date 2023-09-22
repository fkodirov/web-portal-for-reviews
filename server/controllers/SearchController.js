const searchService = require("../services/search-service");

class SearchController {
  async search(req, res, next) {
    try {
      const { searchQuery } = req.body;
      const results = await searchService.search(searchQuery);
      res.json(results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SearchController();
