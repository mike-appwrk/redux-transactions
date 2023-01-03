function Label ({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="inline-block mb-1 text-gray-700">{children}</label>
  )
} 

export default Label;
