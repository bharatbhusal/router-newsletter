import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDateContext } from "../context/dateContext";

export default function Calendar() {
	const { date, setDate } = useDateContext();
	const [value, setValue] = React.useState(dayjs(date));

	const handleDateChange = (newValue) => {
		setValue(newValue);
		setDate(newValue);
	};
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={["DatePicker", "DatePicker"]}>
				<DatePicker
					label="Pick a day"
					value={value}
					onChange={(newValue) => handleDateChange(newValue)}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}
