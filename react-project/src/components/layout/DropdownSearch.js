import { useEffect, useState } from "react";
import Select from "react-select";
import supabase from "../../supabaseClient";

const DropdownSearch = (props) => {
    const [classes, setClasses] = useState([]);
    const classOptions = [];

    useEffect(() => {
        fetchClasses();
    }, []);

    async function fetchClasses() {
        try {
            const { data, error } = await supabase
            .from('Classes')
            .select('class');

            if (error) throw error;

            if (data !== null) {
                data.forEach((entry) => {
                    classOptions.push({label: entry.class})
                })
                setClasses(classOptions);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const changeHandler = (event) => {
        props.onSelected(event !== null ? event.label : null);
    };

    return (
        <div>
            <div className="text-center text-[1.75rem] m-2">Choose class:</div>
            <div className="text-center text-[1.5rem] m-10">
                <Select
                    className="w-[30rem] mx-auto "
                    isClearable={true}
                    options={classes}
                    placeholder='Select...'
                    onChange={changeHandler}
                />
            </div>
        </div>
    )
}

export default DropdownSearch;