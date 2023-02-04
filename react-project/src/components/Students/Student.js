import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";
import EditableRow from "./EditableRow";
import ReadableRow from "./ReadableRow";

const Student = () => {
    const { student } = useParams();
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [showEditRow, setShowEditRow] = useState(false);
    let materii = []

    useEffect(() => {
        fetchStudent();
    }, [])

    async function fetchStudent() {
        try {
            const { data, error } = await supabase
                .from('Students')
                .select(
                    'fullname, grades'
                )

            if (error) throw error;

            let filteredData = data.filter(entry => entry.fullname === student);
            let grades = filteredData[0].grades
            let selectedStudentData = [];
            Object.keys(filteredData[0].grades).forEach((key) => {
                selectedStudentData.push({
                    "materie": key,
                    "note": grades[key]
                })
                materii.push(key)
            })

            if (data !== null) {
                setSelectedStudent(selectedStudentData);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setShowEditRow(true);
    }

    const handleCancel = () => {
        setShowEditRow(false);
    }

    const handleChange = (val, index) => {
        let list = val.split(',');
        list = list.map(val => parseInt(val, 10));
        list = list.filter((val) => !isNaN(val))

        const newSelectedStudent = selectedStudent;
        newSelectedStudent[index].note = list;

        setSelectedStudent(newSelectedStudent);
    }

    const handleChangeSubmit = async () => {
        const newGrades = {};
        selectedStudent.forEach((entry) => {
            newGrades[entry.materie] = entry.note;
        })

        const { error } = await supabase
            .from('Students')
            .update({ grades: newGrades })
            .eq('fullname', student)
    }

    return (
        <Fragment>
            <div className="text-[2rem] m-20">
                {student}
            </div>
            {!showEditRow &&
                <ReadableRow
                    items={selectedStudent}
                    onClick={handleEdit}
                />
            }
            {showEditRow &&
                <EditableRow
                    items={selectedStudent}
                    handleCancel={handleCancel}
                    handleChange={handleChange}
                    onSubmit={handleChangeSubmit}
                />
            }
        </Fragment>
    )
}

export default Student;