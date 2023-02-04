import { Fragment } from "react";

const EditableRow = ({ items, handleCancel, handleChange, onSubmit }) => {
    let indx;
    return (
        <Fragment>
            <form>
                <div className="w-full h-auto flex justify-center align-center">
                    <table className="border-solid border-2 w-[800px] h-[200px] border-black">
                        <tbody>
                            <tr className="border-[1px] border-solid border-black">
                                <th className="border-[1px] border-black">Discipline</th>
                                <th className="border-[1px] border-black">Grades</th>
                                <th className="w-[12rem] border-[1px] border-black">Average Grade</th>
                            </tr>
                            {items.map((val, index) => {
                                indx = index;
                                let avg = val.note.reduce((a, b) => a + b, 0) / val.note.length
                                return (
                                    <tr className='border-[1px] border-black'>
                                        <td className="text-center border-[1px] border-black">
                                            {val.materie}
                                        </td>
                                        <td className="text-center border-[1px] border-black">
                                            <input
                                                className="text-center border-[1px] border-black"
                                                type='text'
                                                name='grades'
                                                defaultValue={val.note.toString()}
                                                onChange={(val) => handleChange(val.target.value, index)}
                                            ></input>
                                        </td>
                                        <td className="text-center border-[1px] border-black">{avg.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </form>
            <button
                type='submit'
                className="text-white 
                text-center
                float-right
                mr-60
                mt-8
                w-32
                relative
                bg-blue-500 
                rounded-md 
                border-0 
                box-border 
                text-[100%] 
                h-14 
                leading-tight  
                px-[25px] 
                hover:bg-blue-600
                active:text-gray-200 
                active:bg-blue-700"
                onClick={(event) => onSubmit(event, indx)}
            >
                Save
            </button>
            <button
                type='button'
                className="text-white
                    cursor-pointer 
                    bg-gray-600 
                    rounded-md 
                    border-0 
                    box-border 
                    text-[100%] 
                    h-14 
                    leading-tight 
                    m-1 
                    px-[25px] 
                    hover:bg-gray-700
                    text-center
                    float-right
                    mt-8
                    w-32"
                onClick={handleCancel}>
                Cancel
            </button>
        </Fragment>
    )
}

export default EditableRow;