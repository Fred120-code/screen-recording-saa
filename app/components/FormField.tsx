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
  const InputToRender = ({ type }: { type: string }) => {
    if (type === "textarea") {
      return <textarea 
                name={id} 
                id={id}
                value={value}
              />;
    } else if (type === "select") {
      return (
        <select 
          name={id} 
          id={id}
          value={value}
          onChange={onChange}
        >
          {
            options.map((opt,key) => (
              <option value={opt.value} key={key}>
                {opt.label}
              </option>
            ))
          }
        </select>
      );
    } else {
      return <input />;
    }
  };
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
      </label>

      <InputToRender type={as}/>
    </div>
  )
};

export default FormField;
