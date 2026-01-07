import {FilterMenu, FilterMenuProps} from "@/components/FilterMenu";
import {Calendar22, DatePickerProps} from "@/components/DatePicker";
import {date} from "zod";

export interface RightHandMenuProps {
    center: L.LatLng;
    zoom: number;
    radius: number;
    filterMenuProps: FilterMenuProps;
    datePickerProps: DatePickerProps;
}

export function RightHandMenu(menuProps: RightHandMenuProps): React.ReactElement {
    const center: L.LatLng = menuProps.center;
    const zoom: number = menuProps.zoom;
    const radius: number = menuProps.radius;
    const filterMenuProps: FilterMenuProps = menuProps.filterMenuProps;
    const datePickerProps: DatePickerProps = menuProps.datePickerProps;
    return (
        <div style={{
            width: "350px",
            padding: "1rem",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #334155n",
        }}>
            <FilterMenu
                onCategoryChange={filterMenuProps.onCategoryChange}
                onSubCategoryChange={filterMenuProps.onSubCategoryChange} 
                selectedCategory={filterMenuProps.selectedCategory} 
                selectedSubCategory={filterMenuProps.selectedSubCategory}
            />
            <h2 className="text-xl font-bold tracking-tight mb-6">Date Filter</h2>
            <Calendar22 
                selectedDate={datePickerProps.selectedDate}
                onDateChange={datePickerProps.onDateChange}
            />
            <div className={"text-white"} >
                {center && zoom !== null && (
                    <>
                        <p>lat: {center.lat}</p>
                        <p>lng: {center.lng}</p>
                        <p>zoom: {zoom}</p>
                        <p>current radius: {radius} km</p>
                    </>
                )}
            </div>
        </div>
    )
}