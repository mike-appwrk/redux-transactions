function Select ({ id, name, value, onChange, children }) {
  return (
    <select id={id} name={name} value={value} onChange={onChange}
      className="px-3 py-1.5 text-base bg-white bg-clip-padding border border-solid border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {children}
    </select>
    )
}

export default Select;
