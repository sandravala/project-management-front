import { 
    MenuItem,
    TextField
} from "@mui/material";

const FieldSimple = ({columnName, rowData, handleChangeValues, selectList, i, row}) => {
    
const value = isNaN(rowData) ? rowData : rowData.toLocaleString('lt-LT', { style: 'currency', currency: 'EUR' });

const select = columnName === "procurementState" ? selectList[0] : selectList[1];

const selectTrue = columnName === "procurementState" || columnName === "procurementType";

const DropDown = selectTrue && (
    <TextField
        size="small"
        select
        defaultValue={value}
        id={columnName}
        name={columnName}
        onChange={handleChangeValues}
    >
        {select.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
)

const MyDateField = columnName === "procurementDeadline" && (
    <TextField
        size="small"
        type="date"
        defaultValue={value}
        id={columnName}
        name={columnName}
        InputProps={{inputProps: { min: "2010-05-01", max: "2030-05-04"} }}
        onChange={handleChangeValues}
    />
)
const MyTextField = columnName !== "procurementState" && (
    <TextField size="small" defaultValue={value} id={columnName} name={columnName} onChange={handleChangeValues}/>
)

const cell = i === row ? MyDateField || DropDown || MyTextField : value;

return cell;

};

export default FieldSimple