import { Fragment, useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import DropdownSearch from "../layout/DropdownSearch";
import AddStudentForm from "./AddStudentForm";
import StudentsTable from "./StudentsTable";

const Students = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [students, setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const filteredStudents = [];

    const onFilterStudents = (selectedDropdownValue) => {
        if (selectedDropdownValue !== null) {
            setSelectedClass(selectedDropdownValue);
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }

    useEffect(() => {
        if (isSelected && selectedClass) {
            fetchStudents();
        }
    }, [isSelected, selectedClass])

    async function fetchStudents() {
        try {
            const { data, error } = await supabase
                .from('Students')
                .select('fullname, class, grades')

            if (error) throw error;

            if (data !== null) {
                data.filter(entry => entry.class === selectedClass).forEach((entry) => {
                    if (entry.grades !== null) {
                        filteredStudents.push(entry)
                        let counter = 0;
                        let total = 0;
                        Object.keys(entry.grades).forEach((key) => {
                            total += entry.grades[key].reduce((a, b) => a + b, 0) / entry.grades[key].length;
                            counter++;
                        })
                        entry.grade = (total / counter).toFixed(2);
                    } else {
                        entry.grades = 0;
                        filteredStudents.push(entry)
                    }
                })

                setStudents(filteredStudents);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Fragment>
            <DropdownSearch onSelected={onFilterStudents} />
            {isSelected && <StudentsTable items={students} />}
            {isSelected && <button
                onClick={handleShow}
                className="text-white 
                text-center
                float-right
                mr-64
                mt-8
                w-32
                left-2
                relative
                bg-blue-500 
                rounded-md 
                border-0 
                box-border 
                text-[100%] 
                h-14 
                leading-tight 
                m-3 
                px-[25px] 
                hover:bg-blue-600
                active:text-gray-200 
                active:bg-blue-700"
            >
                Add Student
            </button>}
            {show && <AddStudentForm onClick={handleClose} items={students} selectedCls={selectedClass} />}
        </Fragment>
    )
}

export default Students;