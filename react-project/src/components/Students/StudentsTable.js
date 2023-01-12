import { Link } from "react-router-dom";

const StudentsTable = (props) => {
    return (
        <div className="w-full h-auto flex justify-center align-center">
            <table className="border-solid border-2 w-[800px] h-[200px] border-black">
                <tbody>
                    <tr className="border border-solid border-black">
                        <th className="border border-black">Class</th>
                        <th className="border border-black">Full Name</th>
                        <th className="w-[12rem] border-[1px] border-black">Average Grade (All discplines)</th>
                    </tr>
                    {props.items.map((val, key) => {
                        return (
                            <tr key={key} className='border-[1px] border-black'>
                                <td className="text-center border-[1px] border-black">{val.class}</td>
                                <td className="text-center border-[1px] border-black">
                                    <Link to={`students/${val.fullname}`} className="text-black">{val.fullname}</Link>
                                </td>
                                <td className="text-center border-[1px] border-black">TBD</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StudentsTable;