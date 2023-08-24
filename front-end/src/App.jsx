import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Main from "./components/Main";
import Archiveds from "./components/Archiveds";
import AddNotes from "./components/AddNotes";
import UpdatedNote from "./components/UpdatedNote";

function App() {
  const [listNotes, setListNotes] = useState(false);
  const [selection, setSelection] = useState("main");
  const [noteSelection, setNoteSelection] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupIsOpen2, setPopupIsOpen2] = useState(false);
  const [popupIsOpen3, setPopupIsOpen3] = useState(false);

  async function getNotes() {
    const unarchived = [];
    const archived = [];
    const notesRequest = await fetch(
      `${import.meta.env.VITE_APP_API_URI}/notes`
    );
    const notes = await notesRequest.json();

    notes.notes.forEach((note) => {
      if (note.type) {
        archived.push(note);
      } else {
        unarchived.push(note);
      }
    });
    setListNotes({ archived, unarchived });
  }

  function actionsNote(note, action) {
    if (action === "unarchived") {
      archivedAndUnArchived(note);
    }

    if (action === "archived") {
      archivedAndUnArchived(note);
    }
    if (action === "edit") {
      setNoteSelection(note);
      setPopupIsOpen3(true);
    }
    if (action === "delete") {
      setNoteSelection(note);
      setPopupIsOpen2(true);
    }
  }

  function archivedAndUnArchived(note) {
    const bodyNote = {
      title: note.title,
      content: note.content,
      type: !note.type,
      tags: note.tags.map((tag) => tag.id),
    };
    fetch(`${import.meta.env.VITE_APP_API_URI}/notes/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(bodyNote),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getNotes();
    });
  }

  function deleteNote() {
    fetch(`${import.meta.env.VITE_APP_API_URI}/notes/${noteSelection.id}`, {
      method: "DELETE",
    }).then(() => {
      getNotes();
      setPopupIsOpen2(false);
      console.log("se elimino con exito!");
    });
  }
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main>
      {popupIsOpen2 && (
        <Modal title={"Delete Note"}>
          <div>
            <h3>Do you want to delete?</h3>
            <button onClick={deleteNote} style={{marginRight: "25px"}}>Yes</button>
            <button
              onClick={() => {
                setPopupIsOpen2(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {popupIsOpen && (
        <Modal title={"Add note"}>
          <AddNotes setPopupIsOpen={setPopupIsOpen} getData={getNotes} />
        </Modal>
      )}
      {popupIsOpen3 && (
        <Modal title={"Edit note"}>
          <UpdatedNote
            noteSelection={noteSelection}
            setPopupIsOpen={setPopupIsOpen3}
            getData={getNotes}
          />
        </Modal>
      )}
      {selection === "main" && (
        <section style={{ width: "100vw" }}>
          <Main
            actionsNote={actionsNote}
            unarchived={listNotes.unarchived}
            setSelection={setSelection}
            setPopupIsOpen={setPopupIsOpen}
          />
        </section>
      )}
      {selection === "archived" && (
        <section style={{ width: "100vw" }}>
          <Archiveds
            actionsNote={actionsNote}
            archived={listNotes.archived}
            setSelection={setSelection}
          />
        </section>
      )}
    </main>
  );
}

export default App;
