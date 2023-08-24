import { Tag } from "../models/Tag.js";

export async function getTags(req, res) {
  try {
    const tags = await Tag.findAll();
    res.json({ tags });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createTag(req, res) {
  const { name } = req.body;

  Tag.create({
    name,
  })
    .then((response) => {
      res.status(201).json({
        id: response.id,
        message: "Tag successfully created",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
}

export async function deleteTag(req, res) {
  const { id } = req.params;
  try {
    await Tag.destroy({ where: { id } });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
