import Article from "../models/article-model.js";

export const createArticle = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    const data = await article.save();

    res.status(201).json({ message: "Article created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id }).populate(
      "author",
      "name email"
    );

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" }).populate(
      "author",
      "name email"
    );
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email"
    );

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    article.title = req.body.title;
    article.content = req.body.content;

    const data = await article.save();

    res.status(200).json({ message: "Article updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const publishArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.status = "published";

    const data = await article.save();

    res.status(200).json({ message: "Article published" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
