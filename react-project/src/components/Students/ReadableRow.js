import { Fragment } from "react";

const ReadableRow = ({ items, onClick }) => {
    return (
        <Fragment>
            <div className="w-full h-auto flex justify-center align-center">
                <table className="border-solid border-2 w-[800px] h-[200px] border-black">
                    <tbody>
                        <tr className="border-[1px] border-solid border-black">
                            <th className="w-[12rem] border-[1px] border-black">Discipline</th>
                            <th className="border-[1px] border-black">Grades</th>
                            <th className="w-[12rem] border-[1px] border-black">Average Grade</th>
                        </tr>
                        {items.map((val) => {
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
            <button
                type='button'
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
                onClick={onClick}
            >
                Edit
            </button>
        </Fragment>
    )
}

export default ReadableRow;