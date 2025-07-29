import React from "react";

const InputField = ({ item, Formik }) => {
  const { name, lableName, dataType, multiple } = item;
  const isError = Formik.touched[name] && Formik.errors[name];

  if (dataType === "checkbox") {
    return (
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id={lableName}
          name={name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          checked={Formik.values[name]}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={lableName} className="text-sm text-gray-700">
          {lableName}
        </label>
        {isError && (
          <p className="text-red-500 text-xs ml-2">{Formik.errors[name]}</p>
        )}
      </div>
    );
  }

  if (dataType === "file") {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {lableName}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        multiple={item.multiple}
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.currentTarget.files);
          Formik.setFieldValue(name, files);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      {isError && (
        <p className="text-red-500 text-xs mt-1">{Formik.errors[name]}</p>
      )}
    </div>
  );
}


  return (
    <div className="mb-4">
      <label
        htmlFor={lableName}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {lableName}
      </label>
      <input
        type={dataType}
        id={lableName}
        name={name}
        placeholder={name}
        multiple={multiple}
        onChange={(e) => {
          let value = e.target.value;
          if (dataType === "number") {
            value = value.replace(/[^0-9]/g, "");
          }
          Formik.setFieldValue(name, value);
        }}
        onBlur={Formik.handleBlur}
        value={dataType !== "file" ? Formik.values[name] : undefined}
        className={`w-full px-4 py-2 border ${
          isError ? "border-red-500" : "border-gray-300"
        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-150 ease-in-out`}
      />
      {isError && (
        <p className="text-red-500 text-xs mt-1">{Formik.errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
