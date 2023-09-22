const reviewModel = require("../models/Review");
const commentModel = require("../models/Comment");
const { Op, Sequelize } = require("sequelize");

class SearchService {
  async searchReviews(query) {
    try {
      const results = await reviewModel.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              nameofart: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              tags: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              text: {
                [Op.like]: `%${query}%`,
              },
            },
          ],
          status: "published",
        },
      });
      return results;
    } catch (error) {
      console.error("Ошибка при выполнении поиска отзывов:", error);
      throw error;
    }
  }
  async searchComments(query) {
    try {
      const results = await commentModel.findAll({
        where: {
          comment: {
            [Op.like]: `%${query}%`,
          },
        },
      });
      const ids = results.map((e) => e.reviewId);
      const review = await reviewModel.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          status: "published",
        },
      });
      return review;
    } catch (error) {
      console.error("Ошибка при выполнении поиска комментариев:", error);
      throw error;
    }
  }

  async search(query) {
    try {
      const [reviewResults, commentResults] = await Promise.all([
        this.searchReviews(query),
        this.searchComments(query),
      ]);

      return [
        ...new Set(reviewResults.concat(commentResults).map(JSON.stringify)),
      ].map(JSON.parse);
    } catch (error) {
      console.error("Ошибка при выполнении поиска:", error);
      throw error;
    }
  }
}

module.exports = new SearchService();
