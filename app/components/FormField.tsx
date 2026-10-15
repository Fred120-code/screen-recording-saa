const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {as === "textarea" ? (
        <textarea
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : as === "select" ? (
        <select name={id} id={id} value={value} onChange={onChange}>
          {options.map((opt, key) => (
            <option value={opt.value} key={key}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
