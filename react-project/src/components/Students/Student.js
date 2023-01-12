import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";

const Student = () => {
    const { student } = useParams();
    const [selectedStudent, setSelectedStudent] = useState([]);

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
            })

            if (data !== null) {
                setSelectedStudent(selectedStudentData);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Fragment>
            <div className="text-[2rem] m-20">
                {student}
            </div>
            <div className="w-full h-auto flex justify-center align-center">
                <table className="border-solid border-2 w-[800px] h-[200px] border-black">
                    <tbody>
                        <tr className="border-[1px] border-solid border-black">
                            <th className="border-[1px] border-black">Discipline</th>
                            <th className="border-[1px] border-black">Grades</th>
                            <th className="w-[12rem] border-[1px] border-black">Average Grade</th>
                        </tr>
                        {selectedStudent.map((val) => {
                            let avg = val.note.reduce((a, b) => a + b, 0) / val.note.length
                            return (
                                <tr className='border-[1px] border-black'>
                                    <td className="text-center border-[1px] border-black">
                                        {val.materie}
                                    </td>
                                    <td className="text-center border-[1px] border-black">
                                        {val.note.toString()}
                                    </td>
                                    <td className="text-center border-[1px] border-black">{avg.toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Student;