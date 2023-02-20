import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import supabase from "../../supabaseClient";

const StudentsTable = ({items}) => {
    const deleteHandler = async (fullname) => {
        const { error } = await supabase
            .from('Students')
            .delete()
            .eq('fullname', fullname)
        window.location.reload(true);
    }

    return (
        <div className="w-full h-auto flex justify-center align-center">
            <table className="border-solid border-2 w-[800px] h-[200px] border-black">
                <tbody>
                    <tr className="border border-solid border-black">
                        <th className="w-[12rem] border border-black">Class</th>
                        <th className="border border-black">Full Name</th>
                        <th className="w-[12rem] border-[1px] border-black">Average Grade (All discplines)</th>
                    </tr>
                    {items.map((val, key) => {
                        return (
                            <tr key={key} className='border-[1px] border-black'>
                                <td className="text-center border-[1px] border-black">{val.class}</td>
                                <td className="text-center border-[1px] border-black">
                                    <Link to={`students/${val.fullname}`} className="text-black text-inherit">{val.fullname}</Link>
                                </td>
                                <td className="text-center border-[1px] border-black">{val.grade}</td>
                                <td className="w-[5rem]">
                                    <button className="m-auto block" onClick={event => deleteHandler(val.fullname)}>
                                        <BsFillTrashFill />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StudentsTable;