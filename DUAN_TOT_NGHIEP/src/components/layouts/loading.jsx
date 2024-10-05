
function Loading({ top, left, position }) {
  return <>
      <div style={{ top: `${top}%`, left: `${left}%`, position: position }} className="loader"></div>
  </>
}

export default Loading