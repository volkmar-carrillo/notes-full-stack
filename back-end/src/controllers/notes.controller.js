import { Note } from "../models/Note.js";
import { Tag } from "../models/Tag.js";
import "../models/TagNote.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.findAll({
      include: Tag,
    });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getNote(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createNote(req, res) {
  const { title, content, type, tags } = req.body;
  try {
    let newNote = await Note.create(
      { title, content, type },
      { fields: ["title", "content", "type"] }
    );

    tags.forEach(async (tag) => {
      newNote.addTag(tag);
    });

    return res
      .status(201)
      .json({ id: newNote.id, message: "Note successfully created" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, tags } = req.body;

    const tagInstances = await Tag.findAll({
      where: {
        id: tags,
      },
    });

    const note = await Note.findByPk(id);
    note.set({
      title: title,
      content: content,
      type: type,
    });

    await note.setTags(tagInstances);
    await note.save();

    res.status(200).json({ id, message: "Note successfully updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteNote(req, res) {
  const { id } = req.params;
  try {
    await Note.destroy({ where: { id } });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
