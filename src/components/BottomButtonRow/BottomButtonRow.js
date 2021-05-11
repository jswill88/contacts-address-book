

export default function BottomButtonRow({
  handleCancel,
  handleDeleteContact,
  handleSubmit
}) {
  return (
    <div
      id="bottomButtonRow"
    >

      <button
        onClick={handleDeleteContact}
      >
        Delete
      </button>
      <div>

        <button
          onClick={handleCancel}
        >
          Cancel
      </button>
        <button
          onClick={handleSubmit}
        >Save</button>
      </div>
    </div>
  )
}