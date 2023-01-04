const EditField = ({ type, value, name, color, error, onChange }) => {

  return (
    <span className="absolute left-6 top-2/4 -translate-y-1/2 w-3/4">
      <input type={type} name={name} value={value} onChange={onChange}
        className={`pl-2 border-b outline-none w-full ${'bg-'+color} capitalize ${error ? 'border-red-600' : 'border-secondary' }`}
      />
    </span>
  )
}

export default EditField;
