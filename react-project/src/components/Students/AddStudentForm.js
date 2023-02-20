import React, { useRef } from "react";
import supabase from "../../supabaseClient";

const AddStudentForm = ({ onClick, items, selectedCls }) => {
    const nameInputRef = useRef();
    let classes = [];
    let grades = [];

    items.forEach((entry) => {
        Object.keys(entry.grades).forEach((key) => {
            if (!classes.includes(key)) {
                classes.push(key);
                grades.push('')
            }
        })
    })

    const handleFormChange = (event, val, index) => {
        grades[index] = event.target.value;
    }

    const submitHandler = async () => {
        const fullname = nameInputRef.current.value;
        const newGrades = {};

        classes.forEach((entry, index) => {
            let list = grades[index].split(',');
            list = list.map(val =>
                parseInt(val, 10)
            );
            newGrades[entry] = list;
        })

        const { error } = await supabase
            .from('Students')
            .insert([{ fullname: fullname, grades: newGrades, class: selectedCls }])
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex modal-middle">
            <section className="m-auto my-16 max-w-sm rounded-md bg-blue-500 p-4 text-white">
                <h1 className="text-center font-bold text-white">Add Student</h1>
                <form onSubmit={handleFormChange}>
                    <div className="mb-2">
                        <label htmlFor='class' className="block mt-6 mb-2">{selectedCls}</label>
                        <label htmlFor='fullname' className="block mt-6 mb-2">Fullname:</label>
                        <input
                            type='text'
                            id='fullname'
                            placeholder="Example: Ion Ion..."
                            className="text-black rounded w-full p-1 bg-white"
                            required
                            ref={nameInputRef}
                        />
                        {classes.map((val, index, input) => {
                            return (
                                <React.Fragment>
                                    <label htmlFor='grades' className="block mt-6 mb-2">{val}</label>
                                    <input
                                        key={index}
                                        type='text'
                                        id='grades'
                                        placeholder="Example: 5,6,7..."
                                        className="text-black rounded w-full p-1 bg-white"
                                        value={input.grades}
                                        onChange={event => handleFormChange(event, val, index)}
                                        required
                                    />
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="mt-6 flex items-center">
                        <button
                            className="cursor-pointer
                        h-12 
                        w-30
                        rounded-md 
                        bg-gray-600 
                        m-1 
                        px-10 
                        py-3 
                        hover:bg-gray-700
                        box-border"
                            onClick={onClick}>
                            Cancel
                        </button>
                        <button
                            className="cursor-pointer 
                        h-12 
                        w-32 
                        rounded-md 
                        bg-blue-800 
                        px-10 
                        py-3 
                        hover:bg-blue-900"
                            onClick={submitHandler}>
                            Add
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddStudentForm;