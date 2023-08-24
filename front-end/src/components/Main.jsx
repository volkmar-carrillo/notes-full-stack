import Card from "./Card";
const styles = {
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
};

function Main({ unarchived, setSelection, setPopupIsOpen, actionsNote }) {
  return (
    <div>
      <div style={{ ...styles, margin: "25px" }}>
        <h1>My notes</h1>
        <button
          type="button"
          className="btn btn-primary"
          style={{ height: "40px" }}
          onClick={() => {
            setPopupIsOpen(true);
          }}
        >
          Add note
        </button>
        <button
          className="btn btn-primary"
          style={{ height: "40px" }}
          onClick={() => setSelection("archived")}
        >
          Go to archived
        </button>
      </div>
      <div style={styles}>
        {unarchived &&
          unarchived.map((note) => (
            <Card
              key={note.id}
              note={note}
              actionsNote={actionsNote}
            />
          ))}
      </div>
    </div>
  );
}

export default Main;
