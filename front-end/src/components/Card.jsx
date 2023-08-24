const styles = {
  width: "33%",
  border: "1px solid white",
  borderRadius: "5px",
  padding: "25px",
};

function Card({ note, actionsNote }) {
  console.log("Note", note);
  return (
    <div className="card rounded-3" style={styles}>
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>
          Last Edited (UTC):  
          {
            note.updatedAt
              .replaceAll("T", " ")
              .replaceAll("Z", "")
              .split(".")[0]
          }
        </p>
        <p className="card-text">{note.content}</p>
        <div className="tags">
          {note.tags.map((tag) => (
              <span key={tag.id} className="tagItem">
                {tag.name}
              </span>
            ))}
        </div>
      </div>
      <div className="actions">
        <button
          onClick={() => {
            actionsNote(note, note.type ? "unarchived" : "archived");
          }}
        >
          {note.type ? "unarchived" : "archived"}
        </button>
        <button
          onClick={() => {
            actionsNote(note, "edit");
          }}
        >
          edit
        </button>
        <button
          onClick={() => {
            actionsNote(note, "delete");
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default Card;
