import { useRef, useState } from "react";

function AddNotes({ setPopupIsOpen, getData }) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const inputTag = useRef();
  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    type: false,
  });

  const handleOnchangeTag = (e) => setTag(e.target.value);

  const handleOnchangeData = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const handleOncLickAddTags = async () => {
    const bodyTag = {
      name: tag,
    };
    const requestTags = await fetch(
      `${import.meta.env.VITE_APP_API_URI}/tags`,
      {
        method: "POST",
        body: JSON.stringify(bodyTag),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resultTags = await requestTags.json();
    inputTag.current.value = "";
    setTags((previusTag) => [...previusTag, { id: resultTags.id, tag }]);
  };

  const handleOncLickCreateNote = async () => {
    const bodyNote = {
      ...dataForm,
      tags: tags.map((tag) => tag.id),
    };
    fetch(`${import.meta.env.VITE_APP_API_URI}/notes`, {
      method: "POST",
      body: JSON.stringify(bodyNote),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setPopupIsOpen(false);
      getData();
    });
  };

  const handleOncLickDeleteTags = (id) => {
    fetch(`${import.meta.env.VITE_APP_API_URI}/tags/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTags((previusTag) =>
        previusTag.filter((itemTag) => itemTag.id !== id)
      );
    });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control form-control-lg"
          onChange={handleOnchangeData}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          name="content"
          onChange={handleOnchangeData}
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <div className="list-tags">
          {tags &&
            tags.map((itemTag) => (
              <div key={itemTag.id}>
                <span>{itemTag.tag}</span>
                <button
                  style={{ color: "red" }}
                  onClick={() => handleOncLickDeleteTags(itemTag.id)}
                >
                  X
                </button>
              </div>
            ))}
        </div>
        <div className="box-add-tags">
          <input
            ref={inputTag}
            type="text"
            onChange={handleOnchangeTag}
            className="form-control form-control-lg"
          />
          <button onClick={handleOncLickAddTags}>Add</button>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setPopupIsOpen(false);
          }}
          style={{ marginRight: "15px" }}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-secundary"
          onClick={handleOncLickCreateNote}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default AddNotes;
