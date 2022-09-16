const Note = require("../models/note");
const Category = require("../models/category")
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const note = await new Note(req.body).save();

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.list = async (req, res) => {
  try {
    let notes = await Note.find({
      status: "Active",
      archived: false,
    })
      .sort([["createdAr", "desc"]])
      .populate("category", "name")
      .exec();

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  try {
    const note = await Note.findOne({
      slug,
      status: "Active",
    })
      .populate("category", "name")
      .exec();

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Note.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json({
      success: true,
      updated,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.removeSoft = async (req, res) => {
  const { slug } = req.params;
  try {
    const deleted = await Note.findOneAndUpdate(
      { slug },
      { status: "Inactive" },
      { new: true }
    );
    res.json({
      success: true,
      deleted,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.archivedNotes = async (req, res) => {
  try {
    const notesArchived = await Note.find({
      archived: true,
    });

    res.json({
      success: true,
      notesArchived,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};


exports.notesByCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({
      slug,
    });

    const notes = await Note.find({
      category: category._id,
      status: "Active",
    });

    res.json({
      success: true,
      notes,
    });
  } catch ({ message }) {
    res.status(404).json({
      success: false,
      msg: "Ha ocurrido un error al encontrar",
      message,
    });
  }
};