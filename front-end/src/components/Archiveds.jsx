import Card from "./Card";
const styles = {
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexWrap: "wrap",
  alignItems: "center",
};

function Archiveds({ archived, setSelection, actionsNote }) {
  return (
    <div>
      <div style={{ ...styles, marginBottom: "25px" }}>
        <h1>Archived notes</h1>
        <button
          className="btn btn-primary"
          style={{ height: "40px" }}
          onClick={() => setSelection("main")}
        >
          Go to unarchived
        </button>
      </div>
      <div style={styles}>
        {archived &&
          archived.map((note) => (
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

export default Archiveds;
