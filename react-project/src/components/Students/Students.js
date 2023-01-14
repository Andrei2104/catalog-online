import { Fragment, useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import DropdownSearch from "../layout/DropdownSearch";
import StudentsTable from "./StudentsTable";

const Students = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [students, setStudents] = useState([]);
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
                    filteredStudents.push(entry)
                    let counter = 0;
                    let total = 0;
                    Object.keys(entry.grades).forEach((key) => {
                        total += entry.grades[key].reduce((a, b) => a + b, 0) / entry.grades[key].length;
                        counter++;

                    })
                    entry.grade = (total / counter).toFixed(2);

                })

                setStudents(filteredStudents);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Fragment>
            <DropdownSearch onSelected={onFilterStudents} />
            {isSelected && <StudentsTable items={students} />}
        </Fragment>
    )
}

export default Students;