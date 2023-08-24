const styles = {
  position: "absolute",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  marginTop: "2%",
};

function Modal({ children, title }) {
  return (
    <div style={styles}>
      <div
        className="modal"
        tabIndex="-1"
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "5px",
          color: "black",
          width: "500px",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
