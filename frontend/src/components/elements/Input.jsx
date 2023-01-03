function Input({ type, name, id, value, onChange }) {
  return (
    <input type={type} name={name} id={id} value={value} onChange={onChange} className="w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"   />
  )
}

export default Input;
